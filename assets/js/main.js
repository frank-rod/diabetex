/* ========================================
   DIABETEX — Main JS
======================================== */

document.addEventListener('DOMContentLoaded', () => {

  /* ---------- Navbar scroll shadow ---------- */
  const navbar = document.getElementById('navbar');
  window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 30);
  });

  /* ---------- Mobile menu toggle ---------- */
  const navToggle = document.getElementById('navToggle');
  const navLinks = document.getElementById('navLinks');

  navToggle.addEventListener('click', () => {
    navToggle.classList.toggle('active');
    navLinks.classList.toggle('open');
  });

  navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      navToggle.classList.remove('active');
      navLinks.classList.remove('open');
    });
  });

  /* ---------- Contact form → WhatsApp + mailto ---------- */
  const contactForm = document.getElementById('contactForm');

  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const nombre = document.getElementById('nombre').value.trim();
    const email = document.getElementById('email').value.trim();
    const mensaje = document.getElementById('mensaje').value.trim();

    if (!nombre || !email || !mensaje) return;

    // 1. WhatsApp
    const waText = encodeURIComponent(
      `Hola DIABETEX, soy ${nombre}.\nCorreo: ${email}\n\nMensaje:\n${mensaje}`
    );
    window.open(`https://wa.me/5219999999999?text=${waText}`, '_blank');

    // 2. Mailto backup
    const mailSubject = encodeURIComponent(`Nuevo mensaje de ${nombre} — DIABETEX Web`);
    const mailBody = encodeURIComponent(
      `Nombre: ${nombre}\nCorreo: ${email}\n\nMensaje:\n${mensaje}`
    );
    const mailLink = document.createElement('a');
    mailLink.href = `mailto:contacto@diabetex.mx?subject=${mailSubject}&body=${mailBody}`;
    mailLink.click();

    // 3. Success state
    contactForm.innerHTML = `
      <div class="form-success">
        <h3>${currentLang === 'en' ? 'Message sent!' : '¡Mensaje enviado!'}</h3>
        <p>${currentLang === 'en' ? "We'll get back to you soon via WhatsApp." : 'Te responderemos pronto por WhatsApp.'}</p>
      </div>
    `;
  });

  /* ---------- Carousel ---------- */
  const carousel = document.getElementById('pilaresCarousel');
  const prevBtn = document.getElementById('carouselPrev');
  const nextBtn = document.getElementById('carouselNext');
  const indicatorsContainer = document.getElementById('carouselIndicators');

  if (carousel && prevBtn && nextBtn && indicatorsContainer) {
    const items = carousel.querySelectorAll('.pilar');
    
    // Create dots
    items.forEach((_, index) => {
      const dot = document.createElement('button');
      dot.classList.add('carousel-dot');
      if (index === 0) dot.classList.add('active');
      dot.setAttribute('aria-label', `Go to slide ${index + 1}`);
      
      dot.addEventListener('click', () => {
        const itemWidth = items[0].offsetWidth + 32; // item width + gap
        carousel.scrollTo({
          left: index * itemWidth,
          behavior: 'smooth'
        });
      });
      indicatorsContainer.appendChild(dot);
    });

    const dots = indicatorsContainer.querySelectorAll('.carousel-dot');

    // Update dots on scroll
    carousel.addEventListener('scroll', () => {
      const itemWidth = items[0].offsetWidth + 32;
      const scrollPos = carousel.scrollLeft;
      const index = Math.round(scrollPos / itemWidth);
      
      dots.forEach((dot, i) => {
        dot.classList.toggle('active', i === index);
      });
    });

    prevBtn.addEventListener('click', () => {
      const itemWidth = items[0].offsetWidth + 32;
      carousel.scrollBy({ left: -itemWidth, behavior: 'smooth' });
    });

    nextBtn.addEventListener('click', () => {
      const itemWidth = items[0].offsetWidth + 32;
      carousel.scrollBy({ left: itemWidth, behavior: 'smooth' });
    });
  }

  /* ---------- Language Toggle (ES ↔ EN) ---------- */
  let currentLang = 'es';
  const btnLang = document.getElementById('btnLang');

  btnLang.addEventListener('click', () => {
    currentLang = currentLang === 'es' ? 'en' : 'es';
    btnLang.textContent = currentLang === 'es' ? 'EN' : 'ES';

    document.querySelectorAll('[data-en][data-es]').forEach(el => {
      const text = el.getAttribute(`data-${currentLang}`);
      if (text) el.textContent = text;
    });
  });

});
