/* js/core/navigation.js — Current page and navigation links */
const page = location.pathname.split("/").pop() || "index.html";
const navLinks = [["home.html","Home"],["shop.html","Shop"],["shop.html?sale=1","Sale"],["info.html?p=about","About Us"],["info.html?p=policy","Our Policy"],["info.html?p=contact","Contact"]];
