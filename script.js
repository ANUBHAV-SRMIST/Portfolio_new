// ══════════════════════════════════════
//   ANUBHAV MISHRA — PORTFOLIO SCRIPTS
//   script.js
// ══════════════════════════════════════


// ── MOBILE NAV TOGGLE ──
function toggleNav() {
  document.getElementById('navLinks').classList.toggle('open');
  document.getElementById('navOverlay').classList.toggle('active');
  document.getElementById('hamburger').classList.toggle('active');
  document.body.classList.toggle('nav-open');
}
// ── CLOSE NAV WHEN TAPPING OVERLAY ──
document.getElementById('navOverlay').addEventListener('click', () => {
  document.getElementById('navLinks').classList.remove('open');
  document.getElementById('navOverlay').classList.remove('active');
  document.getElementById('hamburger').classList.remove('active');
  document.body.classList.remove('nav-open');
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

  const activeLink = document.querySelector('.nav-links a.active');
  if (activeLink) moveIndicator(activeLink);
}
window.addEventListener('scroll', updateActiveNav);
// ── FLOATING NAV ON SCROLL ──
const navEl = document.querySelector('nav');
const SCROLL_THRESHOLD = 40;

function updateNavScrollState() {
  if (window.scrollY > SCROLL_THRESHOLD) {
    navEl.classList.add('nav-scrolled');
  } else {
    navEl.classList.remove('nav-scrolled');
  }
}

window.addEventListener('scroll', updateNavScrollState);
window.addEventListener('DOMContentLoaded', updateNavScrollState);


// ── FADE-IN ELEMENTS ON SCROLL ──
const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll('.fade-in').forEach(el => observer.observe(el));
// ── STAGGERED GALLERY ENTRANCE ──
document.querySelectorAll('.gallery-item').forEach((item, i) => {
  item.style.transitionDelay = `${i * 90}ms`;
});

// ── STAGGERED GRID CARD ENTRANCE (Skills / Specializations / Projects) ──
document.querySelectorAll('.skills-grid, .spec-cards, .projects-grid').forEach(grid => {
  grid.querySelectorAll('.fade-in').forEach((card, i) => {
    card.style.transitionDelay = `${i * 90}ms`;
  });
});


// ── CLOSE MOBILE NAV WHEN A LINK IS CLICKED ──
navAnchors.forEach(a => {
  a.addEventListener('click', () => {
    document.getElementById('navLinks').classList.remove('open');
    document.getElementById('navOverlay').classList.remove('active');
    document.getElementById('hamburger').classList.remove('active');
    document.body.classList.remove('nav-open');
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

function getSystemTheme() {
  return window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark';
}

function applyTheme(theme) {
  document.documentElement.setAttribute('data-theme', theme);
  themeIcon.className = theme === 'light' ? 'fa-solid fa-sun' : 'fa-solid fa-moon';
}

// If the user has manually toggled before, respect that choice.
// Otherwise, follow the device's system theme automatically.
const savedTheme = localStorage.getItem('portfolio-theme');
applyTheme(savedTheme || getSystemTheme());

// Live-update if system theme changes, but only when user hasn't manually chosen
const systemThemeQuery = window.matchMedia('(prefers-color-scheme: light)');
systemThemeQuery.addEventListener('change', (e) => {
  if (!localStorage.getItem('portfolio-theme')) {
    applyTheme(e.matches ? 'light' : 'dark');
  }
});

// Manual toggle now counts as an explicit override, saved for future visits
themeToggle.addEventListener('click', () => {
  const current = document.documentElement.getAttribute('data-theme');
  const newTheme = current === 'light' ? 'dark' : 'light';
  applyTheme(newTheme);
  localStorage.setItem('portfolio-theme', newTheme);
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
// ── GALLERY SHOW MORE / SHOW LESS ──
const galleryToggleBtn = document.getElementById('galleryToggleBtn');
if (galleryToggleBtn) {
  const extraItems = document.querySelectorAll('.gallery-extra');
  galleryToggleBtn.addEventListener('click', () => {
    const isExpanded = galleryToggleBtn.classList.toggle('expanded');
    extraItems.forEach(item => item.classList.toggle('show', isExpanded));
    galleryToggleBtn.querySelector('span').textContent = isExpanded ? 'Show Less' : 'Show More';
    if (!isExpanded) {
      document.getElementById('gallery').scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
}
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
  document.body.classList.toggle('resume-open');
});

document.addEventListener('click', (e) => {
  if (!resumeToggle.contains(e.target) && !resumeMenu.contains(e.target)) {
    resumeMenu.classList.remove('open');
    resumeToggle.classList.remove('active');
    document.body.classList.remove('resume-open');
  }
});
// ── CERTIFICATIONS DATA (edit this list) ──
const certData = [
  { img: "images/Cert/8-BIT-MICROCONTROLLER.jpg", title: "8 Bit Microcontroller", org: "Microchip", desc: "Fundamentals of 8-bit microcontroller architecture and programming." },
  { img: "images/Cert/8051-Microcontroller.jpg", title: "8051 Microcontroller", org: "Udemy", desc: "Programming and interfacing techniques for the 8051 microcontroller." },
  { img: "images/Cert/Aptitude-Test-Series.jpg", title: "Aptitude Test Series", org: "Sanfoundary", desc: "Quantitative aptitude and logical reasoning test series." },
  { img: "images/Cert/AWS-Data-Engineer.jpg", title: "AWS Data Engineer", org: "AWS Academy", desc: "Cloud-based data engineering pipelines and services on AWS." },
  { img: "images/Cert/AWS-Generative-AI.jpg", title: "AWS Generative AI", org: "AWS Academy", desc: "Generative AI foundations and applications on AWS cloud infrastructure." },
  { img: "images/Cert/C-Programming.jpg", title: "C Programming", org: "IEEE", desc: "Core concepts of C programming including memory management and pointers." },
  { img: "images/Cert/Crash-Course-On-Python.jpg", title: "Crash Course On Python", org: "Google", desc: "Python fundamentals covering syntax, data structures, and basic scripting." },
  { img: "images/Cert/Database-Data-Structure-Test-Series.jpg", title: "Database & Data Structure Test Series", org: "SANfoundry", desc: "Scored Grade A (90%+ marks) in database and data structure fundamentals." },
  { img: "images/Cert/Design-Verification-using-System-Verilog.jpg", title: "Design & Verification using SystemVerilog/UVM", org: "Udemy", desc: "Hands-on design verification methodology using SystemVerilog and UVM." },
  { img: "images/Cert/DSA.jpg", title: "DSA", org: "Microsoft", desc: "Data structures and algorithms fundamentals and problem solving." },
  { img: "images/Cert/Electronic-Proficiency-Test.jpg", title: "Electronic Proficiency Test", org: "SANfoundry", desc: "Scored Grade A (>82% marks) in core electronics proficiency." },
  { img: "images/Cert/Introduction-to-Front-End.jpg", title: "Introduction to Front End (Meta)", org: "Meta", desc: "Foundations of front-end web development." },
  { img: "images/Cert/Programming-Test-Series-(C-and-Python).jpg", title: "Programming Test Series (C and Python)", org: "SANfoundry", desc: "Scored Grade A (85%+ marks) in C and Python programming fundamentals." },
  { img: "images/Cert/Python-Full-stack.jpg", title: "Python Full Stack", org: "EduSkills Academy", desc: "Full-stack development training using Python across the application stack." },
  { img: "images/Cert/Science-of-well-being.jpg", title: "The Science of Well-Being", org: "Yale University", desc: "Explored the science of happiness and evidence-based habits for well-being." },
  { img: "images/Cert/SQL-and-Database-Management-Systems.jpg", title: "SQL and Database Management Systems", org: "EduSkills Academy", desc: "Internship certification in SQL fundamentals and database management." },
  { img: "images/Cert/SQL-for-Data-Science.jpg", title: "SQL for Data Science", org: "UC Davis", desc: "Applied SQL querying techniques for data science and analysis." },
  { img: "images/Cert/SRM-HACKTHON.jpg", title: "SRM Hackathon", org: "SRM Institute", desc: "Participated in a competitive hackathon building solutions under time constraints." },
  { img: "images/Cert/UI_UX-DESIGN.jpg", title: "UI/UX Design", org: "CodeSoft", desc: "Principles of user interface and user experience design." },
  { img: "images/Cert/Veilog-HDL.jpg", title: "Verilog HDL", org: "Udemy", desc: "Hardware description language fundamentals using Verilog." }
];

// ── BUILD CERT MARQUEE ──
const certTrack = document.getElementById('certMarqueeTrack');
function renderCertCard(cert) {
  return `
    <div class="cert-card" data-img="${cert.img}" data-title="${cert.title}"data-org="${cert.org || ''}" data-desc="${cert.desc || ''}">
      <img src="${cert.img}" alt="${cert.title}" loading="lazy">
      <div class="cert-card-info">
        <span class="cert-card-title">${cert.title}</span>
        ${cert.org ? `<span class="cert-card-org">${cert.org}</span>` : ''}
        ${cert.desc ? `<p class="cert-card-desc">${cert.desc}</p>` : ''}
      </div>
    </div>
  `;
}
certTrack.innerHTML = certData.map(renderCertCard).join('') + certData.map(renderCertCard).join('');

// ── CERTIFICATE MODAL ──
const certModal = document.getElementById('certModal');
const certModalImg = document.getElementById('certModalImg');
const certModalTitle = document.getElementById('certModalTitle');
const certModalOrg = document.getElementById('certModalOrg');
const certModalDesc = document.getElementById('certModalDesc');
const certModalClose = document.getElementById('certModalClose');

certTrack.addEventListener('click', (e) => {
  const card = e.target.closest('.cert-card');
  if (!card) return;
  certModalImg.src = card.getAttribute('data-img');
  certModalTitle.textContent = card.getAttribute('data-title');
  certModalOrg.textContent = card.getAttribute('data-org');
  certModalDesc.textContent = card.getAttribute('data-desc');
  certModal.classList.add('active');
});

certModalClose.addEventListener('click', () => certModal.classList.remove('active'));
certModal.addEventListener('click', (e) => { if (e.target === certModal) certModal.classList.remove('active'); });
document.addEventListener('keydown', (e) => { if (e.key === 'Escape') certModal.classList.remove('active'); });
// ══ DIGITAL BADGES (Credly) — data, render, tilt, reveal ══
const badgeData = [
  { img: "images/Badges/fortinet-fortigate-7-6-operator.png", title: "Fortinet FortiGate 7.6 Operator", org: "Fortinet", date: "Issued Jul 29, 2026", link: "https://www.credly.com/badges/83019bfd-2f77-45af-b431-65d0a51de92a/public_url" },
  { img: "images/Badges/fortinet-nse-1-certified-in-cybersecurity.png", title: "Fortinet NSE 1 Certified in Cybersecurity", org: "Fortinet", date: "Expires Jul 29, 2028", link: "https://www.credly.com/badges/e8f651da-8023-4d87-8e02-0b7056bd035d/public_url" },
  { img: "images/Badges/fortinet-nse-2-certified-in-cybersecurity.1.png", title: "Fortinet NSE 2 Certified in Cybersecurity", org: "Fortinet", date: "Expires Jul 29, 2028", link: "https://www.credly.com/badges/9a20073a-c8e8-492c-aa47-a58810933a66/public_url" },
  { img: "images/Badges/fortinet-nse-3-certified-in-cybersecurity.1.png", title: "Fortinet NSE 3 Certified in Cybersecurity", org: "Fortinet", date: "Expires Jul 29, 2028", link: "https://www.credly.com/badges/0422be06-6485-41e2-8389-2618fd2d2bc7/public_url" },
  { img: "images/Badges/technical-introduction-to-cybersecurity-3-0.png", title: "Technical Introduction to Cybersecurity 3.0", org: "Fortinet", date: "Issued Jul 2, 2026", link: "https://www.credly.com/badges/4bce0550-f896-4a2b-a972-59e904bfc540/public_url" },
  { img: "images/Badges/getting-started-in-cybersecurity-3-0.png", title: "Getting Started in Cybersecurity 3.0", org: "Fortinet", date: "Issued Jun 19, 2026", link: "https://www.credly.com/badges/38b24744-113b-4666-8dc0-fa0249d80bfc/public_url" },
  { img: "images/Badges/fortinet-certified-fundamentals-cybersecurity.png", title: "Fortinet Certified Fundamentals Cybersecurity", org: "Fortinet", date: "Expires Jun 19, 2028", link: "https://www.credly.com/badges/5400dd49-6eed-4a32-a599-e0869c9652c0/public_url" },
  { img: "images/Badges/introduction-to-the-threat-landscape-3-0.png", title: "Introduction to the Threat Landscape 3.0", org: "Fortinet", date: "Issued Jun 13, 2026", link: "https://www.credly.com/badges/8729054e-9ed3-4917-817d-878ee43df0e8/public_url" },
  { img: "images/Badges/aws-academy-graduate-machine-learning-foundations-t.png", title: "AWS Academy Graduate - Machine Learning Foundations", org: "AWS Academy", date: "Issued Sep 10, 2025", link: "https://www.credly.com/badges/d24ea0d5-8725-4422-ba2e-84ad7455063f/public_urlE" },
  { img: "images/Badges/aws-academy-graduate-machine-learning-for-natural-l.png", title: "AWS Academy Graduate - Machine Learning for NLP", org: "AWS Academy", date: "Issued Sep 10, 2025", link: "https://www.credly.com/badges/172f1ff3-b4c2-4129-a261-193c6072d8a0/public_url" },
  { img: "images/Badges/aws-academy-graduate-generative-ai-foundations-trai.png", title: "AWS Academy Graduate - Generative AI Foundations", org: "AWS Academy", date: "Issued Sep 8, 2025", link: "https://www.credly.com/badges/2c1e8626-3706-4656-8371-cc55dc84fe11/public_url" },
  { img: "images/Badges/data-analytics-essentials.png", title: "Data Analytics Essentials", org: "Coursera", date: "Issued Jun 19, 2025", link: "https://www.credly.com/badges/72c8e498-808a-4ce0-8625-1a8a9e2ead25/public_url" },
  { img: "images/Badges/aws-academy-graduate-data-engineering-training-badg.png", title: "AWS Academy Graduate - Data Engineering", org: "AWS Academy", date: "Issued Feb 13, 2025", link: "https://www.credly.com/badges/2e4d3831-11e0-4f1f-9546-ec0f25cf35af/public_url" },
  { img: "images/Badges/aws-academy-graduate-cloud-foundations-training-bad.png", title: "AWS Academy Graduate - Cloud Foundations", org: "AWS Academy", date: "Issued Feb 2, 2025", link: "https://www.credly.com/badges/b017ec71-13d2-40cb-8c29-e75da9081fbf/public_url" }
];

const badgeGrid = document.getElementById('badgeGrid');

function renderBadgeCard(badge, i) {
  const expiring = badge.date.toLowerCase().includes('expire');
  const extraClass = i >= 10 ? ' badge-extra' : '';
  return `
    <a class="badge-card fade-in${extraClass}" href="${badge.link}" target="_blank" rel="noopener noreferrer" style="transition-delay:${(i % 10) * 80}ms">
      <div class="badge-medallion">
        <img src="${badge.img}" alt="${badge.title}" loading="lazy">
        <span class="badge-verified"><i class="fa-solid fa-check"></i></span>
      </div>
      <h4 class="badge-title">${badge.title}</h4>
      <span class="badge-issuer">${badge.org}</span>
      <span class="badge-date${expiring ? ' expiring' : ''}">${badge.date}</span>
    </a>`;
}

if (badgeGrid) {
  badgeGrid.innerHTML = badgeData.map(renderBadgeCard).join('');

 // scroll-reveal for the first 10 badges
  const badgeObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        badgeObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });

  document.querySelectorAll('.badge-card:not(.badge-extra)').forEach(card => badgeObserver.observe(card));
   // ── SHOW MORE / SHOW LESS ──
  const badgesToggleBtn = document.getElementById('badgesToggleBtn');
  if (badgesToggleBtn) {
    if (badgeData.length <= 10) {
      badgesToggleBtn.style.display = 'none';
    } else {
      let expanded = false;
      badgesToggleBtn.addEventListener('click', () => {
        expanded = !expanded;
        badgeGrid.classList.toggle('expanded', expanded);

        if (expanded) {
          const extraCards = badgeGrid.querySelectorAll('.badge-extra');
          extraCards.forEach((card, i) => {
            setTimeout(() => card.classList.add('visible'), i * 80);
          });
          badgesToggleBtn.innerHTML = 'Show Less <i class="fa-solid fa-chevron-up"></i>';
        } else {
          badgeGrid.querySelectorAll('.badge-extra').forEach(card => card.classList.remove('visible'));
          badgesToggleBtn.innerHTML = 'Show More Badges <i class="fa-solid fa-chevron-down"></i>';
          badgesToggleBtn.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
      });
    }
  }

// subtle 3D tilt on hover (desktop only)
  if (window.matchMedia('(hover: hover)').matches) {
    document.querySelectorAll('.badge-card').forEach(card => {
      card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const rotateX = ((y / rect.height) - 0.5) * -8;
        const rotateY = ((x / rect.width) - 0.5) * 8;
        card.style.transform = `perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.02)`;
      });
      card.addEventListener('mouseleave', () => {
        card.style.transform = '';
      });
    });
  }
}
// ── INDUSTRY EXPOSURE DATA (sorted: most recent first) ──
const expData = [
  {
    title: "Zscaler Zero Trust Cloud Security",
    org: "Zscaler",
    icon: "fa-shield-halved",
    duration: "Aug - Oct 2026",
    type: "Virtual Internship",
    badgeColor: "green",
    ongoing: true,
    offerLetter: "offer-letters/zscaler-zero-trust-offer.pdf",
    desc: "Currently pursuing an 8-week virtual internship on Zero Trust cloud security architecture, supported by Zscaler, through the AICTE EduSkills National Internship Portal.",
    tags: ["Zero Trust Architecture", "Cloud Security", "Identity Verification", "Access Control", "AICTE · EduSkills"],
    learnings: [
      "Studying Zero Trust Exchange principles and Zero Trust Cyber Associate (ZTCA) fundamentals",
      "Learning identity verification, access control, and policy enforcement",
      "Currently in progress — Week 1 of 8 completed"
    ]
  },
  {
    title: "Network Security Associate Virtual Internship",
    org: "Fortinet Training Institute",
    icon: "fa-shield-halved",
    duration: "Jun - Aug 2026",
    grade: "O",
    type: "Virtual Internship",
    badgeColor: "blue",
    link: "https://certificate.eduskillsfoundation.org/verify/4fa188ffa86e4090707a/4fa188ffa86e4090707a",
    offerLetter: "offer-letters/fortinet-network-security-offer.pdf",
    desc: "Completed an 8-week virtual internship on network security fundamentals, supported by Fortinet, through the AICTE EduSkills National Internship Portal.",

    tags: ["Networking Basics", "Firewall Concepts", "VPN Technologies", "Threat Detection", "AICTE · EduSkills"],
    learnings: [
      "Gained hands-on exposure to securing networks and identifying threats",
      "Configured firewalls, VPNs, and intrusion prevention systems",
      "Completed the program with an Outstanding (O) grade"
    ]
  },
  {
    title: "SQL & Database Management Systems",
    org: "EduSkills Academy",
    icon: "fa-database",
    duration: "Apr - Jun 2026",
    grade: "O",
    type: "Virtual Internship",
    badgeColor: "blue",
    link: "https://certificate.eduskillsfoundation.org/verify/4060b44bc6479d83078c/4060b44bc6479d83078c",
    offerLetter: "offer-letters/sql-dbms-offer.pdf",

    desc: "Completed an 8-week virtual internship on SQL and database management systems through the AICTE EduSkills National Internship Portal.",
    tags: ["SQL", "Database Management", "EduSkills", "AICTE"],
    learnings: [
      "Relational database design and SQL query fundamentals",
      "Structured database management curriculum by EduSkills Academy",
      "Completed the program with an Outstanding (O) grade"
    ]
  },
  {
    title: "Advanced Embedded System Developer",
    org: "Microchip Technology Inc.",
    icon: "fa-microchip",
    duration: "Jan - Mar 2026",
    grade: "O",
    type: "Virtual Internship",
    badgeColor: "blue",
     link: "https://certificate.eduskillsfoundation.org/verify/4e588870a9abf0d09e19/4e588870a9abf0d09e19",
    offerLetter: "offer-letters/microchip-embedded-systems-offer.pdf",
    desc: "Completed an advanced 10-week virtual internship on embedded systems development, delivered through the AICTE EduSkills National Internship Portal in partnership with Microchip Technology.",
    tags: ["Embedded Systems", "Microcontrollers", "Microchip", "AICTE · EduSkills"],
    learnings: [
      "Advanced embedded systems design concepts and microcontroller architecture",
      "Industry-aligned development practices from Microchip's curriculum",
      "Completed the program with an Outstanding (O) grade"
    ]
  },
  {
    title: "Structural Analysis",
    org: "Ansys (part of Synopsys)",
    icon: "fa-cube",
    duration: "Oct - Dec 2025",
    grade: "O",
    type: "Virtual Internship",
    badgeColor: "blue",
    desc: "Completed a 10-week virtual internship on structural analysis, supported by Ansys, part of Synopsys, via the AICTE EduSkills National Internship Portal.",
    tags: ["Structural Analysis", "ANSYS", "Simulation", "AICTE · EduSkills"],
    learnings: [
      "Structural simulation and analysis fundamentals using Ansys tools",
      "Applied engineering analysis workflows",
      "Completed the program with an Outstanding (O) grade"
    ]
  },
  {
    title: "Cloud Gen AI",
    org: "AWS Academy",
    icon: "fa-cloud",
    duration: "Jul - Sep 2025",
    grade: "O",
    type: "Virtual Internship",
    badgeColor: "blue",
    desc: "Completed a 10-week virtual internship exploring generative AI on cloud infrastructure, with curriculum provided by AWS Academy.",
    tags: ["Generative AI", "AWS", "Cloud Computing", "AICTE · EduSkills"],
    learnings: [
      "Foundations of generative AI and cloud-based AI services",
      "Hands-on exposure to AWS Academy's Gen AI curriculum",
      "Completed the program with an Outstanding (O) grade"
    ]
  },
  {
    title: "Python Full Stack Developer",
    org: "EduSkills Academy",
    icon: "fa-brands fa-python",
    duration: "Apr - Jun 2025",
    grade: "P",
    type: "Virtual Internship",
    badgeColor: "blue",
    desc: "Completed a 10-week virtual internship on full-stack development using Python, delivered via the AICTE EduSkills National Internship Portal.",
    tags: ["Python", "Full-Stack Development", "EduSkills", "AICTE"],
    learnings: [
      "End-to-end web development fundamentals using Python",
      "Structured full-stack curriculum from EduSkills Academy",
      "Successfully completed the internship program"
    ]
  },
  {
    title: "Data Engineering",
    org: "AWS Academy",
    icon: "fa-database",
    duration: "Jan - Mar 2025",
    grade: "C",
    type: "Virtual Internship",
    badgeColor: "blue",
    desc: "Completed a 10-week virtual internship in data engineering with curriculum provided by AWS Academy, through the AICTE EduSkills National Internship Portal.",
    tags: ["Data Engineering", "AWS", "Cloud Computing", "AICTE · EduSkills"],
    learnings: [
      "Core data engineering concepts and AWS data services",
      "Cloud-based data pipeline fundamentals",
      "Successfully completed the internship program"
    ]
  },
  {
    title: "Android Developer",
    org: "Google for Developers",
    icon: "fa-brands fa-google",
    duration: "Oct - Dec 2024",
    grade: "C",
    type: "Virtual Internship",
    badgeColor: "blue",
    desc: "Completed a 10-week Android Developer virtual internship supported by Google for Developers, under the India Edu Program.",
    tags: ["Android Development", "Google", "Mobile Apps", "AICTE · EduSkills"],
    learnings: [
      "Android app development fundamentals",
      "Structured curriculum from Google's India Edu Program",
      "Successfully completed the internship program"
    ]
  },
  {
    title: "Electronics Cooling Capstone",
    org: "Dell Technologies · Chennai",
    icon: "fa-temperature-half",
    duration: "2024",
    type: "Capstone Program",
    badgeColor: "orange",
    leadBy: "Prabhakar Subramaniam (Ex-Intel)",
    desc: "Intensive capstone program on electronics thermal management, led by Prabhakar Subramaniam (Ex-Intel), focusing on CFD simulations and heat dissipation strategies for high-performance computing.",
    tags: ["ANSYS Icepak", "CFD Simulation", "Junction Temp Analysis", "Heat Sink Design", "Thermal Resistance"],
    learnings: [
      "Mastered ANSYS Icepak for component-level and system-level thermal simulation",
      "Analyzed Junction-to-Case (θjc) and Case-to-Ambient (θca) thermal resistance",
      "Optimized heat sink geometries and fan airflow profiles for data centers",
      "Applied computational fluid dynamics to solve conjugate heat transfer problems"
    ]
  },
  {
    title: "Community Connect Programme",
    org: "Saraswati Shishu Vidya Mandir, Ara Kanta Sarubera, Ramgarh, Jharkhand",
    icon: "fa-heart",
    duration: "2024",
    type: "Community Service",
    badgeColor: "green",
    link: "https://docs.google.com/presentation/d/1HAe_J_3gAyg0jjoFkMvYX9OsZjtgr4tF/edit?usp=sharing&ouid=108966136856154764181&rtpof=true&sd=true",
    leadBy: "Divya Karunya Charitable Trust",
    desc: "Volunteered at Divyakaruniya Ashramam as part of the Community Connect initiative, contributing to charitable activities and community service.",
    tags: ["Community Service", "Social Impact", "Volunteering", "Teamwork", "Empathy"],
    learnings: [
      "Engaged in charitable activities at the ashram",
      "Contributed to community welfare programs",
      "Developed interpersonal and leadership skills",
      "Built connections through meaningful social work"
    ]
  },
  {
    title: "Networking",
    org: "Juniper Networks",
    icon: "fa-network-wired",
    duration: "Jul - Sep 2024",
    grade: "A",
    type: "Virtual Internship",
    badgeColor: "blue",
    desc: "Completed a 10-week Networking virtual internship supported by Juniper Networks' Cloud & Automation Academy.",
    tags: ["Networking", "Cloud & Automation", "Juniper Networks", "AICTE · EduSkills"],
    learnings: [
      "Core networking concepts and cloud automation practices",
      "Hands-on exposure to Juniper Networks' curriculum",
      "Completed the program with a Very Good (A) grade"
    ]
  },
  {
    title: "Embedded System Developer",
    org: "Microchip Technology Inc.",
    icon: "fa-microchip",
    duration: "Apr - Jun 2024",
    grade: "C",
    type: "Virtual Internship",
    badgeColor: "blue",
    desc: "Completed a 10-week Embedded System Developer virtual internship supported by Microchip, through the AICTE EduSkills National Internship Portal.",
    tags: ["Embedded Systems", "Microcontrollers", "Microchip", "AICTE · EduSkills"],
    learnings: [
      "Fundamentals of embedded systems and microcontroller programming",
      "Introductory industry curriculum from Microchip",
      "Successfully completed the internship program"
    ]
  }
];

// ── RENDER EXPERIENCE LIST + DETAIL ──
const expList = document.getElementById('expList');
const expDetail = document.getElementById('expDetail');

function renderExpDetail(exp) {
  expDetail.innerHTML = `
    <div class="exp-detail-top">
      <span class="exp-badge type-${exp.badgeColor || 'blue'}">${exp.type}</span>
            <span class="exp-detail-date">${exp.ongoing ? '<span class="exp-ongoing-dot"></span>' : ''}${exp.duration}${exp.ongoing ? ' · Ongoing' : ''}</span>
      ${exp.grade ? `<span class="exp-grade">Grade ${exp.grade}</span>` : ''}
    </div>
    <h3 class="exp-detail-title">${exp.title}</h3>
    <div class="exp-detail-org"><i class="fa-solid fa-building"></i> ${exp.org}</div>
    ${exp.leadBy ? `<div class="exp-detail-lead">Led by ${exp.leadBy}</div>` : ''}
    <p class="exp-detail-desc">${exp.desc}</p>
    <div class="exp-detail-tags">
      ${exp.tags.map(t => `<span class="tag">${t}</span>`).join('')}
    </div>
    <div class="exp-learnings-title">Key Learnings</div>
    <ul class="exp-learnings">
      ${exp.learnings.map(l => `<li>${l}</li>`).join('')}
    </ul>
    ${exp.link ? `<a href="${exp.link}" target="_blank" rel="noopener noreferrer" class="exp-proof-btn"><i class="fa-solid fa-file-lines"></i> View Proof / Certificate</a>` : ''}
    ${exp.offerLetter ? `<a href="${exp.offerLetter}" target="_blank" rel="noopener noreferrer" class="exp-proof-btn"><i class="fa-solid fa-file-pdf"></i> View Offer Letter</a>` : ''}
  `;
  
}

function renderExpList() {
  expList.innerHTML = expData.map((exp, i) => `
    <div class="exp-item ${i === 0 ? 'active' : ''}" data-index="${i}">
      <div class="exp-item-icon"><i class="fa-solid ${exp.icon.includes('fa-') && !exp.icon.startsWith('fa-brands') ? exp.icon : ''}"></i></div>
      <div>
        <div class="exp-item-title">${exp.title}</div>
        <div class="exp-item-org">${exp.org}</div>
      </div>
    </div>
  `).join('');

  // Fix icon classes properly (handles both fa-solid and fa-brands icons)
  document.querySelectorAll('.exp-item').forEach((item, i) => {
    const iconEl = item.querySelector('.exp-item-icon i');
    iconEl.className = expData[i].icon.startsWith('fa-brands') ? expData[i].icon : `fa-solid ${expData[i].icon}`;

    item.addEventListener('click', () => {
      document.querySelectorAll('.exp-item').forEach(el => el.classList.remove('active'));
      item.classList.add('active');

      const icon = item.querySelector('.exp-item-icon');
      icon.classList.remove('bounce');
      void icon.offsetWidth; // restart animation
      icon.classList.add('bounce');

      renderExpDetail(expData[i]);
    });
  });
}

renderExpList();
renderExpDetail(expData[0]);
//=========================
// SYSTEM STATUS
//=========================

const status=document.querySelector(".system-status");

setInterval(()=>{

status.style.boxShadow=
"0 0 18px rgba(79,110,247,.25)";

setTimeout(()=>{

status.style.boxShadow="none";

},700);

},2000);
// ── BASIC COPY PROTECTION (deterrent only, not foolproof) ──

// Disable right-click context menu
document.addEventListener('contextmenu', (e) => e.preventDefault());

// Disable dragging images (prevents easy "save image as" via drag)
document.addEventListener('dragstart', (e) => {
  if (e.target.tagName === 'IMG') e.preventDefault();
});

// Block common dev-tools shortcuts
document.addEventListener('keydown', (e) => {
  const key = e.key.toLowerCase();

  // Ctrl+Shift+I / Ctrl+Shift+J / Ctrl+Shift+C (DevTools panels)
  if (e.ctrlKey && e.shiftKey && ['i', 'j', 'c'].includes(key)) {
    e.preventDefault();
    return;
  }

  // Ctrl+U (View Source)
  if (e.ctrlKey && key === 'u') {
    e.preventDefault();
    return;
  }

  // Cmd equivalents for Mac
  if (e.metaKey && e.altKey && ['i', 'j', 'c'].includes(key)) {
    e.preventDefault();
    return;
  }
});
// ══ INTERESTS & PASSIONS — 3D DRAG COVERFLOW ══
// ══ INTERESTS & PASSIONS — 3D DRAG COVERFLOW ══
(() => {
  const track = document.getElementById('coverflow');
  if (!track) return;

  const cards = Array.from(track.querySelectorAll('.coverflow-card'));
  const dotsWrap = document.getElementById('coverflowDots');
  let activeIndex = Math.floor(cards.length / 2);
  let dragOffset = 0;
  let dragMoved = false;
  let startX = 0;
  let isDragging = false;
  let bobTime = 0;
  let autoplayTimer = null;

  cards.forEach((_, i) => {
    const dot = document.createElement('span');
    dot.className = 'coverflow-dot';
    dot.addEventListener('click', () => {
      activeIndex = i;
      restartAutoplay();
    });
    dotsWrap.appendChild(dot);
  });
  const dots = Array.from(dotsWrap.children);

  function getConfig() {
    const mobile = window.innerWidth < 600;
    return {
      spacing: mobile ? 140 : 230,
      angle: mobile ? 38 : 45,
      depth: mobile ? 90 : 140
    };
  }

  function render() {
    const { spacing, angle, depth } = getConfig();
    cards.forEach((card, i) => {
      const offset = (i - activeIndex) + dragOffset / spacing;
      const abs = Math.abs(offset);
      const tx = offset * spacing;
      const rotY = Math.max(-65, Math.min(65, offset * -angle));
      const tz = -abs * depth;
      const scale = Math.max(0.55, 1 - abs * 0.15);
      const opacity = abs > 3.4 ? 0 : Math.max(0, 1 - abs * 0.28);

      // gentle floating bob, only on the centered card, fading out as it moves off-center
      const bobStrength = Math.max(0, 1 - abs / 0.5);
      const bob = Math.sin(bobTime / 700) * 8 * bobStrength;

      card.style.transform =
        `translate(-50%, -50%) translate3d(${tx}px, ${bob}px, ${tz}px) rotateY(${rotY}deg) scale(${scale})`;
      card.style.opacity = opacity;
      card.style.zIndex = Math.round(100 - abs * 10);
      card.style.pointerEvents = abs > 3.4 ? 'none' : 'auto';
    });
    dots.forEach((d, i) => d.classList.toggle('active', i === activeIndex));
  }

  // ── continuous idle float loop ──
  function tick() {
    bobTime += 16;
    if (!isDragging) render();
    requestAnimationFrame(tick);
  }
  requestAnimationFrame(tick);

  // ── autoplay ──
  function startAutoplay() {
    stopAutoplay();
    autoplayTimer = setInterval(() => {
      activeIndex = (activeIndex + 1) % cards.length;
      render();
    }, 3200);
  }
  function stopAutoplay() {
    if (autoplayTimer) clearInterval(autoplayTimer);
  }
  function restartAutoplay() {
    stopAutoplay();
    startAutoplay();
  }

  track.addEventListener('mouseenter', stopAutoplay);
  track.addEventListener('mouseleave', startAutoplay);

  function onPointerDown(e) {
    isDragging = true;
    dragMoved = false;
    startX = e.clientX;
    dragOffset = 0;
    stopAutoplay();
    track.classList.add('dragging');
    track.setPointerCapture(e.pointerId);
  }

  function onPointerMove(e) {
    if (!isDragging) return;
    dragOffset = e.clientX - startX;
    if (Math.abs(dragOffset) > 5) dragMoved = true;
    render();
  }

  function onPointerUp() {
    if (!isDragging) return;
    isDragging = false;
    track.classList.remove('dragging');
    const { spacing } = getConfig();
    const steps = Math.round(dragOffset / spacing);
    activeIndex = Math.max(0, Math.min(cards.length - 1, activeIndex - steps));
    dragOffset = 0;
    render();
    restartAutoplay();
  }

  track.addEventListener('pointerdown', onPointerDown);
  track.addEventListener('pointermove', onPointerMove);
  track.addEventListener('pointerup', onPointerUp);
  track.addEventListener('pointerleave', onPointerUp);

  // ── click-to-popup for the interest cards ──
  const interestModal = document.getElementById('interestModal');
  const interestModalImg = document.getElementById('interestModalImg');
  const interestModalTitle = document.getElementById('interestModalTitle');
  const interestModalDesc = document.getElementById('interestModalDesc');
  const interestModalClose = document.getElementById('interestModalClose');

  function openInterestModal(card) {
    const img = card.querySelector('img');
    interestModalImg.src = img.src;
    interestModalTitle.textContent = card.getAttribute('data-title') || '';
    interestModalDesc.textContent = card.getAttribute('data-desc') || '';
    interestModal.classList.add('active');
  }

  if (interestModalClose) {
    interestModalClose.addEventListener('click', () => interestModal.classList.remove('active'));
    interestModal.addEventListener('click', (e) => {
      if (e.target === interestModal) interestModal.classList.remove('active');
    });
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') interestModal.classList.remove('active');
    });
  }

  cards.forEach((card, i) => {
    card.addEventListener('click', () => {
      if (dragMoved) return;
      if (i !== activeIndex) {
        activeIndex = i;
        restartAutoplay();
        render();
      } else {
        openInterestModal(card);
      }
    });
  });

  window.addEventListener('resize', render);

  render();
  startAutoplay();
})();
// ══ GITHUB STATS CARD — live data + count-up ══
(() => {
  const card = document.getElementById('githubCard');
  if (!card) return;

  const repoEl = document.getElementById('githubRepos');
  const followerEl = document.getElementById('githubFollowers');
  let targetRepos = 0;
  let targetFollowers = 0;
  let animated = false;

  fetch('https://api.github.com/users/ANUBHAV-SRMIST')
    .then(res => res.json())
    .then(data => {
      targetRepos = data.public_repos || 0;
      targetFollowers = data.followers || 0;
    })
    .catch(() => {
      targetRepos = 49;
      targetFollowers = 7;
    });

  function countUp(el, target, duration) {
    const start = performance.now();
    function step(now) {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      el.textContent = Math.round(eased * target);
      if (progress < 1) requestAnimationFrame(step);
    }
    requestAnimationFrame(step);
  }

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !animated) {
        animated = true;
        const waitForData = setInterval(() => {
          if (targetRepos || targetFollowers) {
            clearInterval(waitForData);
            countUp(repoEl, targetRepos, 1200);
            countUp(followerEl, targetFollowers, 1200);
          }
        }, 100);
        setTimeout(() => clearInterval(waitForData), 3000);
      }
    });
  }, { threshold: 0.4 });

  observer.observe(card);
})();
// ══ PUBLICATIONS — abstract toggle + tilt effect + scroll reveal ══
(() => {
  const toggle = document.getElementById('pubToggle');
  const abstractEl = document.getElementById('pubAbstract');
  if (toggle && abstractEl) {
    toggle.addEventListener('click', () => {
      const expanded = abstractEl.classList.toggle('expanded');
      toggle.classList.toggle('expanded', expanded);
      toggle.innerHTML = expanded
        ? 'Show Less <i class="fa-solid fa-chevron-down"></i>'
        : 'Read Full Abstract <i class="fa-solid fa-chevron-down"></i>';
    });
  }

  const pubCard = document.querySelector('.pub-card');
  if (!pubCard) return;

  if (window.matchMedia('(hover: hover)').matches) {
    pubCard.addEventListener('mousemove', (e) => {
      const rect = pubCard.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const rotateX = ((y / rect.height) - 0.5) * -6;
      const rotateY = ((x / rect.width) - 0.5) * 6;
      pubCard.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
    });
    pubCard.addEventListener('mouseleave', () => {
      pubCard.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg)';
    });
  }

  // ── scroll-triggered reveal + stat count-up ──
  let statsAnimated = false;
  const statEls = pubCard.querySelectorAll('.pub-stat-value');

  function animateStats() {
    if (statsAnimated) return;
    statsAnimated = true;
    statEls.forEach(el => {
      const target = parseFloat(el.dataset.target);
      const suffix = el.dataset.suffix || '';
      const isDecimal = String(el.dataset.target).includes('.');
      const start = performance.now();
      const duration = 1000;
      function step(now) {
        const progress = Math.min((now - start) / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        const value = eased * target;
        el.textContent = (isDecimal ? value.toFixed(1) : Math.round(value)) + suffix;
        if (progress < 1) requestAnimationFrame(step);
      }
      requestAnimationFrame(step);
    });
  }

  const pubObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        pubCard.classList.add('in-view');
        animateStats();
        pubObserver.disconnect();
      }
    });
  }, { threshold: 0.3 });

  pubObserver.observe(pubCard);
})();
// ── FOOTER: LAST UPDATED DATE ──
const lastUpdatedEl = document.getElementById('lastUpdated');
if (lastUpdatedEl) {
  lastUpdatedEl.textContent = new Date(document.lastModified).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
}