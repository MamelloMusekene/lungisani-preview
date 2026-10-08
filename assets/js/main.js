(() => {
  const $ = (selector, scope=document) => scope.querySelector(selector);
  const $$ = (selector, scope=document) => [...scope.querySelectorAll(selector)];

  const menuButton = $('.menu-toggle');
  const nav = $('.main-nav');
  const closeMenu = () => {
    if (!menuButton || !nav) return;
    nav.classList.remove('open'); menuButton.classList.remove('is-open');
    menuButton.setAttribute('aria-expanded','false'); document.body.classList.remove('menu-open');
  };
  if (menuButton && nav) {
    menuButton.addEventListener('click', () => {
      const open = !nav.classList.contains('open');
      nav.classList.toggle('open', open); menuButton.classList.toggle('is-open', open);
      menuButton.setAttribute('aria-expanded', String(open)); document.body.classList.toggle('menu-open', open);
    });
    $$('.main-nav a').forEach(link => link.addEventListener('click', closeMenu));
    document.addEventListener('click', e => { if (nav.classList.contains('open') && !nav.contains(e.target) && !menuButton.contains(e.target)) closeMenu(); });
    document.addEventListener('keydown', e => { if (e.key === 'Escape') closeMenu(); });
  }

  const reveals = $$('.reveal');
  if ('IntersectionObserver' in window && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    const observer = new IntersectionObserver(entries => entries.forEach(entry => {
      if (entry.isIntersecting) { entry.target.classList.add('visible'); observer.unobserve(entry.target); }
    }), {threshold:.08}); reveals.forEach(el => observer.observe(el));
  } else reveals.forEach(el => el.classList.add('visible'));

  const backTop = $('.back-top');
  if (backTop) {
    const updateTop = () => backTop.classList.toggle('show', window.scrollY > 500);
    window.addEventListener('scroll', updateTop, {passive:true}); updateTop();
    backTop.addEventListener('click', () => window.scrollTo({top:0, behavior:'smooth'}));
  }

  const galleryButtons = $$('.gallery-card');
  const lightbox = $('.lightbox');
  if (galleryButtons.length && lightbox) {
    const image = $('#lightboxImage'), title = $('#lightboxTitle'), caption = $('#lightboxCaption');
    const close = () => { lightbox.classList.remove('open'); lightbox.setAttribute('aria-hidden','true'); document.body.classList.remove('lightbox-open'); image.src=''; };
    let index = 0;
    const show = i => { index=(i+galleryButtons.length)%galleryButtons.length; const b=galleryButtons[index]; image.src=b.dataset.full; image.alt=b.dataset.title || 'Lungisani Primary School photo'; title.textContent=b.dataset.title || ''; caption.textContent=b.dataset.caption || ''; lightbox.classList.add('open'); lightbox.setAttribute('aria-hidden','false'); document.body.classList.add('lightbox-open'); };
    galleryButtons.forEach((b,i)=>b.addEventListener('click',()=>show(i)));
    $('.lightbox-close',lightbox)?.addEventListener('click',close); $('.lightbox-backdrop',lightbox)?.addEventListener('click',close);
    $('.lightbox-prev',lightbox)?.addEventListener('click',()=>show(index-1)); $('.lightbox-next',lightbox)?.addEventListener('click',()=>show(index+1));
    document.addEventListener('keydown',e=>{if(!lightbox.classList.contains('open'))return;if(e.key==='Escape')close();if(e.key==='ArrowLeft')show(index-1);if(e.key==='ArrowRight')show(index+1);});
  }

  $$('.gallery-filter').forEach(filter => filter.addEventListener('click', () => {
    $$('.gallery-filter').forEach(f=>f.classList.remove('active')); filter.classList.add('active');
    const selected=filter.dataset.filter; $$('.gallery-card').forEach(card=>card.hidden=selected!=='all' && card.dataset.category!==selected);
  }));
})();
