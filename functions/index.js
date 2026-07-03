/**
 * Cloud Functions — Wonderland Halloween 2026
 * Nasazení (vyžaduje Blaze plán): firebase deploy --only functions
 *
 * Web primárně zapisuje formuláře přímo do Firestore (viz firestore.rules).
 * Tento HTTP endpoint je alternativa/rozšíření — např. pro napojení
 * externích nástrojů, serverovou validaci nebo e-mailové notifikace.
 */
const { onRequest } = require('firebase-functions/v2/https');
const { onDocumentCreated } = require('firebase-functions/v2/firestore');
const { initializeApp } = require('firebase-admin/app');
const { getFirestore, FieldValue } = require('firebase-admin/firestore');
const logger = require('firebase-functions/logger');

initializeApp();
const db = getFirestore();

const EMAIL_RE = /.+@.+\..+/;

// HTTP endpoint pro sběr leadů (POST JSON { type, email, ... })
exports.lead = onRequest({ region: 'europe-west1', cors: true }, async (req, res) => {
  if (req.method !== 'POST') { res.status(405).json({ ok: false, error: 'POST only' }); return; }
  try {
    const b = req.body || {};
    if (!EMAIL_RE.test(String(b.email || '')) || String(b.email).length > 200) {
      res.status(400).json({ ok: false, error: 'invalid email' });
      return;
    }
    const isVip = b.type === 'vip-table';
    const doc = {
      email: String(b.email).slice(0, 200),
      lang: b.lang === 'en' ? 'en' : 'cs',
      page: String(b.page || '').slice(0, 500),
      source: 'http-endpoint',
      ts: FieldValue.serverTimestamp(),
    };
    if (isVip) {
      doc.name = String(b.name || '').slice(0, 200);
      doc.phone = String(b.phone || '').slice(0, 40);
      doc.people = String(b.people || '').slice(0, 10);
      doc.note = String(b.note || '').slice(0, 2000);
    } else {
      doc.type = 'newsletter';
    }
    await db.collection(isVip ? 'vipRequests' : 'leads').add(doc);
    res.json({ ok: true });
  } catch (e) {
    logger.error('lead endpoint failed', e);
    res.status(500).json({ ok: false });
  }
});

// Log nových poptávek (místo pro budoucí e-mail notifikaci pořadateli)
exports.onVipRequest = onDocumentCreated(
  { document: 'vipRequests/{id}', region: 'europe-west1' },
  (event) => {
    const d = event.data ? event.data.data() : {};
    logger.info('Nová poptávka VIP stolu', { name: d.name, email: d.email, people: d.people });
  }
);
