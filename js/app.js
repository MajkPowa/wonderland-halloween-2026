/* ============================================================
   WONDERLAND HALLOWEEN 2026 — app.js
   ============================================================
   ⚙️  KONFIGURACE PRO POŘADATELE — před spuštěním vyplňte
   hodnoty níže (Reenio URL, ceny, pixel ID, endpoint na leady).
   Podrobný návod: README.md
   ============================================================ */

const CONFIG = {
  // --- Reenio předprodej (POVINNÉ: nahraďte skutečnou rezervační URL) ---
  reenioUrl: 'https://wonderlandhalloween.reenio.cz/cs/',

  // --- Ceny 1. vlny v Kč (POVINNÉ: nastavte reálné ceny z Reenia) ---
  prices: {
    standard: 690,
    vip: 1290,
    table: 9900, // "od" cena za stůl
  },

  // --- Stav prodeje (VOLITELNÉ, jen pravdivá data z Reenia!) ---
  // null = progress bar se nezobrazí. Číslo 0–100 = kolik % aktuální vlny je prodáno.
  soldPercent: null,
  waveName: { cs: '1. vlna', en: 'Wave 1' },

  // --- Tracking (vyplňte ID → načte se po souhlasu s cookies) ---
  gtmId: '',        // např. 'GTM-XXXXXXX'
  metaPixelId: '',  // např. '1234567890'
  tiktokPixelId: '',// např. 'ABCDEFGHIJ'

  // --- Sběr leadů / VIP poptávek ---
  // Endpoint (Formspree / Make / vlastní API), kam se POSTne JSON {type, email, ...}.
  // Prázdné = fallback na e-mail (otevře poštovního klienta).
  leadEndpoint: '',
  contactEmail: 'info@wonderlandhalloween.cz',

  // --- Odpočet: pátek 30. 10. 2026, otevření 21:00 (CET) ---
  eventDate: '2026-10-30T21:00:00+01:00',
};

/* ============================================================
   I18N — CZ výchozí (v HTML), EN slovník zde
   ============================================================ */
