// ヘッダーを動的に挿入するスクリプト
document.addEventListener('DOMContentLoaded', function() {
  // ページのIDを取得
  const pageId = document.body.id;
  
  // ヘッダープレースホルダーを取得
  const headerPlaceholder = document.getElementById('header-placeholder');
  
  if (headerPlaceholder) {
    // ホームページ用ヘッダー
    if (pageId === 'home') {
      headerPlaceholder.innerHTML = `
        <!-- ヘッダーを直接記述 -->
        <header>
          <div class="tbs-v9-gheader">
            <div class="tbs-v9-gh-logo"><a href="index.html"><img src="img/logo.svg" alt="BirthRan" width="200" height="60"></a></div>
            <nav>
              <ul class="tbs-v9-gh-nav">
                <li><a href="caststaff.html"><span>Cast&Staff キャスト＆スタッフ</span></a></li>
                <li><a href="news.html"><span>お知らせ</span></a></li>
                <li><a href="delivery.html"><span>配信</span></a></li>
              </ul>
            </nav>
          </div>
        </header>

        <div class="header">
          <h1 id="page-title">バスラン<br><span class="subtitle">efitプレゼンツ☆ウィークリー・バースデー・ランキング</span></h1>
          <ul class="poster_slide">
            <li><img src="https://placehold.jp/3d4070/ffffff/1200x400.png?text=バスラン" alt="メインビジュアル"></li>
          </ul>
        </div>

        <div class="menu_outer">
          <ul class="menu">
            <li class="active"><a href="index.html"><span>ホーム</span></a></li>
            <li><a href="about.html"><span>はじめに</span></a></li>
            <li><a href="story.html"><span>あらすじ</span></a></li>
            <li><a href="chart.html"><span>相関図</span></a></li>
            <li><a href="news.html"><span>お知らせ</span></a></li>
            <li><a href="caststaff.html"><span>キャスト＆STAFF</span></a></li>
            <li><a href="delivery.html"><span>配信</span></a></li>
          </ul>
        </div>
      `;
    } else {
      // その他のページ用ヘッダー（バナー形式）
      // ページタイトルとサブタイトルを設定
      let pageTitle = '';
      let pageSubtitle = '';
      let activeMenuIndex = 0;
      
      // ページIDに基づいてタイトルとサブタイトルを設定
      switch(pageId) {
        case 'about':
          pageTitle = 'はじめに';
          pageSubtitle = '番組概要';
          activeMenuIndex = 1;
          break;
        case 'story':
          pageTitle = 'あらすじ';
          pageSubtitle = '番組の楽しみ方';
          activeMenuIndex = 2;
          break;
        case 'chart':
          pageTitle = '相関図';
          pageSubtitle = 'クロスメディア展開';
          activeMenuIndex = 3;
          break;
        case 'news':
          pageTitle = 'お知らせ';
          pageSubtitle = '最新情報';
          activeMenuIndex = 4;
          break;
        case 'caststaff':
          pageTitle = 'キャスト＆STAFF';
          pageSubtitle = '出演者・制作陣';
          activeMenuIndex = 5;
          break;
        case 'delivery':
          pageTitle = '配信';
          pageSubtitle = 'ラジオ・渋谷愛ビジョン連動';
          activeMenuIndex = 6;
          break;
        default:
          pageTitle = 'ページ';
          pageSubtitle = '';
      }
      
      // メニューアイテムを生成
      const menuItems = [
        {href: 'index.html', text: 'ホーム'},
        {href: 'about.html', text: 'はじめに'},
        {href: 'story.html', text: 'あらすじ'},
        {href: 'chart.html', text: '相関図'},
        {href: 'news.html', text: 'お知らせ'},
        {href: 'caststaff.html', text: 'キャスト＆STAFF'},
        {href: 'delivery.html', text: '配信'}
      ];
      
      let menuHTML = '';
      menuItems.forEach((item, index) => {
        const activeClass = index === activeMenuIndex ? 'class="active"' : '';
        menuHTML += `<li ${activeClass}><a href="${item.href}"><span>${item.text}</span></a></li>`;
      });
      
      headerPlaceholder.innerHTML = `
        <!-- ヘッダーを直接記述 -->
        <header>
          <div class="tbs-v9-gheader">
            <div class="tbs-v9-gh-logo"><a href="index.html"><img src="img/logo.svg" alt="BirthRan" width="200" height="60"></a></div>
            <nav>
              <ul class="tbs-v9-gh-nav">
                <li><a href="caststaff.html"><span>Cast&Staff キャスト＆スタッフ</span></a></li>
                <li><a href="news.html"><span>お知らせ</span></a></li>
                <li><a href="delivery.html"><span>配信</span></a></li>
              </ul>
            </nav>
          </div>
        </header>

        <div class="header banner-header">
          <h1 id="page-title">${pageTitle}<br><span class="subtitle">${pageSubtitle}</span></h1>
          <ul class="poster_slide">
            <li><img src="https://placehold.jp/ff6b6b/ffffff/1200x200.png?text=バースデー・ランキング　公式サイト" alt="バナー" style="height: 200px; max-width: 100%; object-fit: cover;"></li>
          </ul>
        </div>

        <div class="menu_outer">
          <ul class="menu">
            ${menuHTML}
          </ul>
        </div>
      `;
    }
  }
});
