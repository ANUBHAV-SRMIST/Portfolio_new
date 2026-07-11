// ══════════════════════════════════════
//   ANUBHAV MISHRA — PORTFOLIO SCRIPTS
//   script.js
// ══════════════════════════════════════


// ── MOBILE NAV TOGGLE ──
function toggleNav() {
  document.getElementById('navLinks').classList.toggle('open');
  document.getElementById('navOverlay').classList.toggle('active');
}


// ── HIGHLIGHT ACTIVE NAV LINK ON SCROLL ──
const sections   = document.querySelectorAll('section[id]');
const navAnchors = document.querySelectorAll('.nav-links a');

function updateActiveNav() {
  let current = '';
  sections.forEach(section => {
    if (window.scrollY >= section.offsetTop - 120) {
      current = section.id;
    }
  });
  navAnchors.forEach(a => {
    a.classList.toggle('active', a.getAttribute('href') === '#' + current);
  });
}

window.addEventListener('scroll', updateActiveNav);


// ── FADE-IN ELEMENTS ON SCROLL ──
const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll('.fade-in').forEach(el => observer.observe(el));


// ── CLOSE MOBILE NAV WHEN A LINK IS CLICKED ──
navAnchors.forEach(a => {
  a.addEventListener('click', () => {
    document.getElementById('navLinks').classList.remove('open');
    document.getElementById('navOverlay').classList.remove('active');
  });
});
// ── CONTACT FORM SEND (EmailJS) ──
(function() {
  emailjs.init("r6EtzKxLyAlRozhrZ");
})();

const contactForm = document.getElementById('contact-form');

contactForm.addEventListener('submit', function(e) {
  e.preventDefault();

  const sendBtn = contactForm.querySelector('.btn-send');
  const originalText = sendBtn.innerHTML;
  sendBtn.innerHTML = 'Sending...';
  sendBtn.disabled = true;

  emailjs.sendForm('service_wo89b3s', 'template_8yon559', contactForm)
    .then(() => {
      alert('Thanks! Your message has been sent.');
      contactForm.reset();
    })
    .catch((error) => {
      alert('Something went wrong. Please try again.');
      console.error('EmailJS error:', error);
    })
    .finally(() => {
      sendBtn.innerHTML = originalText;
      sendBtn.disabled = false;
    });
});
// ── TYPEWRITER EFFECT (Hero Name, looping) ──
function typeWriterLoop() {
  const target = document.getElementById('typed-name');
  if (!target) return;

  const fullText = "Anubhav Mishra";
  const highlightStart = "Anubhav ".length;
  let i = 0;
  let deleting = false;

  function render(len) {
    const typed = fullText.slice(0, len);
    if (len <= highlightStart) {
      target.innerHTML = typed;
    } else {
      target.innerHTML = fullText.slice(0, highlightStart) +
        '<span>' + fullText.slice(highlightStart, len) + '</span>';
    }
  }

  function tick() {
    if (!deleting) {
      i++;
      render(i);
      if (i === fullText.length) {
        deleting = true;
        setTimeout(tick, 1800); // pause before erasing
        return;
      }
      setTimeout(tick, 100); // typing speed
    } else {
      i--;
      render(i);
      if (i === 0) {
        deleting = false;
        setTimeout(tick, 500); // pause before retyping
        return;
      }
      setTimeout(tick, 50); // erasing speed
    }
  }

  tick();
}

window.addEventListener('DOMContentLoaded', typeWriterLoop);
// ── SLIDING NAV UNDERLINE ──
const navLinksList = document.querySelectorAll('.nav-links a');
const navIndicator = document.getElementById('navIndicator');
const navLinksContainer = document.querySelector('.nav-wrap');

function moveIndicator(el) {
  const containerRect = navLinksContainer.getBoundingClientRect();
  const linkRect = el.getBoundingClientRect();
  navIndicator.style.left = (linkRect.left - containerRect.left) + 'px';
  navIndicator.style.width = linkRect.width + 'px';
  navIndicator.classList.add('visible');
}

navLinksList.forEach(link => {
  link.addEventListener('mouseenter', () => moveIndicator(link));
});

navLinksContainer.addEventListener('mouseleave', () => {
  const active = document.querySelector('.nav-links a.active');
  if (active) {
    moveIndicator(active);
  } else {
    navIndicator.classList.remove('visible');
  }
});

// Set initial position on page load (under the active link)
window.addEventListener('DOMContentLoaded', () => {
  const active = document.querySelector('.nav-links a.active');
  if (active) moveIndicator(active);
});
// ── THEME TOGGLE ──
const themeToggle = document.getElementById('themeToggle');
const themeIcon = themeToggle.querySelector('i');

function applyTheme(theme) {
  document.documentElement.setAttribute('data-theme', theme);
  themeIcon.className = theme === 'light' ? 'fa-solid fa-sun' : 'fa-solid fa-moon';
  localStorage.setItem('portfolio-theme', theme);
}

// Load saved theme on page load (defaults to dark)
const savedTheme = localStorage.getItem('portfolio-theme') || 'dark';
applyTheme(savedTheme);

themeToggle.addEventListener('click', () => {
  const current = document.documentElement.getAttribute('data-theme');
  applyTheme(current === 'light' ? 'dark' : 'light');
});
// ── CLICK EFFECT (particle burst) ──
function createClickEffect(x, y) {
  const particleCount = 8;

  for (let i = 0; i < particleCount; i++) {
    const particle = document.createElement('div');
    particle.className = 'click-particle';
    document.body.appendChild(particle);

    const angle = (i / particleCount) * Math.PI * 2;
    const distance = 40 + Math.random() * 20;
    const dx = Math.cos(angle) * distance;
    const dy = Math.sin(angle) * distance;

    particle.style.left = x + 'px';
    particle.style.top = y + 'px';
    particle.style.setProperty('--dx', dx + 'px');
    particle.style.setProperty('--dy', dy + 'px');

    setTimeout(() => particle.remove(), 600);
  }

  // Ripple ring
  const ripple = document.createElement('div');
  ripple.className = 'click-ripple';
  ripple.style.left = x + 'px';
  ripple.style.top = y + 'px';
  document.body.appendChild(ripple);
  setTimeout(() => ripple.remove(), 600);
}

document.addEventListener('click', (e) => {
  createClickEffect(e.clientX, e.clientY);
});
// ── GALLERY LIGHTBOX ──
const galleryItems = document.querySelectorAll('.gallery-item');
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightboxImg');
const lightboxClose = document.getElementById('lightboxClose');

galleryItems.forEach(item => {
  item.addEventListener('click', () => {
    const fullSrc = item.getAttribute('data-full');
    lightboxImg.src = fullSrc;
    lightbox.classList.add('active');
  });
});

lightboxClose.addEventListener('click', () => {
  lightbox.classList.remove('active');
});

lightbox.addEventListener('click', (e) => {
  if (e.target === lightbox) {
    lightbox.classList.remove('active');
  }
});

document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    lightbox.classList.remove('active');
  }
});
// ── RESUME DROPDOWN ──
const resumeToggle = document.getElementById('resumeToggle');
const resumeMenu = document.getElementById('resumeMenu');

resumeToggle.addEventListener('click', (e) => {
  e.stopPropagation();
  resumeMenu.classList.toggle('open');
  resumeToggle.classList.toggle('active');
});

document.addEventListener('click', (e) => {
  if (!resumeToggle.contains(e.target) && !resumeMenu.contains(e.target)) {
    resumeMenu.classList.remove('open');
    resumeToggle.classList.remove('active');
  }
});
