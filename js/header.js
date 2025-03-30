// ヘッダーを動的に挿入するスクリプト
document.addEventListener('DOMContentLoaded', function() {
  // ページのIDを取得
  const pageId = document.body.id;
  
  // ヘッダープレースホルダーを取得
  const headerPlaceholder = document.getElementById('header-placeholder');
  
  // スマホ表示かどうかを判定
  const isMobile = window.innerWidth <= 767;
  
  if (headerPlaceholder && isMobile) {
    // スマホ表示時のみヘッダーを生成
    const headerHTML = `
      <header>
        <!-- スマホ用ヘッダー -->
        <div class="sp-header">
          <div class="hamburger-menu">
            <span></span>
            <span></span>
            <span></span>
          </div>
        </div>
      </header>
    `;
    
    // ヘッダーを挿入
    headerPlaceholder.innerHTML = headerHTML;
    
    // メインコンテンツのマージンを調整、ヘッダーバックグラウンドを設定
    if (pageId === 'home') {
      const heroSection = document.getElementById('hero-section');
      if (heroSection) {
        heroSection.style.marginTop = '60px';
        heroSection.style.position = 'relative';
        heroSection.style.zIndex = '1';
      }
    }
  } else if (headerPlaceholder && !isMobile) {
    // PC表示時はヘッダープレースホルダーを非表示
    headerPlaceholder.style.display = 'none';
  }
  
  // メニューアイテムを生成
  const menuItems = [
    {href: 'index.html', text: 'ホーム'},
    {href: 'about.html', text: 'はじめに'},
    {href: 'story.html', text: 'あらすじ'},
    {href: 'chart.html', text: '相関図'},
    {href: 'news.html', text: 'お知らせ'},
    {href: 'caststaff.html', text: 'キャスト＆STAFF'},
    {href: 'index.html#youtube-section', text: '配信'}
  ];
  
  // アクティブメニューアイテムを決定
  let activeMenuIndex = 0;
  switch(pageId) {
    case 'about':
      activeMenuIndex = 1;
      break;
    case 'story':
      activeMenuIndex = 2;
      break;
    case 'chart':
      activeMenuIndex = 3;
      break;
    case 'news':
      activeMenuIndex = 4;
      break;
    case 'caststaff':
      activeMenuIndex = 5;
      break;
  }
  
  // メニューハイパーテキストを生成
  let menuHTML = '';
  menuItems.forEach((item, index) => {
    const activeClass = index === activeMenuIndex ? 'class="active"' : '';
    menuHTML += `<li ${activeClass}><a href="${item.href}"><span>${item.text}</span></a></li>`;
  });
  
  // メニューオウターを生成
  const menuOuter = document.createElement('div');
  menuOuter.className = 'menu_outer';
  menuOuter.innerHTML = `<ul class="menu">${menuHTML}</ul>`;
  
  // メニューオウターを挿入
  const conWrap = document.getElementById('con-wrap');
  if (conWrap) {
    document.body.insertBefore(menuOuter, conWrap);
  }
});

// ハンバーガーメニューの動作
document.addEventListener('DOMContentLoaded', function() {
  // ウィンドウサイズ変更時にヘッダー表示を切り替え
  window.addEventListener('resize', function() {
    const headerPlaceholder = document.getElementById('header-placeholder');
    const isMobile = window.innerWidth <= 767;
    
    if (headerPlaceholder) {
      if (isMobile) {
        // スマホ表示時はヘッダーを表示
        headerPlaceholder.style.display = 'block';
        if (headerPlaceholder.innerHTML === '') {
          // ヘッダーが空の場合は生成
          const headerHTML = `
            <header>
              <!-- スマホ用ヘッダー -->
              <div class="sp-header">
                <div class="hamburger-menu">
                  <span></span>
                  <span></span>
                  <span></span>
                </div>
              </div>
            </header>
          `;
          headerPlaceholder.innerHTML = headerHTML;
        }
      } else {
        // PC表示時はヘッダーを非表示
        headerPlaceholder.style.display = 'none';
      }
    }
  });
  
  // ハンバーガーメニューの動作設定
  const setupHamburgerMenu = function() {
    const hamburgerMenu = document.querySelector('.hamburger-menu');
    const menu = document.querySelector('.menu');
    
    // ハンバーガーメニューがクリックされたときの処理
    if (hamburgerMenu && menu) {
      hamburgerMenu.addEventListener('click', function() {
        hamburgerMenu.classList.toggle('active');
        menu.classList.toggle('active');
        // メニューが開いているときにスクロールを無効化
        if (menu.classList.contains('active')) {
          document.body.style.overflow = 'hidden';
        } else {
          document.body.style.overflow = '';
        }
      });
    }
  };
  
  // 初期設定
  setupHamburgerMenu();
  
  // ヘッダーが動的に生成された後にハンバーガーメニューの設定を行う
  const observer = new MutationObserver(function(mutations) {
    mutations.forEach(function(mutation) {
      if (mutation.type === 'childList' && mutation.addedNodes.length > 0) {
        setupHamburgerMenu();
      }
    });
  });
  
  const headerPlaceholder = document.getElementById('header-placeholder');
  if (headerPlaceholder) {
    observer.observe(headerPlaceholder, { childList: true, subtree: true });
  }
  
  // メニュー項目がクリックされたときにメニューを閉じる
  document.addEventListener('click', function(event) {
    if (event.target.closest('.menu li a')) {
      const hamburgerMenu = document.querySelector('.hamburger-menu');
      const menu = document.querySelector('.menu');
      
      if (hamburgerMenu && menu) {
        hamburgerMenu.classList.remove('active');
        menu.classList.remove('active');
        document.body.style.overflow = '';
      }
    }
  });
});
