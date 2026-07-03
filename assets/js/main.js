/* ============================================================
   Nikola — Portfolio
   Shared interactions
   ============================================================ */
(function () {
  'use strict';

  /* ---------- Mobile nav toggle ---------- */
  const toggle = document.getElementById('navToggle');
  const links = document.getElementById('navLinks');
  if (toggle && links) {
    toggle.addEventListener('click', () => {
      const isOpen = links.classList.toggle('open');
      toggle.setAttribute('aria-expanded', String(isOpen));
    });
    links.querySelectorAll('a').forEach((a) =>
      a.addEventListener('click', () => {
        links.classList.remove('open');
        toggle.setAttribute('aria-expanded', 'false');
      })
    );
  }

  /* ---------- Scroll reveal ---------- */
  const revealEls = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window && revealEls.length) {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('in');
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12 }
    );
    revealEls.forEach((el) => io.observe(el));
  } else {
    revealEls.forEach((el) => el.classList.add('in'));
  }

  /* ---------- Footer year ---------- */
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = String(new Date().getFullYear());

  /* ---------- Project filtering (projects page) ---------- */
  const filterBar = document.querySelector('.filter-bar');
  if (filterBar) {
    const cards = document.querySelectorAll('.project-card[data-tags]');
    filterBar.addEventListener('click', (e) => {
      const btn = e.target.closest('.filter-btn');
      if (!btn) return;
      filterBar.querySelectorAll('.filter-btn').forEach((b) => b.classList.remove('active'));
      btn.classList.add('active');
      const filter = btn.dataset.filter;
      cards.forEach((card) => {
        const show = filter === 'all' || card.dataset.tags.split(' ').includes(filter);
        card.style.display = show ? '' : 'none';
      });
    });
  }

  /* ---------- Contact form (mailto draft) ---------- */
  const form = document.getElementById('contactForm');
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      if (!form.checkValidity()) {
        form.reportValidity();
        return;
      }

      const name = (document.getElementById('name') || {}).value?.trim() || '';
      const email = (document.getElementById('email') || {}).value?.trim() || '';
      const message = (document.getElementById('message') || {}).value?.trim() || '';

      const to = 'nikolaanastasijevic0@gmail.com';
      const subject = `Portfolio message from ${name || 'Website Visitor'}`;
      const body = [
        `Name: ${name || 'N/A'}`,
        `Email: ${email || 'N/A'}`,
        '',
        'Message:',
        message || 'N/A'
      ].join('\n');

      const mailtoLink = `mailto:${to}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
      const status = document.getElementById('formStatus');
      if (status) {
        status.textContent = 'Opening your email app with a prefilled draft...';
        status.classList.add('show');
      }

      window.location.href = mailtoLink;
      form.reset();
    });
  }
})();
