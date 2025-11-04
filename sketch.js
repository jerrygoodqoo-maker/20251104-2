let particles = [];
const numParticles = 120; // 增加粒子數量
let hue = 0;

function setup() {
  createCanvas(windowWidth, windowHeight);
  colorMode(HSB, 360, 100, 100, 1);
  
  for (let i = 0; i < numParticles; i++) {
    particles.push({
      x: random(width),
      y: random(height),
      size: random(3, 8), // 稍微縮小粒子大小範圍
      speedX: random(-0.6, 0.6), // 減慢移動速度使畫面更柔和
      speedY: random(-0.6, 0.6),
      alpha: random(0.3, 0.6) // 降低透明度使畫面不會太雜亂
    });
  }
}

function draw() {
  background(234, 30, 15);
  
  hue = (hue + 0.2) % 360;
  
  for (let p of particles) {
    // 移動粒子
    p.x += p.speedX;
    p.y += p.speedY;
    
    // 邊界檢查
    if (p.x < 0) p.x = width;
    if (p.x > width) p.x = 0;
    if (p.y < 0) p.y = height;
    if (p.y > height) p.y = 0;
    
    // 繪製粒子
    noStroke();
    fill(hue, 60, 95, p.alpha);
    circle(p.x, p.y, p.size);
    
    // 連接附近的粒子
    particles.forEach(other => {
      let d = dist(p.x, p.y, other.x, other.y);
      if (d < 100) {
        stroke(hue, 40, 95, map(d, 0, 100, 0.2, 0));
        line(p.x, p.y, other.x, other.y);
      }
    });
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
