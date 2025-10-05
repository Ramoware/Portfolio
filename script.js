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

// ====================================================
// Contact Form Submission with Enhanced Error Handling
// ====================================================
const contactForm = document.getElementById('contact-form');
contactForm?.addEventListener('submit', async function(e) {
  e.preventDefault();
  
  const submitBtn = document.getElementById('submit-btn');
  const submitText = document.getElementById('submit-text');
  const submitSpinner = document.getElementById('submit-spinner');
  const messageDiv = document.getElementById('form-message');

  // Validate form inputs before submission
  if (!validateForm()) {
    showMessage(messageDiv, 'Please fill in all required fields correctly.', 'error');
    return;
  }

  // Update UI for loading state
  submitText.textContent = 'Sending...';
  submitSpinner.classList.remove('hidden');
  submitBtn.disabled = true;
  messageDiv.classList.add('hidden');

  // Prepare form data
  const formData = new FormData(this);
  const data = Object.fromEntries(formData.entries());
  data.timestamp = new Date().toISOString();
  
  // Add additional validation data
  data.userAgent = navigator.userAgent;
  data.referrer = document.referrer;

  try {
    console.log('Attempting to submit form data:', { 
      ...data, 
      email: data.email ? '***' : 'missing',
      name: data.name ? '***' : 'missing'
    });

    // Enhanced fetch with timeout and better error handling
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 10000); // 10 second timeout

    const response = await fetch('https://script.google.com/macros/s/AKfycbyzOvMpTZkHNyvk05qqA2gNqfWeTm_gM-jTywIol4e3jIbXWEnxAEudsf1IszQ8uD4l/exec', {
      method: 'POST',
      mode: 'no-cors',
      headers: { 
        'Content-Type': 'application/json',
        'X-Requested-With': 'XMLHttpRequest'
      },
      body: JSON.stringify(data),
      signal: controller.signal
    });

    clearTimeout(timeoutId);

    // Since we're using 'no-cors', we can't read the response
    // But we can assume success if no network error occurred
    console.log('Form submitted successfully');
    showMessage(messageDiv, 'Thank you! Your message has been sent successfully. I\'ll get back to you soon!', 'success');
    
    // Optional: Track successful submission
    trackFormSubmission('success');

  } catch (error) {
    console.error('Form submission error:', error);
    
    let errorMessage = 'Error sending your message. Please email me directly at ramdevsybscit@gmail.com';
    
    if (error.name === 'AbortError') {
      errorMessage = 'Request timed out. Please check your connection and try again.';
    } else if (error.name === 'TypeError') {
      errorMessage = 'Network error. Please check your internet connection.';
    } else if (error.name === 'SyntaxError') {
      errorMessage = 'There was an error processing your request. Please try again.';
    }

    showMessage(messageDiv, errorMessage, 'error');
    
    // Track failed submission
    trackFormSubmission('error', error.message);
    
  } finally {
    // Reset UI state
    submitText.textContent = 'Send Message';
    submitSpinner.classList.add('hidden');
    submitBtn.disabled = false;
    
    // Only reset form on success
    if (messageDiv.className.includes('bg-green-100')) {
      this.reset();
    }
  }
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
