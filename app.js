// === SECTION: Smooth Navigation Highlighting ===
// Select all page sections and nav links for scroll tracking
const sections = document.querySelectorAll("section");
const navLinks = document.querySelectorAll(".nav-link");

// === SECTION: Mobile Menu Toggle ===
const menu = document.querySelector('#mobile-menu');
const navList = document.querySelector('nav ul');

menu.addEventListener('click', () => {
  menu.classList.toggle('is-active');     // Animate hamburger icon
  navList.classList.toggle('active');     // Toggle mobile menu visibility
});

// === SECTION: Typewriter Effect ===
const phrases = [
  "an Aspiring Web Developer",
  "an Aspiring Software Developer",
  "a Final Year Student",
  "a Tech Enthusiast",
  "a Problem Solver",
];

let currentPhrase = 0;
let currentChar = 0;
let isDeleting = false;

const speed = 100;       // Typing speed (ms)
const delay = 2000;      // Pause before deleting (ms)
const textElement = document.querySelector(".typewriter-text");

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
document.getElementById('contact-form').addEventListener('submit', function (e) {
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
