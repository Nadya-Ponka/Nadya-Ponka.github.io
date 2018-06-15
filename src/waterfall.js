import { makeSounds } from './utils';

const WaterfallCanvas = function (c, cw, ch) {
    let _this = this;
    this.c = c;
    this.ctx = c.getContext('2d');
    this.cw = cw;
    this.ch = ch;

    this.particles = [];
    this.particleRate = 6;
    this.gravity = 0.15;

    this.init = function () {
        this.loop();
    };

    this.reset = function () {
        this.ctx.clearRect(0, 0, this.cw, this.ch);
        this.particles = [];
    };

    this.rand = function (rMi, rMa) {
        return Math.floor(((Math.random() * (rMa - rMi + 1)) + rMi));
    };

    this.Particle = function () {
        const newWidth = _this.rand(1, 20);
        const newHeight = _this.rand(1, 45);
        this.x = _this.rand(10 + (newWidth / 2), _this.cw - 10 - (newWidth / 2));
        this.y = -newHeight;
        this.vx = 0;
        this.vy = 0;
        this.width = newWidth;
        this.height = newHeight;
        this.hue = _this.rand(200, 220);
        this.saturation = _this.rand(30, 60);
        this.lightness = _this.rand(30, 60);
    };

    this.Particle.prototype.update = function (i) {
        this.vx += this.vx;
        this.vy += _this.gravity;
        this.x += this.vx;
        this.y += this.vy;
    };

    this.Particle.prototype.render = function () {
        _this.ctx.strokeStyle = 'hsla(' + this.hue + ', ' + this.saturation + '%, ' + this.lightness + '%, .05)';
        _this.ctx.beginPath();
        _this.ctx.moveTo(this.x, this.y);
        _this.ctx.lineTo(this.x, this.y + this.height);
        _this.ctx.lineWidth = this.width / 2;
        _this.ctx.lineCap = 'round';
        _this.ctx.stroke();
    };

    this.Particle.prototype.renderBubble = function () {
        _this.ctx.fillStyle = 'hsla(' + this.hue + ', 40%, 40%, 1)';
        _this.ctx.fillStyle = 'hsla(' + this.hue + ', ' + this.saturation + '%, ' + this.lightness + '%, .3)';
        _this.ctx.beginPath();
        _this.ctx.arc(this.x + this.width / 2, _this.ch - 20 - _this.rand(0, 10), _this.rand(1, 8), 0, Math.PI * 2, false);
        _this.ctx.fill();
    };

    this.createParticles = function () {
        let i = this.particleRate;
        while (i--) {
            this.particles.push(new this.Particle());
        }
    };

    this.removeParticles = function () {
        let i = this.particleRate;
        while (i--) {
            const p = this.particles[i];
            if (p.y > _this.ch - 20 - p.height) {
                p.renderBubble();
                _this.particles.splice(i, 1);
            }
        }
    };

    this.updateParticles = function () {
        let i = this.particles.length;
        while (i--) {
            const p = this.particles[i];
            p.update(i);
        }
    };

    this.renderParticles = function () {
        let i = this.particles.length;
        while (i--) {
            const p = this.particles[i];
            p.render();
        }
    };

    this.clearCanvas = function () {
        this.ctx.globalCompositeOperation = 'destination-out';
        this.ctx.fillStyle = 'rgba(255,255,255,.06)';
        this.ctx.fillRect(0, 0, this.cw, this.ch);
        this.ctx.globalCompositeOperation = 'lighter';
    };

    this.loop = function () {
        const loopIt = function () {
            requestAnimationFrame(loopIt, _this.c);
            _this.clearCanvas();
            _this.createParticles();
            _this.updateParticles();
            _this.renderParticles();
            _this.removeParticles();
        };
        loopIt();
    };

};

export default function createWaterFall(div1, div2) {
    document.querySelector(`${div1}`).innerHTML = '<img src="../Images/cloud.png" alt="" />\
					<canvas id=' + `${div2}` + '></canvas>';
    document.querySelector(`${div1}`).style.display = 'block';
    const c = document.getElementById(`${div2}`);
    const ctx = c.getContext('2d');
    const cw = c.width = 220;
    const ch = c.height = 500;
    const waterfall = new WaterfallCanvas(c, cw, ch);
    waterfall.init();
    setTimeout(() => {
        makeSounds('../sound/Running_Water.mp3');
    }, 2000);

    setTimeout(() => {
        document.querySelector(`${div1}`).innerHTML = '';
    }, 5000);
}
