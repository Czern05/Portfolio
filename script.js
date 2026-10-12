/* Portfolio content: update project details, image paths, skills, and certifications here. */
const CONTENT = {
  projects: [
    {
      title: "Zark's Burgers Self-Service Kiosk", category: 'KIOSK', status: 'Completed',
      description: 'A touch-friendly Python kiosk for browsing the menu, building dine-in or takeout orders, applying discounts, and checking out.',
      technologies: ['Python', 'Tkinter', 'Pillow'],
      features: ['Browse a photo-based menu organized into food categories', 'Choose dine-in or takeout and add menu items to an order cart', 'Increase, decrease, remove, or clear cart items', 'Calculate subtotal, discount, 12% VAT, and grand total', 'Accept a cash payment amount, validate the payment, and calculate change', 'Generate a receipt with a unique session receipt number and order summary', 'Keep completed transaction history in memory for the current app session'],
      role: 'Designed and developed the kiosk interface and ordering flow.',
      learning: 'Built experience creating a desktop kiosk interface with Tkinter and Pillow.',
      image: 'assets/projects/zarks-kiosk.webp' // Zark's project cover image
    },
    {
      title: 'DLSAU Enrollment Management System', category: 'WEB APPLICATION', status: 'Completed',
      description: 'A PHP and MariaDB enrollment management web application with separate student and administrator workflows for enrollment, curriculum, schedules, grades, and student accounts.',
      technologies: ['HTML', 'CSS', 'PHP', 'MariaDB', 'SQL'],
      features: ['Provide login access for student and administrator roles', 'Let students view their dashboard, profile, enrolled subjects, and available subject offerings', 'Support subject enlistment and display of weekly class schedules, including unscheduled subjects', 'Show curriculum progress by year level and trimester, including prerequisite information', 'Display posted grades and grade status, with grade visibility restricted when an outstanding balance remains', 'Show student account statements, payments, adjustments, and outstanding balances, with PDF statement download', 'Allow administrators to manage student accounts, programs, subject offerings, schedules, academic terms, grades, fee settings, assessments, and payment records'],
      role: 'Contributed to the interface and PHP back end.',
      learning: 'Practiced connecting application workflows to structured relational database data.',
      image: 'assets/projects/dlsau-enrollment.webp' // Enrollment portal screenshot
    },
    {
      title: 'Personal Portfolio', category: 'WEBSITE', status: 'In progress',
      description: 'A responsive portfolio website presenting selected projects, technologies, leadership experience, certifications, and resume.',
      technologies: ['HTML', 'CSS', 'JavaScript'],
      features: ['Responsive minimalist layout with light and dark themes', 'Theme preference saved between visits when browser storage is available', 'Dynamic project cards and detail dialogs with screenshots, overview, role, learning notes, features, and technology tags', 'Project screenshot placeholders for projects without images', 'Grouped tech-stack listings and dynamically rendered certification entries', 'Configurable resume PDF view and download links', 'Profile photo with initials fallback, plus About and JPCS leadership information', 'Direct email and social profile links', 'Semantic HTML and keyboard-accessible native project dialog'],
      role: 'Designed and built the portfolio.',
      learning: 'Practiced responsive layouts, accessible interactions, and organizing content with plain JavaScript.',
      image: 'assets/projects/portfolio.webp' // Portfolio home page screenshot
    }
  ],
  skills: {
    'Programming languages': ['Python', 'JavaScript', 'PHP', 'Java'],
    'Web technologies': ['HTML5', 'CSS3', 'Responsive Design', 'Bootstrap'],
    'Databases': ['SQL', 'MySQL', 'MariaDB', 'Database Design'],
    'Tools': ['Git', 'GitHub', 'NetBeans']
  },
  certifications: [
    // Newest first. image: path to the certificate scan inside assets/certificates/
    { name: 'Data to Decisions: The Basics of Machine Learning', type: 'Certificate of Participation', issuer: 'De La Salle Araneta University', date: 'June 10, 2026', image: 'assets/certificates/data-to-decisions.webp' },
    { name: 'Synergy of IoT, AI & Robotics', type: 'Certificate of Attendance', issuer: 'Philippine Computer Society (PCS)', date: 'February 27, 2026', image: 'assets/certificates/iot-ai-robotics.webp' },
    { name: 'From Microcontrollers to Smart Solutions: A Journey into IoT Development', type: 'Certificate of Attendance', issuer: 'De La Salle Araneta University', date: 'August 1, 2025', image: 'assets/certificates/microcontrollers-iot.webp' }
  ]
};

