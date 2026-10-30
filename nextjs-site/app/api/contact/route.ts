import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';
import { z } from 'zod';

const contactSchema = z.object({
  name: z.string().trim().min(2).max(100),
  email: z.string().trim().email().max(200),
  /** Obbligatorio nel form Contatti; facoltativo nelle richieste B2B */
  phone: z.string().trim().max(40).optional().default(''),
  message: z.string().trim().min(10).max(5000),
  /** Honeypot: i bot lo compilano; gli utenti reali lo lasciano vuoto */
  website: z.string().max(200).optional().default(''),
  company: z.string().trim().max(200).optional().default(''),
  country: z.string().trim().max(100).optional().default(''),
  companyWebsite: z.string().trim().max(300).optional().default(''),
  activityType: z.string().trim().max(200).optional().default(''),
  productsInterest: z.string().trim().max(500).optional().default(''),
  quantities: z.string().trim().max(200).optional().default(''),
  source: z.enum(['contact', 'b2b']).optional().default('contact'),
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

    const {
      name,
      email,
      phone,
      message,
      website,
      company,
      country,
      companyWebsite,
      activityType,
      productsInterest,
      quantities,
      source,
    } = parsed.data;

    // Honeypot: risposta "ok" senza inviare
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
      tls: { rejectUnauthorized: true },
      debug: !isProd,
      logger: !isProd,
    });

    try {
      await transporter.verify();
    } catch (verifyError: unknown) {
      const err = verifyError as { code?: string };
      logDiagnostic('contact: SMTP verify failed', {
        code: err.code || 'UNKNOWN',
      });

      if (err.code === 'ECONNECTION' || err.code === 'ETIMEDOUT' || err.code === 'ESOCKET') {
        return publicError(
          'Servizio email temporaneamente non disponibile. Riprova tra poco.'
        );
      }
      return publicError();
    }

    const emailTo = process.env.EMAIL_TO || 'fllipozzi@fllipozzi.it';
    const emailReplyTo = process.env.EMAIL_REPLY_TO || email;
    const isB2b = source === 'b2b';

    const safeName = escapeHtml(name);
    const safeEmail = escapeHtml(email);
    const safePhone = escapeHtml(phone || 'Non fornito');
    const safeMessage = escapeHtml(message);
    const safeCompany = escapeHtml(company || '');
    const safeCountry = escapeHtml(country || '');
    const safeCompanyWebsite = escapeHtml(companyWebsite || '');
    const safeActivity = escapeHtml(activityType || '');
    const safeProducts = escapeHtml(productsInterest || '');
    const safeQuantities = escapeHtml(quantities || '');

    const b2bHtml = isB2b
      ? `
          <p><strong>Azienda:</strong> ${safeCompany || '—'}</p>
          <p><strong>Paese:</strong> ${safeCountry || '—'}</p>
          <p><strong>Sito web aziendale:</strong> ${safeCompanyWebsite || '—'}</p>
          <p><strong>Tipologia di attività:</strong> ${safeActivity || '—'}</p>
          <p><strong>Prodotti di interesse:</strong> ${safeProducts || '—'}</p>
          <p><strong>Quantità indicative:</strong> ${safeQuantities || '—'}</p>
        `
      : '';

    const b2bText = isB2b
      ? `
Azienda: ${company || '—'}
Paese: ${country || '—'}
Sito web aziendale: ${companyWebsite || '—'}
Tipologia di attività: ${activityType || '—'}
Prodotti di interesse: ${productsInterest || '—'}
Quantità indicative: ${quantities || '—'}
`
      : '';

    const subject = isB2b
      ? `Richiesta collaborazione commerciale / Listino B2B da ${name}`
      : `Nuova richiesta di contatto da ${name}`;

    const mailOptions = {
      from: {
        name: 'Flli Pozzi srl',
        address: smtpUser!,
      },
      to: emailTo,
      replyTo: emailReplyTo,
      subject,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #E30613;">${isB2b ? 'Richiesta collaborazione commerciale / Listino B2B' : 'Nuova Richiesta di Contatto'}</h2>
          <p><strong>Nome:</strong> ${safeName}</p>
          <p><strong>Email:</strong> ${safeEmail}</p>
          <p><strong>Telefono:</strong> ${safePhone}</p>
          ${b2bHtml}
          <p><strong>Messaggio:</strong></p>
          <p style="background-color: #f5f5f5; padding: 15px; border-radius: 5px; white-space: pre-wrap;">${safeMessage}</p>
          <hr style="margin: 20px 0; border: none; border-top: 1px solid #ddd;">
          <p style="color: #666; font-size: 12px;">Questa email è stata inviata dal sito web Flli Pozzi.</p>
        </div>
      `,
      text: `
${isB2b ? 'Richiesta collaborazione commerciale / Listino B2B' : 'Nuova Richiesta di Contatto'}

Nome: ${name}
Email: ${email}
Telefono: ${phone || 'Non fornito'}
${b2bText}
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
