'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { PlusIcon, TrashIcon } from '@heroicons/react/24/outline';
import { useLanguage } from '@/contexts/LanguageContext';
import type { L } from '@/lib/catalog';
import styles from './quick-order.module.css';

const ITEMS: { v: string; label: L }[] = [
  { v: 'reggia-pp', label: { it: 'Reggia in polipropilene (PP)', en: 'Polypropylene (PP) strap', fr: 'Feuillard polypropylène (PP)' } },
  { v: 'reggia-pet', label: { it: 'Reggia in poliestere (PET)', en: 'Polyester (PET) strap', fr: 'Feuillard polyester (PET)' } },
  { v: 'reggia-acciaio', label: { it: 'Reggia in acciaio', en: 'Steel strap', fr: 'Feuillard acier' } },
  { v: 'sigilli-plastica', label: { it: 'Sigilli per reggia in plastica', en: 'Seals for plastic strap', fr: 'Chapes pour feuillard plastique' } },
  { v: 'sigilli-acciaio', label: { it: 'Sigilli overlap per acciaio', en: 'Overlap seals for steel', fr: 'Chapes overlap pour acier' } },
  { v: 'accessori', label: { it: 'Accessori (angolari, film, reggia tessile)', en: 'Accessories (edge protectors, film, woven strap)', fr: 'Accessoires (cornières, film, feuillard textile)' } },
  { v: 'altro', label: { it: 'Altro / ricambi', en: 'Other / spare parts', fr: 'Autre / pièces' } },
];

const TXT = {
  company: { it: 'Azienda', en: 'Company', fr: 'Entreprise' },
  name: { it: 'Nome e cognome', en: 'Full name', fr: 'Nom et prénom' },
  email: { it: 'Email', en: 'Email', fr: 'E-mail' },
  phone: { it: 'Telefono', en: 'Phone', fr: 'Téléphone' },
  rows: { it: 'Articoli da ordinare', en: 'Items to order', fr: 'Articles à commander' },
  item: { it: 'Articolo', en: 'Item', fr: 'Article' },
  size: { it: 'Misura o codice', en: 'Size or code', fr: 'Dimension ou référence' },
  sizePh: { it: 'es. 12 x 0,65 oppure K5A', en: 'e.g. 12 x 0.65 or K5A', fr: 'ex. 12 x 0,65 ou K5A' },
  qty: { it: 'Quantità', en: 'Quantity', fr: 'Quantité' },
  qtyPh: { it: 'es. 20 bobine', en: 'e.g. 20 coils', fr: 'ex. 20 bobines' },
  addRow: { it: 'Aggiungi articolo', en: 'Add item', fr: 'Ajouter un article' },
  removeRow: { it: 'Rimuovi articolo', en: 'Remove item', fr: 'Supprimer l’article' },
  notes: { it: 'Note (consegna, urgenza, ordine abituale)', en: 'Notes (delivery, urgency, usual order)', fr: 'Remarques (livraison, urgence, commande habituelle)' },
  submit: { it: 'Invia richiesta d’ordine', en: 'Send order request', fr: 'Envoyer la demande de commande' },
  sending: { it: 'Invio in corso…', en: 'Sending…', fr: 'Envoi en cours…' },
  privacy: {
    it: 'Inviando la richiesta accetti il trattamento dei dati secondo l’',
    en: 'By sending the request you accept the processing of your data under our ',
    fr: 'En envoyant la demande, vous acceptez le traitement des données selon notre ',
  },
  privacyLink: { it: 'informativa privacy', en: 'privacy policy', fr: 'politique de confidentialité' },
  required: { it: 'Compila i campi obbligatori e almeno un articolo con la quantità.', en: 'Fill in the required fields and at least one item with quantity.', fr: 'Remplissez les champs obligatoires et au moins un article avec la quantité.' },
  error: { it: 'Invio non riuscito. Riprova o chiamaci al +39 0363 350380.', en: 'Sending failed. Try again or call +39 0363 350380.', fr: 'Échec de l’envoi. Réessayez ou appelez le +39 0363 350380.' },
  subject: { it: 'Ordine rapido consumabili', en: 'Quick reorder of consumables', fr: 'Commande rapide de consommables' },
} satisfies Record<string, L>;

type Row = { item: string; size: string; qty: string };
const emptyRow = (): Row => ({ item: ITEMS[0].v, size: '', qty: '' });

