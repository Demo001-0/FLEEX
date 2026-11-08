/* js/pages/info.js — page logic for info.html (defines window.pageInit) */
const PAGES = {
  about: { t:"About Us", h:`<p>Fleex Wear is a clothing brand from Al-Qurein, Sharqia, built around everyday streetwear: oversized tees, heavyweight hoodies, relaxed pants and the pieces that go with them.</p><p>We focus on comfortable fits, quality fabrics and clean details, so every piece feels good and keeps its shape wash after wash.</p><p>Visit us in store or order online and we'll bring it to your door.</p>` },
  policy: { t:"Our Policy", h:`<h2>Shipping</h2><p>Free shipping on orders over 2,000 EGP. Orders are delivered within 2–5 working days.</p><h2>Returns &amp; exchanges</h2><p>Unworn items with their tags can be exchanged for another size or returned within 14 days. <b>All discounted items are non-returnable.</b></p><h2>Payment</h2><p>Cash on delivery is available.</p>` },
  contact: { t:"Contact", h:`<ul class="contact-list"><li><span class="f-ico">${icons.pin}</span><span dir="rtl">${BRAND.address}</span></li><li><span class="f-ico">${icons.phone}</span><a href="tel:${BRAND.phoneIntl}" dir="ltr">${BRAND.phone}</a></li></ul><p>Questions about an order, a size or a product? Send us a message or call us.</p><form class="contact-form" id="cf"><input required placeholder="Name"><input type="email" required placeholder="Email"><input placeholder="Phone"><textarea rows="5" required placeholder="Message"></textarea><button class="btn solid">Send</button></form>` }
};
window.pageInit = () => {
  const k = new URLSearchParams(location.search).get("p");
  const d = PAGES[k] || PAGES.about;
  document.title = d.t + " – Fleex Wear";
  document.getElementById("content").innerHTML = `<h1 class="section-title" style="text-align:left">${d.t}</h1>${d.h}`;
  const cf = document.getElementById("cf");
  if (cf) cf.onsubmit = e => { e.preventDefault(); cf.reset(); toast("Message sent!"); };
};