const I18N = {
  en: {
    'nav.tickets': 'Tickets', 'nav.program': 'Program', 'nav.faq': 'FAQ', 'nav.contact': 'Contact',
    'cta.buy': 'Buy tickets', 'cta.program': 'See the program', 'cta.wanna': 'I want in',
    'cta.ticket': 'Buy a ticket', 'cta.join': 'Join them this year',

    'hero.kicker': 'The biggest Halloween in the heart of Europe',
    'hero.date': 'FRI 30 / 10 / 2026', 'hero.venue': 'Lucerna Great Hall, Prague',
    'hero.hook': 'One night, thousands of masks, a spectacular show. This is Prague’s Halloween.',
    'hero.micro': 'Costume is mandatory. Wonderland starts before you even enter.',
    'cd.days': 'days', 'cd.hours': 'hours', 'cd.mins': 'minutes', 'cd.secs': 'seconds',

    'qi.date.l': 'Date', 'qi.date.v': 'Friday 30 / 10 / 2026',
    'qi.place.l': 'Venue', 'qi.place.v': 'Lucerna Great Hall, Prague',
    'qi.dress.l': 'Dress code', 'qi.dress.v': 'Costume mandatory',
    'qi.exp.l': 'Experience', 'qi.exp.v': 'Show · actors · decorations · mask contest · VIP',

    'why.title': 'This is not just another party.<br>This is Wonderland.',
    'why.lead': 'There is one night in Prague the whole year waits for. The Great Hall of Lucerna turns into a dark world of decorations, masks, lights, music, actors and show. Everything else is a compromise.',
    'why.b1': 'The biggest costume Halloween show in Prague',
    'why.b2': 'The legendary Lucerna palace',
    'why.b3': 'Produced since 2010',
    'why.b4': 'Thousands of people in costumes in one place',
    'why.b5': 'A spectacular Halloween show',
    'why.b6': 'Best mask contest',
    'why.b7': 'VIP zones & table service',
    'why.b8': 'Photogenic decorations and themed scenes',

    'tix.title': 'Get your ticket before the price goes up',
    'tix.wave': 'Wave 1 is live now — the lowest price. Until sold out. Then the price rises.',
    'tix.wavenote': 'Wave 1 — lowest price', 'tix.from': 'from',
    'tix.std.tag': 'For those who want to be right in the middle of it.',
    'tix.std.f1': 'Entry to Wonderland Halloween 2026', 'tix.std.f2': 'Access to the Great Hall',
    'tix.std.f3': 'The Halloween show', 'tix.std.f4': 'Entry into the mask contest',
    'tix.std.f5': 'Access to photo points and the program', 'tix.std.cta': 'Buy Standard',
    'tix.vip.badge': 'Most popular', 'tix.vip.tag': 'More comfort, a better view, a premium night.',
    'tix.vip.f1': 'Everything in Standard', 'tix.vip.f2': 'Access to the VIP area',
    'tix.vip.f3': 'Better view of the main stage', 'tix.vip.f4': 'Dedicated bar / faster service',
    'tix.vip.f5': 'Fast-track VIP entry', 'tix.vip.f6': 'VIP atmosphere & decorations',
    'tix.vip.cta': 'Buy VIP',
    'tix.tab.name': 'VIP tables', 'tix.tab.tag': 'For celebrations, companies and groups of friends.',
    'tix.tab.note': 'Limited number of tables',
    'tix.tab.f1': 'Reserved table on the balcony', 'tix.tab.f2': 'Themed decoration',
    'tix.tab.f3': 'Table service', 'tix.tab.f4': 'Premium view of the main stage',
    'tix.tab.f5': 'Perfect for birthdays and company events', 'tix.tab.cta': 'Reserve a table',

    'trust.official': '✓ Official presale', 'trust.secure': '✓ Secure payment',
    'trust.email': '✓ Ticket instantly by e-mail', 'trust.card': '✓ Card payment online',

    'exp.title': 'Enter the world of Wonderland',
    'exp.lead': 'We don’t sell a party. We open a gate to another world — for one night a year.',
    'exp.show.t': 'Show', 'exp.show.d': 'The main night show: music, lights, performance, costumes.',
    'exp.cost.t': 'Costumes', 'exp.cost.d': 'Wonderland is made by people. The better the costume, the stronger the night.',
    'exp.deco.t': 'Decorations', 'exp.deco.d': 'Lucerna as a dark Prague Wonderland: gothic, pumpkins, fire.',
    'exp.act.t': 'Actors & performers', 'exp.act.d': 'Characters that pull you straight into the story.',
    'exp.photo.t': 'Photo points', 'exp.photo.d': 'Spots for strong photos and reels for your stories.',

    'prog.title': 'The night’s program',
    'prog.i1': 'Lucerna opens — enter the Wonderland', 'prog.i2': 'Main show starts',
    'prog.i3': 'Mask contest — finalists picked', 'prog.i4': 'Main show moment',
    'prog.i5': 'Best mask announced', 'prog.i6': 'Afterparty till morning',
    'prog.note': 'The program may shift slightly on site — the show is run by Wonderland.',

    'cont.title': 'Best mask contest',
    'cont.lead': 'The best masks of the night walk the runway in front of the whole Lucerna. The jury scores four things:',
    'cont.c1': 'Originality', 'cont.c2': 'Craft', 'cont.c3': 'Show effect', 'cont.c4': 'Overall impression',
    'cont.cta': 'I’m coming in a mask',

    'cos.title': 'Without a costume it’s not Wonderland',
    'cos.lead': 'Your costume is your ticket into the atmosphere. Demon, angel, vampire, witch, dead bride, movie character, dark elegance — the further you go, the more you’ll enjoy the night.',
    'cos.must.t': 'Costume is mandatory.',
    'cos.must.d': 'We can’t let you into Wonderland without one. Dark elegance with a mask is enough — but come in character.',

    'hist.title': 'Since 2010 we’ve been building Prague’s biggest Halloween',
    'hist.s1': 'editions', 'hist.s2': 'Great Hall capacity', 'hist.s3': 'influencers there',
    'hist.s4n': 'thousands', 'hist.s4': 'of masks every year',

    'ven.title': 'The legendary Lucerna. A dark Halloween in the heart of Prague.',
    'ven.lead': 'The Great Hall of Prague’s Lucerna — balconies, gold, a hundred years of history. A few steps from Wenceslas Square. For one night, it becomes the gate to Wonderland.',
    'ven.metro': 'Metro A/B Můstek · 3 min walk', 'ven.map': 'Show map',

    'vipf.title': 'VIP table reservation',
    'vipf.lead': 'A birthday, a company night or a group of friends? Leave us your contact and we’ll get back with the table offer.',
    'vipf.name': 'Full name', 'vipf.email': 'E-mail', 'vipf.phone': 'Phone',
    'vipf.people': 'Number of people', 'vipf.note': 'Note (occasion, preferred table…)',
    'vipf.cta': 'Request a VIP table',

    'part.title': 'Partners',
    'part.pitch': 'Connect your brand with the night all of Prague talks about. Sampling, LCD branding, VIP experience, 350+ influencers.',
    'part.cta': 'Become a partner',

    'faq.title': 'FAQ',
    'faq.q1': 'Do I need a costume?', 'faq.a1': 'Yes, a costume is mandatory. Wonderland is made of people in masks — and you’ll be one of them. Dark elegance with a mask is enough.',
    'faq.q2': 'When does it start?', 'faq.a2': 'Doors open at 9 PM, the main show starts at 10 PM. Come early — entrance lines get long.',
    'faq.q3': 'Where is it?', 'faq.a3': 'Lucerna Great Hall, Štěpánská 61, Prague 1. A few steps from Wenceslas Square, metro Můstek.',
    'faq.q4': 'Will tickets be sold at the door?', 'faq.a4': 'Only if not sold out. Buying online is cheaper and gets you in faster. Past editions sold out.',
    'faq.q5': 'Can I reserve a VIP table?', 'faq.a5': 'Yes — VIP tables on the balcony with service and a view of the stage are perfect for groups, celebrations and companies. Reserve via the form above.',
    'faq.q6': 'Is there a mask contest?', 'faq.a6': 'Yes. Finalists are picked during the night, the best mask is announced at 1:30 AM on the main stage.',
    'faq.q7': 'Is it suitable for companies?', 'faq.a7': 'Yes — VIP tables, group tickets and branding. Write to the partner contact in the footer.',

    'lead.title': 'Not buying now? Don’t miss the next wave.',
    'lead.lead': 'Leave your e-mail and we’ll let you know when the next ticket wave or the lineup drops.',
    'lead.ph': 'Your e-mail', 'lead.cta': 'Keep me posted',
    'lead.gdpr': 'By submitting you agree to receive event news by e-mail. Unsubscribe anytime.',

    'foot.claim': 'The biggest costume Halloween show in Prague. 30 / 10 / 2026, Lucerna Great Hall.',
    'foot.org': 'Organizer', 'foot.legal': 'Legal',
    'foot.terms': 'Terms & Conditions', 'foot.privacy': 'Privacy Policy (GDPR)', 'foot.cookies': 'Cookie settings',

    'exit.title': 'Before you go…',
    'exit.text': 'Wave 1 with the lowest price is still on. Once it sells out, the price goes up — and never comes back down.',
    'exit.cta': 'Buy before it rises',

    'cook.text': 'We use cookies to measure traffic and for marketing. They help us improve the site.',
    'cook.accept': 'Accept all', 'cook.deny': 'Only necessary',
  }
};

