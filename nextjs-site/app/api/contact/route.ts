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

    // Configurazione del transporter email
    // Per Gmail: usa App Password invece della password normale
    // Per altri provider: modifica host, port, secure di conseguenza
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST || 'smtp.gmail.com',
      port: parseInt(process.env.SMTP_PORT || '587'),
      secure: false, // true per 465, false per altri port
      auth: {
        user: process.env.SMTP_USER || process.env.EMAIL_FROM,
        pass: process.env.SMTP_PASSWORD || process.env.EMAIL_PASSWORD,
      },
    });

    // Email per l'azienda (riceve la richiesta)
    const mailOptions = {
      from: process.env.EMAIL_FROM || `"Flli Pozzi Website" <${process.env.SMTP_USER}>`,
      to: process.env.EMAIL_TO || 'fllipozzi@fllipozzi.it',
      bcc: process.env.EMAIL_BCC || 'ilgianlu98.29@gmail.com', // Email tecnica per verifica (nascosta)
      replyTo: email,
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
      from: process.env.EMAIL_FROM || `"Flli Pozzi" <${process.env.SMTP_USER}>`,
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
  } catch (error) {
    console.error('Error sending email:', error);
    return NextResponse.json(
      { error: 'Errore durante l\'invio dell\'email' },
      { status: 500 }
    );
  }
}
