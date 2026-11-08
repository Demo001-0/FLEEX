/* js/features/calm.js — Calm layer: reveals, hero spotlight, "Life Inverted" cursor effect,
   mascot eyes, Shop-the-look hotspots, marquee. Loaded by bootstrap.js after the page is built. */
(function () {
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => [...r.querySelectorAll(s)];
  const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ---- 1. scroll reveal (.rv) ---- */
  document.body.classList.add("calm-on");
  const io = new IntersectionObserver(es => es.forEach(e => {
    if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); }
  }), { threshold: 0.15 });
  $$(".rv").forEach(el => io.observe(el));

  /* ---- 2. hero spotlight follows the pointer ---- */
  const hero = $(".hero2");
  if (hero && !reduce) {
    hero.addEventListener("pointermove", e => {
      const r = hero.getBoundingClientRect();
      hero.style.setProperty("--mx", (e.clientX - r.left) + "px");
      hero.style.setProperty("--my", (e.clientY - r.top) + "px");
    });
  }

  /* ---- 3. marquee: duplicate the group so the loop is seamless ---- */
  const track = $(".marq-track");
  if (track) {
    const copy = track.firstElementChild.cloneNode(true);
    copy.setAttribute("aria-hidden", "true");
    track.appendChild(copy);
  }

  /* ---- 4. LIFE INVERTED ---- */
  const stage = $(".inv-stage");
  if (stage) {
    const base = $(".inv-base", stage);
    const flip = base.cloneNode(true);
    flip.className = "inv-layer inv-flip";
    flip.setAttribute("aria-hidden", "true");
    $$("a,button", flip).forEach(el => el.tabIndex = -1);
    stage.appendChild(flip);

    let x = 0, y = 0, r = 0, tx = 0, ty = 0, tr = 0;
    let visible = false, touched = false, raf = null;
    const R = e => (e && e.pointerType === "touch") ? 110 : 160;

    const point = e => {
      const b = stage.getBoundingClientRect();
      tx = e.clientX - b.left; ty = e.clientY - b.top;
    };
    stage.addEventListener("pointermove", e => { touched = true; point(e); tr = R(e); });
    stage.addEventListener("pointerdown", e => { touched = true; point(e); tr = R(e); });
    stage.addEventListener("pointerleave", () => { tr = 0; });
    stage.addEventListener("pointerup", e => { if (e.pointerType === "touch") tr = 0; });
    stage.addEventListener("pointercancel", () => { tr = 0; });

    const tick = t => {
      if (!visible) { raf = null; return; }
      if (!touched && !reduce) {          // idle demo: a circle drifts around until the visitor interacts
        const b = stage.getBoundingClientRect();
        tx = b.width * (.5 + .3 * Math.sin(t / 1600));
        ty = b.height * (.5 + .25 * Math.sin(t / 1150));
        tr = 110;
      }
      x += (tx - x) * .14; y += (ty - y) * .14; r += (tr - r) * .12;
      flip.style.setProperty("--x", x + "px");
      flip.style.setProperty("--y", y + "px");
      flip.style.setProperty("--r", Math.max(0, r) + "px");
      raf = requestAnimationFrame(tick);
    };
    new IntersectionObserver(es => {
      visible = es[0].isIntersecting;
      if (visible && !raf) raf = requestAnimationFrame(tick);
    }, { threshold: 0.1 }).observe(stage);

    /* mascot eyes follow the pointer (both layers read the same CSS variables) */
    const eye = $(".mascot", base);
    let mraf = null, mx = 0, my = 0;
    const look = () => {
      mraf = null;
      if (!eye) return;
      const b = eye.getBoundingClientRect();
      const dx = mx - (b.left + b.width / 2), dy = my - (b.top + b.height * .32);
      const d = Math.hypot(dx, dy) || 1, k = Math.min(d / 200, 1) * 3.2;
      stage.style.setProperty("--px", (dx / d * k).toFixed(2) + "px");
      stage.style.setProperty("--py", (dy / d * k).toFixed(2) + "px");
    };
    if (!reduce) window.addEventListener("pointermove", e => {
      mx = e.clientX; my = e.clientY;
      if (!mraf) mraf = requestAnimationFrame(look);
    }, { passive: true });
  }

  /* ---- 5. SHOP THE LOOK ---- */
  const photo = $("#look");
  if (photo && typeof byId === "function") {
    const pop = $("#hotPop"), list = $("#lookList");
    const hots = $$(".hot", photo);
    const items = hots.map(h => {
      const p = byId(h.dataset.id);
      if (!p) { h.remove(); return null; }
      const li = document.createElement("li");
      li.innerHTML = `<button type="button" data-id="${p.id}"><span>${h.dataset.label || p.name}</span><span>${fmt(p.price)}</span></button>`;
      list.appendChild(li);
      return { h, p, b: li.firstChild };
    }).filter(Boolean);

    const close = () => {
      pop.hidden = true;
      items.forEach(i => { i.h.classList.remove("on"); i.b.classList.remove("on"); });
    };
    const open = id => {
      const it = items.find(i => i.p.id === id); if (!it) return;
      const { p } = it;
      items.forEach(i => { const on = i === it; i.h.classList.toggle("on", on); i.b.classList.toggle("on", on); });
      pop.innerHTML = `<div><h4>${p.name}</h4>
        <div class="price">${p.compare ? `<s>${fmt(p.compare)}</s>` : ""}${fmt(p.price)}</div></div>
        <a class="btn solid" href="product.html?id=${p.id}">View</a>
        <button class="pop-x" type="button" aria-label="Close">×</button>`;
      pop.hidden = false;
      $(".pop-x", pop).onclick = close;
    };
    items.forEach(i => {
      i.h.addEventListener("click", () => i.h.classList.contains("on") ? close() : open(i.p.id));
      i.b.addEventListener("click", () => i.h.classList.contains("on") ? close() : open(i.p.id));
    });
    document.addEventListener("keydown", e => e.key === "Escape" && close());
  }
})();
