/* js/data/products.js — Product catalogue (edit here to add / change products)
   Photos come from Unsplash (img). If a photo fails to load, the garment illustration (type + color + bg) is shown instead.
   To use your own photo, set  img: "assets/images/your-photo.jpg".
   Pants photos are product-only Unsplash shots (no people), chosen from Unsplash captions.
   Products WITHOUT img show the built-in garment illustration (no people, never breaks).
   Unsplash photos used here were picked because Unsplash's own caption describes only the garment — glance at each one once. */
// بيانات المنتجات — عدّل هنا لإضافة أو تغيير المنتجات
const SIZES = ["S", "M", "L", "XL", "XXL"];
const PRODUCTS = [
  { id: "oversized-tee-black", img: "https://images.unsplash.com/photo-1618354691373-d851c5c3a990?auto=format&fit=crop&w=900&q=80", name: "Essential Oversized Tee – Black", cat: "T-Shirts", type: "tee", color: "#161616", bg: "#e9e6e0", price: 450, compare: null, available: true,
    desc: "تيشيرت أوفر سايز قطن ١٠٠٪ بخامة تقيلة ناعمة، قصّة واسعة مريحة وطباعة Fleex صغيرة على الصدر." },
  { id: "oversized-tee-offwhite", img: "https://images.unsplash.com/photo-1581655353564-df123a1eb820?auto=format&fit=crop&w=900&q=80", name: "Essential Oversized Tee – Off White", cat: "T-Shirts", type: "tee", color: "#ece8de", bg: "#d9d4c8", price: 450, compare: 600, available: true,
    desc: "نفس القصّة الأوفر سايز بلون أوف وايت هادي، سهل تنسّقه مع أي لبس." },
  { id: "heavyweight-hoodie", img: "https://images.unsplash.com/photo-1680292783974-a9a336c10366?auto=format&fit=crop&w=900&q=80", name: "Heavyweight Hoodie – Charcoal", cat: "Hoodies", type: "hoodie", color: "#3a3a3c", bg: "#dedbd4", price: 1100, compare: null, available: true,
    desc: "هودي بخامة تقيلة من جوه فلييس ناعم، كابوشون مزدوج وجيب كنغر واسع. دافي وثابت الشكل." },
  { id: "zip-hoodie-sand", img: "https://images.unsplash.com/photo-1620799140188-3b2a02fd9a77?auto=format&fit=crop&w=900&q=80", name: "Zip Hoodie – Sand", cat: "Hoodies", type: "hoodie", color: "#c9b99a", bg: "#ebe7df", price: 1250, compare: 1500, available: true, zip: true,
    desc: "هودي بسوستة كاملة بلون الرمل، قصّة مريحة وخامة قطن مبطّنة مناسبة للشتا والمواصلات." },
  { id: "straight-black-jeans", img: "https://images.unsplash.com/photo-1718252540617-6ecda2b56b57?auto=format&fit=crop&w=900&q=80", name: "Straight Black Jeans", cat: "Pants", type: "pants", color: "#1b1b1b", bg: "#e8e5de", price: 980, compare: null, available: true,
    desc: "جينز أسود بقصّة مستقيمة مريحة، خامة دنيم تقيلة بتحافظ على اللون ومناسب للاستعمال اليومي." },
  { id: "classic-blue-denim", img: "https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?auto=format&fit=crop&w=900&q=80", name: "Classic Blue Denim", cat: "Pants", type: "pants", color: "#3f5a7d", bg: "#e4e1d9", price: 890, compare: 1100, available: true,
    desc: "بنطلون جينز أزرق كلاسيك بغسلة هادية وقصّة مريحة، سهل تنسّقه مع أي تيشيرت أو هودي." },
  { id: "light-wash-denim", img: "https://images.unsplash.com/photo-1602293589930-45aad59ba3ab?auto=format&fit=crop&w=900&q=80", name: "Light Wash Denim", cat: "Pants", type: "pants", color: "#7d95b3", bg: "#e8e5de", price: 920, compare: null, available: true,
    desc: "جينز بغسلة فاتحة وخامة خفيفة نسبياً، مناسب للجو الدافي والخروجات اليومية." },
  { id: "wide-leg-pants-red", img: "https://images.unsplash.com/photo-1590159983013-d4ff5fc71c1d?auto=format&fit=crop&w=900&q=80", name: "Wide Leg Pants – Red", cat: "Pants", type: "pants", color: "#a3302a", bg: "#ebe7df", price: 850, compare: 1050, available: true,
    desc: "بنطلون واسع بلون أحمر جريء وخامة قطن ناعمة، قطعة واحدة تغيّر شكل الإطلالة كلها." },
  { id: "windbreaker-stone", img: "https://images.unsplash.com/photo-1622567893612-a5345baa5c9a?auto=format&fit=crop&w=900&q=80", name: "Zip Windbreaker – Stone", cat: "Jackets", type: "jacket", color: "#a9a69c", bg: "#e6e3dc", price: 1450, compare: null, available: true,
    desc: "جاكيت خفيف مقاوم للهوا بسوستة كاملة وجيوب جانبية، مثالي لنص الفصول." },
  { id: "dad-cap-black", img: "https://images.unsplash.com/photo-1691256676359-20e5c6d4bc92?auto=format&fit=crop&w=900&q=80", name: "Fleex Dad Cap – Black", cat: "Caps", type: "cap", color: "#161616", bg: "#e9e6e0", price: 320, compare: null, available: false,
    desc: "كاب كلاسيك بحزام قابل للتعديل وتطريز Fleex على الواجهة." }
];
