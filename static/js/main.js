/* ============================================================
   UNCODE — project page interactions
   ============================================================ */
(function () {
  'use strict';

  /* ---- mobile nav toggle ---- */
  var navToggle = document.getElementById('navToggle');
  var navLinks  = document.getElementById('navLinks');
  if (navToggle && navLinks) {
    navToggle.addEventListener('click', function () {
      navLinks.classList.toggle('open');
    });
    navLinks.addEventListener('click', function (e) {
      if (e.target.tagName === 'A') navLinks.classList.remove('open');
    });
  }

  /* ---- active section highlight in nav ---- */
  var sections = Array.prototype.slice.call(document.querySelectorAll('section[id]'));
  var linkFor = {};
  document.querySelectorAll('.nav-links a').forEach(function (a) {
    var id = a.getAttribute('href').replace('#', '');
    linkFor[id] = a;
  });
  var visible = {};
  var navObserver = new IntersectionObserver(function (entries) {
    entries.forEach(function (en) {
      if (en.isIntersecting) visible[en.target.id] = true;
      else delete visible[en.target.id];
    });
    Object.keys(linkFor).forEach(function (id) { linkFor[id].classList.remove('active'); });
    // highlight the topmost visible section in document order
    var pick = sections.filter(function (s) { return visible[s.id]; })[0];
    if (pick && linkFor[pick.id]) linkFor[pick.id].classList.add('active');
  }, { rootMargin: '-45% 0px -50% 0px' });
  sections.forEach(function (s) { if (linkFor[s.id]) navObserver.observe(s); });

  /* ---- reveal-on-scroll ---- */
  var revealEls = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window) {
    var revObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) en.target.classList.add('in');
        else en.target.classList.remove('in');
      });
    }, { threshold: 0.12 });
    revealEls.forEach(function (el) { revObserver.observe(el); });
  } else {
    revealEls.forEach(function (el) { el.classList.add('in'); });
  }

  /* ---- copy BibTeX ---- */
  var copyBtn = document.getElementById('copyBib');
  var bibText = document.getElementById('bibText');
  if (copyBtn && bibText) {
    copyBtn.addEventListener('click', function () {
      var text = bibText.innerText;
      var done = function () {
        copyBtn.textContent = 'Copied!';
        copyBtn.classList.add('done');
        setTimeout(function () { copyBtn.textContent = 'Copy'; copyBtn.classList.remove('done'); }, 1800);
      };
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(text).then(done, fallback);
      } else { fallback(); }
      function fallback() {
        var ta = document.createElement('textarea');
        ta.value = text; document.body.appendChild(ta); ta.select();
        try { document.execCommand('copy'); done(); } catch (e) {}
        document.body.removeChild(ta);
      }
    });
  }

  /* ---- lightbox for figures (mouse + keyboard) ---- */
  var lightbox = document.getElementById('lightbox');
  var lightboxImg = document.getElementById('lightboxImg');
  if (lightbox && lightboxImg) {
    var lastFocused = null;
    var open = function (img) {
      lastFocused = img;
      lightboxImg.src = img.getAttribute('data-zoom') || img.currentSrc || img.src;
      lightboxImg.alt = img.alt || '';
      lightbox.classList.add('open');
      lightbox.setAttribute('aria-hidden', 'false');
      lightbox.focus();
    };
    var close = function () {
      if (!lightbox.classList.contains('open')) return;
      lightbox.classList.remove('open');
      lightbox.setAttribute('aria-hidden', 'true');
      lightboxImg.src = '';
      if (lastFocused && lastFocused.focus) lastFocused.focus();
    };
    document.querySelectorAll('img.zoomable').forEach(function (img) {
      img.setAttribute('role', 'button');
      img.setAttribute('tabindex', '0');
      if (!img.getAttribute('aria-label')) {
        img.setAttribute('aria-label', 'Enlarge image' + (img.alt ? ': ' + img.alt : ''));
      }
      img.addEventListener('click', function () { open(img); });
      img.addEventListener('keydown', function (e) {
        if (e.key === 'Enter' || e.key === ' ' || e.key === 'Spacebar') { e.preventDefault(); open(img); }
      });
    });
    lightbox.addEventListener('click', close);
    document.addEventListener('keydown', function (e) { if (e.key === 'Escape') close(); });
  }

  /* ---- back-to-top button ---- */
  var toTop = document.getElementById('toTop');
  if (toTop) {
    var onScroll = function () {
      if (window.pageYOffset > 600) toTop.classList.add('show');
      else toTop.classList.remove('show');
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    toTop.addEventListener('click', function () {
      var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      window.scrollTo({ top: 0, behavior: reduce ? 'auto' : 'smooth' });
    });
  }
})();
