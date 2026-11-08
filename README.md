# Fleex Wear

Static storefront (no build step) — open `home.html` directly or serve the folder with any static server.

## Structure

```
fleex/
├── index.html · home.html · shop.html · product.html · info.html   ← pages (entry points)
├── assets/images/                 ← logo and static images
├── css/
│   ├── main.css                   ← manifest: @imports every layer, IN CASCADE ORDER
│   ├── base/                      ← tokens (colours, fonts), reset, container
│   ├── components/                ← header, hero, buttons, grid, cart drawer, search, footer, sale banner …
│   ├── responsive/                ← base mobile / tablet breakpoints
│   ├── motion/                    ← animations, scroll reveals, scroll sun, typewriter
│   ├── refinements/               ← later design passes that refine components; type-system.css (LAST) holds the font-size scale + text colours
│   └── theme/                      ← Fleex identity layer (fleex.css, loaded last)
└── js/
    ├── data/products.js           ← product catalogue (edit here to add products)
    ├── core/                      ← config, icons, navigation, ui helpers, bootstrap
    ├── components/                ← layout, cart, product card, product visual, search
    ├── features/                  ← animations.js, theme.js (light only), logo3d.js (not loaded — experimental)
    └── pages/                     ← one file per page (home, shop, product, info), defines window.pageInit
```

## Rules

- **CSS order matters.** Many rules in `refinements/` and `theme/` intentionally override earlier ones.
  Add new rules by creating a file and appending an `@import` at the end of `css/main.css`.
- **Script order matters.** Plain scripts (no modules) so the site works from `file://`.
  Every page loads: `data → core → components → `bootstrap.js` → `pages/<page>.js`.
  ``animations.js` is loaded by `bootstrap.js` after the page is built.
- To add a product: edit `js/data/products.js`. To add a page: copy an existing page, add `js/pages/<name>.js`.
- Google Fonts are linked from each page's `<head>`.
