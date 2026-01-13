'use client';

import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { useLanguage } from '@/contexts/LanguageContext';

export default function Privacy() {
  const { t } = useLanguage();
  return (
    <>
      <Header />
      <main className="pt-20">
        <section className="bg-gradient-to-br from-primary to-primary-dark text-white" style={{ paddingTop: '120px', paddingBottom: '80px' }}>
          <div className="container mx-auto px-4 lg:px-8 text-center">
            <h1 className="text-5xl md:text-6xl font-black mb-4 font-heading">
              {t('privacy.title')}
            </h1>
            <p className="text-xl md:text-2xl opacity-90">
              {t('privacy.subtitle')}
            </p>
          </div>
        </section>

        <section style={{ paddingTop: '80px', paddingBottom: '80px' }}>
          <div className="container mx-auto px-4 lg:px-8" style={{ maxWidth: '1200px' }}>
            <div className="prose prose-lg max-w-none text-text-light leading-relaxed mx-auto">
              <div className="text-center">
                <p style={{ marginBottom: '1.5rem' }}>
                  {t('privacy.intro1')}
              </p>
              
                <p style={{ marginBottom: '1.5rem' }}>
                  {t('privacy.intro2')}
                </p>
              </div>

              <h2 className="text-3xl font-bold text-text text-center" style={{ marginTop: '3rem', marginBottom: '2rem' }}>Quali informazioni vengono raccolte</h2>
              <ul className="list-disc pl-8 mx-auto" style={{ maxWidth: '1000px', marginTop: '2rem', marginBottom: '2rem' }}>
                <li>
                  <strong>Dati di Contatto:</strong> informazioni relative al nome, luogo e data di nascita, codice fiscale, indirizzo di fatturazione, indirizzo di consegna, indirizzo e-mail e numeri di telefono;
                </li>
                <li>
                  <strong>Dati Finanziari:</strong> dettagli del conto bancario e della carta di pagamento raccolti esclusivamente allo scopo di gestire la parte commerciale;
                </li>
                <li>
                  <strong>Dati di Transazione:</strong> dettagli sui pagamenti da e verso il cliente/fornitore e altri dettagli sui prodotti e servizi che vengono acquistato o venduti;
                </li>
                <li>
                  <strong>Dati del Profilo:</strong> acquisti o ordini effettuati, eventuali profili social, preferenze, feedback, comunicazioni e risposte a sondaggi interni e i Suoi password e nome utente (customer portal, ove presente);
                </li>
                <li>
                  <strong>Categorie Particolari di dati personali:</strong> sensibili (es. dati sanitari, convinzioni politiche, religiose..) e giudiziari (condanne penali e amministrative);
                </li>
                <li>
                  <strong>Dati di Marketing e Comunicazione:</strong> preferenze nel ricevimento di comunicazioni di marketing e da parte di terzi e le preferenze di comunicazione;
                </li>
                <li>
                  <strong>Dati di Utilizzo del Sito Web:</strong> informazioni relative alle modalità con cui utilizza il sito, apre o inoltra le nostre comunicazioni, incluse le informazioni raccolte tramite cookie (può trovare la nostra Informativa sui Cookie che ne regola i dettagli);
                </li>
                <li>
                  <strong>Dati tecnici:</strong> includono l'indirizzo IP (Internet Protocol), i dati di accesso, il tipo e la versione del browser, l'impostazione del fuso orario e la posizione, i tipi e le versioni di plug-in del browser, il sistema operativo e la piattaforma e altre tecnologie sui dispositivi utilizzati per accedere ai siti web aziendali.
                </li>
              </ul>

              <h2 className="text-3xl font-bold text-text text-center" style={{ marginTop: '3rem', marginBottom: '2rem' }}>Come utilizziamo le informazioni raccolte</h2>
              <p className="text-center" style={{ marginBottom: '1.5rem' }}>
                Vengono elaborate solo le informazioni necessarie per lo scopo per cui sono state raccolte. Viene data la possibilità di non ricevere comunicazioni di marketing da parte nostra (il consenso può essere ritirato in qualsiasi momento). Non vengono inviate email o comunicazioni "indesiderate" e non vengono condivisi i dati con terzi, se non per espletare il contratto di acquisto o vendita.
              </p>

              <p className="text-center" style={{ marginBottom: '1.5rem' }}>
                Vengono utilizzati i dati personali esclusivamente per gli scopi e le basi legali indicati nella tabella seguente:
              </p>

              <div className="overflow-x-auto mx-auto" style={{ maxWidth: '1000px', marginTop: '2rem', marginBottom: '2rem' }}>
                <table className="min-w-full border-collapse border border-gray-300">
                  <thead>
                    <tr className="bg-gray-100">
                      <th className="border border-gray-300 px-4 py-3 text-left font-semibold text-text">Scopi per l'elaborazione</th>
                      <th className="border border-gray-300 px-4 py-3 text-left font-semibold text-text">Basi legali per il trattamento</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-gray-300 px-4 py-3">
                        <ul className="list-disc pl-5 space-y-1">
                          <li>Gestione operativa e finalità a questa strettamente connesse per l'accesso al Sito web, l'elaborazione è necessaria per l'accesso alla Sua Area Personale;</li>
                          <li>Esecuzione del contratto, soddisfacimento e completamento di ordini e acquisti;</li>
                          <li>Registrazione di un nuovo cliente, necessario a creare e gestire il proprio account cliente e fornire servizi all'utente;</li>
                          <li>Fornire supporto tecnico del prodotto;</li>
                          <li>Fornire corsi di formazione per l'utente e certificazioni ai clienti.</li>
                        </ul>
                      </td>
                      <td className="border border-gray-300 px-4 py-3">Adempimento degli obblighi contrattuali.</td>
                    </tr>
                    <tr>
                      <td className="border border-gray-300 px-4 py-3">
                        <ul className="list-disc pl-5 space-y-1">
                          <li>Indagini di Customer Satisfaction, utilizzo dei Suoi dati di contatto per la conduzione di indagini volte a misurare il livello di soddisfazione del servizio erogato, quindi misurare l'interesse di clienti e fornitori e migliorare i nostri prodotti, servizi e sito web;</li>
                          <li>Comprendere il flusso di traffico sul nostro sito Web e fornire un'esperienza migliore comprendendo le esigenze dei nostri clienti;</li>
                          <li>Visualizzare annunci pubblicitari più significativi e pertinenti sul sito Web.</li>
                        </ul>
                      </td>
                      <td className="border border-gray-300 px-4 py-3">
                        Il consenso – che può essere ritirato in qualsiasi momento. Il mancato conferimento non comporta conseguenze sui rapporti contrattuali.
                      </td>
                    </tr>
                    <tr>
                      <td className="border border-gray-300 px-4 py-3">
                        <ul className="list-disc pl-5 space-y-1">
                          <li>Marketing e comunicazione pubblicitaria, diretta ad informarLa su iniziative promozionali di vendita, prodotti o servizi che potrebbero interessare, realizzate mediante modalità automatizzate di contatto (posta elettronica, sms e altri strumenti di messaggistica massiva, ecc.) e modalità tradizionali di contatto (ad esempio, telefonata con operatore) ovvero per ricerche di mercato e indagini statistiche;</li>
                          <li>Fornire informazioni sulla nostra realtà e sui nostri prodotti e servizi. L'elaborazione è necessaria per supportare gli interessi commerciali legittimi alla gestione della nostra attività.</li>
                        </ul>
                      </td>
                      <td className="border border-gray-300 px-4 py-3">
                        Il consenso – che può essere ritirato in qualsiasi momento. Il mancato conferimento non comporta conseguenze sui rapporti contrattuali.
                      </td>
                    </tr>
                    <tr>
                      <td className="border border-gray-300 px-4 py-3">
                        Prevenzione e rilevamento di frodi, riciclaggio di denaro o altri reati o allo scopo di rispondere a una richiesta vincolante da parte di un'autorità pubblica o di un organismo di regolamentazione.
                      </td>
                      <td className="border border-gray-300 px-4 py-3">
                        Interessi legittimi e obblighi di legge.
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <h2 className="text-3xl font-bold text-text text-center" style={{ marginTop: '3rem', marginBottom: '2rem' }}>Come condividiamo le informazioni</h2>
              <p className="text-center" style={{ marginBottom: '1.5rem' }}>
                Non vendiamo le Sue informazioni a terzi. Potranno avere accesso ai Suoi dati i dipendenti debitamente autorizzati, nonché i fornitori esterni, nominati, se necessario, responsabili del trattamento, che forniscono supporto per l'erogazione dei servizi.
              </p>

              <h2 className="text-3xl font-bold text-text text-center" style={{ marginTop: '3rem', marginBottom: '2rem' }}>Trasferimento dei dati</h2>
              <p className="text-center" style={{ marginBottom: '1.5rem' }}>
                I Suoi dati personali possono essere trasferiti e memorizzati in paesi al di fuori dello Spazio economico europeo (SEE) per le finalità sopra descritte. Quando trasferiamo i Suoi dati personali al di fuori dello Spazio economico europeo, garantiremo che siano adottate misure di protezione adeguate per proteggere la privacy e l'integrità di tali dati, comprese le clausole sui modelli dell'Unione europea ai sensi dell'articolo 46 "Trasferimento soggetto a garanzie adeguate".
              </p>

              <h2 className="text-3xl font-bold text-text text-center" style={{ marginTop: '3rem', marginBottom: '2rem' }}>Per quanto tempo conserviamo le informazioni</h2>
              <p className="text-center" style={{ marginBottom: '1.5rem' }}>
                Non conserveremo le informazioni personali in un formato identificativo per un periodo più lungo del necessario. Per i clienti o fornitori, conserveremo informazioni personali per un periodo più lungo rispetto al trattamento di potenziali clienti/fornitori.
              </p>
              <p className="text-center" style={{ marginBottom: '1.5rem' }}>
                Nel caso di un rapporto continuativo (ad esempio un cliente), conserviamo le informazioni personali per 10 anni dalla data dell'ultima operazione effettuata, per poter stabilire, portare o difendere in giudizio eventuali reclami legali.
              </p>

              <h2 className="text-3xl font-bold text-text text-center" style={{ marginTop: '3rem', marginBottom: '2rem' }}>I Suoi diritti</h2>
              <p className="text-center" style={{ marginBottom: '1.5rem' }}>L'Interessato potrà far valere i propri diritti, così come previsti dagli artt. 15-23 GDPR in particolare:</p>
              <ul className="list-disc pl-8 mx-auto" style={{ maxWidth: '1000px', marginTop: '2rem', marginBottom: '2rem' }}>
                <li>Richiedere una copia delle informazioni che abbiamo in nostro possesso;</li>
                <li>Correggere e aggiornare le proprie informazioni;</li>
                <li>Ritirare il consenso;</li>
                <li>Diritto di opporsi e a richiedere la cancellazione dei dati o la limitazione d'uso;</li>
                <li>Diritto alla portabilità dei dati;</li>
                <li>Diritto di proporre reclamo all'Autorità di controllo competente (Garante Privacy).</li>
              </ul>

              <h2 className="text-3xl font-bold text-text text-center" style={{ marginTop: '3rem', marginBottom: '2rem' }}>Contatti</h2>
              <p className="text-center" style={{ marginBottom: '1.5rem' }}>
                È possibile esercitare i diritti di cui sopra e/o gestire le informazioni contattandoci ai seguenti indirizzi:
              </p>
              <div className="bg-gray-50 p-6 rounded-lg mx-auto text-center" style={{ maxWidth: '500px', marginTop: '2rem', marginBottom: '2rem' }}>
                <p className="mb-2">
                  <strong>Posta:</strong> via Leonardo Da Vinci, 37 Caravaggio, 24043 - (BG)
              </p>
              <p>
                  <strong>E-mail:</strong> <a href="mailto:fllipozzi@fllipozzi.it" className="text-primary hover:underline">fllipozzi@fllipozzi.it</a>
              </p>
              </div>

              <h2 className="text-3xl font-bold text-text text-center" style={{ marginTop: '3rem', marginBottom: '2rem' }}>Modifiche alla presente informativa</h2>
              <p className="text-center" style={{ marginBottom: '1.5rem' }}>
                La presente Informativa è in vigore dal 25 maggio 2018. Fratelli Pozzi S.r.l. si riserva di modificarne il contenuto, in parte o completamente, anche a causa di variazioni della Normativa Privacy. Fratelli Pozzi S.r.l. effettuerà la Pubblicazione sul Sito della versione aggiornata del presente atto, e da quel momento essa sarà vincolante: pertanto si invita a visitare con regolarità questa sezione.
              </p>
              <div className="bg-gray-50 p-6 rounded-lg mx-auto text-center" style={{ maxWidth: '800px', marginTop: '2rem', marginBottom: '2rem' }}>
              <p>
                  <strong>Titolare del trattamento dati:</strong> Fratelli Pozzi S.r.l. con sede in via Leonardo Da Vinci, 37 Caravaggio, 24043 BG – P.IVA 00215550161.
              </p>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
