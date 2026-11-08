/* js/components/product-visual.js — Product image / garment illustration */
function productSvg(p) {
  const c = p.color;
  const hex = c.replace("#", ""), lum = (parseInt(hex.slice(0,2),16)*.299 + parseInt(hex.slice(2,4),16)*.587 + parseInt(hex.slice(4,6),16)*.114);
  const dark = lum < 110;
  const ink = dark ? "#ffffff" : "#141414";            // print colour that reads on this fabric
  const edge = dark ? "rgba(255,255,255,.14)" : "rgba(0,0,0,.18)";
  const fold = dark ? "rgba(255,255,255,.07)" : "rgba(0,0,0,.07)";
  const rib  = dark ? "rgba(255,255,255,.10)" : "rgba(0,0,0,.12)";
  const id = "f" + p.id.replace(/[^a-z0-9]/gi, "");
  const sh = `fill="url(#${id}s)"`;
  const tag = (x, y, s = 1) => `<text x="${x}" y="${y}" text-anchor="middle" font-family="Outfit,Arial,sans-serif" font-weight="800" font-size="${13*s}" letter-spacing="${1.6*s}" fill="${ink}">FLEEX</text>`;
  const shapes = {
    tee: `<path d="M96 66 L126 54 Q150 78 174 54 L204 66 L264 120 L238 164 L212 144 L212 306 L88 306 L88 144 L62 164 L36 120 Z" fill="${c}" stroke="${edge}" stroke-width="1.2"/>
      <path d="M96 66 L126 54 Q150 78 174 54 L204 66 L264 120 L238 164 L212 144 L212 306 L88 306 L88 144 L62 164 L36 120 Z" ${sh}/>
      <path d="M126 54 Q150 92 174 54" fill="none" stroke="${rib}" stroke-width="7" stroke-linecap="round"/>
      <path d="M88 144 L96 66 M212 144 L204 66" stroke="${fold}" stroke-width="2" fill="none"/>
      <path d="M92 296 H208" stroke="${rib}" stroke-width="3"/>${tag(150, 120)}
      <path d="M128 130 q22 9 44 0" fill="none" stroke="${ink}" stroke-width="2.2" stroke-linecap="round"/>`,
    hoodie: `<path d="M106 96 L194 96 L246 122 L274 286 L240 296 L224 206 L220 316 L80 316 L76 206 L60 296 L26 286 L54 122 Z" fill="${c}" stroke="${edge}" stroke-width="1.2"/>
      <path d="M106 96 L194 96 L246 122 L274 286 L240 296 L224 206 L220 316 L80 316 L76 206 L60 296 L26 286 L54 122 Z" ${sh}/>
      <path d="M104 98 Q100 40 150 36 Q200 40 196 98 Q150 132 104 98Z" fill="${c}" stroke="${edge}" stroke-width="1.2"/>
      <path d="M104 98 Q100 40 150 36 Q200 40 196 98 Q150 132 104 98Z" ${sh}/>
      <path d="M120 92 Q150 56 180 92 Q150 114 120 92Z" fill="rgba(0,0,0,${dark ? .5 : .28})"/>
      ${p.zip ? `<path d="M150 112 V316" stroke="${ink}" stroke-opacity=".55" stroke-width="3" stroke-dasharray="2 3"/><rect x="146" y="112" width="8" height="16" rx="2" fill="${ink}" fill-opacity=".7"/>` :
        `<path d="M138 112 q-2 28 -1 56 M162 112 q2 28 1 56" stroke="${ink}" stroke-opacity=".6" stroke-width="3" stroke-linecap="round" fill="none"/>
         <path d="M108 238 H192 L204 298 H96 Z" fill="none" stroke="${rib}" stroke-width="2.4" stroke-linejoin="round"/>`}
      <path d="M80 306 H220 M76 206 L82 124 M224 206 L218 124" stroke="${rib}" stroke-width="3" fill="none"/>${tag(p.zip ? 118 : 150, p.zip ? 150 : 176, .85)}`,
    jacket: `<path d="M110 66 L190 66 L248 100 L278 290 L242 298 L226 196 L222 318 L78 318 L74 196 L58 298 L22 290 L52 100 Z" fill="${c}" stroke="${edge}" stroke-width="1.2"/>
      <path d="M110 66 L190 66 L248 100 L278 290 L242 298 L226 196 L222 318 L78 318 L74 196 L58 298 L22 290 L52 100 Z" ${sh}/>
      <path d="M110 66 L124 50 H176 L190 66 L150 96Z" fill="${c}" stroke="${edge}" stroke-width="1.2"/>
      <path d="M110 66 L124 50 H176 L190 66 L150 96Z" ${sh}/>
      <path d="M150 96 V318" stroke="${ink}" stroke-opacity=".6" stroke-width="3" stroke-dasharray="2 3"/><rect x="146" y="92" width="8" height="16" rx="2" fill="${ink}" fill-opacity=".75"/>
      <path d="M96 232 H124 M176 232 H204" stroke="${rib}" stroke-width="4" stroke-linecap="round"/>
      <path d="M76 196 L84 112 M224 196 L216 112" stroke="${rib}" stroke-width="3" fill="none"/>${tag(188, 140, .7)}`,
    pants: `<path d="M92 48 H208 L224 338 H160 L150 142 L140 338 H76 Z" fill="${c}" stroke="${edge}" stroke-width="1.2"/>
      <path d="M92 48 H208 L224 338 H160 L150 142 L140 338 H76 Z" ${sh}/>
      <rect x="92" y="48" width="116" height="20" fill="${rib}"/><path d="M130 62 q-3 22 -2 42 M170 62 q3 22 2 42" stroke="${ink}" stroke-opacity=".6" stroke-width="3" stroke-linecap="round" fill="none"/>
      <path d="M150 68 V142" stroke="${fold}" stroke-width="2"/>
      ${p.cargo ? `<rect x="96" y="176" width="36" height="46" rx="3" fill="${fold}" stroke="${rib}" stroke-width="2"/><rect x="168" y="176" width="36" height="46" rx="3" fill="${fold}" stroke="${rib}" stroke-width="2"/>` : ""}
      <path d="M78 322 H138 M162 322 H222" stroke="${rib}" stroke-width="12" stroke-linecap="round"/>
      <path d="M100 96 L92 300 M200 96 L208 300" stroke="${fold}" stroke-width="3" fill="none"/>`,
    cap: `<path d="M66 214 Q64 116 152 112 Q238 116 238 214 Z" fill="${c}" stroke="${edge}" stroke-width="1.2"/>
      <path d="M66 214 Q64 116 152 112 Q238 116 238 214 Z" ${sh}/>
      <path d="M152 112 Q122 160 130 214 M152 112 Q184 160 176 214" fill="none" stroke="${rib}" stroke-width="2.2"/>
      <circle cx="152" cy="112" r="6" fill="${c}" stroke="${edge}"/>
      <path d="M60 214 Q150 202 238 210 Q276 218 282 238 Q164 252 60 232 Z" fill="${c}" stroke="${edge}" stroke-width="1.2"/>
      <path d="M60 214 Q150 202 238 210 Q276 218 282 238 Q164 252 60 232 Z" fill="rgba(0,0,0,.18)"/>
      <path d="M66 218 Q150 208 236 214" fill="none" stroke="${rib}" stroke-width="2"/>${tag(150, 176, .8)}`
  };
  const cap = p.type === "cap";
  return `<svg viewBox="0 0 300 380" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <defs><radialGradient id="${id}g" cx="50%" cy="38%" r="75%"><stop offset="0" stop-color="#fff" stop-opacity=".7"/><stop offset="1" stop-color="${p.bg}"/></radialGradient>
    <linearGradient id="${id}s" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#000" stop-opacity=".16"/><stop offset=".35" stop-color="#fff" stop-opacity=".1"/><stop offset=".65" stop-color="#000" stop-opacity="0"/><stop offset="1" stop-color="#000" stop-opacity=".22"/></linearGradient></defs>
    <rect width="300" height="380" fill="url(#${id}g)"/>
    <ellipse cx="150" cy="${cap ? 276 : 352}" rx="${cap ? 100 : 96}" ry="9" fill="#000" opacity=".12"/>
    <g transform="${cap ? "translate(0,10)" : "translate(0,4)"}">${shapes[p.type]}</g></svg>`;
}

/* real photo if the product has `img`; falls back to the garment illustration if it fails to load */
function productVisual(p) {
  if (!p.img) return productSvg(p);
  return `<img src="${p.img}" alt="${p.name}" loading="lazy" decoding="async" onerror="this.onerror=null;this.outerHTML=productSvg(PRODUCTS.find(x=>x.id==='${p.id}'))">`;
}
