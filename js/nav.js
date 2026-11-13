/**
 * nav.js — Navegació i utilitats compartides
 * Escola Giroi · Formació Digital
 *
 * - Marca l'element actiu del menú de navegació
 * - Gestió del filtre d'eines (pàgina eines.html)
 */

'use strict';

document.addEventListener('DOMContentLoaded', () => {
  // ---- Marcar pàgina activa al menú ----
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.site-nav a').forEach(link => {
    const href = link.getAttribute('href');
    if (href === currentPage ||
        (currentPage === '' && href === 'index.html') ||
        (currentPage === 'index.html' && href === 'index.html')) {
      link.classList.add('active');
      link.setAttribute('aria-current', 'page');
    }
  });

  // ---- Filtre d'eines (pàgina eines.html) ----
  const filterButtons = document.querySelectorAll('.filter-btn');
  const toolCards     = document.querySelectorAll('.tool-card');

  if (filterButtons.length > 0) {
    filterButtons.forEach(btn => {
      btn.addEventListener('click', () => {
        const category = btn.dataset.category;

        // Actualitzar botons
        filterButtons.forEach(b => {
          b.classList.remove('active');
          b.removeAttribute('aria-pressed');
        });
        btn.classList.add('active');
        btn.setAttribute('aria-pressed', 'true');

        // Filtrar targetes
        let visible = 0;
        toolCards.forEach(card => {
          const cardCategory = card.dataset.category;
          const show = category === 'all' || cardCategory === category;
          card.style.display = show ? '' : 'none';
          if (show) visible++;
        });

        // Anunciar al lector de pantalla
        announceFilter(`S'han filtrat ${visible} eines per la categoria "${btn.textContent.trim()}".`);
      });
    });

    // Marcar el primer botó com a actiu per defecte
    if (filterButtons[0]) {
      filterButtons[0].setAttribute('aria-pressed', 'true');
    }
  }
});

function announceFilter(message) {
  let el = document.getElementById('filter-announcer');
  if (!el) {
    el = document.createElement('div');
    el.id = 'filter-announcer';
    el.className = 'visually-hidden';
    el.setAttribute('aria-live', 'polite');
    el.setAttribute('aria-atomic', 'true');
    document.body.appendChild(el);
  }
  el.textContent = '';
  setTimeout(() => { el.textContent = message; }, 50);
}
