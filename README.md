# Wonderland Halloween 2026 — prodejní web

Jednostránkový prodejní web pro event **Wonderland Halloween 2026** (30. 10. 2026, Lucerna – Velký sál, Praha). Čistý statický web — HTML + CSS + JS, žádný build, žádné závislosti. Stačí nahrát na jakýkoli hosting (ideálně s HTTPS a HTTP/2).

## ⚙️ Co je potřeba nastavit před spuštěním

Veškerá konfigurace je **na začátku souboru `js/app.js`** v objektu `CONFIG`:

| Klíč | Co s ním | Stav |
|---|---|---|
| `reenioUrl` | Skutečná URL Reenio předprodeje (všechna „Koupit" tlačítka vedou sem, UTM parametry se předávají automaticky) | ⚠️ **PLACEHOLDER — nahradit** |
| `prices` | Ceny 1. vlny (Standard / VIP / VIP stůl „od") | ⚠️ **PLACEHOLDER — nastavit reálné ceny z Reenia** |
| `soldPercent` | Stav prodeje vlny v % (zobrazí progress bar). **Používejte jen pravdivá čísla z Reenia.** `null` = bar skrytý | volitelné |
| `gtmId` | Google Tag Manager ID | ⚠️ doplnit |
| `metaPixelId` | Meta Pixel ID | ⚠️ doplnit |
| `tiktokPixelId` | TikTok Pixel ID | ⚠️ doplnit |
| `leadEndpoint` | URL endpointu pro sběr e-mailů a VIP poptávek (Formspree / Make webhook / vlastní API — POSTuje se JSON). Prázdné = fallback na e-mailového klienta | ⚠️ doplnit |
| `contactEmail` | Kontaktní e-mail (nyní `info@wonderlandhalloween.cz` — ověřit, že existuje) | ⚠️ ověřit |

Dále zkontrolujte:

- **Odkazy na sociální sítě** v patičce `index.html` (Instagram/TikTok/Facebook — nyní odhadnuté handly).
- **Právní odkazy** v patičce (Obchodní podmínky, GDPR) — nyní vedou na `#`, doplňte reálné dokumenty.
- **Program večera** v sekci `#program` — časy dle finální produkce.
- **Výhra v soutěži masek** — pokud bude konkrétní cena (např. 40 000 Kč), doplňte ji do sekce `#soutez` (silný tahák).
- **Doména v meta tazích** — OG tagy počítají s `https://wonderlandhalloween.cz/`.

## 📈 Tracking a konverze

- Pixely (Meta, TikTok, GTM) se načítají **až po souhlasu s cookies** (GDPR).
- Eventy: `ViewContent` (načtení), `InitiateCheckout` (klik na Koupit), `Lead` (formulář).
- **`Purchase` event**: nastavte v Reeniu (measurement/GTM na děkovné stránce), web mu předává UTM parametry (`utm_*`, `fbclid`, `ttclid`, `gclid`) v URL.
- Jazyky: CZ výchozí, EN přepínač v hlavičce (uloží se do localStorage).

## 🗂 Struktura

```
web/
├── index.html        # celý one-page web (CZ texty přímo v HTML)
├── css/style.css     # design (mobile-first, tmavý prémiový vzhled)
├── js/app.js         # CONFIG + veškerá logika (odpočet, i18n, pixely, formuláře…)
├── img/              # optimalizované WebP z reálných fotek akce + grafika
├── video/            # hero smyčka (mobil 720×1280, desktop 1280×720, ~3 MB)
├── fonts/            # Cinzel Bold (oficiální font z brand grafiky)
├── og-image.jpg      # náhled pro sdílení (1200×630, správné datum 2026)
└── favicon / ikony
```

## ✅ Naplněná pravidla briefu

- Sticky CTA: spodní lišta (mobil) + tlačítko v hlavičce (desktop), vidět vždy.
- Hero: video smyčka z oficiálního teaseru (bez vypáleného starého data), odpočet, 2 CTA.
- Vstupenky vysoko: 3 tiery s „co je v ceně", VIP zvýrazněný, prokliky do Reenia s UTM.
- Urgence: vlnový banner, volitelný pravdivý progress bar, exit-intent pop-up (desktop).
- Social proof: reálné fotky z ročníků 2010–2025 (kurátorovaný výběr), statistiky, galerie po letech.
- Žádný AI text v obrázcích — veškerý text je HTML/CSS vrstva; OG obrázek složen z oficiálního letteringu + datum vykreslené fontem Cinzel.
- Schema.org Event, OG tagy, lazy-load obrázků, WebP, komprimovaná videa, click-to-load mapa.

## ▶️ Lokální spuštění

Otevřete `index.html` v prohlížeči, nebo:

```
npx serve web
```
