// ヘッダーを動的に挿入するスクリプト
document.addEventListener('DOMContentLoaded', function() {
  // ページのIDを取得
  const pageId = document.body.id;
  
  // ヘッダープレースホルダーを取得
  const headerPlaceholder = document.getElementById('header-placeholder');
  
  if (headerPlaceholder) {
    // ホームページ用ヘッダー
    if (pageId === 'home') {
      // ヘッダープレースホルダーを削除
      headerPlaceholder.remove();
    } else {
      // ヘッダープレースホルダーを削除
      headerPlaceholder.remove();
      
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
        case 'delivery':
          activeMenuIndex = 6;
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
    }
  }
});
