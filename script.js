(() => {
const C = window.SITE_CONFIG || {}, root = document.documentElement;
const $ = (s, r = document) => r.querySelector(s), $$ = (s, r = document) => [...r.querySelectorAll(s)];
const el = (t, c, h) => { const e = document.createElement(t); if (c) e.className = c; if (h != null) e.innerHTML = h; return e; };
const EMAIL = 'cyril05200013@gmail.com', THEMES = ['dark', 'light', 'hacker', 'retro'];

/* ===== CONTENT =====
   Edit here. Project status, features, role, challenges and lessons are written from
   your existing descriptions; adjust them to match your real experience.
   Add a project url / gh (GitHub) / img (screenshot path) when you have them. */
const D = {
  socials: [['Facebook', 'https://www.facebook.com/rodricyr/'], ['LinkedIn', 'https://www.linkedin.com/in/cyril-rodriguez-156a00438/'], ['GitHub', 'https://github.com/Czern05']],
  nav: [['projects', '📁', 'Projects'], ['games', '🎮', 'Games'], ['terminal', '📟', 'Terminal'], ['contact', '📧', 'Contact']],
  projects: [
    { t: 'Business Website', tag: 'WEB', status: 'Completed', d: 'A responsive professional website designed for a small business.', tags: ['HTML', 'CSS'],
      feat: ['Responsive layout for phone, tablet and desktop', 'Clean, professional presentation for a small business'],
      role: 'Designed and built the website.', chal: 'Keeping the layout consistent across screen sizes.', learn: 'Practical responsive design with HTML and CSS.', url: '', gh: '', img: '' },
    { t: 'Student Management System', tag: 'APP', status: 'Completed', d: 'A system for managing student records, information, and academic data.', tags: ['HTML', 'CSS', 'PHP'],
      feat: ['Manage student records and information', 'Store and view academic data'],
      role: 'Built the interface and the PHP back end.', chal: 'Organising student data so it is easy to store and find.', learn: 'How a PHP application works with stored data.', url: '', gh: '', img: '' },
    { t: 'Personal Portfolio', tag: 'PORTFOLIO', status: 'In progress', d: 'A personal portfolio website showcasing professional skills and projects.', tags: ['HTML', 'CSS', 'JavaScript'],
      feat: ['Desktop-style interface with windows', 'Four themes, saved between visits', 'Built-in terminal and two mini games'],
      role: 'Designed and built the site.', chal: 'Making a desktop-style layout work on small screens.', learn: 'Accessible, responsive interfaces with plain JavaScript.', url: '', gh: '', img: '' }
  ],
  skills: { Languages: ['Python', 'JavaScript', 'PHP', 'SQL'], 'Web Development': ['HTML5', 'CSS3', 'Bootstrap', 'Responsive Design'], 'Tools & Databases': ['Git / GitHub', 'MySQL', 'Database Design', 'Version Control'] },
  edu: 'Computer Science, 3rd-year undergraduate',
  jobs: [['2024 – Present', 'Web Developer', 'ABC Technologies', 'Developing responsive websites and maintaining web applications.'], ['2022 – 2024', 'IT Assistant', 'XYZ Company', 'Provided technical support and maintained computer systems.']],
  certs: [] // { name:'', issuer:'', date:'', url:'' }
};

/* ===== HELPERS ===== */
const lnk = (u, l) => u ? `<a class="btn ghost" href="${u}" target="_blank" rel="noopener noreferrer">${l} ↗</a>` : `<span class="btn ghost off" aria-disabled="true">${l}: soon</span>`;
const tagHtml = a => `<div class="tags">${a.map(t => `<span>${t}</span>`).join('')}</div>`;
const toast = m => { const t = $('#toast'); t.textContent = m; clearTimeout(toast.i); toast.i = setTimeout(() => t.textContent = '', 3500); };

/* ===== RENDER ===== */
$$('.panel').forEach(p => {
  const b = el('div', 'body'); b.append(...p.childNodes);
  p.setAttribute('role', 'dialog'); p.setAttribute('aria-labelledby', 'h-' + p.id);
  p.append(el('div', 'tb', `<h2 id="h-${p.id}" tabindex="-1">~/${p.dataset.title.toLowerCase()}</h2><span class="wc"><button class="x" type="button" data-min aria-label="Minimize ${p.dataset.title}">–</button><button class="x" type="button" data-close aria-label="Close ${p.dataset.title}">✕</button></span>`), b);
});
D.nav.forEach(([id, i, l]) => [$('#dock')].forEach(box => {
  const b = el('button', 'ico', `<span aria-hidden="true">${i}</span>${l}`); b.type = 'button'; b.dataset.open = id; box.append(b);
}));
$$('.socials').forEach(s => s.innerHTML = D.socials.map(([n, u]) => `<a href="${u}" target="_blank" rel="noopener noreferrer" aria-label="Open Cyril Rodriguez on ${n} in a new tab">${n} ↗</a>`).join(''));
const th = (p, i) => `<div class="thumb t${i}" aria-hidden="true"><span>${p.tag}</span><i>${String(i + 1).padStart(2, '0')}</i></div>`;
['#pg', '#pgw'].forEach(sel => D.projects.forEach((p, i) => {
  const a = el('article', 'card proj', `${th(p, i)}<div class="pc"><span class="st">${p.status}</span><h3>${p.t}</h3><p>${p.d}</p>${tagHtml(p.tags)}<button class="btn" type="button" data-p="${i}">View project ↗</button></div>`);
  a.addEventListener('click', e => { if (!e.target.closest('a,button')) showP(i); });
  $(sel).append(a);
}));
$('#pc').textContent = String(D.projects.length).padStart(2, '0');
$('#sg').innerHTML = Object.entries(D.skills).map(([c, k], i) => `<article class="card"><span class="mono soft">${String(i + 1).padStart(2, '0')}</span><h3>${c}</h3><div class="pills">${k.map(x => `<span>${x}</span>`).join('')}</div></article>`).join('');
$('#tl').innerHTML = [['Now', 'Computer Science Student', '3rd-year undergraduate', 'Studying Computer Science while building web projects.'], ...D.jobs]
  .map(([d, t, o, x]) => `<div><span class="mono soft">${d}</span><h3>${t}</h3><p class="soft">${o}</p><p>${x}</p></div>`).join('');
$('#rs').innerHTML = C.resumeFile ? `<a class="btn" href="${C.resumeFile}" target="_blank" rel="noopener noreferrer">View resume</a><a class="btn ghost" href="${C.resumeFile}" download>Download PDF</a>` : '<span class="btn ghost off" aria-disabled="true">Resume PDF coming soon</span>';

function showP(i) {
  const p = D.projects[i];
  $('#pmb').innerHTML = `<span class="st">${p.status}</span><h2>${p.t}</h2>${p.img ? `<img loading="lazy" src="${p.img}" alt="Screenshot of ${p.t}">` : th(p, i)}
    <p>${p.d}</p>${tagHtml(p.tags)}<h3>Features</h3><ul>${p.feat.map(f => `<li>${f}</li>`).join('')}</ul>
    <h3>My role</h3><p>${p.role}</p><h3>Challenges</h3><p>${p.chal}</p><h3>What I learned</h3><p>${p.learn}</p>
    <div class="row" style="margin-top:1rem">${lnk(p.url, 'Live demo')}${lnk(p.gh, 'GitHub')}</div>`;
  modal($('#pm'));
}
document.addEventListener('click', e => { const b = e.target.closest('[data-p]'); if (b) showP(+b.dataset.p); });

/* Certifications */
let ci = 0;
const rc = () => { const c = D.certs[ci], n = D.certs.length;
  $('#cc').innerHTML = c ? `<h3>${c.name}</h3><p>${c.issuer} · ${c.date}</p>${c.url ? `<p><a href="${c.url}" target="_blank" rel="noopener noreferrer">Verify credential ↗</a></p>` : ''}` : '<h3>Certifications coming soon</h3><p class="soft">No credentials listed yet.</p>';
  $('#cp').disabled = $('#cn').disabled = n < 2; };
$('#cp').onclick = () => { ci = (ci - 1 + D.certs.length) % D.certs.length; rc(); };
$('#cn').onclick = () => { ci = (ci + 1) % D.certs.length; rc(); };
rc();

/* ===== WINDOWS: several draggable windows on desktop, one full-screen panel on mobile ===== */
const mq = matchMedia('(max-width:700px)'), wins = new Set(), tasks = $('#tasks');
let z = 30, last = null, drag = null;
const clamp = (v, a, b) => Math.max(a, Math.min(b, v));
const enter = () => { $('#boot').hidden = true; $('#os').hidden = false; try { sessionStorage.setItem('in', '1'); } catch (e) {} };
function sync() {
  [...tasks.children].forEach(b => { if (!wins.has($('#' + b.dataset.task))) b.remove(); });
  wins.forEach(p => {
    let b = $(`[data-task="${p.id}"]`, tasks);
    if (!b) { b = el('button', 'task', p.dataset.title); b.type = 'button'; b.dataset.task = p.id; tasks.append(b); }
    const on = p.classList.contains('top') && !p.classList.contains('min');
    b.classList.toggle('top', on); b.setAttribute('aria-pressed', String(on));
    b.title = p.classList.contains('min') ? 'Restore ' + p.dataset.title : p.dataset.title;
  });
  $$('[data-open]').forEach(b => { const p = $('#w-' + b.dataset.open); b.setAttribute('aria-current', String(wins.has(p) && !p.classList.contains('min'))); });
}
function place(p) {
  ['left', 'top', 'inset', 'margin'].forEach(k => p.style[k] = '');
  if (mq.matches) { p.classList.remove('min'); return; }
  const o = ((wins.size - 1) % 6) * 28;
  p.style.inset = 'auto'; p.style.margin = '0';
  p.style.left = clamp((innerWidth - p.offsetWidth) / 2 + o, 8, Math.max(8, innerWidth - p.offsetWidth - 8)) + 'px';
  p.style.top = (innerWidth > 1000 ? 54 : 96) + o + 'px';
}
function raise(p) {
  if (z > 120) { [...wins].sort((a, b) => a.style.zIndex - b.style.zIndex).forEach((w, i) => w.style.zIndex = 31 + i); z = 31 + wins.size; }
  $$('.panel.top').forEach(x => x.classList.remove('top'));
  p.classList.remove('min'); p.classList.add('top'); p.style.zIndex = ++z; sync();
}
function open(id, from) {
  const p = $('#w-' + id); if (!p || !p.classList.contains('panel')) return;
  last = from || document.activeElement;
  if (mq.matches) wins.forEach(w => w !== p && shut(w, true));
  if (!wins.has(p)) { wins.add(p); p.classList.add('open'); p.scrollTop = 0; place(p); }
  raise(p);
  id === 'terminal' ? $('#ti').focus() : $('h2', p).focus();
}
function shut(p, quiet) {
  p.classList.remove('open', 'min', 'top'); wins.delete(p);
  ['left', 'top', 'inset', 'margin', 'zIndex'].forEach(k => p.style[k] = '');
  if (quiet) return sync();
  const t = [...wins].filter(w => !w.classList.contains('min')).sort((a, b) => a.style.zIndex - b.style.zIndex).pop();
  if (t) { raise(t); $('h2', t).focus(); } else { sync(); last && last.isConnected && last.focus(); }
}
function minimize(p) {
  p.classList.add('min'); p.classList.remove('top'); sync();
  const b = $(`[data-task="${p.id}"]`, tasks); b && b.focus();
}
document.addEventListener('click', e => {
  const o = e.target.closest('[data-open]'); if (o) { enter(); open(o.dataset.open, o); }
  const p = e.target.closest('.panel');
  if (p && e.target.closest('[data-close]')) shut(p);
  if (p && e.target.closest('[data-min]')) minimize(p);
  const t = e.target.closest('[data-task]');
  if (t) { const w = $('#' + t.dataset.task); if (w.classList.contains('min') || !w.classList.contains('top')) { raise(w); $('h2', w).focus(); } else minimize(w); }
});
/* focus on click + drag by title bar */
document.addEventListener('pointerdown', e => {
  const p = e.target.closest('.panel.open'); if (!p) return;
  if (!p.classList.contains('top')) raise(p);
  const tb = e.target.closest('.tb'); if (!tb || e.target.closest('button') || mq.matches || e.button) return;
  drag = { p, dx: e.clientX - p.offsetLeft, dy: e.clientY - p.offsetTop };
  tb.setPointerCapture(e.pointerId); tb.classList.add('drag');
});
document.addEventListener('pointermove', e => {
  if (!drag) return; const p = drag.p;
  p.style.left = clamp(e.clientX - drag.dx, 90 - p.offsetWidth, innerWidth - 90) + 'px';
  p.style.top = clamp(e.clientY - drag.dy, 52, innerHeight - 48) + 'px';
});
const drop = () => { if (drag) { $('.tb.drag') && $('.tb.drag').classList.remove('drag'); drag = null; } };
document.addEventListener('pointerup', drop); document.addEventListener('pointercancel', drop);
mq.addEventListener('change', () => {
  if (mq.matches) { const t = $('.panel.top') || [...wins][0]; wins.forEach(w => w !== t && shut(w, true)); }
  wins.forEach(place); sync();
});
addEventListener('resize', () => !mq.matches && wins.forEach(p => {
  if (p.classList.contains('min')) return;
  p.style.left = clamp(p.offsetLeft, 8, Math.max(8, innerWidth - p.offsetWidth - 8)) + 'px';
  p.style.top = clamp(p.offsetTop, 56, Math.max(56, innerHeight - 90)) + 'px';
}));
function modal(d) { d.showModal(); root.classList.add('modal'); }
$$('dialog').forEach(d => d.addEventListener('close', () => root.classList.remove('modal')));
$('#enter').onclick = () => { enter(); $('#hello').focus(); };
document.addEventListener('keydown', e => { if (e.key === 'Escape' && !$('dialog[open]')) { const t = $('.panel.top'); t && shut(t); } });
const h = location.hash.slice(1), wid = ['games', 'terminal', 'contact'].includes(h) ? h : '';
let seen = false; try { seen = sessionStorage.getItem('in'); } catch (e) {}
if (h || seen) enter(); if (wid) open(wid);
/* nav highlight + scroll reveal */
const links = $$('.nav a'), io = new IntersectionObserver(es => es.forEach(e => e.isIntersecting && links.forEach(l => l.classList.toggle('act', l.getAttribute('href') === '#' + e.target.id))), { rootMargin: '-30% 0px -60% 0px' });
$$('main section[id]').forEach(x => io.observe(x));
const ro = new IntersectionObserver((es, o) => es.forEach(e => { if (e.isIntersecting) { e.target.classList.add('in'); o.unobserve(e.target); } }), { threshold: .1 });
$$('.rv').forEach(x => ro.observe(x));

/* ===== THEME + CLOCK ===== */
const setTheme = t => { root.dataset.theme = t; $('#th').value = t; try { localStorage.setItem('portfolio-theme', t); } catch (e) {} };
$('#th').value = root.dataset.theme; $('#th').onchange = e => setTheme(e.target.value);
const tick = () => { const n = new Date(); $('#clk').textContent = n.toLocaleTimeString(); $('#dt').textContent = n.toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' }); };
tick(); setInterval(tick, 1000);

/* ===== TERMINAL ===== */
const out = $('#tout'), ti = $('#ti');
const say = t => { const p = el('p'); p.textContent = t; out.append(p); out.scrollTop = out.scrollHeight; };
const cmds = {
  help: () => say('Commands: about, projects, skills, journey, resume, certs, games, contact, theme <name>, whoami, clear, help'),
  whoami: () => say('guest. Visiting Cyril Rodriguez, Computer Science student.'),
  clear: () => out.replaceChildren(),
  theme: a => THEMES.includes(a) ? (setTheme(a), say('Theme: ' + a)) : say('Themes: ' + THEMES.join(', ')),
  secret: () => secret()
};
['projects', 'games', 'contact'].forEach(k => cmds[k] = () => { say('Opening ' + k + '...'); setTimeout(() => open(k), 350); });
const SEC = { about: 'about', skills: 'skills', journey: 'journey', resume: 'resume', certs: 'certifications' };
Object.keys(SEC).forEach(k => cmds[k] = () => { say('Scrolling to ' + k + '...'); setTimeout(() => { const t = $('#' + SEC[k]); t && t.scrollIntoView(); }, 350); });
say("Welcome, guest. Type 'help' to see commands.");
$('#tf').onsubmit = e => {
  e.preventDefault(); const v = ti.value.trim(); ti.value = ''; say('guest@portfolio:~$ ' + v); if (!v) return;
  const [c, a] = v.toLowerCase().split(/\s+/); (cmds[c] || (() => say(`command not found: ${c}. Try 'help'.`)))(a);
};

/* ===== EASTER EGGS ===== */
function secret() { modal($('#sd')); }
$('#q').onclick = secret;
const K = ['arrowup', 'arrowup', 'arrowdown', 'arrowdown', 'arrowleft', 'arrowright', 'arrowleft', 'arrowright', 'b', 'a']; let ki = 0;
addEventListener('keydown', e => {
  if (e.target.closest('input,textarea,select')) return;
  const k = e.key.toLowerCase(); ki = k === K[ki] ? ki + 1 : (k === K[0] ? 1 : 0);
  if (ki === K.length) { ki = 0; root.classList.add('konami'); setTimeout(() => root.classList.remove('konami'), 5000); toast('KONAMI MODE ACTIVATED'); }
});

/* ===== GAME 1: CATCH THE CODE ===== */
const cv = $('#cv'), cx = cv.getContext('2d'), cst = $('#cst'), cb = $('#cb'), SY = ['{}', '</>', '();', '[]', '=>', '&&'];
let g = null; const pad = n => String(n).padStart(3, '0');
function draw() {
  const s = getComputedStyle(root); cx.clearRect(0, 0, 320, 320); cx.font = '600 18px "IBM Plex Mono",monospace'; cx.textAlign = 'center';
  cx.fillStyle = s.getPropertyValue('--t'); g.it.forEach(i => cx.fillText(i.s, i.x, i.y));
  cx.fillStyle = s.getPropertyValue('--a'); cx.fillRect(g.x - 30, 298, 60, 12);
}
function fin() { cst.textContent = `GAME OVER. SCORE: ${pad(g.s)}`; g = null; cb.disabled = false; cb.textContent = 'Restart'; }
function loop(n) {
  if (!g) return;
  const dt = Math.min(.05, (n - g.t0) / 1000 || 0); g.t0 = n; g.left -= dt; g.sp -= dt;
  if (g.sp <= 0) { g.it.push({ x: 24 + Math.random() * 272, y: -10, s: SY[Math.random() * SY.length | 0], v: 90 + Math.random() * 90 }); g.sp = .55; }
  g.it.forEach(i => i.y += i.v * dt);
  g.it = g.it.filter(i => { if (i.y > 285 && i.y < 312 && Math.abs(i.x - g.x) < 38) { g.s++; return false; } return i.y < 330; });
  draw(); cst.textContent = `SCORE: ${pad(g.s)}  TIME: ${Math.max(0, Math.ceil(g.left))}s`;
  if (g.left <= 0 || !$('#w-games').matches('.open:not(.min)')) return fin();
  requestAnimationFrame(loop);
}
cb.onclick = () => { g = { s: 0, left: 30, x: 160, it: [], sp: 0, t0: performance.now() }; cb.disabled = true; requestAnimationFrame(loop); };
cv.addEventListener('pointermove', e => { if (g) { const r = cv.getBoundingClientRect(); g.x = Math.max(30, Math.min(290, (e.clientX - r.left) / r.width * 320)); } });
addEventListener('keydown', e => { if (g && (e.key === 'ArrowLeft' || e.key === 'ArrowRight')) { e.preventDefault(); g.x = Math.max(30, Math.min(290, g.x + (e.key === 'ArrowLeft' ? -26 : 26))); } });

/* ===== GAME 2: FIX THE CODE ===== */
const FX = [
  { code: 'const x = 5\nconsole.log(y)', q: 'Line 2 throws a ReferenceError. Which replacement fixes it?', o: ['console.log(x)', 'console.log(Y)', 'console.log(x;'], a: 0 },
  { code: 'function add(a, b) {\n  a + b\n}\nconsole.log(add(2, 3))', q: 'This prints undefined. Replace line 2:', o: ['return a + b', 'print a + b', 'a + b;;'], a: 0 },
  { code: 'for i in range(3)\n    print(i)', q: 'Python raises a SyntaxError. Replace line 1:', o: ['for i in range(3):', 'for i in range(3);', 'for (i in range(3)):'], a: 0 }
];
let fi = 0; const fo = $('#fo'), fs = $('#fs'), fn = $('#fn');
function rf() {
  const c = FX[fi]; $('#fq').textContent = c.q; $('#fc').textContent = c.code; fs.textContent = ''; fn.hidden = true;
  fo.replaceChildren(...c.o.map((t, k) => {
    const b = el('button', 'btn ghost'); b.type = 'button'; b.textContent = t;
    b.onclick = () => { if (k === c.a) { fs.textContent = 'SYSTEM OVERRIDE SUCCESSFUL'; fn.hidden = false; $$('button', fo).forEach(x => x.disabled = true); } else fs.textContent = 'ACCESS DENIED. Try again.'; };
    return b;
  }));
}
fn.onclick = () => { fi = (fi + 1) % FX.length; rf(); }; rf();

/* ===== CONTACT FORM ===== */
const cf = $('#cf'), cfs = $('#cfs');
cf.onsubmit = async e => {
  e.preventDefault(); const fd = new FormData(cf); if (fd.get('botcheck')) return;
  if (!C.formEndpoint) {
    const body = `${fd.get('message')}\n\nFrom: ${fd.get('name')} (${fd.get('email')})`;
    location.href = `mailto:${EMAIL}?subject=${encodeURIComponent(fd.get('subject'))}&body=${encodeURIComponent(body)}`;
    cfs.textContent = 'Opening your email app. Send the draft from there.'; return;
  }
  if (C.formAccessKey) fd.append('access_key', C.formAccessKey);
  cfs.textContent = 'Sending...';
  try {
    const r = await fetch(C.formEndpoint, { method: 'POST', body: fd, headers: { Accept: 'application/json' } });
    if (!r.ok) throw 0; cf.reset(); cfs.textContent = 'Message sent. Thank you!';
  } catch (err) { cfs.textContent = `Could not send. Please email ${EMAIL} directly.`; }
};

/* ===== CUSTOM CURSOR: glowing dot with a chart-line trail (mouse only) ===== */
if (matchMedia('(hover:hover) and (pointer:fine)').matches) {
  const rm = matchMedia('(prefers-reduced-motion:reduce)'), c = el('canvas', 'cur'), x = c.getContext('2d');
  c.setAttribute('aria-hidden', 'true'); document.body.append(c); root.classList.add('cc');
  const fit = () => { c.width = innerWidth; c.height = innerHeight; draw(); };
  const acc = () => getComputedStyle(root).getPropertyValue('--a').trim() || '#ef514a';
  let pts = [], mx = -50, my = -50, col = acc(), raf = 0; const T = 500;
  new MutationObserver(() => { col = acc(); draw(); }).observe(root, { attributes: true, attributeFilter: ['data-theme'] });
  function draw() {
    const now = performance.now(); pts = pts.filter(p => now - p.t < T);
    x.clearRect(0, 0, c.width, c.height); x.strokeStyle = x.fillStyle = col; x.lineWidth = 1.5; x.lineJoin = 'round';
    for (let i = 1; i < pts.length; i++) {
      const f = 1 - (now - pts[i].t) / T;
      x.globalAlpha = f * .7; x.beginPath(); x.moveTo(pts[i - 1].x, pts[i - 1].y); x.lineTo(pts[i].x, pts[i].y); x.stroke();
      x.globalAlpha = f; x.fillRect(pts[i].x - 1.5, pts[i].y - 1.5, 3, 3);
    }
    x.globalAlpha = 1; x.shadowColor = col; x.shadowBlur = 14; x.beginPath(); x.arc(mx, my, 4, 0, 7); x.fill(); x.shadowBlur = 0;
    raf = pts.length ? requestAnimationFrame(draw) : 0;
  }
  addEventListener('pointermove', e => {
    if (e.pointerType !== 'mouse') return;
    mx = e.clientX; my = e.clientY; root.classList.add('cshow');
    const l = pts[pts.length - 1];
    if (!rm.matches && (!l || Math.hypot(mx - l.x, my - l.y) > 14)) pts.push({ x: mx, y: my, t: performance.now() });
    raf || (raf = requestAnimationFrame(draw));
  });
  root.addEventListener('mouseleave', () => root.classList.remove('cshow'));
  addEventListener('resize', fit); fit();
}
})();
