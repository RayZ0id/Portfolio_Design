/* ═══════════════════════════════════════════
   RaynardOS — Desktop Icons
   js/icons.js

   Renders the icon grid from CATS (js/data.js).
   Each icon looks for:  icons/<id>.png
   Falls back to the emoji in cat.ico if missing.
═══════════════════════════════════════════ */

function renderIcons() {
  const grid = document.getElementById('icon-grid');

  CATS.forEach(cat => {
    const el = document.createElement('div');
    el.className = 'd-icon';
    el.dataset.id = cat.id;

    el.innerHTML = `
      <div class="icon-box">
        <img src="icons/${cat.id}.png"
             alt="${cat.name}"
             onerror="this.style.display='none';
                      this.nextElementSibling.style.display='flex';">
        <div class="fallback"
             style="background:${cat.bg};display:none;">${cat.ico}</div>
      </div>
      <div class="icon-lbl">${cat.name}</div>`;

    el.addEventListener('dblclick', () => winOpen(cat.id));
    el.addEventListener('click', e => {
      e.stopPropagation();
      deselIcons();
      el.classList.add('sel');
    });

    grid.appendChild(el);
  });
}

function deselIcons() {
  document.querySelectorAll('.d-icon').forEach(i => i.classList.remove('sel'));
}
