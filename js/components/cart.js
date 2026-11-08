/* js/components/cart.js — Cart actions and drawer rendering */
function addToCart(id, qty=1, size=""){
  const l = cart.find(i=>i.id===id && (i.size||"")===size);
  l ? l.qty += qty : cart.push({id, size, qty});
  saveCart(); openCart();
}
function changeQty(key, d){
  const l = cart.find(i=>lineKey(i)===key); if(!l) return;
  l.qty += d; if(l.qty<=0) cart = cart.filter(i=>lineKey(i)!==key);
  saveCart();
}
function removeLine(key){cart = cart.filter(i=>lineKey(i)!==key); saveCart()}

function renderCart(){
  const count = cart.reduce((s,i)=>s+i.qty,0);
  const total = cart.reduce((s,i)=>s+byId(i.id).price*i.qty,0);
  document.getElementById("cartCount").textContent = count;
  const body = document.getElementById("cartBody"), foot = document.getElementById("cartFoot");
  if(!cart.length){ body.innerHTML = `<p style="text-align:center;padding:50px 0">Your cart is empty</p><a class="btn solid full" href="shop.html">Continue shopping</a>`; foot.innerHTML=""; return; }
  const left = FREE_SHIPPING - total;
  body.innerHTML = `<div class="progress">${left>0?`Add <b>${fmt(left)}</b> more for free shipping`:`You've got free shipping!`}<div class="track"><div class="fill" style="width:${Math.min(100,total/FREE_SHIPPING*100)}%"></div></div></div>` +
    cart.map(i=>{const p=byId(i.id), k=lineKey(i);return `<div class="line">
      <a class="thumb" href="product.html?id=${p.id}">${productVisual(p)}</a>
      <div><h4>${p.name}</h4>${i.size?`<div class="size-tag">Size: ${i.size}</div>`:""}<div class="price" style="font-size:15px">${fmt(p.price)}</div>
        <div class="mini-qty"><button onclick="changeQty('${k}',-1)">−</button><span>${i.qty}</span><button onclick="changeQty('${k}',1)">+</button></div></div>
      <button class="rm" onclick="removeLine('${k}')">Remove</button></div>`}).join("");
  foot.innerHTML = `<div class="subtotal"><span>Subtotal</span><span>${fmt(total)}</span></div><small>Shipping calculated at checkout.</small><button class="btn solid full" id="checkout">Check out</button>`;
  document.getElementById("checkout").onclick = () => alert("Checkout will be connected in the next phase (payment & orders).");
}
