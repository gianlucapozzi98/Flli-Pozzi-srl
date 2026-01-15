# Configurazione Email per il Form di Contatto

Il form di contatto invia le richieste via email utilizzando Nodemailer. Per configurare l'invio delle email, devi creare un file `.env.local` nella cartella `nextjs-site/` con le seguenti variabili:

## Variabili d'Ambiente Richieste

Crea un file `.env.local` nella cartella `nextjs-site/` con questo contenuto:

```env
# Email Configuration
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASSWORD=your-app-password

# Email addresses
EMAIL_FROM="Flli Pozzi Website" <your-email@gmail.com>
EMAIL_TO=ilgianlu98.29@gmail.com  # Email dove arrivano le richieste di contatto
EMAIL_REPLY_TO=camilla@fllipozzi.it  # Email da cui rispondere quando si clicca "Rispondi" (opzionale, default: email del cliente)
```

## Configurazione per Gmail

1. **Abilita la verifica in due passaggi** sul tuo account Google:
   - Vai su [Google Account](https://myaccount.google.com/)
   - Sicurezza > Verifica in due passaggi

2. **Crea una Password delle app**:
   - Vai su [Password delle app](https://myaccount.google.com/apppasswords)
   - Seleziona "App" > "Altra (Nome personalizzato)" > "Flli Pozzi Website"
   - Copia la password generata (16 caratteri senza spazi)

3. **Usa la password delle app** nel file `.env.local`:
   ```env
   SMTP_PASSWORD=xxxx xxxx xxxx xxxx
   ```
   (Rimuovi gli spazi dalla password)

## Configurazione per Altri Provider Email

### Outlook/Office365
Per Outlook/Office365, usa la password normale dell'account (non serve una password delle app come Gmail):

```env
SMTP_HOST=smtp.office365.com
SMTP_PORT=587
SMTP_USER=fllipozzi@fllipozzi.it
SMTP_PASSWORD=la-tua-password-normale
EMAIL_FROM="Flli Pozzi srl" <fllipozzi@fllipozzi.it>
EMAIL_TO=ilgianlu98.29@gmail.com  # Email dove arrivano le richieste di contatto
EMAIL_REPLY_TO=camilla@fllipozzi.it  # Email da cui rispondere quando si clicca "Rispondi" (opzionale)
```

**Nota importante per Outlook/Office365:**
- Se l'account ha l'autenticazione a due fattori (2FA) abilitata, potrebbe essere necessario creare una password delle app
- Alcuni account aziendali potrebbero richiedere l'autenticazione moderna (OAuth2) invece della password SMTP
- Se hai problemi, contatta l'amministratore IT per le credenziali SMTP corrette

### Altri Provider SMTP
Consulta la documentazione del tuo provider email per:
- Host SMTP
- Porta (solitamente 587 per TLS o 465 per SSL)
- Se richiede autenticazione

## Come Funziona

Quando qualcuno compila il form di contatto:

1. **Email all'azienda**: Viene inviata un'email a `EMAIL_TO` (es. ilgianlu98.29@gmail.com) con:
   - Nome del contatto
   - Email del contatto
   - Telefono
   - Messaggio
   - Il campo `replyTo` è impostato a `EMAIL_REPLY_TO` (default: camilla@fllipozzi.it) per rispondere facilmente

2. **Email di conferma**: Viene inviata un'email di conferma al contatto che ha compilato il form

## Configurazione Email

- **Email visibile sul sito**: `fllipozzi@fllipozzi.it` (rimane sempre questa, visibile ai clienti)
- **Email dove arrivano le richieste**: `EMAIL_TO` (es. ilgianlu98.29@gmail.com - email tecnica per gestire le richieste)
- **Email da cui rispondere**: `EMAIL_REPLY_TO` (default: camilla@fllipozzi.it - quando clicchi "Rispondi", la risposta parte da qui)

## Rispondere alle Richieste

**Sì, puoi rispondere direttamente all'email ricevuta!** 

Quando clicchi su "Rispondi" nell'email ricevuta:
- La risposta andrà automaticamente all'indirizzo email del cliente che ha compilato il form
- Il mittente della risposta sarà `EMAIL_REPLY_TO` (default: camilla@fllipozzi.it)
- **Non serve creare una nuova email manualmente.**

## Test

Dopo aver configurato le variabili d'ambiente:

1. Riavvia il server di sviluppo: `npm run dev`
2. Vai alla pagina Contatti
3. Compila e invia il form
4. Controlla la casella email configurata in `EMAIL_TO`

## Note di Sicurezza

- **NON committare** il file `.env.local` su Git (è già nel `.gitignore`)
- Usa sempre una **Password delle app** per Gmail, non la password principale
- Per produzione, configura le variabili d'ambiente direttamente sulla piattaforma di hosting (Vercel, Netlify, ecc.)

## Troubleshooting

### Errore: "Invalid login"
- Verifica che la password delle app sia corretta (per Gmail)
- Assicurati di aver rimosso gli spazi dalla password delle app

### Errore: "Connection timeout"
- Verifica che `SMTP_HOST` e `SMTP_PORT` siano corretti
- Controlla il firewall/antivirus che non blocchi la connessione

### Email non arriva
- Controlla la cartella spam
- Verifica che `EMAIL_TO` sia corretto
- Controlla i log del server per errori
