// Google Analytics 4のタグ
(function() {
  // Google tag (gtag.js)
  var analyticsScript = document.createElement('script');
  analyticsScript.async = true;
  analyticsScript.src = 'https://www.googletagmanager.com/gtag/js?id=G-6Y9Z9M5ED9';
  document.head.appendChild(analyticsScript);

  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'G-6Y9Z9M5ED9');

  // グローバル関数として定義
  window.gtag = gtag;
})();
