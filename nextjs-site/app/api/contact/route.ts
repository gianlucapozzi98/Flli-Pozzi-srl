import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';
import { z } from 'zod';

const contactSchema = z.object({
  name: z.string().trim().min(2).max(100),
  email: z.string().trim().email().max(200),
  phone: z.string().trim().min(1).max(40),
  message: z.string().trim().min(10).max(5000),
  /** Honeypot: i bot lo compilano; gli utenti reali lo lasciano vuoto */
  website: z.string().max(200).optional().default(''),
});

const isProd = process.env.NODE_ENV === 'production';

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function logDiagnostic(message: string, meta?: Record<string, unknown>) {
  if (isProd) {
    // In produzione: solo messaggi essenziali, senza PII / secret
    console.error(message, meta ? JSON.stringify(meta) : '');
  } else {
    console.error(message, meta ?? '');
  }
}

function publicError(message?: string) {
  return NextResponse.json(
    {
      error:
        message ||
        'Impossibile inviare il messaggio in questo momento. Riprova più tardi.',
    },
    { status: 500 }
  );
}

export async function POST(request: NextRequest) {
  try {
    let body: unknown;
    try {
      body = await request.json();
    } catch {
      return NextResponse.json({ error: 'Richiesta non valida.' }, { status: 400 });
    }

    const parsed = contactSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json(
        { error: 'Dati del modulo non validi. Controlla i campi e riprova.' },
        { status: 400 }
      );
    }

    const { name, email, phone, message, website } = parsed.data;

    // Honeypot: risposta "ok" senza inviare (non rivelare il filtro agli spam bot)
    if (website && website.trim() !== '') {
      logDiagnostic('contact: honeypot triggered');
      return NextResponse.json({ message: 'Email inviata con successo' }, { status: 200 });
    }

    const smtpUser = process.env.SMTP_USER;
    const smtpPassword = process.env.SMTP_PASSWORD;
    const smtpHost = process.env.SMTP_HOST || 'smtp.gmail.com';
    const smtpPort = parseInt(process.env.SMTP_PORT || '587', 10);

    const missing: string[] = [];
    if (!smtpUser) missing.push('SMTP_USER');
    if (!smtpPassword || smtpPassword.includes('INSERISCI_QUI')) missing.push('SMTP_PASSWORD');

    if (missing.length > 0) {
      logDiagnostic('contact: missing SMTP env', { missing });
      return publicError();
    }

    const isGmail =
      smtpHost.includes('gmail.com') || smtpHost === 'smtp.gmail.com';

    const transporter = nodemailer.createTransport({
      host: smtpHost,
      port: smtpPort,
      secure: smtpPort === 465,
      auth: {
        user: smtpUser,
        pass: smtpPassword,
      },
      tls: isGmail
        ? { rejectUnauthorized: true }
        : { rejectUnauthorized: true },
      // Debug Nodemailer solo in sviluppo
      debug: !isProd,
      logger: !isProd,
    });

    try {
      await transporter.verify();
    } catch (verifyError: unknown) {
      const err = verifyError as { code?: string; message?: string };
      logDiagnostic('contact: SMTP verify failed', {
        code: err.code || 'UNKNOWN',
      });

      if (err.code === 'ECONNECTION' || err.code === 'ETIMEDOUT' || err.code === 'ESOCKET') {
        return publicError(
          'Servizio email temporaneamente non disponibile. Riprova tra poco.'
        );
      }
      if (err.code === 'EAUTH') {
        return publicError();
      }
      return publicError();
    }

    const emailTo = process.env.EMAIL_TO || 'fllipozzi@fllipozzi.it';
    // Reply-To: se impostato in env, altrimenti email del cliente (per rispondere alla richiesta)
    const emailReplyTo = process.env.EMAIL_REPLY_TO || email;

    const safeName = escapeHtml(name);
    const safeEmail = escapeHtml(email);
    const safePhone = escapeHtml(phone);
    const safeMessage = escapeHtml(message);

    const mailOptions = {
      from: {
        name: 'Flli Pozzi srl',
        address: smtpUser!,
      },
      to: emailTo,
      replyTo: emailReplyTo,
      subject: `Nuova richiesta di contatto da ${name}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #E30613;">Nuova Richiesta di Contatto</h2>
          <p><strong>Nome:</strong> ${safeName}</p>
          <p><strong>Email:</strong> ${safeEmail}</p>
          <p><strong>Telefono:</strong> ${safePhone}</p>
          <p><strong>Messaggio:</strong></p>
          <p style="background-color: #f5f5f5; padding: 15px; border-radius: 5px; white-space: pre-wrap;">${safeMessage}</p>
          <hr style="margin: 20px 0; border: none; border-top: 1px solid #ddd;">
          <p style="color: #666; font-size: 12px;">Questa email è stata inviata dal form di contatto del sito web Flli Pozzi.</p>
        </div>
      `,
      text: `
Nuova Richiesta di Contatto

Nome: ${name}
Email: ${email}
Telefono: ${phone}

Messaggio:
${message}
      `,
    };

    try {
      await transporter.sendMail(mailOptions);
    } catch (sendError: unknown) {
      const err = sendError as { code?: string };
      logDiagnostic('contact: company email send failed', {
        code: err.code || 'UNKNOWN',
      });
      if (err.code === 'ECONNECTION' || err.code === 'ETIMEDOUT' || err.code === 'ESOCKET') {
        return publicError(
          'Servizio email temporaneamente non disponibile. Riprova tra poco.'
        );
      }
      return publicError();
    }

    // Conferma al cliente: non blocca il successo commerciale se fallisce
    try {
      await transporter.sendMail({
        from: {
          name: 'Flli Pozzi srl',
          address: smtpUser!,
        },
        to: email,
        subject: 'Richiesta ricevuta - Flli Pozzi',
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <h2 style="color: #E30613;">Grazie per averci contattato!</h2>
            <p>Gentile ${safeName},</p>
            <p>Abbiamo ricevuto la tua richiesta e ti risponderemo al più presto.</p>
            <p><strong>Riepilogo della tua richiesta:</strong></p>
            <p style="background-color: #f5f5f5; padding: 15px; border-radius: 5px; white-space: pre-wrap;">${safeMessage}</p>
            <hr style="margin: 20px 0; border: none; border-top: 1px solid #ddd;">
            <p><strong>Flli Pozzi srl</strong><br>
            Via Leonardo da Vinci 37<br>
            24043 Caravaggio (BG), Italia<br>
            Tel: +39 0363 350380<br>
            Email: fllipozzi@fllipozzi.it</p>
          </div>
        `,
        text: `
Grazie per averci contattato!

Gentile ${name},

Abbiamo ricevuto la tua richiesta e ti risponderemo al più presto.

Riepilogo della tua richiesta:
${message}

Flli Pozzi srl
Via Leonardo da Vinci 37
24043 Caravaggio (BG), Italia
Tel: +39 0363 350380
Email: fllipozzi@fllipozzi.it
        `,
      });
    } catch (confirmError: unknown) {
      const err = confirmError as { code?: string };
      logDiagnostic('contact: confirmation email failed (company mail ok)', {
        code: err.code || 'UNKNOWN',
      });
    }

    return NextResponse.json(
      { message: 'Email inviata con successo' },
      { status: 200 }
    );
  } catch (error: unknown) {
    const err = error as { code?: string };
    logDiagnostic('contact: unexpected error', { code: err.code || 'UNKNOWN' });
    return publicError();
  }
}
