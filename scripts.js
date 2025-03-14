document.addEventListener('DOMContentLoaded', function() {
  // デバッグ用のログを追加
  console.log('DOM読み込み完了');
  
  // ヘッダーとフッターを読み込む関数
  function loadCommonElements() {
    console.log('共通要素の読み込み開始');
    
    // ヘッダーを読み込む
    fetch('includes/header.html')
      .then(response => {
        console.log('ヘッダーのレスポンス:', response);
        return response.text();
      })
      .then(data => {
        console.log('ヘッダーのデータ取得成功:', data.substring(0, 50) + '...');
        document.getElementById('header-placeholder').innerHTML = data;
        
        // ページタイトルを設定
        setPageTitle();
        
        // 現在のページをメニューでハイライト
        highlightCurrentPage();
      })
      .catch(error => {
        console.error('ヘッダーの読み込みエラー:', error);
      });
    
    // フッターを読み込む
    fetch('includes/footer.html')
      .then(response => {
        console.log('フッターのレスポンス:', response);
        return response.text();
      })
      .then(data => {
        console.log('フッターのデータ取得成功:', data.substring(0, 50) + '...');
        document.getElementById('footer-placeholder').innerHTML = data;
      })
      .catch(error => {
        console.error('フッターの読み込みエラー:', error);
      });
  }
  
  // ページタイトルを設定する関数
  function setPageTitle() {
    console.log('ページタイトル設定開始');
    const pageId = document.body.id;
    console.log('現在のページID:', pageId);
    const titleElement = document.getElementById('page-title');
    
    if (!titleElement) {
      console.warn('page-title要素が見つかりません');
      return;
    }
    
    let title = '';
    let subtitle = '';
    
    switch(pageId) {
      case 'home':
        title = 'BirthRan';
        subtitle = 'ウィークリー・バースデー・ランキング';
        break;
      case 'about':
        title = 'はじめに';
        subtitle = '番組について';
        break;
      case 'story':
        title = 'あらすじ';
        subtitle = '番組の楽しみ方';
        break;
      case 'chart':
        title = '相関図';
        subtitle = 'クロスメディア展開';
        break;
      case 'news':
        title = 'お知らせ';
        subtitle = 'ゲストへのプレゼント情報';
        break;
      case 'caststaff':
        title = 'キャスト＆STAFF';
        subtitle = 'スタッフ情報';
        break;
      case 'delivery':
        title = '配信';
        subtitle = 'TBS配信サービス';
        break;
      default:
        title = 'BirthRan';
        subtitle = 'ウィークリー・バースデー・ランキング';
    }
    
    console.log('設定するタイトル:', title, subtitle);
    titleElement.innerHTML = title + '<br><span class="subtitle">' + subtitle + '</span>';
  }
  
  // 現在のページをメニューでハイライトする関数
  function highlightCurrentPage() {
    console.log('メニューハイライト処理開始');
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    console.log('現在のページパス:', currentPage);
    const menuLinks = document.querySelectorAll('.menu a');
    
    menuLinks.forEach(link => {
      const href = link.getAttribute('href');
      console.log('メニューリンク:', href);
      if (href === currentPage) {
        console.log('アクティブなメニュー項目:', href);
        link.parentElement.classList.add('active');
      }
    });
  }
  
  // 共通要素を読み込む
  loadCommonElements();
});
