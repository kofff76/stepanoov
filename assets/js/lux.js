(() => {
  const body = document.body;
  const preloader = document.querySelector('.preloader');
  window.addEventListener('load', () => setTimeout(() => preloader?.classList.add('is-hidden'), 350));
  setTimeout(() => preloader?.classList.add('is-hidden'), 2400);

  const toggle = document.querySelector('.menu-toggle');
  const nav = document.querySelector('.main-nav');
  toggle?.addEventListener('click', () => {
    const open = body.classList.toggle('menu-open');
    toggle.setAttribute('aria-expanded', String(open));
  });
  nav?.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
    body.classList.remove('menu-open');
    toggle?.setAttribute('aria-expanded', 'false');
  }));

  const revealObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => { if (entry.isIntersecting) entry.target.classList.add('is-visible'); });
  }, { threshold: 0.12 });
  document.querySelectorAll('.reveal,.image-reveal').forEach(el => revealObserver.observe(el));

  const cursor = document.querySelector('.cursor');
  const dot = document.querySelector('.cursor-dot');
  if (matchMedia('(pointer:fine)').matches && cursor && dot) {
    window.addEventListener('pointermove', e => {
      cursor.style.left = `${e.clientX}px`; cursor.style.top = `${e.clientY}px`;
      dot.style.left = `${e.clientX}px`; dot.style.top = `${e.clientY}px`;
    });
    document.querySelectorAll('a,button,summary').forEach(el => {
      el.addEventListener('mouseenter', () => cursor.classList.add('is-link'));
      el.addEventListener('mouseleave', () => cursor.classList.remove('is-link'));
    });
  }

  document.querySelector('.play-button')?.addEventListener('click', e => {
    const btn = e.currentTarget;
    btn.querySelector('span').textContent = 'Video';
    setTimeout(() => btn.querySelector('span').textContent = 'Play', 900);
  });

  function initGsap() {
    if (!window.gsap || !window.ScrollTrigger || matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    gsap.registerPlugin(ScrollTrigger);
    gsap.from('.hero__title span', { yPercent: 110, opacity: 0, duration: 1.25, stagger: .12, ease: 'power4.out', delay: .45 });
    gsap.from('.hero__voice', { opacity: 0, y: 24, duration: .8, delay: 1.05 });
    gsap.to('.hero__media img', { scale: 1.08, yPercent: 4, ease: 'none', scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom top', scrub: true } });
    document.querySelectorAll('.reveal-lines').forEach(el => {
      gsap.from(el, { y: 70, opacity: 0, duration: 1.05, ease: 'power3.out', scrollTrigger: { trigger: el, start: 'top 82%' } });
    });
    if (innerWidth > 900) {
      const track = document.querySelector('.theatres__track');
      const cards = gsap.utils.toArray('.theatre-card');
      if (track && cards.length) {
        const travel = () => Math.max(0, track.scrollWidth - innerWidth);
        gsap.to(track, { x: () => -travel(), ease: 'none', scrollTrigger: { trigger: '.theatres', start: 'top top', end: () => `+=${travel()}`, pin: true, scrub: 1, invalidateOnRefresh: true } });
      }
    }
  }
  window.addEventListener('load', initGsap);
})();
