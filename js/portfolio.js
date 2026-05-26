/* ═══════════════════════════════════════════════════════════════
   RaynardOS — Portfolio Content Builder
   js/portfolio.js

   Handles four item types:
     (default)  — static image
     youtube    — thumbnail + YouTube embed in detail window
     video      — lazy-load mp4; muted loop in grid, full player in detail
     gallery    — cover image in grid, scrollable gallery in detail
════════════════════════════════════════════════════════════════ */

/* Lookup table so onclick passes a single key — no quote issues */
const ITEM_DATA = {};

/* ── Path helpers ──────────────────────────────────────────── */
function itemImgPath(cat, item) {
  if (item.img) return `portfolio/${cat.id}/${item.img}`;
  const slug = item.name.toLowerCase().replace(/\s+/g, '-');
  return `portfolio/${cat.id}/${slug}.jpg`;
}

function itemVideoPath(cat, item) {
  return `portfolio/${cat.id}/${item.video}`;
}

/* Extract YouTube video ID from any YouTube URL */
function ytId(url) {
  if (!url) return null;
  const m = url.match(/(?:youtu\.be\/|v=|embed\/)([A-Za-z0-9_-]{11})/);
  return m ? m[1] : null;
}

/* ── Grid content builder ──────────────────────────────────── */
function buildPortfolioContent(cat) {
  const cards = cat.items.map(item => buildCard(cat, item)).join('');
  return `
    <div class="p-head">
      <h2>${cat.name}</h2>
      <span class="p-sub">${cat.desc}</span>
    </div>
    <div class="p-grid" id="pg-${cat.id}">
      ${cards}
    </div>
    <div style="height:1.2vw;"></div>`;
}

function buildCard(cat, item) {
  const key = (cat.id + '-' + item.name).replace(/[^a-z0-9]/gi, '-');

  /* Store full data for the detail window */
  ITEM_DATA[key] = {
    catId:    cat.id,
    catName:  cat.name,
    catBg:    cat.bg,
    name:     item.name,
    tag:      item.tag,
    ico:      item.ico,
    type:     item.type || 'image',
    src:      itemImgPath(cat, item),
    video:    item.video ? itemVideoPath(cat, item) : null,
    gallery:  item.gallery ? item.gallery.map(f => `portfolio/${cat.id}/${f}`) : null,
    videos:   item.videos  || null,
    desc:     item.desc     || '',
    software: item.software || '',
    link:     item.link     || ''
  };

  /* ── Thumbnail area ── */
  let thumbInner = '';

  if (item.type === 'video') {
    /* Lazy mp4 — src injected when window opens; poster frame shown until then */
    const poster = item.img ? itemImgPath(cat, item) : '';
    thumbInner = `
      <video class="grid-video" data-src="${itemVideoPath(cat, item)}"
             ${poster ? `poster="${poster}"` : ''}
             muted loop playsinline preload="none"
             style="width:100%;height:100%;object-fit:cover;display:block;">
      </video>
      <div class="vid-play-icon" style="
           position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);
           width:32px;height:32px;border-radius:50%;
           background:rgba(0,0,0,0.55);display:flex;align-items:center;justify-content:center;
           pointer-events:none;font-size:14px;color:#fff;">▶</div>`;

  } else if (item.type === 'youtube') {
    const src = itemImgPath(cat, item);
    const vid = ytId(item.link);
    const ytThumb = vid ? `https://img.youtube.com/vi/${vid}/mqdefault.jpg` : null;
    thumbInner = `
      <img src="${src}"
           ${ytThumb ? `onerror="this.src='${ytThumb}'"` : `onerror="this.style.display='none';this.nextElementSibling.style.display='flex';"`}
           alt="${item.name}" style="width:100%;height:100%;object-fit:cover;display:block;">
      ${!item.img ? `<span style="display:none;width:100%;height:100%;align-items:center;justify-content:center;background:${cat.bg};font-size:26px;">${item.ico}</span>` : ''}
      <div style="position:absolute;bottom:6px;right:6px;background:rgba(0,0,0,0.7);
                  color:#fff;font-size:9px;padding:2px 6px;font-family:var(--pix);">YT</div>`;

  } else {
    /* Default: static image or gallery cover */
    const src = itemImgPath(cat, item);
    thumbInner = `
      <img src="${src}" alt="${item.name}"
           onerror="this.style.display='none';this.nextElementSibling.style.display='flex';"
           style="width:100%;height:100%;object-fit:cover;display:block;">
      <span style="display:none;width:100%;height:100%;align-items:center;justify-content:center;
                   background:${cat.bg};font-size:26px;">${item.ico}</span>
      ${item.type === 'gallery' ? `<div style="position:absolute;bottom:6px;right:6px;background:rgba(0,0,0,0.7);
                  color:var(--col1a);font-size:9px;padding:2px 6px;font-family:var(--pix);">⊞ ${item.gallery.length}</div>` : ''}`;
  }

  return `
    <div class="p-item" onclick="openItemWin('${key}')" style="cursor:pointer;">
      <div class="p-thumb" style="background:${cat.bg};position:relative;overflow:hidden;">
        ${thumbInner}
      </div>
      <div class="p-name">${item.name}</div>
      <div class="p-tag">${item.tag}</div>
    </div>`;
}

