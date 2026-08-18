(function () {
  var header = document.getElementById('siteHeader');
  var hamburgerBtn = document.getElementById('hamburgerBtn');
  var mobileMenu = document.getElementById('mobileMenu');
  var mobileMenuClose = document.getElementById('mobileMenuClose');
  var mobileScrim = document.getElementById('mobileScrim');
  var contactForm = document.getElementById('contactForm');

  function onScroll() {
    if (window.scrollY > 24) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  function openMenu() {
    mobileMenu.classList.add('open');
    mobileScrim.classList.add('open');
    hamburgerBtn.setAttribute('aria-expanded', 'true');
    document.body.style.overflow = 'hidden';
  }
  function closeMenu() {
    mobileMenu.classList.remove('open');
    mobileScrim.classList.remove('open');
    hamburgerBtn.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
  }
  hamburgerBtn.addEventListener('click', openMenu);
  mobileMenuClose.addEventListener('click', closeMenu);
  mobileScrim.addEventListener('click', closeMenu);
  document.querySelectorAll('.mobile-nav a, .mobile-menu-footer a').forEach(function (a) {
    a.addEventListener('click', closeMenu);
  });

  if (contactForm) {
    contactForm.addEventListener('submit', function (e) {
      e.preventDefault();
      var btn = contactForm.querySelector('button[type="submit"]');
      var original = btn.textContent;
      btn.textContent = 'Takk for din henvendelse!';
      btn.disabled = true;
      setTimeout(function () {
        btn.textContent = original;
        btn.disabled = false;
        contactForm.reset();
      }, 2600);
    });
  }

  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (window.gsap && window.ScrollTrigger && !reduceMotion) {
    gsap.registerPlugin(ScrollTrigger);
    document.querySelectorAll('.reveal-up, .reveal-scale').forEach(function (el, i) {
      ScrollTrigger.create({
        trigger: el,
        start: 'top 88%',
        once: true,
        onEnter: function () {
          gsap.to(el, {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.9,
            delay: (i % 3) * 0.08,
            ease: 'expo.out'
          });
        }
      });
    });
  } else {
    document.querySelectorAll('.reveal-up, .reveal-scale').forEach(function (el) {
      el.classList.add('is-visible');
    });
  }
})();
