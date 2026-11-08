/* js/components/cart-state.js — Cart state and persistence */
/* cart state: each line is { id, size, qty } */
let cart = [];
try { cart = JSON.parse(localStorage.getItem("fleex_cart")) || []; } catch(e){}
const saveCart = () => { try { localStorage.setItem("fleex_cart", JSON.stringify(cart)); } catch(e){} renderCart(); };
const byId = id => PRODUCTS.find(p => p.id === id);
const lineKey = l => l.id + "|" + (l.size || "");
