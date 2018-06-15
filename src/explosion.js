import { makeSounds } from './utils';

export default function explosion(div1, div2) {
    document.querySelector(`${div1}`).innerHTML = '<canvas id=' + `${div2}` + '></canvas>';
    document.querySelector(`${div1}`).style.display = 'block';

    const canvas = document.getElementById(`${div2}`);
    const ctx = canvas.getContext('2d');
    const colours = ['#F73859', '#14FFEC', '#00E0FF', '#FF99FE', '#FAF15D'];

    const balls = [];

    canvas.width = 280;
    canvas.height = 500;
    canvas.style.width = `${280}px`;
    canvas.style.height = `${500}px`;

    const origin = {
        x: canvas.width / 2,
        y: canvas.height / 2,
    };
    const normal = {
        x: canvas.width / 2,
        y: canvas.height / 2,
    };

    class Ball {
        constructor(x = origin.x, y = origin.y) {
            this.x = x;
            this.y = y;
            this.angle = Math.PI * 2 * Math.random();

            this.multiplier = randBetween(3, 6);

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
        ctx.fillStyle = 'rgba(20, 24, 41, 0)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);


        for (let i = 0; i < balls.length; i++) {
            const b = balls[i];

            if (b.r < 0) continue;

            ctx.fillStyle = b.color;
            ctx.beginPath();
            ctx.arc(b.x, b.y, b.r, 0, Math.PI * 2, false);
            ctx.fill();

            b.update();
        }

        removeBall();
        requestAnimationFrame(loop);
    }

    function removeBall() {
        for (let i = 0; i < balls.length; i++) {
            const b = balls[i];
            if (
                b.x + b.r < 0 ||
                b.x - b.r > canvas.width ||
                b.y + b.r < 0 ||
                b.y - b.r > canvas.height ||
                b.r < 0
            ) {
                balls.splice(i, 1);
            }
        }
    }

    const timeOut = setInterval(() => {
        pushBalls(randBetween(10, 20), origin.x + randBetween(-50, 50), origin.y + randBetween(-50, 50));
    }, 200);

    setTimeout(() => {
        makeSounds('../sound/Thunder.mp3');
    }, 2000);

    setTimeout(() => {
        document.querySelector(`${div1}`).innerHTML = '';
    }, 5000);
}
