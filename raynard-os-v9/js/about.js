/* ═══════════════════════════════════════════════════════════════
   RaynardOS — About Window
   js/about.js
════════════════════════════════════════════════════════════════ */

const ABOUT = {
  name:  'Raynard',
  role:  'Graphic Designer · Game Developer · Creator',
  bio:   `Hello! I'm Raynard, a graphic designer, game developer and many
          more things. With a love for retro and being a minimalist.
          Whether I'm sketching logos or making a video game for fun,
          I thrive on creativity and believe in design that speaks
          simply but powerfully.`,
  contacts: [
    { ico: '📱', label: '+62 0987 555 216', href: null },
    { ico: '✉️', label: 'timotiusraynardgandha@gmail.com', href: 'mailto:timotiusraynardgandha@gmail.com' },
    { ico: '🎮', label: 'rayzoid.itch.io',    href: 'https://rayzoid.itch.io/' },
  ],
  photo: 'icons/human.png',
};

function openAbout() {
  const id = '_about';
  if (wins[id]) {
    const el = document.getElementById('w-' + id);
    if (el) { el.classList.remove('mini'); wins[id].mini = false; bringFwd(id); }
    return;
  }

  const count = Object.keys(wins).length;
  const l = Math.min(160 + count * CASCADE_STEP, window.innerWidth  - 200);
  const t = Math.min(60  + count * CASCADE_STEP, window.innerHeight - 200);

  const el = document.createElement('div');
  el.className = 'win'; el.id = 'w-' + id;
  el.style.left = l + 'px'; el.style.top = t + 'px';
  el.style.width  = 'min(30vw, 92vw)';
  el.style.height = 'auto';
  el.style.aspectRatio = 'unset';
  el.style.opacity = '0'; el.style.transform = 'scale(0.94)';

  const contactRows = ABOUT.contacts.map(c => {
    const inner = c.href
      ? `<a href="${c.href}" style="color:var(--col1a);">${c.label}</a>`
      : `<span>${c.label}</span>`;
    return `<div class="about-contact-row">${c.ico} ${inner}</div>`;
  }).join('');

  const faceContent = ABOUT.photo
    ? `<img src="${ABOUT.photo}" alt="Profile" style="width:100%;height:100%;object-fit:cover;">`
    : '👤';

  el.innerHTML = `
    <div class="win-bar" id="wb-${id}">
      <div class="win-title">
        <span class="win-title-ico"><img src="icons/Person.png" style="width:50px;height:50px;object-fit:contain;vertical-align:middle;"></span>
        <span>about.me</span>
      </div>
      <div class="win-btns">
        <div class="wb" title="Minimize" onclick="winMini('${id}')">_</div>
        <div class="wb" title="Maximize" onclick="winMax('${id}')">□</div>
        <div class="wb cls" title="Close" onclick="winClose('${id}')">✕</div>
      </div>
    </div>
    <div class="win-menu">
      <div class="wm-item">File</div>
      <div class="wm-item">View</div>
    </div>
    <div class="win-body" style="padding:0;">
      <div class="about-body">
        <div class="about-info">
          <div class="about-face">${faceContent}</div>
          <div class="about-text">
            <div class="about-name">${ABOUT.name}</div>
            <div class="about-role">${ABOUT.role}</div>
            <div class="about-bio">${ABOUT.bio}</div>
          </div>
        </div>
        <div class="about-contacts">${contactRows}</div>
      </div>
    </div>
    <div class="win-foot"><span>${ABOUT.name} · Portfolio System v1.0</span></div>`;

  document.getElementById('desktop').appendChild(el);
  wins[id] = { mini: false, maxed: false };
  makeDraggable(el, document.getElementById('wb-' + id));
  makeResizable(el);
  bringFwd(id);

  const tbBtn = document.createElement('div');
  tbBtn.className = 'tb-btn on'; tbBtn.id = 'tb-' + id;
  tbBtn.innerHTML = '<img src="icons/Person.png" style="width:50px;height:50px;object-fit:contain;vertical-align:middle;margin-right:4px;"><span>About</span>';
  tbBtn.onclick = () => {
    const w  = wins[id]; if (!w) return;
    const e2 = document.getElementById('w-' + id);
    if (w.mini) { e2.classList.remove('mini'); w.mini = false; bringFwd(id); }
    else if (activeId === id) winMini(id);
    else bringFwd(id);
  };
  document.getElementById('tb-wins').appendChild(tbBtn);

  el.addEventListener('mousedown', () => bringFwd(id));
  requestAnimationFrame(() => {
    el.style.transition = 'opacity 0.15s, transform 0.15s';
    el.style.opacity = '1'; el.style.transform = 'scale(1)';
  });
}
