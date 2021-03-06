import { makeSounds } from './utils';

const Lightning = function (c, cw, ch) {
    this.init = function () {
        this.loop();
    };

    const _this = this;
    this.c = c;
    this.ctx = c.getContext('2d');
    this.cw = cw;
    this.ch = ch;
    this.mx = 0;
    this.my = 0;

    this.lightning = [];
    this.lightTimeCurrent = 0;
    this.lightTimeTotal = 50;

    this.rand = function (rMi, rMa) {
        return Math.floor(((Math.random() * (rMa - rMi + 1)) + rMi));
    };
    this.hitTest = function (x1, y1, w1, h1, x2, y2, w2, h2) {
        return !(x1 + w1 < x2 || x2 + w2 < x1 || y1 + h1 < y2 || y2 + h2 < y1);
    };

    this.createL = function (x, y, canSpawn) {
        this.lightning.push({
            x: x,
            y: y,
            xRange: this.rand(5, 100),
            yRange: this.rand(5, 100),
            path: [{
                x: x,
                y: y,
            }],
            pathLimit: this.rand(10, 35),
            canSpawn: canSpawn,
            hasFired: false,
        });
    };

    this.updateL = function () {
        let i = this.lightning.length;
        while (i--) {
            const light = this.lightning[i];

            light.path.push({
                x: light.path[light.path.length - 1].x + (this.rand(0, light.xRange) - (light.xRange / 2)),
                y: light.path[light.path.length - 1].y + (this.rand(0, light.yRange)),
            });

            if (light.path.length > light.pathLimit) {
                this.lightning.splice(i, 1);
            }
            light.hasFired = true;
        }
    };

    this.renderL = function () {
        let i = this.lightning.length;
        while (i--) {
            const light = this.lightning[i];

            this.ctx.strokeStyle = 'hsla(0, 100%, 100%, ' + this.rand(10, 100) / 100 + ')';
            this.ctx.lineWidth = 25;
            if (this.rand(0, 30) === 0) {
                this.ctx.lineWidth = 20;
            }
            if (this.rand(0, 60) === 0) {
                this.ctx.lineWidth = 30;
            }
            if (this.rand(0, 90) === 0) {
                this.ctx.lineWidth = 40;
            }
            if (this.rand(0, 120) === 0) {
                this.ctx.lineWidth = 50;
            }
            if (this.rand(0, 150) === 0) {
                this.ctx.lineWidth = 60;
            }

            this.ctx.beginPath();

            const pathCount = light.path.length;
            this.ctx.moveTo(light.x, light.y);
            for (let pc = 0; pc < pathCount; pc++) {
                this.ctx.lineTo(light.path[pc].x, light.path[pc].y);

                if (light.canSpawn) {
                    if (this.rand(0, 100) === 0) {
                        light.canSpawn = false;
                        this.createL(light.path[pc].x, 0, false);
                    }
                }
            }

            if (!light.hasFired) {
                this.ctx.fillStyle = 'rgba(255, 255, 255, ' + this.rand(4, 12) / 20 + ')';
                this.ctx.fillRect(0, 0, this.cw, this.ch);
            }

            if (this.rand(0, 30) === 0) {
                this.ctx.fillStyle = 'rgba(255, 255, 255, ' + this.rand(1, 3) / 100 + ')';
                this.ctx.fillRect(0, 0, this.cw, this.ch);
            }

            this.ctx.stroke();
        }
    };

    this.lightningTimer = function () {
        this.lightTimeCurrent++;
        if (this.lightTimeCurrent >= this.lightTimeTotal) {
            const newX = this.rand(100, cw - 100);
            const newY = this.rand(0, ch / 2);
            let createCount = this.rand(1, 3);
            while (createCount--) {
                this.createL(newX, newY, true);
            }
            this.lightTimeCurrent = 0;
            this.lightTimeTotal = this.rand(30, 60); // can be 100
        }
    };

    this.clearCanvas = function () {
        this.ctx.globalCompositeOperation = 'destination-out';
        this.ctx.fillStyle = 'rgba(0,0,0,' + this.rand(1, 30) / 100 + ')';
        this.ctx.fillRect(0, 0, this.cw, this.ch);
        this.ctx.globalCompositeOperation = 'source-over';
    };

    this.loop = function () {
        const loopIt = function () {
            requestAnimationFrame(loopIt, _this.c);
            _this.clearCanvas();
            _this.updateL();
            _this.lightningTimer();
            _this.renderL();
        };
        loopIt();
    };
};

export default function canvasLightning(div1, div2) {
    document.querySelector(`${div1}`).innerHTML = '<img src="../Images/cloud.png" alt="" /><canvas id=' + `${div2}` + '></canvas>';
    document.querySelector(`${div1}`).style.display = 'block';
    const c = document.getElementById(`${div2}`);
    const cw = c.width = window.innerWidth;
    const ch = c.height = window.innerHeight;
    const cl = new Lightning(c, cw, ch);

    cl.init();
    setTimeout(() => {
        makeSounds('../sound/Thunder.mp3');
    }, 2000);
    setTimeout(() => {
        document.querySelector(`${div1}`).innerHTML = '';
    }, 5000);
}
