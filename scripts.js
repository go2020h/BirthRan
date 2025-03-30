document.addEventListener('DOMContentLoaded', function() {
  // u30c7u30d0u30c3u30b0u7528u306eu30edu30b0u3092u8ffdu52a0
  console.log('DOMu8aadu307fu8fbcu307fu5b8cu4e86');
  
  // u30d8u30c3u30c0u30fcu3068u30d5u30c3u30bfu30fcu3092u8aadu307fu8fbcu3080u95a2u6570
  function loadCommonElements() {
    console.log('u5171u901au8981u7d20u306eu8aadu307fu8fbcu307fu958bu59cb');
    
    // u30d8u30c3u30c0u30fcJSu3092u8aadu307fu8fbcu3080
    const headerScript = document.createElement('script');
    headerScript.src = 'js/header.js';
    headerScript.onload = function() {
      console.log('u30d8u30c3u30c0u30fcJSu304cu6b63u5e38u306bu8aadu307fu8fbcu307eu308cu307eu3057u305f');
      // u30dau30fcu30b8u30bfu30a4u30c8u30ebu3092u8a2du5b9a
      setPageTitle();
      
      // u73feu5728u306eu30dau30fcu30b8u3092u30e1u30cbu30e5u30fcu3067u30deu30a4u30e9u30a4u30c8
      highlightCurrentPage();
    };
    document.head.appendChild(headerScript);
    
    // u30d5u30c3u30bfu30fcJSu3092u8aadu307fu8fbcu3080
    const footerScript = document.createElement('script');
    footerScript.src = 'js/footer.js';
    footerScript.onload = function() {
      console.log('u30d5u30c3u30bfu30fcJSu304cu6b63u5e38u306bu8aadu307fu8fbcu307eu308cu307eu3057u305f');
    };
    document.head.appendChild(footerScript);
  }
  
  // u30dau30fcu30b8u30bfu30a4u30c8u30ebu3092u8a2du5b9au3059u308bu95a2u6570
  function setPageTitle() {
    console.log('u30dau30fcu30b8u30bfu30a4u30c8u30ebu8a2du5b9au958bu59cb');
    const pageId = document.body.id;
    console.log('u73feu5728u306eu30dau30fcu30b8ID:', pageId);
    const titleElement = document.getElementById('page-title');
    
    if (!titleElement) {
      console.log('u30dau30fcu30b8u30bfu30a4u30c8u30ebu8981u7d20u304cu898bu3064u304bu308au307eu305bu3093');
      return;
    }
    
    let pageTitle = 'u30a6u30a3u30fcu30afu30eau30fcu30fbu30d0u30fcu30b9u30c7u30fcu30fbu30e9u30f3u30adu30f3u30b0';
    
    switch(pageId) {
      case 'home':
        pageTitle = 'u30dbu30fcu30e0 | ' + pageTitle;
        break;
      case 'about':
        pageTitle = 'u306fu3058u3081u306b | ' + pageTitle;
        break;
      case 'story':
        pageTitle = 'u3042u3089u3059u3058 | ' + pageTitle;
        break;
      case 'chart':
        pageTitle = 'u76f8u95a2u56f3 | ' + pageTitle;
        break;
      case 'news':
        pageTitle = 'u304au77e5u3089u305b | ' + pageTitle;
        break;
      case 'caststaff':
        pageTitle = 'u30adu30e3u30b9u30c8u357eu30b9u30bfu30c3u30d5 | ' + pageTitle;
        break;
      case 'delivery':
        pageTitle = 'u914du4fe1 | ' + pageTitle;
        break;
      default:
        pageTitle = pageTitle;
    }
    
    titleElement.textContent = pageTitle;
    document.title = pageTitle;
    console.log('u30dau30fcu30b8u30bfu30a4u30c8u30ebu3092u8a2du5b9a:', pageTitle);
  }
  
  // u73feu5728u306eu30dau30fcu30b8u3092u30e1u30cbu30e5u30fcu3067u30deu30a4u30e9u30a4u30c8u3059u308bu95a2u6570
  function highlightCurrentPage() {
    console.log('u73feu5728u30dau30fcu30b8u306eu30deu30a4u30e9u30a4u30c8u958bu59cb');
    const pageId = document.body.id;
    console.log('u73feu5728u306eu30dau30fcu30b8ID:', pageId);
    
    // u30e1u30cbu30e5u30fcu30eau30f3u30afu3092u53d6u5f97
    const navLinks = document.querySelectorAll('.menu li a');
    console.log('u30e1u30cbu30e5u30fcu30eau30f3u30afu6570:', navLinks.length);
    
    if (navLinks.length === 0) {
      console.log('u30e1u30cbu30e5u30fcu30eau30f3u30afu304cu898bu3064u304bu308au307eu305bu3093');
      return;
    }
    
    // u5404u30eau30f3u30afu3092u78bau8a8d
    navLinks.forEach(link => {
      console.log('u30eau30f3u30afu78bau8a8d:', link.href);
      
      // u73feu5728u306eu30dau30fcu30b8u306bu5bfeu5fdcu3059u308bu30eau30f3u30afu3092u30deu30a4u30e9u30a4u30c8
      if (link.href.includes(pageId + '.html')) {
        console.log('u73feu5728u30dau30fcu30b8u306eu30eau30f3u30afu3092u30deu30a4u30e9u30a4u30c8:', link.href);
        link.classList.add('active');
      }
    });
  }
  
  // u5171u901au8981u7d20u3092u8aadu307fu8fbcu3080
  loadCommonElements();
});
