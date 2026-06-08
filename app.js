/* ============================================================
   app.js — shell: topbar, home, setup, results, navegación
============================================================ */
(function () {
  const TEMAS = window.BIENES_TEMAS;

  const App = window.App = {
    screen: "home",
    setup: { mode: "quiz", topics: TEMAS.map(t => t.id), length: 12 },

    init() {
      Store.load();
      SFX.setMuted(Store.data.muted);
      // restore theme before building UI
      if (Store.data.theme === "light") {
        this._isLight = true;
        document.documentElement.setAttribute("data-theme", "light");
      }
      this.buildTopbar();
      this.renderHome();
      this.go("home");
      this.refreshTopbar();
      if (Store.data.music) { /* requiere gesto; se activará al primer clic */ this._wantMusic = true; }
      document.addEventListener("click", () => {
        if (this._wantMusic && !SFX.isMusicOn()) { SFX.toggleMusic(); this.syncMusicBtn(); }
        this._wantMusic = false;
      }, { once: true });
    },

    go(name) {
      this.screen = name;
      ["home", "setup", "play", "results"].forEach(s =>
        $("#screen-" + s).classList.toggle("hidden", s !== name));
      window.scrollTo({ top: 0, behavior: "instant" });
    },

    /* ---------------- PALETTES ---------------- */
    _isLight: false,

    PALETTES: [
      { id:"default",   name:"Clásico",   a:"#4f9bff", b:"#3ddc97", bg:"#0e0f15", bg2:"#14161f", panel:"#191c28", line:"#2a2f40", lbg:"#f4f6fb", lbg2:"#edf0f8", lpanel:"#ffffff", lline:"#d4dae8" },
      { id:"galaxia",   name:"Galaxia",   a:"#a78bfa", b:"#e879f9", bg:"#0c0b18", bg2:"#13112a", panel:"#1a1730", line:"#302a50", lbg:"#f5f3ff", lbg2:"#ede9fc", lpanel:"#ffffff", lline:"#d4cef4" },
      { id:"atardecer", name:"Atardecer", a:"#fb923c", b:"#f43f5e", bg:"#130e0a", bg2:"#1f1208", panel:"#261a10", line:"#3d2510", lbg:"#fff6f0", lbg2:"#fdeee3", lpanel:"#ffffff", lline:"#f0cebc" },
      { id:"oceano",    name:"Océano",    a:"#22d3ee", b:"#2dd4bf", bg:"#060f18", bg2:"#0c1820", panel:"#10202e", line:"#183248", lbg:"#f0f9fe", lbg2:"#e2f3fc", lpanel:"#ffffff", lline:"#bcdff0" },
      { id:"selva",     name:"Selva",     a:"#84cc16", b:"#10b981", bg:"#080f07", bg2:"#0d1a0c", panel:"#122010", line:"#1e3a1c", lbg:"#f2f9ee", lbg2:"#e4f5df", lpanel:"#ffffff", lline:"#bcddb4" },
      { id:"fuego",     name:"Fuego",     a:"#ef4444", b:"#f59e0b", bg:"#100808", bg2:"#1a0a0a", panel:"#221010", line:"#3a1a1a", lbg:"#fff3f0", lbg2:"#ffe9e4", lpanel:"#ffffff", lline:"#f0c4bc" },
      { id:"sakura",    name:"Sakura",    a:"#f472b6", b:"#818cf8", bg:"#0f0910", bg2:"#1a0f1e", panel:"#231428", line:"#3a2040", lbg:"#fef3ff", lbg2:"#f9ebff", lpanel:"#ffffff", lline:"#e8caf4" },
      { id:"neon",      name:"Neón",      a:"#facc15", b:"#4ade80", bg:"#080808", bg2:"#0e0e10", panel:"#141418", line:"#222228", lbg:"#f8f8f2", lbg2:"#f0f0e6", lpanel:"#ffffff", lline:"#d8d8c8" }
    ],

    applyPalette(id) {
      const pal = this.PALETTES.find(p => p.id === id) || this.PALETTES[0];
      const r = document.documentElement.style;
      const light = this._isLight;
      r.setProperty("--blue",  pal.a);
      r.setProperty("--green", pal.b);
      if (light) {
        r.setProperty("--blue-d",       this._lighten(pal.a));
        r.setProperty("--green-d",      this._lighten(pal.b));
        r.setProperty("--bg",           pal.lbg);
        r.setProperty("--bg-2",         pal.lbg2);
        r.setProperty("--panel",        pal.lpanel);
        r.setProperty("--line",         pal.lline);
        r.setProperty("--line-soft",    pal.lline);
        r.setProperty("--topbar-bg",    "rgba(255,255,255,.88)");
        r.setProperty("--face-back-1",  this._tintBg(pal.a));
        r.setProperty("--face-back-2",  this._tintBg(pal.b));
        r.setProperty("--face-back-txt","#14182a");
      } else {
        r.setProperty("--blue-d",       this._darken(pal.a));
        r.setProperty("--green-d",      this._darken(pal.b));
        r.setProperty("--bg",           pal.bg);
        r.setProperty("--bg-2",         pal.bg2);
        r.setProperty("--panel",        pal.panel);
        r.setProperty("--line",         pal.line);
        r.setProperty("--line-soft",    pal.line);
        r.setProperty("--topbar-bg",    "rgba(14,15,21,.78)");
        r.setProperty("--face-back-1",  "#142033");
        r.setProperty("--face-back-2",  "#0f1826");
        r.setProperty("--face-back-txt","#e7f6ee");
      }
      Store.data.palette = id; Store.save();
      $$(".pal-btn").forEach(b => b.classList.toggle("active", b.dataset.pal === id));
      SFX.click();
    },

    toggleTheme() {
      this._isLight = !this._isLight;
      const light = this._isLight;
      document.documentElement.setAttribute("data-theme", light ? "light" : "dark");
      Store.data.theme = light ? "light" : "dark"; Store.save();
      this.applyPalette(Store.data.palette || "default");
      // update topbar button
      const btn = $("#btn-theme");
      if (btn) { btn.innerHTML = light ? ICON.moon : ICON.sun; btn.classList.toggle("active", light); }
      // update theme row buttons
      $$(".theme-btn").forEach(b => b.classList.toggle("on", b.dataset.th === (light ? "light" : "dark")));
    },

    _darken(hex) {
      const n = parseInt(hex.replace("#",""),16);
      const r = Math.round(((n>>16)&255)*0.25), g = Math.round(((n>>8)&255)*0.25), b = Math.round((n&255)*0.25);
      return `rgb(${r},${g},${b})`;
    },

    _lighten(hex) {
      // light-mode accent bg: mix color with white ~25%
      const n = parseInt(hex.replace("#",""),16);
      const mix = (c) => Math.min(255, Math.round(c * 0.22 + 200));
      return `rgb(${mix((n>>16)&255)},${mix((n>>8)&255)},${mix(n&255)})`;
    },

    _tintBg(hex) {
      // very light tint for card backs
      const n = parseInt(hex.replace("#",""),16);
      const mix = (c) => Math.min(255, Math.round(c * 0.08 + 234));
      return `rgb(${mix((n>>16)&255)},${mix((n>>8)&255)},${mix(n&255)})`;
    },

    /* ---------------- TOPBAR ---------------- */
    buildTopbar() {
      const bar = $("#topbar");
      const light = this._isLight;
      bar.innerHTML = `
        <div class="brand" id="brand">
          <div class="mark">B</div>
          <div class="b-txt"><b>Los Bienes</b><span>Examen de Grado</span></div>
        </div>
        <div class="top-stats">
          <div class="chip pts">${ICON.star}<span id="pts-val">0</span></div>
          <div class="chip streak">${ICON.flame}<span id="best-val">0</span><span class="lbl">&nbsp;récord</span></div>
          <div class="pal-wrap">
            <button class="icon-btn" id="btn-pal" title="Paleta de colores">${ICON.palette}</button>
            <div class="pal-panel" id="pal-panel">
              <h4>Modo</h4>
              <div class="theme-row">
                <button class="theme-btn ${!light ? "on" : ""}" data-th="dark">${ICON.moon} Oscuro</button>
                <button class="theme-btn ${light ? "on" : ""}" data-th="light">${ICON.sun} Claro</button>
              </div>
              <h4>Paleta</h4>
              <div class="pal-grid">${this.PALETTES.map(p=>`
                <button class="pal-btn" data-pal="${p.id}" style="--pal-a:${p.a}">
                  <div class="pal-dots"><span style="background:${p.a}"></span><span style="background:${p.b}"></span></div>
                  ${p.name}
                </button>`).join("")}</div>
            </div>
          </div>
          <button class="icon-btn ${light ? "active" : ""}" id="btn-theme" title="Cambiar modo">${light ? ICON.moon : ICON.sun}</button>
          <button class="icon-btn" id="btn-music" title="Música de fondo">${ICON.music}</button>
          <button class="icon-btn" id="btn-mute" title="Sonido">${ICON.sound}</button>
        </div>`;

      $("#brand").onclick = () => { SFX.click(); this.go("home"); this.renderHome(); };

      // theme toggle
      $("#btn-theme").onclick = () => this.toggleTheme();
      $$(".theme-btn").forEach(b => b.onclick = (e) => {
        e.stopPropagation();
        const wantLight = b.dataset.th === "light";
        if (wantLight !== this._isLight) this.toggleTheme();
      });

      // palette toggle
      const palBtn = $("#btn-pal"), palPanel = $("#pal-panel");
      palBtn.onclick = (e) => { e.stopPropagation(); palPanel.classList.toggle("open"); };
      $$(".pal-btn").forEach(b => b.onclick = (e) => {
        e.stopPropagation();
        this.applyPalette(b.dataset.pal);
        palPanel.classList.remove("open");
      });
      document.addEventListener("click", () => palPanel.classList.remove("open"));

      $("#btn-mute").onclick = () => {
        const m = !SFX.isMuted(); SFX.setMuted(m); Store.data.muted = m; Store.save();
        $("#btn-mute").innerHTML = m ? ICON.mute : ICON.sound;
        if (!m) SFX.click();
      };
      $("#btn-music").onclick = () => {
        const on = SFX.toggleMusic(); Store.data.music = on; Store.save();
        this.syncMusicBtn();
      };
      $("#btn-mute").innerHTML = Store.data.muted ? ICON.mute : ICON.sound;

      // restore saved palette
      if (Store.data.palette && Store.data.palette !== "default") {
        this.applyPalette(Store.data.palette);
      } else {
        const cur = Store.data.palette || "default";
        $$(".pal-btn").forEach(b => b.classList.toggle("active", b.dataset.pal === cur));
      }
    },
    syncMusicBtn() { $("#btn-music").classList.toggle("active", SFX.isMusicOn()); },
    refreshTopbar() {
      $("#pts-val").textContent = Store.data.points;
      $("#best-val").textContent = Store.data.bestStreak;
    },

    /* ---------------- HOME ---------------- */
    renderHome() {
      const root = $("#screen-home");
      const modes = [
        { id: "quiz",   ico: ICON.quiz,  c: "var(--blue)",        name: "Trivia",          desc: "Alternativas A·B·C·D con tiempo, vidas y puntaje. El modo examen por excelencia." },
        { id: "flash",  ico: ICON.cards, c: "var(--green)",       name: "Flashcards",      desc: "Pregunta al frente, respuesta al girar. Autoevalúate: «la sé» o «a repasar»." },
        { id: "vf",     ico: ICON.vf,    c: "var(--gold)",        name: "Verdadero/Falso", desc: "Afirmaciones rápidas contra el reloj. Ideal para afinar los detalles finos." },
        { id: "visual", ico: ICON.eye,   c: "oklch(72% 0.18 295)", name: "Cartas Visuales", desc: "Estudia con las imágenes reales del PDF. Pregunta al frente, respuesta al girar. 10 cartas para comenzar." }
      ];
      const wrongs = Store.countWrongs(), flagged = Store.countFlagged();

      root.innerHTML = `
        <div class="hero">
          <h1>Domina <span class="accent">Los Bienes</span></h1>
          <p>Tu juego de estudio para el Examen de Grado. Conceptos, las 14 clasificaciones, teorías de autores y el paralelo derechos reales vs. personales.</p>
          <p class="src">Resumen · Prof. Juan Andrés Orrego Acuña · Derecho Civil</p>
        </div>

        <div class="modes">
          ${modes.map(m => `
            <button class="mode-card" data-mode="${m.id}" style="--mc:${m.c}">
              <div class="mc-ico">${m.ico}</div>
              <h3>${m.name}</h3>
              <p>${m.desc}</p>
              <span class="go">Jugar ${ICON.arrow}</span>
            </button>`).join("")}
        </div>

        <div class="section-h"><h2>Tu dominio por tema</h2><span class="hint">${BANK.length} cartas en total</span></div>
        <div class="topics" id="topics"></div>

        <div class="section-h"><h2>Repaso inteligente</h2><span class="hint">refuerza tus puntos débiles</span></div>
        <div class="start-row">
          <button class="btn ${wrongs ? "green" : ""}" id="deck-wrong" ${wrongs ? "" : "disabled"}>
            ${ICON.rotate} Repasar mis errores <b style="font-family:var(--ff-mono);margin-left:2px">(${wrongs})</b>
          </button>
          <button class="btn" id="deck-flag" ${flagged ? "" : "disabled"}>
            ${ICON.flag} Cartas marcadas <b style="font-family:var(--ff-mono);margin-left:2px">(${flagged})</b>
          </button>
          <button class="btn ghost sm" id="reset">${ICON.rotate} Reiniciar progreso</button>
        </div>
      `;

      // topic mastery cards
      const tw = $("#topics");
      TEMAS.forEach(t => {
        const pct = Store.masteryPct(t.id);
        const n = countCards("all", [t.id]);
        const c = el("button", "topic");
        c.style.setProperty("--th", `oklch(72% 0.16 ${t.hue})`);
        c.innerHTML = `
          <div class="t-top">
            <span class="dot"></span>
            <span class="t-name">${t.nombre}</span>
            <span class="t-count">${n} cartas</span>
          </div>
          <div class="bar"><i style="width:${pct}%"></i></div>
          <span class="t-pct">${pct}% dominado</span>`;
        c.onclick = () => { SFX.click(); this.openSetup("quiz", [t.id]); };
        tw.appendChild(c);
      });

      $$("#screen-home .mode-card").forEach(b => b.onclick = () => {
        SFX.click();
        if (b.dataset.mode === "visual") { window.location.href = "Flashcards Visuales.html"; return; }
        this.openSetup(b.dataset.mode);
      });
      if (wrongs) $("#deck-wrong").onclick = () => { SFX.click(); Game.start({ source: "wrong", mode: "quiz", topics: [], length: 0 }); };
      if (flagged) $("#deck-flag").onclick = () => { SFX.click(); Game.start({ source: "flagged", mode: "quiz", topics: [], length: 0 }); };
      $("#reset").onclick = () => {
        if (confirm("¿Reiniciar todo tu progreso, puntaje y cartas marcadas?")) {
          localStorage.removeItem(Store.KEY); Store.load(); SFX.setMuted(Store.data.muted);
          this.refreshTopbar(); this.renderHome();
        }
      };
    },

    /* ---------------- SETUP ---------------- */
    openSetup(mode, topics) {
      this.setup.mode = mode;
      if (topics) this.setup.topics = topics.slice();
      if (!this.setup.topics || !this.setup.topics.length) this.setup.topics = TEMAS.map(t => t.id);
      this.go("setup");
      this.renderSetup();
    },

    renderSetup() {
      const su = this.setup;
      const modeName = { quiz: "Trivia", flash: "Flashcards", vf: "Verdadero / Falso" }[su.mode];
      const modeDesc = {
        quiz: "Responde alternativas contra el reloj. Pierdes una vida por error o si se acaba el tiempo.",
        flash: "Gira cada carta y autoevalúate. Sin vidas ni reloj: estudia a tu ritmo.",
        vf: "Afirmaciones rápidas: ¿verdadero o falso? Reloj corto y vidas en juego."
      }[su.mode];
      const lengths = [8, 12, 20, 0];
      const root = $("#screen-setup");
      root.innerHTML = `
        <div class="setup-wrap">
          <button class="back-link" id="su-back">${ICON.back} Volver</button>
          <div class="setup-card">
            <h2>${modeName}</h2>
            <p class="sub">${modeDesc}</p>

            <div class="field">
              <label>Modo de juego</label>
              <div class="pick-row" id="mode-pick">
                ${["quiz","flash","vf"].map(m => `<button class="pick ${m===su.mode?"on":""}" data-m="${m}">${({quiz:"Trivia",flash:"Flashcards",vf:"Verdadero / Falso"})[m]}</button>`).join("")}
              </div>
            </div>

            <div class="field">
              <label>Temas a estudiar</label>
              <div class="pick-row" style="margin-bottom:10px">
                <button class="pick" id="all-on">Todos</button>
                <button class="pick" id="all-off">Ninguno</button>
              </div>
              <div class="topic-pick" id="topic-pick">
                ${TEMAS.map(t => `
                  <button class="pick ${su.topics.includes(t.id)?"on":""}" data-t="${t.id}" style="--th:oklch(72% 0.16 ${t.hue})">
                    <span class="dot"></span>${t.nombre}
                  </button>`).join("")}
              </div>
            </div>

            <div class="field">
              <label>Número de cartas</label>
              <div class="pick-row" id="len-pick">
                ${lengths.map(l => `<button class="pick ${l===su.length?"on":""}" data-l="${l}">${l===0?"Todas":l}</button>`).join("")}
              </div>
            </div>

            <div class="setup-go">
              <button class="btn primary" id="su-start">${ICON.zap} Comenzar</button>
              <span class="count" id="su-count"></span>
            </div>
          </div>
        </div>`;

      $("#su-back").onclick = () => { SFX.click(); this.go("home"); this.renderHome(); };
      $$("#mode-pick .pick").forEach(b => b.onclick = () => { SFX.click(); su.mode = b.dataset.m; this.renderSetup(); });
      $$("#topic-pick .pick").forEach(b => b.onclick = () => {
        SFX.click();
        const id = b.dataset.t;
        if (su.topics.includes(id)) su.topics = su.topics.filter(x => x !== id);
        else su.topics.push(id);
        b.classList.toggle("on");
        this.updateCount();
      });
      $("#all-on").onclick = () => { SFX.click(); su.topics = TEMAS.map(t => t.id); this.renderSetup(); };
      $("#all-off").onclick = () => { SFX.click(); su.topics = []; this.renderSetup(); };
      $$("#len-pick .pick").forEach(b => b.onclick = () => {
        SFX.click(); su.length = +b.dataset.l;
        $$("#len-pick .pick").forEach(x => x.classList.remove("on")); b.classList.add("on");
        this.updateCount();
      });
      $("#su-start").onclick = () => {
        if (!su.topics.length) { this.toast("Elige al menos un tema", "lvl"); return; }
        const avail = countCards(su.mode, su.topics);
        if (!avail) { this.toast("No hay cartas para esa combinación", "lvl"); return; }
        SFX.click();
        Game.start({ source: "normal", mode: su.mode, topics: su.topics.slice(), length: su.length });
      };
      this.updateCount();
    },

    updateCount() {
      const su = this.setup;
      const avail = countCards(su.mode, su.topics);
      const n = su.length === 0 ? avail : Math.min(su.length, avail);
      const c = $("#su-count");
      if (c) c.textContent = `${n} carta${n === 1 ? "" : "s"} en esta partida · ${avail} disponibles`;
      const start = $("#su-start"); if (start) start.disabled = !su.topics.length || !avail;
    },

    /* ---------------- RESULTS ---------------- */
    renderResults(s, outOfLives) {
      const total = s.correct + s.wrong;
      const acc = total ? Math.round((s.correct / total) * 100) : 0;
      let title, sub, win = false;
      if (outOfLives) { title = "¡Sin vidas!"; sub = "Se acabaron los corazones. Vuelve a intentarlo, vas a mejorar."; }
      else if (acc >= 85) { title = "¡Dominado!"; sub = "Nivel examen de grado. Excelente trabajo."; win = true; }
      else if (acc >= 60) { title = "¡Buen avance!"; sub = "Vas bien. Repasa lo que fallaste para pulir los detalles."; win = true; }
      else { title = "A seguir estudiando"; sub = "Cada error es una carta menos que fallarás en el examen."; }

      const root = $("#screen-results");
      const wrongsNow = Store.countWrongs();
      root.innerHTML = `
        <div class="result-card">
          <div class="medal">${win ? ICON.trophy : ICON.book}</div>
          <h2>${title}</h2>
          <p class="r-sub">${sub}</p>
          <div class="r-stats">
            <div class="r-stat good"><b>${s.correct}</b><span>Aciertos</span></div>
            <div class="r-stat bad"><b>${s.wrong}</b><span>Errores</span></div>
            <div class="r-stat pts"><b>+${s.earned}</b><span>Puntos</span></div>
          </div>
          <div class="r-stats" style="margin-top:-12px">
            <div class="r-stat"><b>${acc}%</b><span>Precisión</span></div>
            <div class="r-stat"><b>${s.bestRun}</b><span>Mejor racha</span></div>
            <div class="r-stat"><b>${Store.data.points}</b><span>Total puntos</span></div>
          </div>
          <div class="r-actions">
            <button class="btn primary" id="r-again">${ICON.rotate} Otra ronda</button>
            ${wrongsNow ? `<button class="btn green" id="r-wrong">${ICON.zap} Repasar errores (${wrongsNow})</button>` : ""}
            <button class="btn ghost" id="r-home">${ICON.home} Inicio</button>
          </div>
          <p class="r-note">Tu progreso se guarda automáticamente en este dispositivo.</p>
        </div>`;

      if (win && !outOfLives && acc >= 60) { SFX.fanfare(); this.confetti(); }
      else SFX.click();

      $("#r-again").onclick = () => {
        SFX.click();
        if (s.source === "normal") Game.start({ source: "normal", mode: s.mode, topics: s.topics, length: this.setup.length });
        else Game.start({ source: s.source, mode: "quiz", topics: [], length: 0 });
      };
      $("#r-home").onclick = () => { SFX.click(); this.go("home"); this.renderHome(); };
      if (wrongsNow) $("#r-wrong").onclick = () => { SFX.click(); Game.start({ source: "wrong", mode: "quiz", topics: [], length: 0 }); };
    },

    /* ---------------- toast + confetti ---------------- */
    toast(msg, cls) {
      let w = $(".toast-wrap"); if (!w) { w = el("div", "toast-wrap"); document.body.appendChild(w); }
      const t = el("div", "toast " + (cls || ""), `${cls === "lvl" ? ICON.flame : ""}${msg}`);
      w.appendChild(t);
      setTimeout(() => { t.style.opacity = "0"; t.style.transform = "translateY(10px)"; setTimeout(() => t.remove(), 300); }, 1900);
    },
    confetti() {
      const c = el("div", "confetti");
      const colors = ["#4f9bff", "#3ddc97", "#ffce5a", "#ff6b7d", "#a78bfa"];
      for (let i = 0; i < 90; i++) {
        const p = document.createElement("i");
        p.style.left = Math.random() * 100 + "vw";
        p.style.background = colors[(Math.random() * colors.length) | 0];
        p.style.animationDuration = (2.4 + Math.random() * 2) + "s";
        p.style.animationDelay = (Math.random() * 0.5) + "s";
        p.style.transform = `rotate(${Math.random() * 360}deg)`;
        c.appendChild(p);
      }
      document.body.appendChild(c);
      setTimeout(() => c.remove(), 5000);
    }
  };

  window.addEventListener("DOMContentLoaded", () => App.init());
})();
