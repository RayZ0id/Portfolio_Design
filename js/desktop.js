/* ═══════════════════════════════════════════
   RaynardOS — Drag, Context Menu & Desktop Init
   js/desktop.js
═══════════════════════════════════════════ */

/* ── Desktop initialisation ── */
function initDesktop() {
  renderIcons();
  renderStartMenu();
  startClock();

  const desk = document.getElementById('desktop');
  desk.addEventListener('click', e => {
    if (e.target === desk || e.target.id === 'icon-grid') {
      deselIcons(); smClose(); ctxClose();
    }
  });

  document.addEventListener('click', e => {
    if (!e.target.closest('#smenu') && !e.target.closest('#start-btn')) smClose();
    if (!e.target.closest('#ctx')) ctxClose();
  });

  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') { smClose(); ctxClose(); }
  });

  window.addEventListener('resize', clampWins);
}

/* ── Draggable windows ── */
function makeDraggable(win, handle) {
  let sx, sy, sl, st;

  function startDrag(cx, cy) {
    sx = cx; sy = cy;
    sl = win.offsetLeft; st = win.offsetTop;
  }

  function moveDrag(cx, cy) {
    const id  = win.id.slice(2);
    if (wins[id]?.maxed) return;
    const tbH  = document.getElementById('taskbar').offsetHeight;
    const deskH = window.innerHeight - tbH;
    win.style.left = Math.max(0, Math.min(window.innerWidth  - 80, sl + cx - sx)) + 'px';
    win.style.top  = Math.max(0, Math.min(deskH - 40,             st + cy - sy)) + 'px';
  }

  /* Mouse */
  handle.addEventListener('mousedown', e => {
    if (e.target.closest('.win-btns')) return;
    startDrag(e.clientX, e.clientY);
    const mm = e2 => moveDrag(e2.clientX, e2.clientY);
    const mu = () => { document.removeEventListener('mousemove', mm); document.removeEventListener('mouseup', mu); };
    document.addEventListener('mousemove', mm);
    document.addEventListener('mouseup', mu);
    e.preventDefault();
  });

  /* Touch */
  handle.addEventListener('touchstart', e => {
    if (e.target.closest('.win-btns')) return;
    const t = e.touches[0];
    startDrag(t.clientX, t.clientY);
    const tm = e2 => { const t2 = e2.touches[0]; moveDrag(t2.clientX, t2.clientY); };
    const te = () => { handle.removeEventListener('touchmove', tm); handle.removeEventListener('touchend', te); };
    handle.addEventListener('touchmove', tm, { passive: false });
    handle.addEventListener('touchend', te);
    e.preventDefault();
  }, { passive: false });
}

/* ── Context menu ── */
function ctxShow(e) {
  e.preventDefault();
  const m = document.getElementById('ctx');
  m.style.left = Math.min(e.clientX, window.innerWidth  - 220) + 'px';
  m.style.top  = Math.min(e.clientY, window.innerHeight - 160) + 'px';
  m.classList.add('open');
}

function ctxClose() {
  document.getElementById('ctx').classList.remove('open');
}

/* ── Resizable windows (drag any edge or corner) ── */
function makeResizable(win) {
  const EDGE = 7; // px hit zone

  /* Inject resize handles into the window */
  const handles = [
    'n','s','e','w','nw','ne','sw','se'
  ];
  handles.forEach(dir => {
    const h = document.createElement('div');
    h.dataset.dir = dir;
    h.style.cssText = `
      position:absolute;z-index:10;
      ${dir.includes('n') ? 'top:0;height:'+EDGE+'px;' : ''}
      ${dir.includes('s') ? 'bottom:0;height:'+EDGE+'px;' : ''}
      ${dir.includes('e') ? 'right:0;width:'+EDGE+'px;' : ''}
      ${dir.includes('w') ? 'left:0;width:'+EDGE+'px;' : ''}
      ${dir === 'n' || dir === 's' ? 'left:'+EDGE+'px;right:'+EDGE+'px;cursor:ns-resize;' : ''}
      ${dir === 'e' || dir === 'w' ? 'top:'+EDGE+'px;bottom:'+EDGE+'px;cursor:ew-resize;' : ''}
      ${dir === 'nw' ? 'width:'+EDGE+'px;height:'+EDGE+'px;cursor:nw-resize;' : ''}
      ${dir === 'ne' ? 'width:'+EDGE+'px;height:'+EDGE+'px;cursor:ne-resize;' : ''}
      ${dir === 'sw' ? 'width:'+EDGE+'px;height:'+EDGE+'px;cursor:sw-resize;' : ''}
      ${dir === 'se' ? 'width:'+EDGE+'px;height:'+EDGE+'px;cursor:se-resize;' : ''}
    `;

    h.addEventListener('mousedown', e => {
      const id = win.id.slice(2);
      if (wins[id]?.maxed) return;

      e.preventDefault();
      e.stopPropagation();

      const dir   = h.dataset.dir;
      const startX = e.clientX, startY = e.clientY;
      const startW = win.offsetWidth,  startH = win.offsetHeight;
      const startL = win.offsetLeft,   startT = win.offsetTop;
      const MIN_W  = 280, MIN_H = 180;
      const tbH    = document.getElementById('taskbar').offsetHeight;

      const onMove = e => {
        const dx = e.clientX - startX;
        const dy = e.clientY - startY;

        let newW = startW, newH = startH, newL = startL, newT = startT;

        if (dir.includes('e')) newW = Math.max(MIN_W, startW + dx);
        if (dir.includes('s')) newH = Math.max(MIN_H, startH + dy);
        if (dir.includes('w')) {
          newW = Math.max(MIN_W, startW - dx);
          newL = startL + (startW - newW);
        }
        if (dir.includes('n')) {
          newH = Math.max(MIN_H, startH - dy);
          newT = Math.max(0, startT + (startH - newH));
          /* don't go above viewport */
          newT = Math.min(newT, startT + startH - MIN_H);
        }

        /* clamp bottom edge to taskbar */
        const maxH = window.innerHeight - tbH - newT;
        if (newH > maxH) newH = Math.max(MIN_H, maxH);

        win.style.width  = newW + 'px';
        win.style.height = newH + 'px';
        win.style.left   = newL + 'px';
        win.style.top    = newT + 'px';
        win.style.aspectRatio = 'unset';
      };

      const onUp = () => {
        document.removeEventListener('mousemove', onMove);
        document.removeEventListener('mouseup', onUp);
      };

      document.addEventListener('mousemove', onMove);
      document.addEventListener('mouseup', onUp);
    });

    win.appendChild(h);
  });
}
