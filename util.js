/* ============================================================
   util.js — helpers compartidos, iconos SVG y estado persistente
============================================================ */
window.$  = (s, r) => (r || document).querySelector(s);
window.$$ = (s, r) => Array.from((r || document).querySelectorAll(s));
window.el = (tag, cls, html) => {
  const e = document.createElement(tag);
  if (cls) e.className = cls;
  if (html != null) e.innerHTML = html;
  return e;
};
window.shuffle = (a) => {
  a = a.slice();
  for (let i = a.length - 1; i > 0; i--) { const j = (Math.random() * (i + 1)) | 0; [a[i], a[j]] = [a[j], a[i]]; }
  return a;
};
window.clamp = (n, lo, hi) => Math.max(lo, Math.min(hi, n));

/* ---------- iconos (Lucide-style, stroke) ---------- */
window.ICON = {
  cards:  '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="5" width="13" height="16" rx="2"/><path d="M8 5V3.5A1.5 1.5 0 0 1 9.5 2h9A1.5 1.5 0 0 1 20 3.5V17a1.5 1.5 0 0 1-1.5 1.5H16"/></svg>',
  quiz:   '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9.1 9a3 3 0 1 1 5 2.2c-.9.8-1.6 1.3-1.9 2.3-.1.4-.2.8-.2 1.5"/><circle cx="12" cy="18" r=".6" fill="currentColor"/><circle cx="12" cy="12" r="10"/></svg>',
  vf:     '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m3 7 3 3 5-6"/><path d="m3 17 3 3 5-6"/><path d="M14 8h7"/><path d="M14 18h7"/></svg>',
  check:  '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6 9 17l-5-5"/></svg>',
  x:      '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M18 6 6 18M6 6l12 12"/></svg>',
  heart:  '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 21s-7.5-4.6-10-9.3C.4 8.4 1.7 4.7 5 4c2-.4 3.7.6 4.7 2 .3.4.6.7.7.7s.4-.3.7-.7C12.3 4.6 14 3.6 16 4c3.3.7 4.6 4.4 3 7.7C19.5 16.4 12 21 12 21z"/></svg>',
  flag:   '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 22V4s1-1 4-1 5 2 8 2 4-1 4-1v11s-1 1-4 1-5-2-8-2-4 1-4 1"/></svg>',
  arrow:  '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14M13 6l6 6-6 6"/></svg>',
  back:   '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M19 12H5M11 18l-6-6 6-6"/></svg>',
  star:   '<svg viewBox="0 0 24 24" fill="currentColor"><path d="m12 2 3 6.3 6.9.9-5 4.8 1.2 6.9L12 17.8 5.9 21l1.2-6.9-5-4.8 6.9-.9z"/></svg>',
  trophy: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M6 9a6 6 0 0 0 12 0V3H6z"/><path d="M6 5H3v2a3 3 0 0 0 3 3M18 5h3v2a3 3 0 0 1-3 3M9 21h6M12 17v4"/></svg>',
  flame:  '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2c1 4-2 5-2 8a2 2 0 0 0 4 0c0-.5 0-1-.2-1.4 1.6 1 2.7 2.8 2.7 4.9a5.3 5.3 0 1 1-10.6 0c0-3.4 3-5 3.5-8 .2-1.2 1.1-2.5 2.6-3.5z"/></svg>',
  sound:  '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M11 5 6 9H2v6h4l5 4z"/><path d="M15.5 8.5a5 5 0 0 1 0 7M19 5a9 9 0 0 1 0 14"/></svg>',
  mute:   '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M11 5 6 9H2v6h4l5 4z"/><path d="m23 9-6 6M17 9l6 6"/></svg>',
  music:  '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 18V5l12-2v13"/><circle cx="6" cy="18" r="3"/><circle cx="18" cy="16" r="3"/></svg>',
  rotate: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 12a9 9 0 1 0 3-6.7L3 8"/><path d="M3 3v5h5"/></svg>',
  eye:    '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7-10-7-10-7z"/><circle cx="12" cy="12" r="3"/></svg>',
  book:   '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20V3H6.5A2.5 2.5 0 0 0 4 5.5z"/></svg>',
  home:   '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m3 10 9-7 9 7v9a2 2 0 0 1-2 2h-4v-6h-6v6H5a2 2 0 0 1-2-2z"/></svg>',
  zap:    '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M13 2 3 14h7l-1 8 10-12h-7z"/></svg>',
  palette:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><circle cx="8" cy="10" r="1.5" fill="currentColor" stroke="none"/><circle cx="12" cy="7.5" r="1.5" fill="currentColor" stroke="none"/><circle cx="16" cy="10" r="1.5" fill="currentColor" stroke="none"/><circle cx="14.5" cy="14.5" r="1.5" fill="currentColor" stroke="none"/><circle cx="9.5" cy="14.5" r="1.5" fill="currentColor" stroke="none"/></svg>',
  sun:    '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41"/></svg>',
  moon:   '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>'
};

/* ---------- estado persistente ---------- */
window.Store = {
  KEY: "bienes_game_v1",
  data: null,
  load() {
    try { this.data = JSON.parse(localStorage.getItem(this.KEY)) || null; } catch (e) { this.data = null; }
    if (!this.data) this.data = {};
    const d = this.data;
    d.points = d.points || 0;
    d.bestStreak = d.bestStreak || 0;
    d.mastery = d.mastery || {};       // temaId -> {seen, correct}
    d.flagged = d.flagged || {};       // cardId -> true
    d.wrongs = d.wrongs || {};         // cardId -> true (para repaso)
    d.muted = d.muted || false;
    d.music = d.music || false;
    return d;
  },
  save() { try { localStorage.setItem(this.KEY, JSON.stringify(this.data)); } catch (e) {} },
  addPoints(n) { this.data.points = Math.max(0, this.data.points + n); this.save(); },
  recordMastery(temaId, ok) {
    const m = this.data.mastery[temaId] || { seen: 0, correct: 0 };
    m.seen++; if (ok) m.correct++;
    this.data.mastery[temaId] = m; this.save();
  },
  masteryPct(temaId) {
    const m = this.data.mastery[temaId];
    if (!m || !m.seen) return 0;
    return Math.round((m.correct / m.seen) * 100);
  },
  flag(id, on) { if (on) this.data.flagged[id] = true; else delete this.data.flagged[id]; this.save(); },
  isFlagged(id) { return !!this.data.flagged[id]; },
  markWrong(id, on) { if (on) this.data.wrongs[id] = true; else delete this.data.wrongs[id]; this.save(); },
  countFlagged() { return Object.keys(this.data.flagged).length; },
  countWrongs() { return Object.keys(this.data.wrongs).length; }
};
