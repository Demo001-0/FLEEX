/* js/core/bootstrap.js — Boot sequence (runs layout, wires UI, loads animations) */
document.addEventListener("DOMContentLoaded", () => {
  layout();
  document.getElementById("openCart").onclick = openCart;
  document.getElementById("closeCart").onclick = closeAll;
  document.getElementById("closeNav").onclick = closeAll;
  document.getElementById("openMenu").onclick = () => {document.getElementById("nav").classList.add("open");document.getElementById("overlay").classList.add("open")};
  document.getElementById("overlay").onclick = closeAll;
  document.addEventListener("keydown", e => e.key==="Escape" && closeAll());
  document.getElementById("newsletter").onsubmit = e => {e.preventDefault(); e.target.reset(); toast("Thanks for subscribing!")};
  initSearch(); renderCart();
  if (window.pageInit) window.pageInit();
  const anim = document.createElement("script"); anim.src = "js/features/animations.js"; document.body.appendChild(anim); // animations
  const calm = document.createElement("script"); calm.src = "js/features/calm.js"; document.body.appendChild(calm); // calm layer
  const thm = document.createElement("script"); thm.src = "js/features/theme.js"; document.body.appendChild(thm); // light/dark toggle (opens in light)
  const adv = document.createElement("script"); adv.src = "js/features/advanced-ui.js"; document.body.appendChild(adv); // advanced UI layer (quick view, wishlist, zoom …)
});
