// Mobile sidebar toggle
const sidebarEl = document.getElementById('sidebar');
const menuBtn   = document.getElementById('mobile-menu-btn');
if (menuBtn) {
  menuBtn.addEventListener('click', () => {
    sidebarEl.classList.toggle('open');
  });
}

// Nav active state on scroll
const navItems   = document.querySelectorAll('.nav-item');
const sections   = document.querySelectorAll('main section[id]');
const observer   = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      navItems.forEach(l => l.classList.remove('active'));
      const active = document.querySelector(`.nav-item[href="#${entry.target.id}"]`);
      if (active) active.classList.add('active');
    }
  });
}, { rootMargin: '-40% 0px -55% 0px' });
sections.forEach(s => observer.observe(s));

// -- Scroll reveal --
const revealEls = document.querySelectorAll('.reveal');
const revealObs = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add('visible');
      revealObs.unobserve(e.target);
    }
  });
}, { threshold: 0.12 });
revealEls.forEach(el => revealObs.observe(el));

// Typewriter
const phrases = [
  'BSc IT Graduate',
  'Aspiring Software Engineer',
  'ICT Systems Coordinator',
  'Full-Stack Developer',
  'Problem Solver',
];
let phraseIdx = 0, charIdx = 0, deleting = false;
const twEl = document.getElementById('typewriter-el');
function typewrite() {
  if (!twEl) return;
  const current = phrases[phraseIdx];
  twEl.textContent = deleting ? current.slice(0, charIdx--) : current.slice(0, charIdx++);
  if (!deleting && charIdx > current.length) { deleting = true; setTimeout(typewrite, 1800); return; }
  if (deleting && charIdx < 0)  { deleting = false; phraseIdx = (phraseIdx + 1) % phrases.length; }
  setTimeout(typewrite, deleting ? 45 : 90);
}
typewrite();

// -- Projects carousel controller --
const projectCards = Array.from(document.querySelectorAll('.project-card'));
const projectNum = document.getElementById('proj-num');
const projectTags = document.getElementById('proj-tags');
const projectTitle = document.getElementById('proj-title');
const projectDesc = document.getElementById('proj-desc');
const projectStack = document.getElementById('proj-stack');
const projectLive = document.getElementById('proj-live');
const projectGitHub = document.getElementById('proj-github');
const projectImg = document.getElementById('proj-img');
const projectCounter = document.getElementById('proj-counter');
const projectDots = document.getElementById('proj-dots');
const projectPrev = document.getElementById('proj-prev');
const projectNext = document.getElementById('proj-next');

let projectIndex = 0;
let projectTimer = null;

function generateProjectDots() {
  if (!projectDots || !projectCards.length) return;

  projectCards.forEach((card, index) => {
    const dot = document.createElement('button');
    dot.type = 'button';
    dot.className = 'dot';
    dot.dataset.index = String(index);
    dot.setAttribute('aria-label', `Show project ${index + 1}`);
    dot.addEventListener('click', () => {
      stopAutoProject();
      setProject(index);
      startAutoProject();
    });
    projectDots.appendChild(dot);
  });
}

// Shows the button only when there's a real link; a download path turns
// the Live Site button into a file download.
function setProjectLink(button, url, download) {
  const target = download || url;
  button.style.display = target && target !== '#' ? '' : 'none';
  button.href = target || '#';

  if (button !== projectLive) return;
  if (download) {
    button.setAttribute('download', '');
    button.removeAttribute('target');
    button.innerHTML = `<i class="fas fa-download"></i> Download .${download.split('.').pop()} File`;
  } else {
    button.removeAttribute('download');
    button.setAttribute('target', '_blank');
    button.innerHTML = '<i class="fas fa-external-link-alt"></i> Live Site';
  }
}

function setProject(index) {
  if (!projectCards.length) return;

  const card = projectCards[index % projectCards.length];
  if (!card) return;

  projectIndex = index;

  projectNum.textContent = `0${index + 1}`;
  projectTitle.textContent = card.dataset.title;
  projectDesc.textContent = card.dataset.description;
  projectStack.textContent = card.dataset.stack;
  setProjectLink(projectLive, card.dataset.live, card.dataset.download);
  setProjectLink(projectGitHub, card.dataset.github);
  projectImg.src = card.dataset.image;
  projectImg.alt = card.dataset.title;
  projectCounter.textContent = `${index + 1} / ${projectCards.length}`;

  projectTags.innerHTML = '';
  const tags = String(card.dataset.tags || '').split('|').filter(Boolean);
  tags.forEach(tag => {
    const span = document.createElement('span');
    span.textContent = tag;
    projectTags.appendChild(span);
  });

  const dots = Array.from(projectDots.children);
  dots.forEach((dot, dotIndex) => {
    dot.classList.toggle('active', dotIndex === index);
  });
}

function nextProject() {
  if (!projectCards.length) return;
  const nextIndex = (projectIndex + 1) % projectCards.length;
  setProject(nextIndex);
}

function prevProject() {
  if (!projectCards.length) return;
  const prevIndex = (projectIndex - 1 + projectCards.length) % projectCards.length;
  setProject(prevIndex);
}

function startAutoProject() {
  if (!projectCards.length || projectTimer) return;
  projectTimer = setInterval(nextProject, 4200);
}

function stopAutoProject() {
  if (!projectTimer) return;
  clearInterval(projectTimer);
  projectTimer = null;
}

function bindProjectHoverImage() {
  if (!projectImg || !projectCards.length) return;

  const wrap = document.getElementById('proj-img-wrap');
  if (!wrap) return;

  wrap.addEventListener('mouseenter', () => {
    const card = projectCards[projectIndex];
    if (!card || !card.dataset.hoverImage) return;
    projectImg.src = card.dataset.hoverImage;
  });

  wrap.addEventListener('mouseleave', () => {
    const card = projectCards[projectIndex];
    if (!card) return;
    projectImg.src = card.dataset.image;
  });
}

if (projectCards.length) {
  generateProjectDots();
  setProject(0);

  if (projectPrev) projectPrev.addEventListener('click', () => {
    stopAutoProject();
    prevProject();
    startAutoProject();
  });

  if (projectNext) projectNext.addEventListener('click', () => {
    stopAutoProject();
    nextProject();
    startAutoProject();
  });

  const showcase = document.querySelector('.proj-showcase');
  if (showcase) {
    showcase.addEventListener('mouseenter', stopAutoProject);
    showcase.addEventListener('mouseleave', startAutoProject);
  }

  bindProjectHoverImage();
  startAutoProject();
}

// -- EmailJS init --
emailjs.init("tjnntPMDpcz-ycImF");

const contactForm = document.getElementById('contact-form');
const submitBtn = document.getElementById('submit-btn');

if (contactForm) {
  contactForm.addEventListener('submit', function (e) {
    e.preventDefault();

    if (!contactForm.checkValidity()) {
      contactForm.reportValidity();
      return;
    }

    if (submitBtn) {
      submitBtn.disabled = true;
      submitBtn.innerHTML = '<i class="fas fa-paper-plane"></i> Sending...';
    }

    emailjs.sendForm('service_9src0wb', 'template_px9v3p2', contactForm)
      .then(function () {
        alert('Message sent successfully!');
        contactForm.reset();
        if (submitBtn) {
          submitBtn.disabled = false;
          submitBtn.innerHTML = '<i class="fas fa-paper-plane"></i> Send Message';
        }
      }, function () {
        alert('Message failed to send. Please try again.');
        if (submitBtn) {
          submitBtn.disabled = false;
          submitBtn.innerHTML = '<i class="fas fa-paper-plane"></i> Send Message';
        }
      });
  });
}