/* ============================================================
   HELPERS
   ============================================================ */
const $ = (sel, root = document) => root.querySelector(sel);
const $$ = (sel, root = document) => [...root.querySelectorAll(sel)];

/* Store CZ originals so we can switch back from EN */
const czCache = new Map();

function setLang(lang) {
  document.documentElement.lang = lang;
  localStorage.setItem('wl_lang', lang);
  $$('[data-i18n]').forEach(el => {
    const key = el.dataset.i18n;
    if (!czCache.has(el)) czCache.set(el, el.innerHTML);
    if (lang === 'en' && I18N.en[key] !== undefined) el.innerHTML = I18N.en[key];
    else if (lang === 'cs') el.innerHTML = czCache.get(el);
  });
  $$('[data-i18n-attr]').forEach(el => {
    const [attr, key] = el.dataset.i18nAttr.split(':');
    const cacheKey = 'cz_attr_' + attr;
    if (!el.dataset[cacheKey]) el.dataset[cacheKey] = el.getAttribute(attr);
    if (lang === 'en' && I18N.en[key] !== undefined) el.setAttribute(attr, I18N.en[key]);
    else if (lang === 'cs') el.setAttribute(attr, el.dataset[cacheKey]);
  });
  $$('.lang-switch').forEach(b => { if (b.id !== 'langSwitchMobile') b.textContent = lang === 'cs' ? 'EN' : 'CZ'; });
}

