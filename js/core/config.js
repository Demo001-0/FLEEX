/* js/core/config.js — Store config and money formatting */
const BRAND = { name: "Fleex Wear", phone: "01111051527", phoneIntl: "+201111051527", address: "القرين، شرقية – شارع الجلاء" };
const FREE_SHIPPING = 2000;
const fmt = n => Number(n).toLocaleString("en-US", { minimumFractionDigits: 2 }) + " EGP";
