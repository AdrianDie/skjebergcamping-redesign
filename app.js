(function () {
  var header = document.getElementById('siteHeader');
  var hamburgerBtn = document.getElementById('hamburgerBtn');
  var mobileMenu = document.getElementById('mobileMenu');
  var mobileMenuClose = document.getElementById('mobileMenuClose');
  var mobileScrim = document.getElementById('mobileScrim');

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

(function () {
  // På kundens permanente domene tar ekte CookieYes over automatisk — se OVERLEVERING.md
  var LIVE_DOMAINS = ['skjebergcamping.no', 'www.skjebergcamping.no'];
  if (LIVE_DOMAINS.indexOf(window.location.hostname) !== -1) {
    var cy = document.createElement('script');
    cy.id = 'cookieyes';
    cy.type = 'text/javascript';
    cy.src = 'https://cdn-cookieyes.com/client_data/aa0f08b0e64e0f664a43d37a/script.js';
    document.head.appendChild(cy);
    return;
  }

  var STORAGE_KEY = 'skjebergCookieConsent';

  var CATEGORIES = [
    {
      key: 'necessary', name: 'Nødvendig', locked: true,
      desc: 'Nødvendige cookies er avgjørende for grunnleggende funksjoner på nettstedet, og nettstedet fungerer ikke på den tiltenkte måten uten dem. Disse cookies lagrer ikke personlig identifiserbare data.'
    },
    {
      key: 'functional', name: 'Funksjonell', locked: false,
      desc: 'Funksjonelle cookies hjelper deg med å utføre visse funksjoner som å dele innholdet på nettstedet på sosiale medieplattformer, samle tilbakemeldinger og andre tredjepartsfunksjoner.'
    },
    {
      key: 'analytics', name: 'Analytics', locked: false,
      desc: 'Analytiske cookies brukes til å forstå hvordan besøkende samhandler med nettstedet. Disse cookies hjelper deg med å gi informasjon om beregningene antall besøkende, fluktfrekvens, trafikkilde osv.'
    },
    {
      key: 'performance', name: 'Ytelse', locked: true, noControl: true,
      desc: 'Ytelsescookies cookies til å forstå og analysere de viktigste ytelsesindeksene til nettstedet som hjelper til med å gi en bedre brukeropplevelse for de besøkende.'
    },
    {
      key: 'advertisement', name: 'Annonse', locked: false,
      desc: 'Annonsecookies brukes til å levere besøkende med tilpassede annonser basert på sidene de besøkte før og analysere effektiviteten av annonsekampanjen.'
    }
  ];

  var saved = null;
  try { saved = JSON.parse(localStorage.getItem(STORAGE_KEY)); } catch (e) {}

  var save = function (consent) {
    saved = consent;
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(consent)); } catch (e) {}
    var overlay = document.querySelector('.cookie-overlay');
    if (overlay) overlay.remove();
    showRevisitButton();
  };

  var settingsRowsHTML = function () {
    return CATEGORIES.map(function (cat) {
      var isChecked = cat.locked || (saved && saved[cat.key]);
      var toggle = cat.noControl
        ? ''
        : '<span class="cookie-toggle"><input type="checkbox" ' +
          'id="cookieToggle-' + cat.key + '" ' +
          (isChecked ? 'checked ' : '') + (cat.locked ? 'disabled' : '') +
          '><span class="cookie-toggle-track"></span></span>';
      var badge = cat.locked && !cat.noControl ? '<span class="cookie-setting-always">Alltid aktiv</span>' : '';
      return (
        '<div class="cookie-setting-row">' +
          '<div>' +
            '<div class="cookie-setting-name">' + cat.name + badge + '</div>' +
            '<div class="cookie-setting-desc">' + cat.desc + '</div>' +
          '</div>' +
          toggle +
        '</div>'
      );
    }).join('');
  };

  var buildOverlay = function (showSettings) {
    var overlay = document.createElement('div');
    overlay.className = 'cookie-overlay';
    overlay.innerHTML =
      '<div class="cookie-banner" role="dialog" aria-modal="true" aria-label="Informasjonskapsler">' +
        '<div class="cookie-banner-head">' +
          '<h2>' + (showSettings ? 'Tilpass samtykkepreferanser' : 'Vi respekterer personvernet ditt') + '</h2>' +
          (showSettings ? '<button type="button" class="cookie-btn-close" id="cookieClose" aria-label="Lukk">&times;</button>' : '') +
        '</div>' +
        (showSettings
          ? '<p>Vi bruker informasjonskapsler for å hjelpe deg med å navigere effektivt og utføre visse funksjoner. Du finner detaljert informasjon om alle informasjonskapsler under hver samtykkekategori nedenfor. Informasjonskapslene som er kategorisert som «Nødvendige» lagres i nettleseren din da de er avgjørende for å aktivere de grunnleggende funksjonene til nettstedet.</p>' +
            '<div class="cookie-settings open">' + settingsRowsHTML() + '</div>'
          : '<p>Vi bruker informasjonskapsler for å forbedre nettleseropplevelsen din, vise personlig tilpassede annonser eller innhold, og analysere trafikken vår. Ved å klikke på «Godta alle», samtykker du til vår bruk av informasjonskapsler.</p>'
        ) +
        '<div class="cookie-banner-actions">' +
          (showSettings ? '' : '<button type="button" class="btn cookie-btn-outline" id="cookieCustomize">Tilpass</button>') +
          '<button type="button" class="btn cookie-btn-outline" id="cookieReject">Avvis</button>' +
          '<button type="button" class="btn cookie-btn-accept" id="cookieAccept">' + (showSettings ? 'Lagre mine preferanser' : 'Aksepter alt') + '</button>' +
        '</div>' +
      '</div>';
    document.body.appendChild(overlay);

    var allTrue = function () {
      var c = { necessary: true };
      CATEGORIES.forEach(function (cat) { if (!cat.noControl && cat.key !== 'necessary') c[cat.key] = true; });
      return c;
    };
    var allFalse = function () {
      var c = { necessary: true };
      CATEGORIES.forEach(function (cat) { if (!cat.noControl && cat.key !== 'necessary') c[cat.key] = false; });
      return c;
    };

    document.getElementById('cookieAccept').addEventListener('click', function () {
      if (!showSettings) { save(allTrue()); return; }
      var c = { necessary: true };
      CATEGORIES.forEach(function (cat) {
        if (cat.noControl || cat.key === 'necessary') return;
        var input = document.getElementById('cookieToggle-' + cat.key);
        c[cat.key] = !!(input && input.checked);
      });
      save(c);
    });
    document.getElementById('cookieReject').addEventListener('click', function () {
      save(allFalse());
    });
    if (showSettings) {
      document.getElementById('cookieClose').addEventListener('click', function () {
        overlay.remove();
        buildOverlay(false);
      });
    } else {
      document.getElementById('cookieCustomize').addEventListener('click', function () {
        overlay.remove();
        buildOverlay(true);
      });
    }
  };

  var showRevisitButton = function () {
    if (document.querySelector('.cookie-revisit')) return;
    var btn = document.createElement('button');
    btn.type = 'button';
    btn.className = 'cookie-revisit';
    btn.setAttribute('aria-label', 'Samtykkepreferanser');
    btn.innerHTML = '<svg viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">' +
      '<circle cx="12" cy="12" r="9"></circle>' +
      '<circle cx="9" cy="10" r="1.1" fill="#fff" stroke="none"></circle>' +
      '<circle cx="14" cy="9" r="1.1" fill="#fff" stroke="none"></circle>' +
      '<circle cx="13" cy="14" r="1.1" fill="#fff" stroke="none"></circle>' +
      '<circle cx="9.5" cy="14.5" r="1.1" fill="#fff" stroke="none"></circle>' +
      '</svg>';
    btn.addEventListener('click', function () { buildOverlay(true); });
    document.body.appendChild(btn);
  };

  if (saved) {
    showRevisitButton();
  } else {
    buildOverlay(false);
  }
})();
