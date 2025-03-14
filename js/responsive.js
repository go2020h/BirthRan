// レスポンシブ対応のためのJavaScriptファイル
document.addEventListener('DOMContentLoaded', function() {
  // ハンバーガーメニューの動作
  const hamburger = document.querySelector('.tbs-v9-gh-hamb a');
  const nav = document.querySelector('.tbs-v9-gh-nav');
  
  if (hamburger) {
    hamburger.addEventListener('click', function(e) {
      e.preventDefault();
      hamburger.classList.toggle('active');
      nav.classList.toggle('active');
    });
  }
  
  // ウィンドウサイズの変更に対応
  window.addEventListener('resize', function() {
    if (window.innerWidth > 768) {
      if (hamburger && hamburger.classList.contains('active')) {
        hamburger.classList.remove('active');
        nav.classList.remove('active');
      }
    }
  });
});
