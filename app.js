// === SECTION: Smooth Navigation Highlighting ===
// Select all page sections and nav links for scroll tracking
const sections = document.querySelectorAll("section");
const navLinks = document.querySelectorAll(".nav-link");

// === SECTION: Mobile Menu Toggle ===
const menu = document.querySelector('#mobile-menu');
const navList = document.querySelector('nav ul');

if (menu && navList) {
  menu.addEventListener('click', () => {
    menu.classList.toggle('is-active');     // Animate hamburger icon
    navList.classList.toggle('active');     // Toggle mobile menu visibility
  });
}

// Automatic & manual scrolling
const track = document.querySelector('.projects-track');
const btnLeft = document.querySelector('.scroll-btn.left');
const btnRight = document.querySelector('.scroll-btn.right');

// === SECTION: Typewriter Effect ===
const phrases = [
  "an Aspiring Web Developer",
  "an Aspiring Software Engineer",
  "an IT Graduate",
  "a Tech Enthusiast",
  "a Problem Solver",
];

let currentPhrase = 0;
let currentChar = 0;
let isDeleting = false;

const speed = 100;       // Typing speed (ms)
const delay = 2000;      // Pause before deleting (ms)
const textElement = document.querySelector(".typewriter-text");

// Projects Carousel Auto-Scroll
let scrollInterval;




if (btnLeft && track) {
  btnLeft.addEventListener('click', () => track.scrollBy({ left: -310, behavior: 'smooth' }));
}
if (btnRight && track) {
  btnRight.addEventListener('click', () => track.scrollBy({ left: 310, behavior: 'smooth' }));
}

if (track) {
  track.addEventListener('mouseenter', () => clearInterval(scrollInterval));
}

// ============================
// PROJECTS V2 (Latest Layout)
// ============================

const projectItems = Array.from(document.querySelectorAll(".project-item"));

const projectNumberEl = document.getElementById("projectNumber");
const projectTitleEl = document.getElementById("projectTitle");
const projectDescEl = document.getElementById("projectDesc");
const projectStackEl = document.getElementById("projectStack");

const projectImageEl = document.getElementById("projectImage");
const projectLiveEl = document.getElementById("projectLive");
const projectGithubEl = document.getElementById("projectGithub");

const prevBtn = document.getElementById("projPrev");
const nextBtn = document.getElementById("projNext");

let currentProject = 0;
let autoTimer = null;

function pad2(n) {
  return String(n + 1).padStart(2, "0");
}

function setProject(index) {
  currentProject = (index + projectItems.length) % projectItems.length;

  const item = projectItems[currentProject];
  const title = item.dataset.title || "";
  const desc = item.dataset.desc || "";
  const stack = item.dataset.stack || "";
  const front = item.dataset.front || "";
  const back = item.dataset.back || "";
  const live = item.dataset.live || "";
  const github = item.dataset.github || "";

  projectNumberEl.textContent = pad2(currentProject);
  projectTitleEl.textContent = title;
  projectDescEl.textContent = desc;
  projectStackEl.textContent = stack;

  // default image (front)
  projectImageEl.src = front;
  projectImageEl.alt = `${title} preview`;

  // store hover images on the image element (easy swap)
  projectImageEl.dataset.front = front;
  projectImageEl.dataset.back = back;

  // links
  if (live && live.trim() !== "") {
    projectLiveEl.style.display = "inline-flex";
    projectLiveEl.href = live;
  } else {
    projectLiveEl.style.display = "none";
    projectLiveEl.removeAttribute("href");
  }

  if (github && github.trim() !== "") {
    projectGithubEl.href = github;
  } else {
    projectGithubEl.href = "#";
  }
}

function nextProject() {
  setProject(currentProject + 1);
}

function prevProject() {
  setProject(currentProject - 1);
}

function startAuto() {
  stopAuto();
  autoTimer = setInterval(nextProject, 5000);
}

function stopAuto() {
  if (autoTimer) clearInterval(autoTimer);
  autoTimer = null;
}

// arrow clicks
if (prevBtn) prevBtn.addEventListener("click", prevProject);
if (nextBtn) nextBtn.addEventListener("click", nextProject);

// pause auto on hover (image area + buttons)
const projectsSection = document.querySelector(".projects-v2");
if (projectsSection) {
  projectsSection.addEventListener("mouseenter", stopAuto);
  projectsSection.addEventListener("mouseleave", startAuto);
}

// image swap on hover (front -> back)
const imageWrap = document.querySelector(".project-image-wrap");
if (imageWrap) {
  imageWrap.addEventListener("mouseenter", () => {
    const back = projectImageEl.dataset.back;
    if (back && back.trim() !== "") projectImageEl.src = back;
  });
  imageWrap.addEventListener("mouseleave", () => {
    const front = projectImageEl.dataset.front;
    if (front && front.trim() !== "") projectImageEl.src = front;
  });
}

// init
if (projectItems.length) {
  setProject(0);
  startAuto();
}



// Typewriter function
function type() {
  const current = phrases[currentPhrase];
  const displayedText = current.slice(0, currentChar);
  textElement.textContent = displayedText;

  if (!isDeleting && currentChar < current.length) {
    currentChar++;
    setTimeout(type, speed);
  } else if (isDeleting && currentChar > 0) {
    currentChar--;
    setTimeout(type, speed / 2);
  } else {
    isDeleting = !isDeleting;
    if (!isDeleting) currentPhrase = (currentPhrase + 1) % phrases.length;
    setTimeout(type, delay);
  }
}

document.addEventListener("DOMContentLoaded", type);

// === SECTION: EmailJS Integration ===
const contactForm = document.getElementById('contact-form');
if (contactForm) {
  contactForm.addEventListener('submit', function (e) {
    e.preventDefault();

    emailjs.sendForm('service_xt2omy4', 'template_e0a7je6', this)
      .then(() => {
        alert("Message sent successfully!");
        this.reset();
      }, (error) => {
        console.log(error);
        alert("Failed to send message. Please try again later.");
      });
  });
}

// === SECTION: ScrollSpy Navigation Highlighting ===
window.addEventListener("scroll", () => {
  let current = "";

  sections.forEach((section) => {
    const sectionTop = section.offsetTop - 150;
    const sectionHeight = section.clientHeight;

    if (pageYOffset >= sectionTop && pageYOffset < sectionTop + sectionHeight) {
      current = section.getAttribute("id");
    }
  });

  navLinks.forEach((link) => {
    link.classList.remove("active");
    if (link.getAttribute("href") === "#" + current) {
      link.classList.add("active");
    }
  });

  // Optional UX: Close mobile menu when user scrolls
  if (navList.classList.contains('active')) {
    navList.classList.remove('active');
    menu.classList.remove('is-active');
  }
});
