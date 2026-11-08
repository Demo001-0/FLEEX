/* js/features/advanced-ui.js — Advanced UI layer (loaded last by bootstrap.js)
   Quick view · wishlist · scroll progress · back-to-top · image shimmer ·
   product zoom + accordions + sticky add-to-cart · shop quick filters + density toggle */
(() => {
  const $ = (s, r = document) => r.querySelector(s), $$ = (s, r = document) => [...r.querySelectorAll(s)];
  const heartSvg = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 20.5S4.5 15.9 2.8 11.2C1.7 8 3.4 5 6.6 5c2 0 3.5 1.1 5.4 3.2C13.9 6.1 15.4 5 17.4 5c3.2 0 4.9 3 3.8 6.2-1.7 4.7-9.2 9.3-9.2 9.3z"/></svg>`;
  const eyeSvg = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M2 12s3.600-7 10-7 10 7 10 7-3.600 7-10 7S2 12 2 12z"/><circle cx="12" cy="12" r="3"/></svg>`;

  /* ---------- wishlist state ---------- */
  let wish = [];
  try { wish = JSON.parse(localStorage.getItem("fleex_wish")) || []; } catch (e) {}
  const saveWish = () => { try { localStorage.setItem("fleex_wish", JSON.stringify(wish)); } catch (e) {} paintWish(); };
  function toggleWish(id) {
    const on = wish.includes(id);
    wish = on ? wish.filter(x => x !== id) : [...wish, id];
    saveWish(); toast(on ? "Removed from wishlist" : "Saved to wishlist");
  }
  function paintWish() {
    $$(".wish-btn").forEach(b => { const on = wish.includes(b.dataset.id); b.classList.toggle("on", on); b.setAttribute("aria-pressed", on); });
    const c = $("#wishCount"); if (c) { if (c.textContent !== String(wish.length)) c.textContent = wish.length; c.classList.toggle("show", wish.length > 0); }
  }

  /* ---------- scroll progress + back to top ---------- */
  document.body.insertAdjacentHTML("beforeend", `<div class="scroll-progress" id="scrollProg"></div>
    <button class="to-top" id="toTop" aria-label="Back to top"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M6 14l6-6 6 6"/></svg></button>`);
  const prog = $("#scrollProg"), top = $("#toTop");
  const onScroll = () => {
    const h = document.documentElement, max = h.scrollHeight - h.clientHeight;
    prog.style.transform = `scaleX(${max > 0 ? Math.min(1, h.scrollTop / max) : 0})`;
    top.classList.toggle("show", h.scrollTop > 700);
    const hd = $(".header"); if (hd) hd.classList.toggle("is-scrolled", h.scrollTop > 40);
  };
  addEventListener("scroll", onScroll, { passive: true }); onScroll();
  top.onclick = () => scrollTo({ top: 0, behavior: "smooth" });

  /* ---------- header wishlist button ---------- */
  const actions = $$(".header-actions")[1];
  if (actions) {
    actions.insertAdjacentHTML("afterbegin", `<button class="icon-btn wish-open" id="openWish" aria-label="Wishlist">${heartSvg}<span class="cart-count wish-count" id="wishCount">0</span></button>`);
    $("#openWish").onclick = openWishModal;
  }

  /* ---------- modal (quick view + wishlist) ---------- */
  document.body.insertAdjacentHTML("beforeend", `<div class="qv" id="qv" hidden><div class="qv-back" data-close></div><div class="qv-box" role="dialog" aria-modal="true" id="qvBox"></div></div>`);
  const qv = $("#qv"), box = $("#qvBox");
  let lastFocus = null;
  const closeQv = () => { qv.classList.remove("open"); document.body.classList.remove("qv-lock"); setTimeout(() => { qv.hidden = true; }, 220); lastFocus && lastFocus.focus && lastFocus.focus(); };
  const openQv = html => { lastFocus = document.activeElement; box.innerHTML = `<button class="qv-x" data-close aria-label="Close">×</button>${html}`; qv.hidden = false; requestAnimationFrame(() => qv.classList.add("open")); document.body.classList.add("qv-lock"); };
  qv.addEventListener("click", e => { if (e.target.closest("[data-close]")) closeQv(); });
  document.addEventListener("keydown", e => { if (e.key === "Escape" && !qv.hidden) closeQv(); });

  function openQuickView(id) {
    const p = byId(id); if (!p) return;
    let size = "", qty = 1;
    const sizes = p.type === "cap" ? "" : `<div class="qv-sizes" role="radiogroup" aria-label="Size">${SIZES.map(s => `<button type="button" class="sz" data-s="${s}" role="radio" aria-checked="false">${s}</button>`).join("")}</div>`;
    openQv(`<div class="qv-grid">
      <div class="qv-img">${productVisual(p)}</div>
      <div class="qv-info">
        <span class="qv-cat">${p.cat}</span>
        <h3>${p.name}</h3>
        <div class="price">${p.compare ? `<s>${fmt(p.compare)}</s> ` : ""}${fmt(p.price)}</div>
        <p class="qv-desc" dir="auto">${p.desc}</p>
        ${sizes}
        <div class="qv-row"><div class="qty"><button id="qvMinus" aria-label="Less">−</button><span id="qvQ">1</span><button id="qvPlus" aria-label="More">+</button></div>
          <button class="btn solid qv-add" id="qvAdd" ${p.available ? "" : "disabled"}>${p.available ? "Add to cart" : "Sold out"}</button></div>
        <a class="qv-more" href="product.html?id=${p.id}">View full details →</a>
      </div></div>`);
    $$(".qv-sizes .sz", box).forEach(b => b.onclick = () => { size = b.dataset.s; $$(".qv-sizes .sz", box).forEach(x => { x.classList.toggle("on", x === b); x.setAttribute("aria-checked", x === b); }); $(".qv-sizes", box).classList.remove("need"); });
    $("#qvMinus").onclick = () => $("#qvQ").textContent = qty = Math.max(1, qty - 1);
    $("#qvPlus").onclick = () => $("#qvQ").textContent = ++qty;
    $("#qvAdd").onclick = () => {
      if (sizes && !size) { $(".qv-sizes", box).classList.add("need"); toast("Please choose a size"); return; }
      closeQv(); addToCart(p.id, qty, size);
    };
  }

  function openWishModal() {
    const list = wish.map(byId).filter(Boolean);
    openQv(`<div class="wl"><h3>Your wishlist</h3>${list.length ? `<ul>${list.map(p => `<li><a class="wl-img" href="product.html?id=${p.id}">${productVisual(p)}</a>
      <div><a href="product.html?id=${p.id}"><b>${p.name}</b></a><div class="price">${fmt(p.price)}</div></div>
      <button class="wl-rm" data-rm="${p.id}" aria-label="Remove">×</button></li>`).join("")}</ul>` : `<p class="wl-empty">Nothing saved yet — tap the heart on any piece.</p><a class="btn solid" href="shop.html">Browse the collection</a>`}</div>`);
    $$("[data-rm]", box).forEach(b => b.onclick = () => { wish = wish.filter(x => x !== b.dataset.rm); saveWish(); openWishModal(); });
  }

  /* ---------- decorate product cards (works for cards rendered at any time) ---------- */
  function decorate(root) {
    $$(".card .img", root).forEach(img => {
      if (img.dataset.adv) return; img.dataset.adv = "1";
      const href = img.closest("a.card").getAttribute("href"), id = new URLSearchParams(href.split("?")[1]).get("id");
      img.classList.add("shimmer");
      const el = img.querySelector("img");
      if (el) { const done = () => img.classList.remove("shimmer"); el.complete ? done() : (el.addEventListener("load", done), el.addEventListener("error", done)); } else img.classList.remove("shimmer");
      img.insertAdjacentHTML("beforeend", `<button type="button" class="wish-btn" data-id="${id}" aria-label="Save to wishlist" aria-pressed="false">${heartSvg}</button>
        <button type="button" class="qv-btn" data-id="${id}">${eyeSvg}<span>Quick view</span></button>`);
    });
    paintWish();
  }
  document.addEventListener("click", e => {
    const w = e.target.closest(".wish-btn"), q = e.target.closest(".qv-btn");
    if (w) { e.preventDefault(); e.stopPropagation(); toggleWish(w.dataset.id); }
    else if (q) { e.preventDefault(); e.stopPropagation(); openQuickView(q.dataset.id); }
  }, true);
  new MutationObserver(ms => { if (ms.some(m => [...m.addedNodes].some(n => n.nodeType === 1 && (n.matches(".card") || n.querySelector(".card"))))) decorate(document); }).observe(document.body, { childList: true, subtree: true });
  decorate(document);

  /* ---------- product page: zoom, accordions, sticky buy bar ---------- */
  const gallery = $(".product .gallery");
  if (gallery) {
    gallery.classList.add("zoomable");
    const media = () => gallery.querySelector("img, svg");
    gallery.addEventListener("pointermove", e => {
      if (e.pointerType !== "mouse") return;
      const r = gallery.getBoundingClientRect(), m = media(); if (!m) return;
      m.style.transformOrigin = `${(e.clientX - r.left) / r.width * 100}% ${(e.clientY - r.top) / r.height * 100}%`;
    });
  }
  const desc = $(".product .desc");
  if (desc && !$(".acc")) {
    const items = [["Fabric & fit", "Heavyweight fabrics with a relaxed, true-to-size cut. If you’re between sizes, size up for the signature oversized look."],
      ["Shipping", "Free shipping on orders over 2,000 EGP. Cash on delivery available across Egypt."],
      ["Returns & exchange", "Size exchange within 14 days (unworn, with tags). Discounted items are non-returnable."]];
    desc.insertAdjacentHTML("afterend", `<div class="acc">${items.map(([t, b], i) => `<details ${i === 0 ? "open" : ""}><summary>${t}</summary><p>${b}</p></details>`).join("")}</div>`);
    const ul = $(".product ul"); if (ul) ul.remove();
  }
  const add = $("#add"), priceEl = $(".product .price");
  if (add && priceEl) {
    const h1 = $(".product h1");
    document.body.insertAdjacentHTML("beforeend", `<div class="buybar" id="buybar"><div><b>${h1 ? h1.textContent : ""}</b><span>${priceEl.textContent.trim()}</span></div><button class="btn solid" id="buybarBtn" ${add.disabled ? "disabled" : ""}>${add.textContent}</button></div>`);
    const bar = $("#buybar");
    $("#buybarBtn").onclick = () => add.click();
    new IntersectionObserver(es => bar.classList.toggle("show", !es[0].isIntersecting && es[0].boundingClientRect.top < 0), { threshold: 0 }).observe(add);
  }

  /* ---------- shop: quick category pills + grid density ---------- */
  const toolbar = $(".toolbar"), catList = $("#catList");
  if (toolbar && catList) {
    const cats = [...new Set(PRODUCTS.map(p => p.cat))];
    toolbar.insertAdjacentHTML("beforebegin", `<div class="pills" id="pills"><button class="pill" data-c="">All</button>${cats.map(c => `<button class="pill" data-c="${c}">${c}</button>`).join("")}<span class="pills-sp"></span>
      <div class="density" role="group" aria-label="Grid size"><button data-d="2" aria-label="Large">▦</button><button data-d="4" aria-label="Compact" class="on">▩</button></div></div>`);
    const paint = () => {
      const on = $$("input:checked", catList).map(i => i.value);
      $$(".pill").forEach(p => p.classList.toggle("on", p.dataset.c ? on.length === 1 && on[0] === p.dataset.c : on.length === 0));
    };
    $("#pills").addEventListener("click", e => {
      const p = e.target.closest(".pill"), d = e.target.closest("[data-d]");
      if (p) {
        $$("input", catList).forEach(i => { const want = i.value === p.dataset.c; if (i.checked !== want) { i.checked = want; i.dispatchEvent(new Event("change", { bubbles: true })); } });
        paint();
      }
      if (d) { $("#grid").dataset.density = d.dataset.d; $$("[data-d]").forEach(x => x.classList.toggle("on", x === d)); }
    });
    catList.addEventListener("change", paint); paint();
  }
})();
