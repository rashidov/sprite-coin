let reqAnimF = window.requestAnimationFrame ||     // кроссбраузерность
  window.mozRequestAnimationFrame ||
  window.webkitRequestAnimationFrame || 
  window.msRequestAnimationFrame;
window.requestAnimationFrame = reqAnimF;

class Sprite {
  constructor (options) {
    this.ctx = options.ctx;

    this.image = options.image;

    this.width = options.width;
    this.height = options.height;

    this.frameIndex = 0;
    this.tickCount = 0;
    this.ticksPerFrame = options.ticksPerFrame || 0;
    this.numberOfFrames = options.numberOfFrames || 1;

    this.start();
  }

  render () {
    this.ctx.clearRect(0, 0, this.width / this.numberOfFrames, this.height)   // очистка

    if (!this.image.onload) {
      this.image.onload = () => {
        this.ctx.drawImage(
          this.image,
          this.frameIndex * this.width / this.numberOfFrames,
          0,
          this.width / this.numberOfFrames,
          this.height,
          0,
          0,
          this.width / this.numberOfFrames,
          this.height
        )
      }
    }

    this.ctx.drawImage(
      this.image,
      this.frameIndex * this.width / this.numberOfFrames,
      0,
      this.width / this.numberOfFrames,
      this.height,
      0,
      0,
      this.width / this.numberOfFrames,
      this.height
    )
  }

  update () {
    this.tickCount++;
    
    if (this.tickCount > this.ticksPerFrame) {
      this.tickCount = 0;
      if (this.frameIndex < this.numberOfFrames - 1) {
        this.frameIndex++;
      } else {
          this.frameIndex = 0;
      }
    }
  }

  start () {
    let loop = () => {
      this.update();
      this.render();

      window.requestAnimationFrame(loop)
    }

    window.requestAnimationFrame(loop);
  }
} 

const cnavas = document.getElementById('cnavas')
canvas.width = 100
canvas.height = 100

const coinImage = new Image()
const src = './img/coin.png'
coinImage.src = src

const sprite = new Sprite({
  ctx: canvas.getContext('2d'),
  image: coinImage,
  width: 1000,
  height: 100,
  numberOfFrames: 10,
  ticksPerFrame: 4
})
