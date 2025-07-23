// Select all sections and nav links
const sections = document.querySelectorAll("section");
const navLinks = document.querySelectorAll(".nav-link");

// Mobile menu toggle
const menu = document.querySelector('#mobile-menu');
const navList = document.querySelector('nav ul'); // Select the full nav list (ul)

// Sending email
document.getElementById('contact-form').addEventListener('submit', function(e) {
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

menu.addEventListener('click', () => {
    menu.classList.toggle('is-active');    // Animate burger icon
    navList.classList.toggle('active');    // Show/hide mobile nav links
});

// Highlight active nav link on scroll
window.addEventListener("scroll", () => {
    let current = "";

    sections.forEach((section) => {
        const sectionTop = section.offsetTop - 150; // Adjusted offset for better timing
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

    // Optional: Close mobile menu when user scrolls
    if (navList.classList.contains('active')) {
        navList.classList.remove('active');
        menu.classList.remove('is-active');
    }
});
