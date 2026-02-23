// Typed.js animation
var typed = new Typed(".auto-type", {
  strings: ["Learning, Innovating and Developing!"],
  typeSpeed: 90,
  startDelay: 250,
  backSpeed: 34,
  loop: false
});

// Smooth scroll on navigation clicks
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  });
});

// Custom animated cursor

document.querySelectorAll('a, button, .navItems, .tech-pill, .project-card').forEach(element => {
  element.addEventListener('mouseenter', () => {
    cursor.style.transform = 'scale(1.45)';
    cursor.style.background = 'rgba(218, 157, 95, 1)';
  });
  element.addEventListener('mouseleave', () => {
    cursor.style.transform = 'scale(1)';
    cursor.style.background = 'rgba(218, 157, 95, 0.8)';
  });
});

// Reveal effects on scroll
function revealOnScroll() {
  document.querySelectorAll('.scroll-fade, .scroll-slide-up').forEach(el => {
    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight - 80) {
      el.classList.add('revealed');
    }
  });
}
window.addEventListener('scroll', revealOnScroll);
window.addEventListener('DOMContentLoaded', revealOnScroll);

// Contact form logic (Web3Forms integration)
const contactForm = document.querySelector('.contact-form');
const submitBtn = contactForm.querySelector('button[type="submit"]');

contactForm.addEventListener('submit', function (e) {
  e.preventDefault();

  const formData = new FormData(contactForm);
  const object = Object.fromEntries(formData);
  const json = JSON.stringify(object);

  submitBtn.innerHTML = "Sending...";
  submitBtn.disabled = true;

  fetch('https://api.web3forms.com/submit', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    },
    body: json
  })
    .then(async (response) => {
      let json = await response.json();
      if (response.status == 200) {
        alert('Thank you! Your message has been sent successfully.');
        contactForm.reset();
      } else {
        console.log(response);
        alert(json.message || "Something went wrong. Please try again.");
      }
    })
    .catch(error => {
      console.log(error);
      alert("Form submission failed. Please check your internet connection.");
    })
    .then(function () {
      submitBtn.innerHTML = "Send Message";
      submitBtn.disabled = false;
    });
});
let lastScrollTop = 0;
const navbar = document.querySelector(".glass-nav");

window.addEventListener("scroll", () => {
  let currentScroll = window.pageYOffset || document.documentElement.scrollTop;

  if (currentScroll > lastScrollTop) {
    // Scrolling Down
    navbar.classList.add("hide");
  } else {
    // Scrolling Up
    navbar.classList.remove("hide");
  }

  lastScrollTop = currentScroll <= 0 ? 0 : currentScroll;
});