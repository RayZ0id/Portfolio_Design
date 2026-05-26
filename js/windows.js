/* ═══════════════════════════════════════════
   RaynardOS — Window Manager
   js/windows.js
═══════════════════════════════════════════ */

const wins          = {};   // id → { mini, maxed }
let   activeId      = null;
let   zTop          = 100;
const CASCADE_STEP  = 28;

/* ── Open / restore a portfolio window ── */
function winOpen(id) {
  if (wins[id]) {
    const el = document.getElementById('w-' + id);
    if (el) { el.classList.remove('mini'); wins[id].mini = false; bringFwd(id); }
    return;
  }
  const cat = CATS.find(c => c.id === id);
  if (!cat) return;

  const count = Object.keys(wins).length;
  const l = Math.min(120 + count * CASCADE_STEP, window.innerWidth  - 200);
  const t = Math.min(30  + count * CASCADE_STEP, window.innerHeight - 200);

  const el = document.createElement('div');
  el.className = 'win'; el.id = 'w-' + id;
  el.style.left = l + 'px'; el.style.top = t + 'px';
  el.style.opacity = '0'; el.style.transform = 'scale(0.94)';

  el.innerHTML = `
    <div class="win-bar" id="wb-${id}">
      <div class="win-title">
        <span class="win-title-ico"><img src="icons/${cat.id}.png" style="width:50px;height:50px;object-fit:contain;vertical-align:middle;"></span>
        <span>${cat.name}.portfolio</span>
      </div>
      <div class="win-btns">
        <div class="wb" title="Minimize" onclick="winMini('${id}')">_</div>
        <div class="wb" title="Maximize" onclick="winMax('${id}')">□</div>
        <div class="wb cls" title="Close"    onclick="winClose('${id}')">✕</div>
      </div>
    </div>
    <div class="win-menu">
      <div class="wm-item">File</div>
      <div class="wm-item">View</div>
      <div class="wm-item">Sort</div>
      <div class="wm-item">Help</div>
    </div>
    <div class="win-path">
      C:\\ <span>Portfolio</span> \\ <span>${cat.name}</span>
    </div>
    <div class="win-body">${buildPortfolioContent(cat)}</div>
    <div class="win-foot">
      <span>${cat.items.length} item${cat.items.length !== 1 ? 's' : ''} &nbsp;·&nbsp; ${cat.desc}</span>
    </div>`;

  document.getElementById('desktop').appendChild(el);
  wins[id] = { mini: false, maxed: false };

  makeDraggable(el, document.getElementById('wb-' + id));
  makeResizable(el);
  bringFwd(id);
  addTbBtn(cat);

  el.addEventListener('mousedown', () => bringFwd(id));
  el.addEventListener('touchstart', () => bringFwd(id), { passive: true });

  requestAnimationFrame(() => {
    el.style.transition = 'opacity 0.15s, transform 0.15s';
    el.style.opacity = '1'; el.style.transform = 'scale(1)';
    /* Lazy-load any grid videos in this category window */
    setTimeout(() => activateVideosInWin(id), 200);
  });
}

/* ── Close ── */
function winClose(id) {
  const el = document.getElementById('w-' + id);
  if (!el) return;
  el.style.transition = 'opacity 0.13s, transform 0.13s';
  el.style.opacity = '0'; el.style.transform = 'scale(0.93)';
  setTimeout(() => { el.remove(); delete wins[id]; rmTbBtn(id); }, 140);
}

/* ── Minimise ── */
function winMini(id) {
  const el = document.getElementById('w-' + id);
  if (!el) return;
  el.classList.add('mini'); wins[id].mini = true;
  const btn = document.getElementById('tb-' + id);
  if (btn) btn.classList.remove('on');
  /* Pause any grid videos or detail videos */
  pauseVideosInWin(id);
  pauseDetailVideo('item-' + id);
}

/* ── Maximise / restore ── */
function winMax(id) {
  const el = document.getElementById('w-' + id);
  if (!el) return;
  if (wins[id].maxed) {
    el.classList.remove('max'); wins[id].maxed = false;
  } else {
    el.classList.add('max'); wins[id].maxed = true;
  }
}

/* ── Bring to front ── */
function bringFwd(id) {
  zTop++;
  document.querySelectorAll('.win').forEach(w => w.classList.remove('active'));
  document.querySelectorAll('.tb-btn').forEach(b => b.classList.remove('on'));
  const el  = document.getElementById('w-' + id);
  if (el)  { el.classList.add('active'); el.style.zIndex = zTop; }
  const btn = document.getElementById('tb-' + id);
  if (btn) btn.classList.add('on');
  activeId = id;
  /* Resume grid videos if this is a category window */
  activateVideosInWin(id);
}

/* ── Keep all windows on-screen after resize ── */
function clampWins() {
  document.querySelectorAll('.win:not(.max)').forEach(w => {
    const ml = window.innerWidth  - 60;
    const mt = window.innerHeight - 60;
    if (parseInt(w.style.left) > ml) w.style.left = ml + 'px';
    if (parseInt(w.style.top)  > mt) w.style.top  = mt + 'px';
  });
}

/* ── Convenience ── */
function openAllWins()  { CATS.forEach(c => winOpen(c.id)); }
function closeAllWins() { Object.keys(wins).forEach(id => winClose(id)); }
