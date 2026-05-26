/* ═══════════════════════════════════════════
   RaynardOS — Taskbar & Start Menu
   js/taskbar.js
═══════════════════════════════════════════ */

/* ── Taskbar window buttons ── */
function addTbBtn(cat) {
  const bar = document.getElementById('tb-wins');
  const btn = document.createElement('div');
  btn.className = 'tb-btn on';
  btn.id = 'tb-' + cat.id;
  btn.innerHTML = `<img src="icons/${cat.id}.png" style="width:50px;height:50px;object-fit:contain;vertical-align:middle;margin-right:4px;"><span>${cat.name}</span>`;

  btn.onclick = () => {
    const w = wins[cat.id];
    if (!w) return;
    const el = document.getElementById('w-' + cat.id);
    if (w.mini) {
      el.classList.remove('mini'); w.mini = false; bringFwd(cat.id);
    } else if (activeId === cat.id) {
      winMini(cat.id);
    } else {
      bringFwd(cat.id);
    }
  };

  bar.appendChild(btn);
}

function rmTbBtn(id) {
  const btn = document.getElementById('tb-' + id);
  if (btn) btn.remove();
}

/* ── Start menu ── */
function renderStartMenu() {
  const list = document.getElementById('sm-list');

  CATS.forEach(cat => {
    const el = document.createElement('div');
    el.className = 'sm-item';
    el.innerHTML = `<span class="sm-item-ico"><img src="icons/${cat.id}.png" style="width:50px;height:50px;object-fit:contain;vertical-align:middle;"></span><span>${cat.name}</span>`;
    el.onclick = () => { winOpen(cat.id); smClose(); };
    list.appendChild(el);
  });
}

function smToggle() { document.getElementById('smenu').classList.toggle('open'); }
function smClose()  { document.getElementById('smenu').classList.remove('open'); }

/* ── Clock ── */
function startClock() {
  const DAYS   = ['Sun','Mon','Tue','Wed','Thu','Fri','Sat'];
  const MONTHS = ['Jan','Feb','Mar','Apr','May','Jun',
                  'Jul','Aug','Sep','Oct','Nov','Dec'];

  function tick() {
    const n = new Date();
    document.getElementById('clock-time').textContent =
      String(n.getHours()).padStart(2, '0') + ':' +
      String(n.getMinutes()).padStart(2, '0');
    document.getElementById('clock-date').textContent =
      DAYS[n.getDay()] + ' ' + n.getDate() + ' ' + MONTHS[n.getMonth()];
  }

  tick();
  setInterval(tick, 8000);
}
