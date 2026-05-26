/* ═══════════════════════════════════════════
   RaynardOS — Boot Sequence
   js/boot.js
═══════════════════════════════════════════ */

const BOOT_MSGS = [
  'Loading portfolio assets...',
  'Mounting drives...',
  'Starting display server...',
  'Building desktop...',
  'Welcome to RaynardOS'
];

function boot() {
  const fill = document.getElementById('bfill');
  const msg  = document.getElementById('bmsg');
  let step   = 0;

  setTimeout(() => { fill.style.width = '100%'; }, 80);

  const iv = setInterval(() => {
    if (step < BOOT_MSGS.length) msg.textContent = BOOT_MSGS[step++];
    else clearInterval(iv);
  }, 440);

  setTimeout(() => {
    const b = document.getElementById('boot');
    b.classList.add('out');
    setTimeout(() => { b.style.display = 'none'; }, 750);
    initDesktop();
  }, 2600);
}