function currentLang() { return localStorage.getItem('wl_lang') || 'cs'; }

/* ============================================================
   UTM CAPTURE + REENIO URL
   ============================================================ */
(function captureUtm() {
  const params = new URLSearchParams(location.search);
  const keep = {};
  for (const [k, v] of params) {
    if (/^utm_/i.test(k) || ['fbclid', 'ttclid', 'gclid'].includes(k)) keep[k] = v;
  }
  if (Object.keys(keep).length) sessionStorage.setItem('wl_utm', JSON.stringify(keep));
})();

function buildReenioUrl(tier) {
  const url = new URL(CONFIG.reenioUrl);
  const stored = sessionStorage.getItem('wl_utm');
  if (stored) {
    const utm = JSON.parse(stored);
    for (const k in utm) url.searchParams.set(k, utm[k]);
  }
  if (!url.searchParams.has('utm_source')) url.searchParams.set('utm_source', 'web');
  url.searchParams.set('utm_content', tier || 'cta');
  return url.toString();
}

/* ============================================================
   TRACKING (fires only after cookie consent + configured IDs)
   ============================================================ */
let trackingLoaded = false;

function loadTracking() {
  if (trackingLoaded) return;
  trackingLoaded = true;

  if (CONFIG.gtmId) {
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({ 'gtm.start': Date.now(), event: 'gtm.js' });
    const s = document.createElement('script');
    s.async = true;
    s.src = 'https://www.googletagmanager.com/gtm.js?id=' + CONFIG.gtmId;
    document.head.appendChild(s);
  }

  if (CONFIG.metaPixelId) {
    !(function (f, b, e, v, n, t, s) {
      if (f.fbq) return; n = f.fbq = function () { n.callMethod ? n.callMethod.apply(n, arguments) : n.queue.push(arguments); };
      if (!f._fbq) f._fbq = n; n.push = n; n.loaded = !0; n.version = '2.0'; n.queue = [];
      t = b.createElement(e); t.async = !0; t.src = v; s = b.getElementsByTagName(e)[0]; s.parentNode.insertBefore(t, s);
    })(window, document, 'script', 'https://connect.facebook.net/en_US/fbevents.js');
    fbq('init', CONFIG.metaPixelId);
    fbq('track', 'PageView');
    fbq('track', 'ViewContent', { content_name: 'Wonderland Halloween 2026' });
  }

  if (CONFIG.tiktokPixelId) {
    !(function (w, d, t) {
      w.TiktokAnalyticsObject = t; var ttq = w[t] = w[t] || []; ttq.methods = ['page', 'track', 'identify', 'instances', 'debug', 'on', 'off', 'once', 'ready', 'alias', 'group', 'enableCookie', 'disableCookie'];
      ttq.setAndDefer = function (t, e) { t[e] = function () { t.push([e].concat(Array.prototype.slice.call(arguments, 0))); }; };
      for (var i = 0; i < ttq.methods.length; i++) ttq.setAndDefer(ttq, ttq.methods[i]);
      ttq.load = function (e, n) { var i = 'https://analytics.tiktok.com/i18n/pixel/events.js'; ttq._i = ttq._i || {}; ttq._i[e] = []; ttq._i[e]._u = i; ttq._t = ttq._t || {}; ttq._t[e] = +new Date(); ttq._o = ttq._o || {}; ttq._o[e] = n || {}; var o = document.createElement('script'); o.async = !0; o.src = i + '?sdkid=' + e + '&lib=' + t; var a = document.getElementsByTagName('script')[0]; a.parentNode.insertBefore(o, a); };
      ttq.load(CONFIG.tiktokPixelId);
      ttq.page();
      ttq.track('ViewContent', { content_name: 'Wonderland Halloween 2026' });
    })(window, document, 'ttq');
  }
}

