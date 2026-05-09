/* City Cleaners SS — main.js */
document.addEventListener('DOMContentLoaded', () => {

  // Mobile nav
  const burger = document.querySelector('.nav-burger');
  const links  = document.querySelector('.nav-links');
  if (burger && links) {
    burger.addEventListener('click', () => links.classList.toggle('open'));
    links.querySelectorAll('.nav-link').forEach(l => l.addEventListener('click', () => links.classList.remove('open')));
  }

  // Active link
  const page = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-link').forEach(l => {
    if (l.getAttribute('href') === page || (page === '' && l.getAttribute('href') === 'index.html')) {
      l.classList.add('active');
    }
  });

  // Scroll fade-up
  const obs = new IntersectionObserver(entries => {
    entries.forEach((e, i) => {
      if (e.isIntersecting) {
        setTimeout(() => e.target.classList.add('visible'), i * 75);
        obs.unobserve(e.target);
      }
    });
  }, { threshold: 0.08, rootMargin: '0px 0px -30px 0px' });
  document.querySelectorAll('.fade-up').forEach(el => obs.observe(el));

  // Counter animation
  const countObs = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        const el = e.target;
        const target = parseInt(el.dataset.count, 10);
        const suffix = el.dataset.suffix || '';
        let cur = 0;
        const step = target / (1400 / 16);
        const timer = setInterval(() => {
          cur = Math.min(cur + step, target);
          el.textContent = Math.round(cur) + suffix;
          if (cur >= target) clearInterval(timer);
        }, 16);
        countObs.unobserve(el);
      }
    });
  }, { threshold: 0.5 });
  document.querySelectorAll('[data-count]').forEach(c => countObs.observe(c));

  // Contact form
  const form = document.getElementById('contact-form');
  const succ = document.getElementById('form-success');
  if (form) {
    form.addEventListener('submit', e => {
      e.preventDefault();
      const name  = form.querySelector('#f-name')?.value.trim();
      const email = form.querySelector('#f-email')?.value.trim();
      if (!name || !email) { alert('Please enter your name and email.'); return; }
      form.reset();
      if (succ) { succ.style.display = 'block'; setTimeout(() => succ.style.display = 'none', 7000); }
    });
  }

  // Navbar scroll effect
  const nav = document.querySelector('.nav');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 60) nav?.classList.add('scrolled');
    else nav?.classList.remove('scrolled');
  });
});
