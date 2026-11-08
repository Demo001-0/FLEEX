/* js/features/theme.js — light/dark toggle.
   The site ALWAYS opens in light mode on a fresh visit. The choice is remembered only for the
   current tab (sessionStorage) so moving between pages doesn't flip the theme back. */
(() => {
  const root = document.documentElement;
  const moon = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M20 14.5A8.5 8.5 0 019.5 4A8.5 8.5 0 1020 14.5z"/></svg>`;
  const sun = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="4"/><path d="M12 2.5v2.5M12 19v2.5M2.5 12H5M19 12h2.5M5.3 5.3l1.8 1.8M16.9 16.9l1.8 1.8M5.3 18.7l1.8-1.8M16.9 7.1l1.8-1.8"/></svg>`;
  const isDark = () => root.dataset.theme === "dark";
  const set = (mode, save) => {
    if (mode === "dark") root.dataset.theme = "dark"; else delete root.dataset.theme;
    if (save) { try { sessionStorage.setItem("fleex_theme", mode); } catch (e) {} }
    const b = document.getElementById("themeToggle");
    if (b) { b.innerHTML = mode === "dark" ? sun : moon; b.setAttribute("aria-label", mode === "dark" ? "Switch to light mode" : "Switch to dark mode"); b.setAttribute("aria-pressed", mode === "dark"); }
    const m = document.querySelector('meta[name="theme-color"]'); if (m) m.content = mode === "dark" ? "#0e0e10" : "#f4f2ee";
  };
  const actions = document.querySelectorAll(".header-actions")[1];
  if (actions) {
    actions.insertAdjacentHTML("afterbegin", `<button class="icon-btn" id="themeToggle" type="button"></button>`);
    document.getElementById("themeToggle").onclick = () => { root.classList.add("theme-anim"); set(isDark() ? "light" : "dark", true); setTimeout(() => root.classList.remove("theme-anim"), 450); };
  }
  set(isDark() ? "dark" : "light", false);
})();
