// u30e1u30a4u30f3u30b9u30afu30eau30d7u30c8
document.addEventListener('DOMContentLoaded', function() {
  // u30ddu30b9u30bfu30fcu30b9u30e9u30a4u30c9u30b7u30e7u30fcu306eu8a2du5b9a
  initSlideshow();
  
  // YouTubeu52d5u753bu306eu8a2du5b9a
  initYouTubePlayer();
  
  // u30c8u30d4u30c3u30afu30b9u30b9u30e9u30a4u30c0u30fcu306eu8a2du5b9a
  initTopicsSlider();
  
  // u30a2u30cbu30e1u30fcu30b7u30e7u30f3u306eu521du671fu5316
  initAnimation();
});

// u30ddu30b9u30bfu30fcu30b9u30e9u30a4u30c9u30b7u30e7u30fcu306eu521du671fu5316
function initSlideshow() {
  const slides = document.querySelectorAll('.poster_slide li');
  if (slides.length === 0) return;
  
  let currentSlide = 0;
  const slideInterval = 5000; // 5u79d2u3054u3068u306bu5207u308au66ffu3048
  
  function showSlide(index) {
    slides.forEach((slide, i) => {
      if (i === index) {
        slide.style.opacity = '1';
        slide.style.zIndex = '2';
        slide.style.position = 'relative';
        slide.style.display = 'block';
      } else {
        slide.style.opacity = '0';
        slide.style.zIndex = '1';
        slide.style.position = 'absolute';
        slide.style.display = 'list-item';
      }
    });
  }
  
  function nextSlide() {
    currentSlide = (currentSlide + 1) % slides.length;
    showSlide(currentSlide);
  }
  
  // u521du671fu8868u793a
  showSlide(currentSlide);
  
  // u81eau52d5u30b9u30e9u30a4u30c9u30b7u30e7u30fcu306eu958bu59cb
  setInterval(nextSlide, slideInterval);
}

// YouTubeu52d5u753bu30d7u30ecu30a4u30e4u30fcu306eu521du671fu5316
function initYouTubePlayer() {
  const ytButtons = document.querySelectorAll('.yt-playlist-btn a');
  const ytPlayer = document.querySelector('.yt-playlist-embed');
  
  if (!ytButtons.length || !ytPlayer) return;
  
  ytButtons.forEach(button => {
    button.addEventListener('click', function(e) {
      e.preventDefault();
      const youtubeId = this.getAttribute('data-youtube-id');
      if (youtubeId) {
        // u30dcu30bfu30f3u306eu30a2u30afu30c6u30a3u30d6u72b6u614bu3092u5207u308au66ffu3048
        ytButtons.forEach(btn => btn.classList.remove('yt-playing'));
        this.classList.add('yt-playing');
        
        // YouTubeu52d5u753bu3092u5909u66f4
        const newSrc = `https://www.youtube.com/embed/${youtubeId}?playsinline=1&showinfo=0&rel=0&enablejsapi=1`;
        ytPlayer.src = newSrc;
      }
    });
  });
}

// u30c8u30d4u30c3u30afu30b9u30b9u30e9u30a4u30c0u30fcu306eu521du671fu5316
function initTopicsSlider() {
  const slider = document.querySelector('.slider');
  const leftBtn = document.querySelector('.ctrl-lef a');
  const rightBtn = document.querySelector('.ctrl-rig a');
  
  if (!slider || !leftBtn || !rightBtn) return;
  
  let position = 0;
  const slideWidth = 320; // u30b9u30e9u30a4u30c9u306eu5e45uff08u30deu30fcu30b8u30f3u3092u542bu3080uff09
  const visibleSlides = Math.floor(slider.parentElement.offsetWidth / slideWidth);
  const totalSlides = slider.querySelectorAll('li').length;
  
  // u30dcu30bfu30f3u306eu8868u793au72b6u614bu3092u66f4u65b0
  function updateButtonsVisibility() {
    leftBtn.style.display = position > 0 ? 'block' : 'none';
    rightBtn.style.display = position < totalSlides - visibleSlides ? 'block' : 'none';
  }
  
  // u30b9u30e9u30a4u30c0u30fcu3092u79fbu52d5
  function moveSlider() {
    slider.style.transform = `translateX(-${position * slideWidth}px)`;
    updateButtonsVisibility();
  }
  
  // u5de6u30dcu30bfu30f3u306eu30afu30eau30c3u30afu30a4u30d9u30f3u30c8
  leftBtn.addEventListener('click', function(e) {
    e.preventDefault();
    if (position > 0) {
      position--;
      moveSlider();
    }
  });
  
  // u53f3u30dcu30bfu30f3u306eu30afu30eau30c3u30afu30a4u30d9u30f3u30c8
  rightBtn.addEventListener('click', function(e) {
    e.preventDefault();
    if (position < totalSlides - visibleSlides) {
      position++;
      moveSlider();
    }
  });
  
  // u521du671fu8868u793au72b6u614bu306eu8a2du5b9a
  updateButtonsVisibility();
  
  // u30a6u30a3u30f3u30c9u30a6u30b5u30a4u30bau5909u66f4u6642u306eu51e6u7406
  window.addEventListener('resize', function() {
    const newVisibleSlides = Math.floor(slider.parentElement.offsetWidth / slideWidth);
    if (position > totalSlides - newVisibleSlides) {
      position = Math.max(0, totalSlides - newVisibleSlides);
      moveSlider();
    }
    updateButtonsVisibility();
  });
}

// u30a2u30cbu30e1u30fcu30b7u30e7u30f3u306eu521du671fu5316
function initAnimation() {
  const animElements = document.querySelectorAll('.wow');
  
  // u30d2u30fcu30edu30fcu30bbu30afu30b7u30e7u30f3u306eu30a2u30cbu30e1u30fcu30b7u30e7u30f3u3092u78bau5b9fu306bu521du671fu5316
  const heroSection = document.getElementById('hero-section');
  if (heroSection) {
    heroSection.style.opacity = '1';
    heroSection.style.visibility = 'visible';
    heroSection.style.animation = 'heroFadeIn 1.5s ease-in-out';
  }
  
  animElements.forEach(element => {
    const delay = element.getAttribute('data-wow-delay') || '0s';
    const delayMs = parseFloat(delay) * 1000;
    
    setTimeout(() => {
      element.style.visibility = 'visible';
    }, delayMs);
  });
}

// u753bu50cfu306eu9045u5ef6u8aadu307fu8fbcu307f
function loadLazyImages() {
  const lazyImages = document.querySelectorAll('.lazy:not(.lazy-done)');
  
  lazyImages.forEach(lazy => {
    const img = lazy.getAttribute('data-img');
    if (img) {
      lazy.style.backgroundImage = `url("${img}")`;
      lazy.classList.add('lazy-done');
    }
  });
}

// u30b9u30afu30edu30fcu30ebu6642u306bu9045u5ef6u8aadu307fu8fbcu307fu3092u5b9fu884c
window.addEventListener('scroll', loadLazyImages);
window.addEventListener('load', loadLazyImages);
