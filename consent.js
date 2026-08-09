(function () {
  const STORAGE_KEY = 'reditus_consent';
  const GA_ID = 'G-XRQHS95DXH';
  const FB_PIXEL_ID = '2880615352336773';

  function readConsent() {
    try { return window.localStorage.getItem(STORAGE_KEY); } catch (err) { return null; }
  }

  function writeConsent(value) {
    try { window.localStorage.setItem(STORAGE_KEY, value); } catch (err) { /* localStorage indisponivel: banner volta a aparecer na proxima visita */ }
  }

  let gaLoaded = false;
  function loadGoogleAnalytics() {
    if (gaLoaded) return;
    gaLoaded = true;
    window.dataLayer = window.dataLayer || [];
    window.gtag = window.gtag || function (...args) { window.dataLayer.push(args); };
    window.gtag('js', new Date());
    window.gtag('config', GA_ID);
    const s = document.createElement('script');
    s.async = true;
    s.src = `https://www.googletagmanager.com/gtag/js?id=${GA_ID}`;
    document.head.appendChild(s);
  }

  let fbLoaded = false;
  function loadMetaPixel() {
    if (fbLoaded) return;
    fbLoaded = true;

    if (!window.fbq) {
      const fbq = function (...args) {
        if (fbq.callMethod) {
          fbq.callMethod.apply(fbq, args);
        } else {
          fbq.queue.push(args);
        }
      };
      window.fbq = fbq;
      if (!window._fbq) window._fbq = fbq;
      fbq.push = fbq;
      fbq.loaded = true;
      fbq.version = '2.0';
      fbq.queue = [];

      const script = document.createElement('script');
      script.async = true;
      script.src = 'https://connect.facebook.net/en_US/fbevents.js';
      const firstScript = document.getElementsByTagName('script')[0];
      firstScript.parentNode.insertBefore(script, firstScript);
    }

    window.fbq('init', FB_PIXEL_ID);
    window.fbq('track', 'PageView');

    const img = document.createElement('img');
    img.height = 1;
    img.width = 1;
    img.style.display = 'none';
    img.src = `https://www.facebook.com/tr?id=${FB_PIXEL_ID}&ev=PageView&noscript=1`;
    document.body.appendChild(img);
  }

  function activateTracking() {
    loadGoogleAnalytics();
    loadMetaPixel();
  }

  function ready(fn) {
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', fn);
    } else {
      fn();
    }
  }

  ready(function () {
    const banner = document.getElementById('cookie-consent');
    const manageBtn = document.getElementById('cookie-manage');
    if (!banner) return;

    const acceptBtn = document.getElementById('cc-accept');
    const rejectBtn = document.getElementById('cc-reject');

    function showBanner() {
      banner.hidden = false;
      if (manageBtn) manageBtn.hidden = true;
      requestAnimationFrame(function () { banner.classList.add('cc-show'); });
    }

    function hideBanner() {
      banner.classList.remove('cc-show');
      banner.hidden = true;
      if (manageBtn) manageBtn.hidden = false;
    }

    if (acceptBtn) {
      acceptBtn.addEventListener('click', function () {
        writeConsent('granted');
        activateTracking();
        hideBanner();
      });
    }

    if (rejectBtn) {
      rejectBtn.addEventListener('click', function () {
        writeConsent('denied');
        hideBanner();
      });
    }

    if (manageBtn) {
      manageBtn.addEventListener('click', showBanner);
    }

    const stored = readConsent();
    if (stored === 'granted') {
      activateTracking();
      banner.hidden = true;
      manageBtn.hidden = false;
    } else if (stored === 'denied') {
      banner.hidden = true;
      manageBtn.hidden = false;
    } else {
      showBanner();
    }
  });
})();

