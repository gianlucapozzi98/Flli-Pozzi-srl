import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, phone, message } = body;

    // Validazione base
    if (!name || !email || !message) {
      return NextResponse.json(
        { error: 'Name, email, and message are required' },
        { status: 400 }
      );
    }

    // Verifica che le credenziali siano configurate
    const smtpUser = process.env.SMTP_USER;
    const smtpPassword = process.env.SMTP_PASSWORD;
    
    // Debug sempre attivo per vedere cosa viene letto
    console.log('=== DEBUG SMTP CONFIGURATION ===');
    console.log('NODE_ENV:', process.env.NODE_ENV);
    console.log('SMTP_USER:', smtpUser || 'Mancante');
    console.log('SMTP_PASSWORD:', smtpPassword ? `Configurato (${smtpPassword.length} caratteri)` : 'Mancante');
    console.log('SMTP_HOST:', process.env.SMTP_HOST || 'Mancante');
    console.log('SMTP_PORT:', process.env.SMTP_PORT || 'Mancante');
    console.log('EMAIL_TO:', process.env.EMAIL_TO || 'Mancante');
    console.log('EMAIL_REPLY_TO:', process.env.EMAIL_REPLY_TO || 'Mancante');
    console.log('================================');
    
    if (!smtpUser || !smtpPassword || smtpPassword.includes('INSERISCI_QUI')) {
      const missingFields = [];
      if (!smtpUser) missingFields.push('SMTP_USER');
      if (!smtpPassword || smtpPassword.includes('INSERISCI_QUI')) missingFields.push('SMTP_PASSWORD');
      
      return NextResponse.json(
        { 
          error: `Configurazione email non completa. Variabili mancanti: ${missingFields.join(', ')}. Verifica le variabili d'ambiente su Vercel (Settings → Environment Variables) o nel file .env.local per sviluppo locale.`,
          debug: process.env.NODE_ENV === 'development' ? {
            smtpUser: smtpUser || null,
            smtpPassword: smtpPassword ? 'Presente' : null,
            allEnvKeys: Object.keys(process.env).filter(k => k.includes('SMTP') || k.includes('EMAIL'))
          } : undefined
        },
        { status: 500 }
      );
    }

    // Configurazione del transporter email
    // Per Outlook/Office365: usa la password normale dell'account
    // Per Gmail: usa App Password invece della password normale
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST || 'smtp.office365.com',
      port: parseInt(process.env.SMTP_PORT || '587'),
      secure: false, // true per 465, false per altri port (587 usa STARTTLS)
      auth: {
        user: smtpUser,
        pass: smtpPassword,
      },
      // Aggiungi debug in sviluppo
      debug: process.env.NODE_ENV === 'development',
      logger: process.env.NODE_ENV === 'development',
    });
    
    // Verifica la connessione prima di inviare
    try {
      await transporter.verify();
      console.log('SMTP server connection verified');
    } catch (verifyError: any) {
      console.error('SMTP verification failed:', verifyError);
      let errorMessage = 'Errore di connessione al server email. Verifica le credenziali SMTP.';
      
      if (verifyError.code === 'EAUTH') {
        errorMessage = 'Errore di autenticazione. Verifica che SMTP_USER e SMTP_PASSWORD siano corretti.';
      } else if (verifyError.code === 'ECONNECTION' || verifyError.code === 'ETIMEDOUT') {
        errorMessage = `Errore di connessione a ${process.env.SMTP_HOST}. Verifica SMTP_HOST e SMTP_PORT.`;
      } else if (verifyError.message?.includes('535') || verifyError.message?.includes('authentication')) {
        errorMessage = 'Credenziali non valide. Verifica username e password. Se l\'account ha 2FA, potrebbe essere necessaria una password delle app.';
      }
      
      return NextResponse.json(
        { 
          error: errorMessage,
          details: process.env.NODE_ENV === 'development' ? verifyError.message : undefined,
          code: process.env.NODE_ENV === 'development' ? verifyError.code : undefined
        },
        { status: 500 }
      );
    }

    // Email per l'azienda (riceve la richiesta)
    // Usa solo il nome senza mostrare l'email nel campo from
    // EMAIL_TO: email dove arrivano le richieste (es. ilgianlu98.29@gmail.com)
    // EMAIL_REPLY_TO: email da cui rispondere quando si clicca "Rispondi" (default: email del cliente)
    const emailTo = process.env.EMAIL_TO || 'fllipozzi@fllipozzi.it';
    const emailReplyTo = process.env.EMAIL_REPLY_TO || email; // Se non specificata, usa l'email del cliente
    
    const mailOptions = {
      from: {
        name: 'Flli Pozzi srl',
        address: smtpUser
      },
      to: emailTo,
      replyTo: emailReplyTo, // Email da cui rispondere quando si clicca "Rispondi"
      subject: `Nuova richiesta di contatto da ${name}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #E30613;">Nuova Richiesta di Contatto</h2>
          <p><strong>Nome:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Telefono:</strong> ${phone || 'Non fornito'}</p>
          <p><strong>Messaggio:</strong></p>
          <p style="background-color: #f5f5f5; padding: 15px; border-radius: 5px; white-space: pre-wrap;">${message}</p>
          <hr style="margin: 20px 0; border: none; border-top: 1px solid #ddd;">
          <p style="color: #666; font-size: 12px;">Questa email è stata inviata dal form di contatto del sito web Flli Pozzi.</p>
        </div>
      `,
      text: `
Nuova Richiesta di Contatto

Nome: ${name}
Email: ${email}
Telefono: ${phone || 'Non fornito'}

Messaggio:
${message}
      `,
    };

    // Email di conferma per il cliente
    const confirmationMailOptions = {
      from: {
        name: 'Flli Pozzi srl',
        address: smtpUser
      },
      to: email,
      subject: 'Richiesta ricevuta - Flli Pozzi',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #E30613;">Grazie per averci contattato!</h2>
          <p>Gentile ${name},</p>
          <p>Abbiamo ricevuto la tua richiesta e ti risponderemo al più presto.</p>
          <p><strong>Riepilogo della tua richiesta:</strong></p>
          <p style="background-color: #f5f5f5; padding: 15px; border-radius: 5px; white-space: pre-wrap;">${message}</p>
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
    };

    // Invia entrambe le email
    await transporter.sendMail(mailOptions);
    await transporter.sendMail(confirmationMailOptions);

    return NextResponse.json(
      { message: 'Email inviata con successo' },
      { status: 200 }
    );
  } catch (error: any) {
    console.error('Error sending email:', error);
    
    // Messaggi di errore più specifici
    let errorMessage = 'Errore durante l\'invio dell\'email';
    
    if (error.code === 'EAUTH') {
      errorMessage = 'Errore di autenticazione email. Verifica le credenziali SMTP nel file .env.local';
    } else if (error.code === 'ECONNECTION' || error.code === 'ETIMEDOUT') {
      errorMessage = 'Errore di connessione al server email. Verifica SMTP_HOST e SMTP_PORT';
    } else if (error.message?.includes('password') || error.message?.includes('authentication')) {
      errorMessage = 'Credenziali email non valide. Verifica SMTP_USER e SMTP_PASSWORD nel file .env.local';
    }
    
    return NextResponse.json(
      { error: errorMessage, details: process.env.NODE_ENV === 'development' ? error.message : undefined },
      { status: 500 }
    );
  }
}