function trackInitiateCheckout(tier) {
  try {
    if (window.fbq) fbq('track', 'InitiateCheckout', { content_category: tier });
    if (window.ttq) ttq.track('InitiateCheckout', { content_category: tier });
    if (window.dataLayer) dataLayer.push({ event: 'begin_checkout', tier });
  } catch (e) { /* tracking must never break checkout */ }
}

/* ============================================================
   COOKIE CONSENT
   ============================================================ */
function initCookies() {
  const banner = $('#cookieBanner');
  const stored = localStorage.getItem('wl_consent');
  if (stored === 'all') loadTracking();
  else if (!stored) banner.hidden = false;

  $('#cookieAccept').addEventListener('click', () => {
    localStorage.setItem('wl_consent', 'all');
    banner.hidden = true;
    loadTracking();
  });
  $('#cookieDeny').addEventListener('click', () => {
    localStorage.setItem('wl_consent', 'necessary');
    banner.hidden = true;
  });
  $('#cookieSettings').addEventListener('click', (e) => {
    e.preventDefault();
    localStorage.removeItem('wl_consent');
    banner.hidden = false;
  });
}

/* ============================================================
   COUNTDOWN
   ============================================================ */
function initCountdown() {
  const target = new Date(CONFIG.eventDate).getTime();
  const el = {
    d: $('#cdDays'), h: $('#cdHours'), m: $('#cdMins'), s: $('#cdSecs'),
  };
  const pad = n => String(n).padStart(2, '0');
  function tick() {
    const diff = target - Date.now();
    if (diff <= 0) {
      el.d.textContent = '0'; el.h.textContent = '00'; el.m.textContent = '00'; el.s.textContent = '00';
      return;
    }
    el.d.textContent = Math.floor(diff / 864e5);
    el.h.textContent = pad(Math.floor(diff / 36e5) % 24);
    el.m.textContent = pad(Math.floor(diff / 6e4) % 60);
    el.s.textContent = pad(Math.floor(diff / 1e3) % 60);
    requestAnimationFrame ? setTimeout(tick, 1000) : setTimeout(tick, 1000);
  }
  tick();
}

/* ============================================================
   PRICES + WAVE PROGRESS
   ============================================================ */
function initPrices() {
  const fmt = new Intl.NumberFormat('cs-CZ');
  $$('[data-price]').forEach(el => {
    const val = CONFIG.prices[el.dataset.price];
    if (val) el.textContent = fmt.format(val);
  });
  if (typeof CONFIG.soldPercent === 'number') {
    const wrap = $('#waveProgress');
    wrap.hidden = false;
    requestAnimationFrame(() => {
      $('#waveFill').style.width = Math.min(100, CONFIG.soldPercent) + '%';
    });
    const lang = currentLang();
    const wave = CONFIG.waveName[lang] || CONFIG.waveName.cs;
    $('#waveLabel').textContent = lang === 'en'
      ? `${wave}: ${CONFIG.soldPercent}% sold`
      : `${wave}: vyprodáno z ${CONFIG.soldPercent} %`;
  }
}

/* ============================================================
   BUY BUTTONS → REENIO
   ============================================================ */
function initBuyButtons() {
  $$('.js-buy').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const tier = btn.dataset.tier || 'cta';
      trackInitiateCheckout(tier);
      sessionStorage.setItem('wl_clicked_buy', '1');
      window.open(buildReenioUrl(tier), '_blank', 'noopener');
    });
  });
  $$('.js-partner-mail').forEach(a => {
    a.addEventListener('click', (e) => {
      e.preventDefault();
      location.href = 'mailto:' + CONFIG.contactEmail + '?subject=' + encodeURIComponent('Wonderland Halloween 2026 — partnerství / kontakt');
    });
  });
}

/* ============================================================
   HERO VIDEO (mobile vs desktop source)
   ============================================================ */
function initHeroVideo() {
  const video = $('#heroVideo');
  const desktop = matchMedia('(min-width: 768px) and (orientation: landscape)').matches || matchMedia('(min-width: 1024px)').matches;
  video.poster = desktop ? 'img/hero-poster-desktop.jpg' : 'img/hero-poster-mobile.jpg';
  const src = document.createElement('source');
  src.src = (desktop ? 'video/hero-desktop.mp4' : 'video/hero-mobile.mp4') + '?v=2';
  src.type = 'video/mp4';
  video.appendChild(src);
  video.load();
  const p = video.play();
  if (p) p.catch(() => { /* autoplay blocked → poster stays */ });
}

