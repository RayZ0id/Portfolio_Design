# RaynardOS — Portfolio

A retro OS-style portfolio site. Open `index.html` in a browser — no build step needed.

---

## File Structure

```
raynard-os/
│
├── index.html              ← Main entry point (HTML shell only)
│
├── css/
│   └── style.css           ← All styles (colours, layout, windows, responsive)
│
├── js/
│   ├── data.js             ← ★ EDIT THIS to add categories / items / images
│   ├── portfolio.js        ← Builds the grid of cards inside each window
│   ├── windows.js          ← Open/close/minimise/maximise/drag logic
│   ├── icons.js            ← Desktop icon grid
│   ├── taskbar.js          ← Taskbar buttons, Start menu, clock
│   ├── about.js            ← ★ EDIT THIS to update your bio & contacts
│   ├── desktop.js          ← Desktop init, drag handler, context menu
│   └── boot.js             ← Boot screen animation
│
├── icons/
│   └── <id>.png            ← one PNG per category id (emoji fallback if missing)
│
└── portfolio/
    ├── video/
    ├── animation/
    ├── 3d/
    ├── games/
    ├── posters/
    ├── image-editing/
    ├── photography/
    └── branding/
```

---

## How to Add Images

Images live in `portfolio/<category-id>/`.

Filename = item `name` lowercased, spaces → dashes, + `.jpg`:

| Item name   | Expected filename  |
|-------------|--------------------|
| Poster 01   | poster-01.jpg      |
| Brand 02    | brand-02.jpg       |

To use a different file, add `img` to the item in `js/data.js`:
```js
{ name: 'Poster 01', tag: '2024', ico: '▣', img: 'my-poster.png' }
```

---

## How to Add a New Category

1. Open `js/data.js` and copy an existing block into `CATS`.
2. Set a unique `id` (matches the `portfolio/<id>/` folder).
3. Fill in `name`, `ico`, `desc`, `bg`, and `items`.
4. Create `portfolio/<id>/` and drop your images in.
5. Optionally add `icons/<id>.png`.

---

## How to Update Your Bio

Edit the `ABOUT` object at the top of `js/about.js`.

---

## Colours & Fonts

All tokens are CSS variables at the top of `css/style.css`.
