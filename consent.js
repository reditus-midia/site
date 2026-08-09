(function () {
  'use strict';

  var STORAGE_KEY = 'reditus_consent';
  var GA_ID = 'G-XRQHS95DXH';
  var FB_PIXEL_ID = '2880615352336773';

  function readConsent() {
    try { return window.localStorage.getItem(STORAGE_KEY); } catch (err) { return null; }
  }

  function writeConsent(value) {
    try { window.localStorage.setItem(STORAGE_KEY, value); } catch (err) { /* localStorage indisponivel: banner volta a aparecer na proxima visita */ }
  }

  var gaLoaded = false;
  function loadGoogleAnalytics() {
    if (gaLoaded) return;
    gaLoaded = true;
    window.dataLayer = window.dataLayer || [];
    window.gtag = window.gtag || function () { window.dataLayer.push(arguments); };
    window.gtag('js', new Date());
    window.gtag('config', GA_ID);
    var s = document.createElement('script');
    s.async = true;
    s.src = 'https://www.googletagmanager.com/gtag/js?id=' + GA_ID;
    document.head.appendChild(s);
  }

  var fbLoaded = false;
  function loadMetaPixel() {
    if (fbLoaded) return;
    fbLoaded = true;
    !function(f,b,e,v,n,t,s)
    {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
    n.callMethod.apply(n,arguments):n.queue.push(arguments)};
    if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
    n.queue=[];t=b.createElement(e);t.async=!0;
    t.src=v;s=b.getElementsByTagName(e)[0];
    s.parentNode.insertBefore(t,s)}(window, document,'script',
    'https://connect.facebook.net/en_US/fbevents.js');
    window.fbq('init', FB_PIXEL_ID);
    window.fbq('track', 'PageView');

    var img = document.createElement('img');
    img.height = 1;
    img.width = 1;
    img.style.display = 'none';
    img.src = 'https://www.facebook.com/tr?id=' + FB_PIXEL_ID + '&ev=PageView&noscript=1';
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
    var banner = document.getElementById('cookie-consent');
    var manageBtn = document.getElementById('cookie-manage');
    if (!banner) return;

    var acceptBtn = document.getElementById('cc-accept');
    var rejectBtn = document.getElementById('cc-reject');

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

    var stored = readConsent();
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