/* ============================================================
   EMBERS (hero particles, cheap canvas)
   ============================================================ */
function initEmbers() {
  if (matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  const canvas = $('#embers');
  const ctx = canvas.getContext('2d');
  let w, h, parts = [];
  const N = innerWidth < 700 ? 22 : 42;

  function resize() {
    w = canvas.width = canvas.offsetWidth;
    h = canvas.height = canvas.offsetHeight;
  }
  resize();
  addEventListener('resize', resize);

  function spawn(init) {
    return {
      x: Math.random() * w,
      y: init ? Math.random() * h : h + 8,
      r: 0.6 + Math.random() * 1.8,
      vy: 0.25 + Math.random() * 0.7,
      vx: (Math.random() - 0.5) * 0.35,
      a: 0.15 + Math.random() * 0.5,
      hue: 18 + Math.random() * 22,
      wob: Math.random() * Math.PI * 2,
    };
  }
  for (let i = 0; i < N; i++) parts.push(spawn(true));

  let running = true;
  document.addEventListener('visibilitychange', () => { running = !document.hidden; if (running) loop(); });

  function loop() {
    if (!running) return;
    ctx.clearRect(0, 0, w, h);
    for (let p of parts) {
      p.y -= p.vy;
      p.wob += 0.02;
      p.x += p.vx + Math.sin(p.wob) * 0.18;
      if (p.y < -10) Object.assign(p, spawn(false));
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fillStyle = `hsla(${p.hue}, 95%, 60%, ${p.a})`;
      ctx.shadowColor = `hsla(${p.hue}, 95%, 55%, 0.8)`;
      ctx.shadowBlur = 6;
      ctx.fill();
      ctx.shadowBlur = 0;
    }
    requestAnimationFrame(loop);
  }
  loop();
}

/* ============================================================
   SCROLL: reveal, header state, parallax
   ============================================================ */
function initScrollFx() {
  const io = new IntersectionObserver((entries) => {
    entries.forEach(en => {
      if (en.isIntersecting) { en.target.classList.add('is-visible'); io.unobserve(en.target); }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -4% 0px' });
  $$('.reveal').forEach(el => io.observe(el));

  const header = $('#siteHeader');
  addEventListener('scroll', () => {
    header.classList.toggle('is-scrolled', scrollY > 40);
  }, { passive: true });
}

/* ============================================================
   COUNT-UP STATS
   ============================================================ */
function initCountUp() {
  const io = new IntersectionObserver((entries) => {
    entries.forEach(en => {
      if (!en.isIntersecting) return;
      const el = en.target;
      io.unobserve(el);
      const target = parseInt(el.dataset.count, 10);
      const dur = 1400;
      const t0 = performance.now();
      const fmt = new Intl.NumberFormat('cs-CZ');
      function step(t) {
        const k = Math.min(1, (t - t0) / dur);
        el.textContent = fmt.format(Math.round(target * (1 - Math.pow(1 - k, 3))));
        if (k < 1) requestAnimationFrame(step);
      }
      requestAnimationFrame(step);
    });
  }, { threshold: 0.5 });
  $$('[data-count]').forEach(el => io.observe(el));
}

/* ============================================================
   MOBILE MENU
   ============================================================ */
function initMenu() {
  const toggle = $('#menuToggle');
  const menu = $('#mobileMenu');
  function close() { menu.classList.remove('is-open'); toggle.classList.remove('is-open'); toggle.setAttribute('aria-expanded', 'false'); }
  toggle.addEventListener('click', () => {
    const open = menu.classList.toggle('is-open');
    toggle.classList.toggle('is-open', open);
    toggle.setAttribute('aria-expanded', String(open));
  });
  $$('a', menu).forEach(a => a.addEventListener('click', close));
}

/* ============================================================
   EXIT INTENT (desktop, once, unless already clicked buy)
   ============================================================ */
function initExitIntent() {
  if (innerWidth < 1024) return;
  const modal = $('#exitModal');
  function show(e) {
    if (e.clientY > 8) return;
    if (sessionStorage.getItem('wl_exit_shown') || sessionStorage.getItem('wl_clicked_buy')) return;
    sessionStorage.setItem('wl_exit_shown', '1');
    modal.hidden = false;
  }
  document.addEventListener('mouseleave', show);
  $('#exitClose').addEventListener('click', () => { modal.hidden = true; });
  modal.addEventListener('click', (e) => { if (e.target === modal) modal.hidden = true; });
}

/* ============================================================
   LIGHTBOX
   ============================================================ */
function initLightbox() {
  const lb = $('#lightbox');
  const img = $('#lightboxImg');
  $$('.g-item img').forEach(i => {
    i.parentElement.addEventListener('click', () => {
      img.src = i.src.replace(/-(450|600|800)\.webp$/, (m, size) => `-${size * 2 <= 1600 ? size * 2 : size}.webp`);
      img.alt = i.alt;
      lb.hidden = false;
    });
  });
  $('#lightboxClose').addEventListener('click', () => { lb.hidden = true; img.src = ''; });
  lb.addEventListener('click', (e) => { if (e.target === lb) { lb.hidden = true; img.src = ''; } });
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape') { lb.hidden = true; $('#exitModal').hidden = true; } });
}

/* ============================================================
   MAP (click-to-load — GDPR friendly)
   ============================================================ */
function initMap() {
  $('#loadMap').addEventListener('click', function () {
    const wrap = $('#mapWrap');
    wrap.innerHTML = '<iframe title="Mapa — Lucerna, Štěpánská 61, Praha 1" src="https://www.google.com/maps?q=Lucerna%20Velk%C3%BD%20s%C3%A1l%2C%20%C5%A0t%C4%9Bp%C3%A1nsk%C3%A1%2061%2C%20Praha%201&output=embed" loading="lazy" referrerpolicy="no-referrer-when-downgrade" allowfullscreen></iframe>';
    wrap.hidden = false;
    this.hidden = true;
  });
}

/* ============================================================
   FORMS (lead + VIP table)
   ============================================================ */
async function submitLead(type, data, statusEl, form) {
  const lang = currentLang();
  const msgs = {
    ok: lang === 'en' ? 'Done! We’ll be in touch. 🎃' : 'Hotovo! Ozveme se ti. 🎃',
    err: lang === 'en' ? 'Something failed — write to us at ' : 'Něco se nepovedlo — napiš nám na ',
  };
  if (CONFIG.leadEndpoint) {
    try {
      const res = await fetch(CONFIG.leadEndpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ type, ...data, lang, page: location.href }),
      });
      if (!res.ok) throw new Error(res.status);
      statusEl.textContent = msgs.ok;
      form.reset();
      if (window.fbq) fbq('track', 'Lead');
      if (window.ttq) ttq.track('SubmitForm');
    } catch (e) {
      statusEl.textContent = msgs.err + CONFIG.contactEmail;
    }
  } else {
    // Fallback: open mail client with prefilled request
    const body = Object.entries(data).map(([k, v]) => `${k}: ${v}`).join('\n');
    const subject = type === 'vip-table' ? 'Poptávka VIP stolu — Wonderland Halloween 2026' : 'Hlídání vstupenek — Wonderland Halloween 2026';
    location.href = `mailto:${CONFIG.contactEmail}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    statusEl.textContent = msgs.ok;
  }
}

function initForms() {
  $('#leadForm').addEventListener('submit', (e) => {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(e.target));
    submitLead('newsletter', data, $('#leadFormStatus'), e.target);
  });
  $('#vipForm').addEventListener('submit', (e) => {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(e.target));
    submitLead('vip-table', data, $('#vipFormStatus'), e.target);
  });
}

/* ============================================================
   INIT
   ============================================================ */
document.addEventListener('DOMContentLoaded', () => {
  const lang = currentLang();
  if (lang !== 'cs') setLang(lang);
  $('#langSwitch').addEventListener('click', () => setLang(currentLang() === 'cs' ? 'en' : 'cs'));
  $('#langSwitchMobile').addEventListener('click', () => setLang(currentLang() === 'cs' ? 'en' : 'cs'));

  initHeroVideo();
  initCountdown();
  initPrices();
  initBuyButtons();
  initScrollFx();
  initCountUp();
  initMenu();
  initEmbers();
  initExitIntent();
  initLightbox();
  initMap();
  initForms();
  initCookies();
});
