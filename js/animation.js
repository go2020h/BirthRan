// バブルアニメーションの初期化関数
function initBubbles() {
  console.log('initBubbles called');
  const canvas = document.getElementById('bubble-canvas');
  if (!canvas) {
    console.error('Bubble canvas not found');
    return; // キャンバスが存在しない場合は処理を終了
  }
  
  const ctx = canvas.getContext('2d');
  
  // キャンバスサイズをウィンドウサイズに合わせる
  function resizeCanvas() {
    const heroSection = document.getElementById('hero-section');
    if (heroSection) {
      canvas.width = heroSection.offsetWidth;
      canvas.height = heroSection.offsetHeight;
      console.log('Canvas resized to:', canvas.width, 'x', canvas.height);
    }
  }
  
  resizeCanvas();
  window.addEventListener('resize', resizeCanvas);
  
  // バブルの設定
  const bubbles = [];
  // バブルの数を画面サイズに応じて調整
  const bubbleCount = Math.floor((canvas.width + canvas.height) * 0.02); // バブルの数を減らす
  
  console.log('Creating', bubbleCount, 'bubbles');
  
  // バブルを生成
  for (let i = 0; i < bubbleCount; i++) {
    const size = Math.random() < 0.4 ? 
              Math.random() * 40 + 20 : // 小さいバブル (40%)
              Math.random() < 0.7 ? 
                Math.random() * 60 + 50 : // 中くらいのバブル (42%)
                Math.random() * 100 + 100; // 大きいバブル (18%)
    
    bubbles.push({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      radius: size / 2,
      // バブルの色を変更
      color: `rgba(255, 255, 255, ${0.2 + Math.random() * 0.3})`, // 不透明度を変更
      angle: Math.random() * Math.PI * 2, // 移動方向
      speed: 0.2 + Math.random() * 0.6,   // 移動速度を増やす
      rotationSpeed: (Math.random() - 0.5) * 0.02, // 回転速度を増やす
      opacity: 0.3 + Math.random() * 0.4  // 不透明度を変更
    });
  }
  
  // アニメーションループ
  function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // 各バブルを描画・更新
    bubbles.forEach(bubble => {
      // バブルを描画（輪郭をぼかす）
      ctx.beginPath();
      ctx.arc(bubble.x, bubble.y, bubble.radius, 0, Math.PI * 2);
      
      // ぼかし効果を追加
      ctx.shadowColor = 'rgba(255, 255, 255, 0.8)';
      ctx.shadowBlur = bubble.radius * 0.8;
      
      ctx.fillStyle = bubble.color;
      ctx.globalAlpha = bubble.opacity;
      ctx.fill();
      
      // バブルの位置を更新
      bubble.x += Math.cos(bubble.angle) * bubble.speed;
      bubble.y += Math.sin(bubble.angle) * bubble.speed;
      
      // バブルの角度をわずかに変化させる（より自然な動き）
      bubble.angle += bubble.rotationSpeed;
      
      // 画面外に出たバブルを反対側から再登場させる
      if (bubble.x - bubble.radius > canvas.width) {
        bubble.x = -bubble.radius;
      } else if (bubble.x + bubble.radius < 0) {
        bubble.x = canvas.width + bubble.radius;
      }
      
      if (bubble.y - bubble.radius > canvas.height) {
        bubble.y = -bubble.radius;
      } else if (bubble.y + bubble.radius < 0) {
        bubble.y = canvas.height + bubble.radius;
      }
    });
    
    requestAnimationFrame(animate);
  }
  
  animate();
}
