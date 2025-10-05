// Typing animation
const texts = ["Cybersecurity Enthusiast", "AI & Web Developer", "Problem Solver", "Technology Optimist"];
let textIndex = 0, charIndex = 0, isDeleting = false;

function typeWriter() {
  const currentText = texts[textIndex];
  const typingElement = document.getElementById('typing-text');
  if (isDeleting) {
    typingElement.textContent = currentText.substring(0, charIndex - 1);
    charIndex--;
  } else {
    typingElement.textContent = currentText.substring(0, charIndex + 1);
    charIndex++;
  }
  if (!isDeleting && charIndex === currentText.length) {
    setTimeout(() => isDeleting = true, 600);
  } else if (isDeleting && charIndex === 0) {
    isDeleting = false;
    textIndex = (textIndex + 1) % texts.length;
  }
  setTimeout(typeWriter, isDeleting ? 20 : 20);
}
typeWriter();

// Mobile menu toggle
document.getElementById('mobile-menu-btn').addEventListener('click', () => {
  document.getElementById('mobile-menu').classList.toggle('hidden');
});

// Smooth scrolling
document.querySelectorAll('.nav-link').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    document.getElementById('mobile-menu').classList.add('hidden');
  });
});

// Project filtering
function filterProjects(category) {
  const projects = document.querySelectorAll('.project-item');
  const buttons = document.querySelectorAll('.filter-btn');
  buttons.forEach(btn => btn.classList.remove('bg-purple-600','text-white'));
  event.target.classList.add('bg-purple-600','text-white');
  projects.forEach(project => {
    project.style.display = (category === 'all' || project.classList.contains(category)) ? 'block' : 'none';
  });
}

// Contact form
document.getElementById('contact-form')?.addEventListener('submit', async function(e) {
  e.preventDefault();
  const submitBtn = document.getElementById('submit-btn');
  const submitText = document.getElementById('submit-text');
  const submitSpinner = document.getElementById('submit-spinner');
  const messageDiv = document.getElementById('form-message');
  submitText.textContent = 'Sending...'; submitSpinner.classList.remove('hidden'); submitBtn.disabled = true;
  const formData = new FormData(this);
  const data = Object.fromEntries(formData.entries());
  data.timestamp = new Date().toISOString();
  try {
    await fetch('https://script.google.com/macros/s/AKfycbyzOvMpTZkHNyvk05qqA2gNqfWeTm_gM-jTywIol4e3jIbXWEnxAEudsf1IszQ8uD4l/exec', {
      method: 'POST', mode: 'no-cors', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(data)
    });
    messageDiv.className = 'mt-4 text-center bg-green-100 text-green-800 p-3 rounded-lg';
    messageDiv.textContent = 'Thank you! Your message has been sent successfully.';
  } catch {
    messageDiv.className = 'mt-4 text-center bg-red-100 text-red-800 p-3 rounded-lg';
    messageDiv.textContent = 'Error sending your message. Please email me directly.';
  }
  messageDiv.classList.remove('hidden');
  this.reset();
  submitText.textContent = 'Send Message'; submitSpinner.classList.add('hidden'); submitBtn.disabled = false;
  setTimeout(()=> messageDiv.classList.add('hidden'), 5000);
});

// Resume download (simplified)
function downloadResume() {
  const isMobile = /Android|iPhone|iPad|iPod/i.test(navigator.userAgent);
  if (isMobile) alert('📱 Resume will download as HTML. Convert to PDF via Print → Save as PDF.');
  window.print();
}

// Scroll animations
function animateOnScroll() {
  const elements = document.querySelectorAll('.fade-in');
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => { if (entry.isIntersecting) entry.target.classList.add('visible'); });
  }, { threshold: 0.1 });
  elements.forEach(el => observer.observe(el));
}
function animateSkillBars() {
  const skillBars = document.querySelectorAll('.skill-bar');
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => { if (entry.isIntersecting) entry.target.style.animation = 'fillBar 2s ease-in-out'; });
  });
  skillBars.forEach(bar => observer.observe(bar));
}
document.addEventListener('DOMContentLoaded', () => {
  animateOnScroll(); animateSkillBars();
  setTimeout(() => document.querySelectorAll('.fade-in').forEach(el => {
    if (el.getBoundingClientRect().top < window.innerHeight) el.classList.add('visible');
  }), 100);
});
