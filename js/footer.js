// フッターを読み込む関数
document.addEventListener('DOMContentLoaded', function() {
  // フッターのCSSを追加
  const footerStyle = document.createElement('style');
  footerStyle.textContent = `
    /* フッター */
    footer {
      margin-top: auto !important;
      background: linear-gradient(to bottom, #0f2342 0%, #1a2d5a 100%) !important;
      color: #fff !important;
      padding: 50px 0 20px !important; /* 下部マージンを追加 */
      width: 100vw !important;
      margin-left: calc(50% - 50vw) !important;
      margin-right: calc(50% - 50vw) !important;
      position: relative !important;
      z-index: 100 !important;
      box-sizing: border-box !important;
      overflow: hidden !important;
    }

    footer .wrap {
      background-color: transparent !important;
      display: flex !important;
      flex-direction: column !important;
      align-items: center !important;
      max-width: 1200px !important;
      margin: 0 auto !important;
      padding: 0 20px !important; /* 下部マージンを削除し、左右マージンを設定 */
      width: 100% !important;
    }

    #social-links {
      margin-bottom: 20px !important;
      text-align: center !important;
      padding-top: 20px !important; /* 上部マージンを追加 */
    }

    #social-links ul {
      display: flex !important;
      justify-content: center !important;
      list-style: none !important;
      padding: 0 !important;
      margin: 0 !important;
    }

    #social-links li {
      margin: 0 10px !important;
    }

    #social-links a {
      display: flex !important;
      align-items: center !important;
      justify-content: center !important;
      width: 40px !important;
      height: 40px !important;
      border-radius: 50% !important;
      background-color: rgba(255, 255, 255, 0.1) !important;
      color: #fff !important;
      font-size: 20px !important;
      transition: all 0.3s ease !important;
      text-decoration: none !important;
    }

    #social-links a:hover {
      background-color: rgba(255, 255, 255, 0.2) !important;
      transform: translateY(-3px) !important;
      box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2) !important;
    }

    .x-logo {
      font-family: Arial, sans-serif !important;
      font-weight: bold !important;
      font-size: 24px !important;
    }

    .instagram {
      background: linear-gradient(45deg, #405DE6, #5851DB, #833AB7, #C13584, #E1306C, #FD1D1D) !important;
    }

    .youtube {
      background-color: #FF0000 !important;
    }

    .copy {
      margin-top: 20px !important;
      text-align: center !important;
    }

    .copy small {
      font-size: 12px !important;
      color: rgba(255, 255, 255, 0.7) !important;
    }

    .footer-links {
      display: flex !important;
      flex-wrap: wrap !important;
      justify-content: center !important;
      margin-top: 20px !important;
    }

    .footer-links a {
      color: #fff !important;
      margin: 0 15px !important;
      font-size: 14px !important;
      opacity: 0.8 !important;
      transition: opacity 0.3s ease !important;
    }

    .footer-links a:hover {
      opacity: 1 !important;
      color: #fff !important;
      text-decoration: none !important;
    }

    /* レスポンシブデザイン */
    @media (max-width: 768px) {
      .footer-links {
        flex-direction: column !important;
        align-items: center !important;
      }
      
      .footer-links a {
        margin: 5px 0 !important;
      }
      
      #social-links a {
        width: 35px !important;
        height: 35px !important;
      }
    }
  `;
  document.head.appendChild(footerStyle);

  // フッター要素を取得
  const footerPlaceholder = document.getElementById('footer-placeholder');
  
  if (footerPlaceholder) {
    // フッターのHTMLを直接定義
    const footerHTML = `
      <footer>
        <div class="wrap">
          <div id="social-links">
            <ul>
              <li><a href="https://x.com/NinjaHachi_" target="_blank" title="忍者ハチ@渋谷愛8" class="x-logo">&#x1D54F;</a></li>
            </ul>
          </div>
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
    
    // フッターを挿入
    footerPlaceholder.innerHTML = footerHTML;
    console.log('フッターを正常に読み込みました');
  } else {
    console.error('フッタープレースホルダーが見つかりません');
  }
});
