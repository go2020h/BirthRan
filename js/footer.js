// フッターを読み込む関数
document.addEventListener('DOMContentLoaded', function() {
  // フッター要素を取得
  const footerPlaceholder = document.getElementById('footer-placeholder');
  
  if (footerPlaceholder) {
    // フッターを読み込む
    // 相対パスを使用
    fetch('./includes/footer.html')
      .then(response => {
        if (!response.ok) {
          throw new Error('フッターの読み込みに失敗しました: ' + response.status);
        }
        return response.text();
      })
      .then(data => {
        footerPlaceholder.innerHTML = data;
        console.log('フッターを正常に読み込みました');
      })
      .catch(error => {
        console.error('フッターの読み込みに失敗しました:', error);
        // エラー時のフォールバック
        footerPlaceholder.innerHTML = `
          <footer>
            <div class="wrap">
              <div class="footer-links">
                <a href="index.html">ホーム</a>
                <a href="about.html">はじめに</a>
                <a href="story.html">あらすじ</a>
                <a href="chart.html">相関図</a>
                <a href="news.html">お知らせ</a>
                <a href="caststaff.html">キャスト＆STAFF</a>
                <a href="index.html#youtube-section">配信</a>
              </div>
              <div class="copy">
                <small>Copyright &copy; 2025 efitプレゼンツ☆ウィークリー・バースデー・ランキング, All Rights Reserved.</small>
              </div>
            </div>
          </footer>
        `;
      });
  }
});
