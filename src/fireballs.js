import { makeSounds } from './utils';

export default function fireballs(div1, div2) {
    document.querySelector(`${div1}`).innerHTML = '<img src="../Images/cloud.png" alt="" /><canvas id=' + `${div2}` + '></canvas>';
    document.querySelector(`${div1}`).style.display = 'block';

    const c = document.getElementById(`${div2}`);
    const ctx = c.getContext('2d');
    let width = window.innerWidth = 280;
    let height = window.innerHeight = 500;
    const dotRadius = 22;
    const dotSpeed = 6;
    const alphaSpeed = 0.015;
    const spacing = dotRadius + 5;
    const dots = [];
    const origins = [
        {
            x: width * 0.5 - spacing * 4,
            y: height * 0.15,
            color: '#ff0000',
            alpha: 1,
        },
        {
            x: width * 0.5 - spacing * 2,
            y: height * 0.15,
            color: '#ffff00',
            alpha: 1,
        },
        {
            x: width * 0.5,
            y: height * 0.15,
            color: '#00ffa5',
            alpha: 1,
        },
        {
            x: width * 0.5 + spacing * 2,
            y: height * 0.15,
            color: '#ff00ff',
            alpha: 1,
        },
        {
            x: width * 0.5 + spacing * 4,
            y: height * 0.15,
            color: '#00a5ff',
            alpha: 1,
        },
    ];

    function clear() {
        width = window.innerWidth;
        height = window.innerHeight;
        c.width = width;
        c.height = height;
    }

    function start() {
        clear();
        for (let i = 0; i < origins.length; i++) {
            dots.push({
                x: origins[i].x,
                y: origins[i].y,
                color: origins[i].color,
                alpha: origins[i].alpha,
            });
        }
        draw();
    }

    function update() {
        if (Math.random() < 0.3) {
            const temp = dots[Math.floor(Math.random() * 5)];
            dots.push({
                x: temp.x,
                y: temp.y,
                color: temp.color,
                alpha: temp.alpha,
            });
        }
        for (let i = origins.length; i < dots.length; i++) {
            dots[i].y += dotSpeed;
            dots[i].alpha -= alphaSpeed;
            if (dots[i].alpha < 0.01) { dots.splice(i, 1); }
        }
    }

    function draw() {
        requestAnimationFrame(draw);
        update();
        clear();
        for (const i in dots) {
            ctx.beginPath();
            ctx.globalAlpha = dots[i].alpha;
            ctx.fillStyle = dots[i].color;
            ctx.arc(dots[i].x, dots[i].y, dotRadius, 0, 2 * Math.PI);
            ctx.fill();
        }
    }
    start();

    setTimeout(() => {
        makeSounds('../sound/Hailstorm-small.mp3');
    }, 2000);

    setTimeout(() => {
        document.querySelector(`${div1}`).innerHTML = '';
    }, 5000);
}