const $ = (selector, root = document) => root.querySelector(selector);
const safe = value => String(value ?? '').replace(/[&<>"']/g, ch => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[ch]));
const tags = values => `<div class="tags">${values.map(value => `<span>${safe(value)}</span>`).join('')}</div>`;

function projectMedia(project) {
  if (project.image) return `<img class="project-image" src="${safe(project.image)}" alt="${safe(project.title)} project image" loading="lazy">`;
  return `<div class="image-placeholder" role="img" aria-label="Screenshot placeholder for ${safe(project.title)}"><span>PROJECT UI SCREENSHOT</span><small>Add image in assets/projects/</small></div>`;
}

const projectList = $('#project-list');
CONTENT.projects.forEach((project, index) => {
  const card = document.createElement('article');
  card.className = 'project-card';
  card.innerHTML = `${projectMedia(project)}<p class="eyebrow">${safe(project.category)} <span>·</span> ${safe(project.status)}</p><h3>${safe(project.title)}</h3><p>${safe(project.description)}</p>${tags(project.technologies)}<button class="text-link" type="button" data-project="${index}">View project details ↗</button>`;
  projectList.append(card);
});

$('#skill-list').innerHTML = Object.entries(CONTENT.skills).map(([category, values]) => `<article class="skill-group"><h3>${safe(category)}</h3>${tags(values)}</article>`).join('');
const certList = $('#cert-list');
const certs = CONTENT.certifications;
if (!certs.length) {
  certList.innerHTML = '<div class="cert-empty"><h3>Certifications coming soon</h3><p class="muted">No credentials listed yet.</p></div>';
} else {
  const slides = certs.map((cert, i) => `<article class="cert-slide" aria-roledescription="slide" aria-label="${i + 1} of ${certs.length}"><div class="cert-info"><p class="eyebrow">${safe(cert.type)}</p><h3>${safe(cert.name)}</h3><p class="muted">${safe(cert.issuer)}${cert.date ? ` · ${safe(cert.date)}` : ''}</p><button class="text-link" type="button" data-cert="${i}">View certificate ↗</button></div></article>`).join('');
  const dots = certs.map((cert, i) => `<button class="cert-dot" type="button" data-go="${i}" aria-label="Show certificate ${i + 1}: ${safe(cert.name)}"></button>`).join('');
  certList.innerHTML = `<div class="cert-carousel" role="region" aria-roledescription="carousel" aria-label="Certifications" tabindex="0"><button class="cert-nav" type="button" data-dir="-1" aria-label="Previous certificate">←</button><div class="cert-viewport"><div class="cert-track">${slides}</div></div><button class="cert-nav" type="button" data-dir="1" aria-label="Next certificate">→</button></div><div class="cert-status"><span id="cert-count" aria-live="polite"></span><div class="cert-dots">${dots}</div></div>`;
  const viewport = $('.cert-viewport', certList), count = $('#cert-count'), dotButtons = [...certList.querySelectorAll('.cert-dot')];
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  let current = 0;
  const show = i => { current = i; count.textContent = `${i + 1} / ${certs.length}`; dotButtons.forEach((dot, n) => dot.setAttribute('aria-current', n === i ? 'true' : 'false')); };
  const go = i => { const next = (i + certs.length) % certs.length; viewport.scrollTo({ left: next * viewport.clientWidth, behavior: reduceMotion.matches ? 'auto' : 'smooth' }); show(next); };
  viewport.addEventListener('scroll', () => { const i = Math.round(viewport.scrollLeft / viewport.clientWidth); if (i !== current && i >= 0 && i < certs.length) show(i); }, { passive: true });
  window.addEventListener('resize', () => { viewport.scrollLeft = current * viewport.clientWidth; });
  certList.addEventListener('click', event => {
    const nav = event.target.closest('[data-dir]'), dot = event.target.closest('[data-go]'), view = event.target.closest('[data-cert]');
    if (nav) go(current + Number(nav.dataset.dir));
    else if (dot) go(Number(dot.dataset.go));
    else if (view) openCert(Number(view.dataset.cert));
  });
  $('.cert-carousel', certList).addEventListener('keydown', event => {
    if (event.key === 'ArrowLeft') { event.preventDefault(); go(current - 1); }
    if (event.key === 'ArrowRight') { event.preventDefault(); go(current + 1); }
  });
  show(0);
}
const certDialog = $('#cert-dialog');
function openCert(index) {
  const cert = certs[index];
  const image = $('#cert-dialog-image');
  image.src = cert.image;
  image.alt = `${cert.type}: ${cert.name}`;
  certDialog.showModal();
}
$('.cert-close').addEventListener('click', () => certDialog.close());
certDialog.addEventListener('click', event => { if (event.target === certDialog) certDialog.close(); });

const dialog = $('#project-dialog');
function openProject(index) {
  const project = CONTENT.projects[index];
  $('#project-detail').innerHTML = `<p class="eyebrow">${safe(project.category)} · ${safe(project.status)}</p><h2 id="dialog-title">${safe(project.title)}</h2>${projectMedia(project)}<div class="detail-columns"><div><h3>Overview</h3><p>${safe(project.description)}</p><h3>My role</h3><p>${safe(project.role)}</p><h3>What I learned</h3><p>${safe(project.learning)}</p></div><div><h3>Key features</h3><ul>${project.features.map(feature => `<li>${safe(feature)}</li>`).join('')}</ul><h3>Technologies</h3>${tags(project.technologies)}</div></div>`;
  dialog.showModal();
}
projectList.addEventListener('click', event => {
  const button = event.target.closest('[data-project]');
  if (button) openProject(Number(button.dataset.project));
});
$('.dialog-close').addEventListener('click', () => dialog.close());
dialog.addEventListener('click', event => { if (event.target === dialog) dialog.close(); });

const resumeFile = window.SITE_CONFIG?.resumeFile?.trim();
if (resumeFile) {
  $('#resume-note').textContent = 'Open or save a copy of my resume PDF.';
  $('#resume-actions').innerHTML = `<a class="button" href="${safe(resumeFile)}" target="_blank" rel="noopener noreferrer">View resume ↗</a><a class="button secondary" href="${safe(resumeFile)}" download>Download PDF ↓</a>`;
  const resumePreview = window.SITE_CONFIG?.resumePreview?.trim();
  if (resumePreview) {
    const preview = $('#resume-preview');
    preview.href = resumeFile;
    $('img', preview).src = resumePreview;
    preview.hidden = false;
  }
}

const root = document.documentElement;
const themeButton = $('#theme-toggle');
function setTheme(theme) {
  root.dataset.theme = theme;
  themeButton.textContent = theme === 'dark' ? 'Light mode' : 'Dark mode';
  try { localStorage.setItem('portfolio-theme', theme); } catch (_) {}
}
let savedTheme = 'dark';
try { savedTheme = localStorage.getItem('portfolio-theme') || 'dark'; } catch (_) {}
setTheme(savedTheme === 'light' ? 'light' : 'dark');
themeButton.addEventListener('click', () => setTheme(root.dataset.theme === 'dark' ? 'light' : 'dark'));