/* ── Lazy-load videos when a category window becomes active ── */
function activateVideosInWin(catId) {
  const grid = document.getElementById('pg-' + catId);
  if (!grid) return;
  grid.querySelectorAll('video.grid-video[data-src]').forEach(v => {
    if (!v.src || v.src === window.location.href) {
      v.src = v.dataset.src;
      v.load();
    }
    v.play().catch(() => {});
  });
}

function pauseVideosInWin(catId) {
  const grid = document.getElementById('pg-' + catId);
  if (!grid) return;
  grid.querySelectorAll('video.grid-video').forEach(v => v.pause());
}

/* ── Detail window ─────────────────────────────────────────── */
function openItemWin(key) {
  const d = ITEM_DATA[key];
  if (!d) return;
  const winId = 'item-' + key;

  if (wins[winId]) {
    const el = document.getElementById('w-' + winId);
    if (el) { el.classList.remove('mini'); wins[winId].mini = false; bringFwd(winId); }
    if (d.type === 'video') resumeDetailVideo(winId);
    return;
  }

  const count = Object.keys(wins).length;
  const l = Math.min(160 + count * CASCADE_STEP, window.innerWidth  - 320);
  const t = Math.min(60  + count * CASCADE_STEP, window.innerHeight - 240);

  const el = document.createElement('div');
  el.className   = 'win';
  el.id          = 'w-' + winId;
  el.style.left  = l + 'px';
  el.style.top   = t + 'px';
  el.style.width = 'min(560px, 92vw)';
  el.style.opacity   = '0';
  el.style.transform = 'scale(0.94)';

  /* ── Media block ── */
  let mediaBlock = '';

  if (d.type === 'youtube') {
    const vid = ytId(d.link);
    if (vid) {
      mediaBlock = `
        <div style="position:relative;width:100%;aspect-ratio:16/9;background:#000;margin-bottom:1.1vw;">
          <iframe id="yt-${winId}"
                  src="https://www.youtube.com/embed/${vid}?autoplay=1&rel=0&modestbranding=1"
                  style="position:absolute;inset:0;width:100%;height:100%;border:none;"
                  allow="autoplay; fullscreen" allowfullscreen></iframe>
        </div>`;
    } else {
      /* No link yet — show thumbnail with "link coming" badge */
      mediaBlock = `
        <div style="position:relative;width:100%;aspect-ratio:16/9;background:${d.catBg};
                    display:flex;align-items:center;justify-content:center;
                    margin-bottom:1.1vw;overflow:hidden;">
          <img src="${d.src}" alt="${d.name}"
               style="width:100%;height:100%;object-fit:cover;"
               onerror="this.style.display='none';">
          <div style="position:absolute;inset:0;background:rgba(0,0,0,0.55);
                      display:flex;flex-direction:column;align-items:center;justify-content:center;gap:10px;">
            <div style="font-size:28px;">🎬</div>
            <div style="font-family:var(--pix);font-size:7px;color:var(--col1a);text-align:center;line-height:2;">
              Video link coming soon.<br>Check back later.
            </div>
          </div>
        </div>`;
    }

  } else if (d.type === 'video') {
    /* Resolve full paths once — d.video is already a full path, d.videos entries are relative */
    const vids = d.videos
      ? d.videos.map(v => ({ label: v.label, src: `portfolio/${d.catId}/${v.src}` }))
      : [{ label: null, src: d.video }];
    const players = vids.map((v, i) => `
      ${v.label ? `<div style="font-family:var(--pix);font-size:6px;color:var(--col1a);
                               padding:6px 0 4px;border-top:${i > 0 ? '1px solid var(--col1a)' : 'none'};
                               margin-top:${i > 0 ? '8px' : '0'};">${v.label}</div>` : ''}
      <video ${i === 0 ? `id="dv-${winId}"` : ''} controls ${i === 0 ? 'autoplay' : ''} muted loop playsinline preload="metadata"
             style="width:100%;display:block;max-height:300px;object-fit:contain;margin-bottom:6px;"
             src="${v.src}">
        Your browser does not support HTML5 video.
      </video>`).join('');
    mediaBlock = `
      <div style="width:100%;background:${d.catBg};padding:8px;margin-bottom:1.1vw;overflow:hidden;">
        ${players}
      </div>`;

  } else if (d.type === 'gallery') {
    const imgs = d.gallery.map(src => `
      <img src="${src}" alt="${d.name}"
           style="width:100%;display:block;margin-bottom:8px;border:1px solid var(--col1a);"
           onerror="this.style.display='none';">`).join('');
    mediaBlock = `
      <div style="width:100%;background:${d.catBg};margin-bottom:1.1vw;overflow:hidden;">
        ${imgs}
      </div>`;

  } else {
    /* Default: single image */
    mediaBlock = `
      <div style="width:100%;background:${d.catBg};border:2px solid var(--col1a);
                  display:flex;align-items:center;justify-content:center;
                  margin-bottom:1.1vw;overflow:hidden;min-height:140px;">
        <img src="${d.src}" alt="${d.name}"
             style="width:100%;max-height:360px;object-fit:contain;display:block;"
             onerror="this.parentElement.style.minHeight='80px';this.style.display='none';">
      </div>`;
  }

  /* ── Link button ── */
  let linkBtn = '';
  if (d.link) {
    const label = d.type === 'youtube' ? '⏵ Watch on YouTube'
                : d.catId === 'games'  ? '▶ Play'
                : '⤷ View Project';
    linkBtn = `
      <a href="${d.link}" target="_blank" rel="noopener"
         style="display:inline-block;margin-top:1vw;padding:0.9em 2.6em;
                background:var(--col2);color:var(--col1);text-decoration:none;
                border:2px solid var(--col1);font-family:var(--pix);font-size:14px;
                transition:background 0.12s,color 0.12s;"
         onmouseover="this.style.background='var(--col1)';this.style.color='var(--col2)';"
         onmouseout="this.style.background='var(--col2)';this.style.color='var(--col1)';">
        ${label}
      </a>`;
  }

  /* ── Software used block (above desc) ── */
  const softwareBlock = d.software ? `
    <div style="margin-top:0.9vw;padding:0.6vw 0.8vw;
                border-left:3px solid var(--col1a);background:rgba(0,43,79,0.4);">
      <div style="font-family:var(--pix);font-size:20px;color:var(--col1a);
                  margin-bottom:5px;letter-spacing:0.1em;">SOFTWARE USED</div>
      <div style="font-family:var(--bl);font-size:15px;color:var(--col1);
                  line-height:1.8;">${d.software}</div>
    </div>` : '';

  /* ── Description block ── */
  const descBlock = d.desc ? `
    <div style="font-size:20px;line-height:2;color:var(--col1);margin-top:0.9vw;
                font-family:var(--bl);letter-spacing:0.02em;">${d.desc}</div>` : '';

  el.innerHTML = `
    <div class="win-bar" id="wb-${winId}">
      <div class="win-title">
        <span class="win-title-ico">
          <img src="icons/${d.catId}.png"
               style="width:50px;height:50px;object-fit:contain;vertical-align:middle;">
        </span>
        <span>${d.name}</span>
      </div>
      <div class="win-btns">
        <div class="wb" title="Minimize" onclick="winMini('${winId}')">_</div>
        <div class="wb" title="Maximize" onclick="winMax('${winId}')">□</div>
        <div class="wb cls" title="Close"    onclick="winClose('${winId}')">✕</div>
      </div>
    </div>
    <div class="win-menu">
      <div class="wm-item">File</div>
      <div class="wm-item">View</div>
      <div class="wm-item">Help</div>
    </div>
    <div class="win-path">
      C:\\ <span>Portfolio</span> \\ <span>${d.catName}</span> \\ <span>${d.name}</span>
    </div>
    <div class="win-body" style="padding:1.2vw;">
      ${mediaBlock}
      <div class="p-head" style="margin-bottom:0.8vw;padding-bottom:0.8vw;">
        <h2 style="font-family:var(--bl);font-size:clamp(1rem,2vw,2rem);
                   color:var(--col1);font-weight:400;">${d.name}</h2>
        <span class="p-sub">${d.tag}</span>
      </div>
      ${softwareBlock}
      ${descBlock}
      ${linkBtn}
    </div>
    <div class="win-foot">
      <span>${d.catName} &nbsp;·&nbsp; ${d.name}</span>
    </div>`;

  document.getElementById('desktop').appendChild(el);
  wins[winId] = { mini: false, maxed: false, type: d.type };

  makeDraggable(el, document.getElementById('wb-' + winId));
  makeResizable(el);
  bringFwd(winId);

  /* Taskbar button */
  const bar = document.getElementById('tb-wins');
  const btn = document.createElement('div');
  btn.className = 'tb-btn on';
  btn.id        = 'tb-' + winId;
  btn.innerHTML = `<img src="icons/${d.catId}.png"
                        style="width:16px;height:16px;object-fit:contain;vertical-align:middle;margin-right:4px;">
                   <span>${d.name}</span>`;
  btn.onclick = () => {
    const w   = wins[winId]; if (!w) return;
    const wEl = document.getElementById('w-' + winId);
    if (w.mini) {
      wEl.classList.remove('mini'); w.mini = false; bringFwd(winId);
      if (d.type === 'video') resumeDetailVideo(winId);
    } else if (activeId === winId) {
      winMini(winId);
      pauseDetailVideo(winId);
    } else {
      bringFwd(winId);
      if (d.type === 'video') resumeDetailVideo(winId);
    }
  };
  bar.appendChild(btn);

  el.addEventListener('mousedown', () => bringFwd(winId));
  el.addEventListener('touchstart', () => bringFwd(winId), { passive: true });

  requestAnimationFrame(() => {
    el.style.transition = 'opacity 0.15s, transform 0.15s';
    el.style.opacity    = '1';
    el.style.transform  = 'scale(1)';
  });
}

/* ── Video helpers for detail windows ── */
function resumeDetailVideo(winId) {
  const v = document.querySelector(`#w-${winId} video`);
  if (v) v.play().catch(() => {});
}
function pauseDetailVideo(winId) {
  const v = document.querySelector(`#w-${winId} video`);
  if (v) v.pause();
}