/** Riordino di reggia e sigilli: righe articolo/misura/quantità inviate all'ufficio commerciale. */
export default function QuickOrderForm() {
  const { language, lp } = useLanguage();
  const router = useRouter();
  const L = (v: L) => v[language];
  const [rows, setRows] = useState<Row[]>([emptyRow()]);
  const [fields, setFields] = useState({ company: '', name: '', email: '', phone: '', notes: '', website: '' });
  const [error, setError] = useState('');
  const [sending, setSending] = useState(false);

  const setRow = (i: number, patch: Partial<Row>) => setRows((r) => r.map((row, j) => (j === i ? { ...row, ...patch } : row)));

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    const filled = rows.filter((r) => r.qty.trim());
    if (!fields.company.trim() || fields.name.trim().length < 2 || !fields.email.includes('@') || !fields.phone.trim() || !filled.length) {
      setError(L(TXT.required));
      return;
    }
    const lines = filled.map((r) => {
      const label = ITEMS.find((i) => i.v === r.item)?.label.it ?? r.item;
      return `- ${label}${r.size.trim() ? ` · ${r.size.trim()}` : ''} · ${r.qty.trim()}`;
    });
    const message = [`${TXT.subject.it} (${language.toUpperCase()})`, '', ...lines, '', fields.notes.trim() ? `Note: ${fields.notes.trim()}` : '']
      .join('\n')
      .trim();
    setSending(true);
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: fields.name,
          email: fields.email,
          phone: fields.phone,
          company: fields.company,
          message,
          website: fields.website,
          source: 'contact',
        }),
      });
      if (!res.ok) throw new Error('send failed');
      router.push(lp('/grazie'));
    } catch {
      setError(L(TXT.error));
      setSending(false);
    }
  };

  return (
    <form onSubmit={onSubmit} className={styles.form} noValidate>
      {/* Honeypot antispam */}
      <div aria-hidden="true" className={styles.hp}>
        <label htmlFor="qo-website">Website</label>
        <input id="qo-website" tabIndex={-1} autoComplete="off" value={fields.website} onChange={(e) => setFields({ ...fields, website: e.target.value })} />
      </div>

      <div className={styles.grid2}>
        <label htmlFor="qo-company">
          {L(TXT.company)} *
          <input id="qo-company" required autoComplete="organization" value={fields.company} onChange={(e) => setFields({ ...fields, company: e.target.value })} />
        </label>
        <label htmlFor="qo-name">
          {L(TXT.name)} *
          <input id="qo-name" required autoComplete="name" value={fields.name} onChange={(e) => setFields({ ...fields, name: e.target.value })} />
        </label>
        <label htmlFor="qo-email">
          {L(TXT.email)} *
          <input id="qo-email" type="email" required autoComplete="email" value={fields.email} onChange={(e) => setFields({ ...fields, email: e.target.value })} />
        </label>
        <label htmlFor="qo-phone">
          {L(TXT.phone)} *
          <input id="qo-phone" type="tel" required autoComplete="tel" value={fields.phone} onChange={(e) => setFields({ ...fields, phone: e.target.value })} />
        </label>
      </div>

      <fieldset className={styles.rows}>
        <legend>{L(TXT.rows)}</legend>
        {rows.map((row, i) => (
          <div key={i} className={styles.row}>
            <label htmlFor={`qo-item-${i}`}>
              {L(TXT.item)}
              <select id={`qo-item-${i}`} value={row.item} onChange={(e) => setRow(i, { item: e.target.value })}>
                {ITEMS.map((it) => (
                  <option key={it.v} value={it.v}>
                    {L(it.label)}
                  </option>
                ))}
              </select>
            </label>
            <label htmlFor={`qo-size-${i}`}>
              {L(TXT.size)}
              <input id={`qo-size-${i}`} placeholder={L(TXT.sizePh)} value={row.size} onChange={(e) => setRow(i, { size: e.target.value })} />
            </label>
            <label htmlFor={`qo-qty-${i}`}>
              {L(TXT.qty)}
              <input id={`qo-qty-${i}`} placeholder={L(TXT.qtyPh)} value={row.qty} onChange={(e) => setRow(i, { qty: e.target.value })} />
            </label>
            {rows.length > 1 && (
              <button type="button" className={styles.remove} aria-label={L(TXT.removeRow)} onClick={() => setRows((r) => r.filter((_, j) => j !== i))}>
                <TrashIcon width={20} height={20} aria-hidden="true" />
              </button>
            )}
          </div>
        ))}
        {rows.length < 8 && (
          <button type="button" className={styles.add} onClick={() => setRows((r) => [...r, emptyRow()])}>
            <PlusIcon width={18} height={18} aria-hidden="true" />
            {L(TXT.addRow)}
          </button>
        )}
      </fieldset>

      <label htmlFor="qo-notes" className={styles.full}>
        {L(TXT.notes)}
        <textarea id="qo-notes" rows={4} value={fields.notes} onChange={(e) => setFields({ ...fields, notes: e.target.value })} />
      </label>

      <p className={styles.privacy}>
        {L(TXT.privacy)}
        <Link href={lp('/privacy')}>{L(TXT.privacyLink)}</Link>.
      </p>
      <button type="submit" className={styles.submit} disabled={sending}>
        {sending ? L(TXT.sending) : L(TXT.submit)}
      </button>
      {error && (
        <p role="alert" className={styles.error}>
          {error}
        </p>
      )}
    </form>
  );
}
