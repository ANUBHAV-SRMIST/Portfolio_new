// ══════════════════════════════════════
//   ANUBHAV MISHRA — PORTFOLIO SCRIPTS
//   script.js
// ══════════════════════════════════════


// ── MOBILE NAV TOGGLE ──
function toggleNav() {
  document.getElementById('navLinks').classList.toggle('open');
  document.getElementById('navOverlay').classList.toggle('active');
}
// ── CLOSE NAV WHEN TAPPING OVERLAY ──
document.getElementById('navOverlay').addEventListener('click', () => {
  document.getElementById('navLinks').classList.remove('open');
  document.getElementById('navOverlay').classList.remove('active');
});


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
// ── CERTIFICATIONS DATA (edit this list) ──
const certData = [
  { img: "images/Cert/8-BIT-MICROCONTROLLER.jpg", title: "8 Bit Microcontroller" },
  { img: "images/Cert/8051-Microcontroller.jpg", title: "8051 Microcontroller" },
  { img: "images/Cert/Aptitude-Test-Series.jpg", title: "Aptitude Test Series" },
  { img: "images/Cert/AWS-Data-Engineer.jpg", title: "AWS Data Engineer" },
  { img: "images/Cert/AWS-Generative-AI.jpg", title: "AWS Generative AI" },
  { img: "images/Cert/C-Programming.jpg", title: "C Programming" },
  { img: "images/Cert/Crash-Course-On-Python.jpg", title: "Crash Course On Python" },
  { img: "images/Cert/Database-Data-Structure-Test-Series.jpg", title: "Database & Data Structure Test Series" },
  { img: "images/Cert/Design-Verification-using-System-Verilog.jpg", title: "Design & Verification using SystemVerilog/UVM" },
  { img: "images/Cert/DSA.jpg", title: "DSA" },
  { img: "images/Cert/Electronic-Proficiency-Test.jpg", title: "Electronic Proficiency Test" },
  { img: "images/Cert/Introduction-to-Front-End.jpg", title: "Introduction to Front End (Meta)" },
  { img: "images/Cert/Programming-Test-Series-(C-and-Python).jpg", title: "Programming Test Series (C and Python)" },
  { img: "images/Cert/Python-Full-stack.jpg", title: "Python Full Stack" },
  { img: "images/Cert/Science-of-well-being.jpg", title: "The Science of Well-Being" },
  { img: "images/Cert/SQL-and-Database-Management-Systems.jpg", title: "SQL and Database Management Systems" },
  { img: "images/Cert/SQL-for-Data-Science.jpg", title: "SQL for Data Science" },
  { img: "images/Cert/SRM-HACKTHON.jpg", title: "SRM Hackathon" },
  { img: "images/Cert/UI_UX-DESIGN.jpg", title: "UI/UX Design" },
  { img: "images/Cert/Veilog-HDL.jpg", title: "Verilog HDL" }
];

// ── BUILD CERT MARQUEE ──
const certTrack = document.getElementById('certMarqueeTrack');
function renderCertCard(cert) {
  return `
    <div class="cert-card" data-img="${cert.img}" data-title="${cert.title}">
      <img src="${cert.img}" alt="${cert.title}" loading="lazy">
      <div class="cert-card-info">
        <span class="cert-card-title">${cert.title}</span>
      </div>
    </div>
  `;
}
certTrack.innerHTML = certData.map(renderCertCard).join('') + certData.map(renderCertCard).join('');

// ── CERTIFICATE MODAL ──
const certModal = document.getElementById('certModal');
const certModalImg = document.getElementById('certModalImg');
const certModalTitle = document.getElementById('certModalTitle');
const certModalClose = document.getElementById('certModalClose');

certTrack.addEventListener('click', (e) => {
  const card = e.target.closest('.cert-card');
  if (!card) return;
  certModalImg.src = card.getAttribute('data-img');
  certModalTitle.textContent = card.getAttribute('data-title');
  certModal.classList.add('active');
});

certModalClose.addEventListener('click', () => certModal.classList.remove('active'));
certModal.addEventListener('click', (e) => { if (e.target === certModal) certModal.classList.remove('active'); });
document.addEventListener('keydown', (e) => { if (e.key === 'Escape') certModal.classList.remove('active'); });
