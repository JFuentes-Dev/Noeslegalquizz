/* ============================================================
   game.js — banco de cartas + sesión de juego (play screens)
============================================================ */
(function () {
  const TEMAS = window.BIENES_TEMAS;
  const DATA = window.BIENES_DATA;
  const temaById = {};
  TEMAS.forEach(t => temaById[t.id] = t);
  window.temaById = temaById;

  /* ---- banco aplanado con IDs estables ---- */
  const BANK = [];
  TEMAS.forEach(t => {
    const d = DATA[t.id];
    (d.flash || []).forEach((c, i) => BANK.push({ id: `${t.id}.flash.${i}`, tema: t.id, type: "flash", data: c }));
    (d.quiz  || []).forEach((c, i) => BANK.push({ id: `${t.id}.quiz.${i}`,  tema: t.id, type: "quiz",  data: c }));
    (d.vf    || []).forEach((c, i) => BANK.push({ id: `${t.id}.vf.${i}`,    tema: t.id, type: "vf",    data: c }));
  });
  window.BANK = BANK;
  window.cardById = (id) => BANK.find(c => c.id === id);

  window.countCards = (mode, topics) => BANK.filter(c =>
    (mode === "all" || c.type === mode) && (!topics || topics.includes(c.tema))
  ).length;

  /* ===========================================================
     SESIÓN
  =========================================================== */
  const G = window.Game = {
    s: null,
    timerId: null,

    start(opts) {
      // opts: { mode:'flash'|'quiz'|'vf', source:'normal'|'wrong'|'flagged', topics:[], length }
      let pool;
      if (opts.source === "wrong") {
        pool = BANK.filter(c => Store.data.wrongs[c.id]);
      } else if (opts.source === "flagged") {
        pool = BANK.filter(c => Store.data.flagged[c.id]);
      } else {
        pool = BANK.filter(c => c.type === opts.mode && opts.topics.includes(c.tema));
      }
      pool = shuffle(pool);
      const len = opts.length ? Math.min(opts.length, pool.length) : pool.length;
      const queue = pool.slice(0, len);

      const usesLives = opts.source !== "normal" || opts.mode !== "flash";
      this.s = {
        mode: opts.mode, source: opts.source, topics: opts.topics,
        queue, idx: 0, lives: 3, maxLives: 3, useLives: queue.some(c => c.type !== "flash"),
        correct: 0, wrong: 0, earned: 0, streak: 0, bestRun: 0, answered: false
      };
      App.go("play");
      this.render();
    },

    cur() { return this.s.queue[this.s.idx]; },

    render() {
      const s = this.s, card = this.cur();
      const t = temaById[card.tema];
      const root = $("#screen-play");
      root.style.setProperty("--th", `oklch(72% 0.16 ${t.hue})`);

      const livesHtml = s.useLives
        ? `<div class="lives">${Array.from({length: s.maxLives}, (_, i) =>
            `<span class="life ${i >= s.lives ? "lost" : ""}">${ICON.heart}</span>`).join("")}</div>`
        : `<div class="lives"></div>`;

      root.innerHTML = `
        <button class="back-link" id="play-exit">${ICON.back} Salir</button>
        <div class="play-head">
          <div class="ph-topic"><span class="dot"></span>${sourceLabel(s)}</div>
          ${livesHtml}
        </div>
        <div class="progress-track"><i style="width:${(s.idx / s.queue.length) * 100}%"></i></div>
        <div class="qmeta">
          <span>${t.nombre}</span>
          <span>Carta ${s.idx + 1} / ${s.queue.length}</span>
        </div>
        <div id="card-slot"></div>
      `;
      $("#play-exit").onclick = () => { G.stopTimer(); App.go("home"); App.renderHome(); };

      if (card.type === "flash") this.renderFlash(card, t);
      else if (card.type === "quiz") this.renderQuiz(card, t);
      else this.renderVF(card, t);
    },

    /* ---------------- FLASHCARD ---------------- */
    renderFlash(card, t) {
      const slot = $("#card-slot");
      const flagged = Store.isFlagged(card.id);
      slot.innerHTML = `
        <div class="flash-stage">
          <div class="flashcard" id="fcard">
            <div class="face front">
              <div class="tag"><span class="dot"></span>${t.corto} · Pregunta</div>
              <div class="q-body"><p>${card.data.q}</p></div>
              <div class="foot">${ICON.rotate} Toca la carta para ver la respuesta</div>
            </div>
            <div class="face back">
              <div class="tag a-label"><span class="dot"></span>Respuesta</div>
              <div class="q-body"><p>${card.data.a}</p></div>
              <div class="foot">¿La sabías?</div>
            </div>
          </div>
        </div>
        <div class="flash-controls hidden" id="fc-rate">
          <button class="rate-btn bad" data-know="0">${ICON.x} Repasar</button>
          <button class="rate-btn good" data-know="1">${ICON.check} La sé</button>
        </div>
        <div class="q-foot">
          <button class="flag-btn ${flagged ? "on" : ""}" id="flag">${ICON.flag} ${flagged ? "Marcada" : "Marcar difícil"}</button>
        </div>
        <p class="flash-hint" id="fhint"><b>Espacio</b> o clic para girar</p>
      `;
      const fc = $("#fcard");
      let flipped = false;
      const flip = () => {
        flipped = !flipped;
        fc.classList.toggle("flipped", flipped);
        SFX.flip();
        if (flipped) { $("#fc-rate").classList.remove("hidden"); $("#fhint").classList.add("hidden"); }
      };
      fc.onclick = flip;
      this._flip = () => { if (!flipped) flip(); };
      $("#flag").onclick = (e) => { e.stopPropagation(); this.toggleFlag(card, $("#flag"), true); };
      $$("#fc-rate .rate-btn").forEach(b => b.onclick = () => {
        const know = b.dataset.know === "1";
        Store.recordMastery(card.tema, know);
        Store.markWrong(card.id, !know);
        if (know) { this.s.correct++; this.s.earned += 5; Store.addPoints(5); SFX.correct(); this.pop("+5", true); }
        else { this.s.wrong++; SFX.wrong(); }
        App.refreshTopbar();
        setTimeout(() => this.advance(), know ? 520 : 260);
      });
    },

    /* ---------------- QUIZ ---------------- */
    renderQuiz(card, t) {
      const slot = $("#card-slot");
      const flagged = Store.isFlagged(card.id);
      const order = shuffle(card.data.opts.map((o, i) => ({ o, i })));
      slot.innerHTML = `
        <div class="q-card">
          <div class="tag"><span class="dot"></span>${t.corto} · Alternativas ${timerHtml(20)}</div>
          <div class="q-text">${card.data.q}</div>
          <div class="opts" id="opts">
            ${order.map((it, k) => `
              <button class="opt" data-i="${it.i}">
                <span class="key">${"ABCD"[k]}</span>
                <span class="otxt">${it.o}</span>
                <span class="res"></span>
              </button>`).join("")}
          </div>
          <div class="explain" id="explain"></div>
        </div>
        <div class="q-foot">
          <button class="flag-btn ${flagged ? "on" : ""}" id="flag">${ICON.flag} ${flagged ? "Marcada" : "Marcar difícil"}</button>
          <button class="btn primary next-btn hidden" id="next">Siguiente ${ICON.arrow}</button>
        </div>
      `;
      $("#flag").onclick = () => this.toggleFlag(card, $("#flag"));
      this.startTimer(20, () => this.lockQuiz(card, t, -1, null));
      $$("#opts .opt").forEach(btn => btn.onclick = () => {
        const i = +btn.dataset.i;
        this.lockQuiz(card, t, i, btn);
      });
    },

    lockQuiz(card, t, picked, btn) {
      if (this.s.answered) return;
      this.s.answered = true;
      this.stopTimer();
      const correctIdx = card.data.correct;
      const ok = picked === correctIdx;
      const opts = $("#opts"); opts.classList.add("locked");
      $$("#opts .opt").forEach(b => {
        const bi = +b.dataset.i;
        if (bi === correctIdx) { b.classList.add("correct"); $(".res", b).innerHTML = ICON.check; }
        else if (bi === picked) { b.classList.add("wrong"); $(".res", b).innerHTML = ICON.x; }
        else b.classList.add("dim");
      });
      this.resolve(card, ok, picked === -1);
      this.showExplain(ok, card.data.exp);
      this.armNext();
    },

    /* ---------------- VERDADERO / FALSO ---------------- */
    renderVF(card, t) {
      const slot = $("#card-slot");
      const flagged = Store.isFlagged(card.id);
      slot.innerHTML = `
        <div class="q-card">
          <div class="tag"><span class="dot"></span>${t.corto} · Verdadero o Falso ${timerHtml(12)}</div>
          <div class="q-text">${card.data.s}</div>
          <div class="vf-row" id="vfrow">
            <button class="vf-btn v" data-v="1">${ICON.check} Verdadero</button>
            <button class="vf-btn f" data-v="0">${ICON.x} Falso</button>
          </div>
          <div class="explain" id="explain"></div>
        </div>
        <div class="q-foot">
          <button class="flag-btn ${flagged ? "on" : ""}" id="flag">${ICON.flag} ${flagged ? "Marcada" : "Marcar difícil"}</button>
          <button class="btn primary next-btn hidden" id="next">Siguiente ${ICON.arrow}</button>
        </div>
      `;
      $("#flag").onclick = () => this.toggleFlag(card, $("#flag"));
      this.startTimer(12, () => this.lockVF(card, null));
      $$("#vfrow .vf-btn").forEach(b => b.onclick = () => this.lockVF(card, b.dataset.v === "1"));
    },

    lockVF(card, picked) {
      if (this.s.answered) return;
      this.s.answered = true;
      this.stopTimer();
      const row = $("#vfrow"); row.classList.add("locked");
      const ok = picked === card.data.ok;
      $$("#vfrow .vf-btn").forEach(b => {
        const v = b.dataset.v === "1";
        if (picked !== null && v === picked) b.classList.add(ok ? "picked-right" : "picked-wrong");
        if (picked === null && v === card.data.ok) b.classList.add("picked-right");
      });
      this.resolve(card, ok, picked === null);
      this.showExplain(ok, card.data.exp);
      this.armNext();
    },

    /* ---------------- común a quiz/vf ---------------- */
    resolve(card, ok, timedOut) {
      const s = this.s;
      Store.recordMastery(card.tema, ok);
      Store.markWrong(card.id, !ok);
      if (ok) {
        s.correct++; s.streak++; s.bestRun = Math.max(s.bestRun, s.streak);
        const fast = this._remain / this._total > 0.5;
        const pts = 10 + (fast ? 5 : 0) + Math.min(s.streak - 1, 5) * 2;
        s.earned += pts; Store.addPoints(pts);
        if (s.streak >= 2) SFX.streak(); else SFX.correct();
        this.pop("+" + pts, true);
        if (s.streak === 3 || s.streak === 5 || s.streak === 8) App.toast(`¡Racha de ${s.streak}! 🔥`, "lvl");
      } else {
        s.wrong++; s.streak = 0;
        if (timedOut) SFX.timeout(); else SFX.wrong();
        if (s.useLives) { s.lives--; this.pop("−1 vida", false); }
      }
      if (Store.data.bestStreak < s.bestRun) { Store.data.bestStreak = s.bestRun; Store.save(); }
      App.refreshTopbar();
    },

    showExplain(ok, text) {
      const ex = $("#explain");
      ex.className = "explain show " + (ok ? "ok" : "no");
      ex.innerHTML = `<div class="e-head">${ok ? ICON.check + "¡Correcto!" : ICON.x + "Para repasar"}</div><p>${text}</p>`;
    },

    armNext() {
      const nb = $("#next");
      nb.classList.remove("hidden");
      nb.onclick = () => this.advance();
      // si se acabaron las vidas, el botón termina
      if (this.s.useLives && this.s.lives <= 0) {
        nb.innerHTML = `Ver resultados ${ICON.arrow}`;
      }
      this._next = () => this.advance();
    },

    advance() {
      const s = this.s;
      if (s.useLives && s.lives <= 0) return this.finish(true);
      s.idx++; s.answered = false;
      this._next = null; this._flip = null;
      if (s.idx >= s.queue.length) return this.finish(false);
      this.render();
    },

    toggleFlag(card, btn, isFlash) {
      const on = !Store.isFlagged(card.id);
      Store.flag(card.id, on);
      btn.classList.toggle("on", on);
      btn.innerHTML = `${ICON.flag} ${on ? "Marcada" : (isFlash ? "Marcar difícil" : "Marcar difícil")}`;
      SFX.click();
    },

    /* ---------------- timer ---------------- */
    startTimer(secs, onEnd) {
      this._total = secs; this._remain = secs; this._onEnd = onEnd;
      this.updateRing();
      this.timerId = setInterval(() => {
        this._remain -= 0.1;
        if (this._remain <= 5 && Math.abs(this._remain - Math.round(this._remain)) < 0.05 && this._remain > 0.2) SFX.tick();
        if (this._remain <= 0) { this.stopTimer(); onEnd(); return; }
        this.updateRing();
      }, 100);
    },
    updateRing() {
      const ring = $("#tring"); if (!ring) return;
      const C = 2 * Math.PI * 15;
      const frac = clamp(this._remain / this._total, 0, 1);
      const fg = $(".fg", ring.closest(".timer"));
      fg.style.strokeDasharray = C;
      fg.style.strokeDashoffset = C * (1 - frac);
      const num = $(".tnum", ring.closest(".timer"));
      num.textContent = Math.ceil(this._remain);
      ring.closest(".timer").classList.toggle("warn", this._remain <= 5);
    },
    stopTimer() { if (this.timerId) { clearInterval(this.timerId); this.timerId = null; } },

    pop(txt, plus) {
      const p = el("div", "pop " + (plus ? "plus" : "minus"), txt);
      document.body.appendChild(p);
      requestAnimationFrame(() => p.classList.add("go"));
      setTimeout(() => p.remove(), 1050);
    },

    /* ---------------- fin ---------------- */
    finish(outOfLives) {
      this.stopTimer();
      App.renderResults(this.s, outOfLives);
      App.go("results");
    }
  };

  function timerHtml(secs) {
    return `<span class="timer" style="margin-left:auto">
      <svg class="ring" id="tring" viewBox="0 0 34 34"><circle class="bgc" cx="17" cy="17" r="15"/><circle class="fg" cx="17" cy="17" r="15"/></svg>
      <span class="tnum">${secs}</span></span>`;
  }
  function sourceLabel(s) {
    if (s.source === "wrong") return "Repaso de errores";
    if (s.source === "flagged") return "Cartas marcadas";
    return ({ flash: "Flashcards", quiz: "Trivia", vf: "Verdadero / Falso" })[s.mode];
  }

  /* teclado global para play */
  document.addEventListener("keydown", (e) => {
    if (App.screen !== "play") return;
    const card = Game.cur && Game.cur();
    if (!card) return;
    if (e.code === "Space" && card.type === "flash" && Game._flip) { e.preventDefault(); Game._flip(); }
    if (e.code === "Enter" && Game._next) { e.preventDefault(); Game._next(); }
    if (card.type === "quiz" && !Game.s.answered && "1234".includes(e.key)) {
      const b = $$("#opts .opt")[+e.key - 1]; if (b) b.click();
    }
    if (card.type === "vf" && !Game.s.answered) {
      if (e.key.toLowerCase() === "v") { const b = $('.vf-btn.v'); if (b) b.click(); }
      if (e.key.toLowerCase() === "f") { const b = $('.vf-btn.f'); if (b) b.click(); }
    }
  });
})();
