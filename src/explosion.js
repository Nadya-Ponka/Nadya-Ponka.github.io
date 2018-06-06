export default function explosion(div1, div2) {

	var isCanvasSupported = function(){
        var elem = document.createElement('canvas');
        return !!(elem.getContext && elem.getContext('2d'));
    };
	
	if(isCanvasSupported()){
		document.querySelector(`${div1}`).innerHTML = '<canvas id='+`${div2}`+'></canvas>';
		document.querySelector(`${div1}`).style.display = 'block';
            
			

    
	
const canvas = document.getElementById(`${div2}`);
const ctx = canvas.getContext("2d");
const colours = ["#F73859", "#14FFEC", "#00E0FF", "#FF99FE", "#FAF15D"];

let balls = [];
let pressed = false;
let longPressed = false;
let longPress;
let multiplier = 0;
let width, height;
let origin;
let normal;

// Make the canvas high res
function updateSize() {
  canvas.width = 280;
  canvas.height = 500;
  canvas.style.width = 280 + 'px';
  canvas.style.height = 500 + 'px';
  ctx.scale(2, 2);
  
  width = (canvas.width = 280);
  height = (canvas.height = 500);
  origin = {
    x: width / 2,
    y: height / 2
  };
  normal = {
    x: width / 2,
    y: height / 2
  };
}

updateSize();

class Ball {
  constructor(x = origin.x, y = origin.y) {
    this.x = x;
    this.y = y;
    this.angle = Math.PI * 2 * Math.random();
    
    if( longPressed == true ) {
      this.multiplier = randBetween(14 + multiplier, 15 + multiplier);
    } else {
      this.multiplier = randBetween(3, 6);
    }
    
    this.vx = (this.multiplier + Math.random() * 0.5) * Math.cos(this.angle);
    this.vy = (this.multiplier + Math.random() * 0.5) * Math.sin(this.angle);
    this.r = randBetween(8, 12) + 3 * Math.random();
    this.color = colours[Math.floor(Math.random() * colours.length)];
    this.direction = randBetween(-1, 1);
  }

  update() {
    this.x += this.vx - normal.x;
    this.y += this.vy - normal.y;

    normal.x = -2 / 220 * Math.sin(this.angle);
    normal.y = -2 / 500 * Math.cos(this.angle);

    this.r -= 0.3;
    this.vx *= 0.9;
    this.vy *= 0.9;
  }
}

function pushBalls(count = 1, x = origin.x, y = origin.y) {
  for (let i = 0; i < count; i++) {
    balls.push(new Ball(x, y));
  }
}

function randBetween(min, max) {
  return Math.floor(Math.random() * max) + min;
}

loop();

function loop() {
  // Alpha means "motion blur", yay!
  ctx.fillStyle = "rgba(20, 24, 41, 0)";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  //ctx.globalCompositeOperation = 'luminosity';
				
				
  for (let i = 0; i < balls.length; i++) {
    let b = balls[i];

    if (b.r < 0) continue;

    ctx.fillStyle = b.color;
    ctx.beginPath();
    ctx.arc(b.x, b.y, b.r, 0, Math.PI * 2, false);
    ctx.fill();

    b.update();
  }
  
  if( longPressed == true ) {
    multiplier += 0.2;
  } else if ( !longPressed && multiplier >= 0 ) {
     multiplier -= 0.4;        
  }

  removeBall();
  requestAnimationFrame(loop);
}

function removeBall() {
  for (let i = 0; i < balls.length; i++) {
    let b = balls[i];
    if (
      b.x + b.r < 0 ||
      b.x - b.r > width ||
      b.y + b.r < 0 ||
      b.y - b.r > height ||
      b.r < 0
    ) {
      balls.splice(i, 1);
    }
  }
}

// Keep it going
let timeOut = setInterval(function() {
  pushBalls(randBetween(10, 20), origin.x + randBetween(-50,50), origin.y + randBetween(-50,50));
}, 200);

setTimeout(function() { makeExplosionSound(); }, 2000);

setTimeout(function() { document.querySelector(`${div1}`).innerHTML = ''; }, 5000);

}
};

function makeExplosionSound() {
  let audio = new Audio(); // Создаём новый элемент Audio
  audio.src = '../sound/Thunder.mp3'; // Указываем путь к звуку "клика"
  audio.autoplay = true; // Автоматически запускаем
}
