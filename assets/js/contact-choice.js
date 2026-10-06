(() => {
  const PHONE = '+525536691020';
  const DISPLAY_PHONE = '55 3669 1020';
  const DEFAULT_WA = 'https://wa.me/525536691020?text=' + encodeURIComponent('Hola Heriberto, vi tu página y quiero información para mi evento.');

  const modal = document.createElement('div');
  modal.className = 'contact-choice-overlay';
  modal.setAttribute('aria-hidden', 'true');
  modal.innerHTML = `
    <div class="contact-choice-card" role="dialog" aria-modal="true" aria-labelledby="contactChoiceTitle">
      <button class="contact-choice-close" type="button" aria-label="Cerrar">×</button>
      <span class="contact-choice-kicker">Atención directa</span>
      <h2 id="contactChoiceTitle">¿Cómo prefieres contactarnos?</h2>
      <p>Elige la opción que te resulte más cómoda. Heriberto te atenderá personalmente.</p>
      <div class="contact-choice-actions">
        <a class="contact-choice-option call-option" href="tel:${PHONE}">
          <span class="contact-choice-icon" aria-hidden="true">☎</span>
          <span><strong>Llamar ahora</strong><small>${DISPLAY_PHONE}</small></span>
        </a>
        <a class="contact-choice-option whatsapp-option" href="${DEFAULT_WA}" target="_blank" rel="noopener">
          <span class="contact-choice-icon whatsapp-mark" aria-hidden="true">
            <svg viewBox="0 0 32 32"><path d="M19.11 17.62c-.27-.14-1.6-.79-1.85-.88-.25-.09-.43-.14-.61.14-.18.27-.7.88-.86 1.06-.16.18-.32.2-.59.07-.27-.14-1.15-.42-2.19-1.35-.81-.72-1.36-1.61-1.52-1.88-.16-.27-.02-.42.12-.55.12-.12.27-.32.41-.48.14-.16.18-.27.27-.45.09-.18.05-.34-.02-.48-.07-.14-.61-1.47-.84-2.02-.22-.53-.45-.46-.61-.47l-.52-.01c-.18 0-.48.07-.73.34-.25.27-.95.93-.95 2.27 0 1.34.98 2.64 1.11 2.82.14.18 1.92 2.93 4.65 4.11.65.28 1.16.45 1.55.58.65.21 1.24.18 1.71.11.52-.08 1.6-.66 1.83-1.29.23-.64.23-1.18.16-1.29-.07-.12-.25-.18-.52-.32zM16.04 3C8.88 3 3.06 8.79 3.06 15.94c0 2.28.6 4.51 1.74 6.48L3 29l6.75-1.77a13 13 0 0 0 6.28 1.6h.01C23.2 28.83 29 23.04 29 15.89 29 8.73 23.2 3 16.04 3zm0 23.65h-.01a10.8 10.8 0 0 1-5.51-1.51l-.4-.24-4.01 1.05 1.07-3.9-.26-.4a10.75 10.75 0 0 1-1.65-5.71c0-5.94 4.84-10.77 10.79-10.77 2.88 0 5.59 1.12 7.62 3.15a10.7 10.7 0 0 1 3.16 7.6c0 5.94-4.84 10.77-10.8 10.77z"/></svg>
          </span>
          <span><strong>WhatsApp</strong><small>Enviar mensaje</small></span>
        </a>
      </div>
    </div>`;
  document.body.appendChild(modal);

  const waLink = modal.querySelector('.whatsapp-option');
  const closeBtn = modal.querySelector('.contact-choice-close');
  let lastFocused = null;

  const open = (whatsappUrl = DEFAULT_WA) => {
    lastFocused = document.activeElement;
    waLink.href = whatsappUrl || DEFAULT_WA;
    modal.classList.add('open');
    modal.setAttribute('aria-hidden', 'false');
    document.body.classList.add('contact-choice-open');
    setTimeout(() => closeBtn.focus(), 30);
  };
  const close = () => {
    modal.classList.remove('open');
    modal.setAttribute('aria-hidden', 'true');
    document.body.classList.remove('contact-choice-open');
    if(lastFocused && typeof lastFocused.focus === 'function') lastFocused.focus();
  };

  window.openContactChoice = open;
  window.closeContactChoice = close;

  document.addEventListener('click', e => {
    const trigger = e.target.closest('[data-contact-choice]');
    if(trigger){
      e.preventDefault();
      open(trigger.dataset.whatsapp || trigger.getAttribute('href') || DEFAULT_WA);
      return;
    }
    if(e.target === modal || e.target.closest('.contact-choice-close')) close();
  });
  document.addEventListener('keydown', e => { if(e.key === 'Escape' && modal.classList.contains('open')) close(); });
})();
