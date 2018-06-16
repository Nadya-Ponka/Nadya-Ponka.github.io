import { makeSounds } from './utils';

export default function fire(div1, div2) {
    document.querySelector(`${div1}`).innerHTML = '<canvas id=' + `${div2}` + '></canvas>';
    document.querySelector(`${div1}`).style.display = 'block';


    const canvas = document.getElementById(`${div2}`);
    const ctx = canvas.getContext('2d');
    const ParticleSystem = function (opts) {
        const defaultOpts = {
            time: Date.now(),
            emissionRate: 60,
            speed: {
                x: 0,
                y: 15,
            },
            position: {
                x: canvas.width / 2,
                y: canvas.height * 0.96,
            },
            particles: [],
            generateParticle() {
                obj.particles.push(new Particle(obj, Date.now()));
            },
            colourGradient: new ColorAnimation(),
            sizeGradient: new Animation(),
            animateParticles() {
                const deltaTime = Date.now() - this.time;
                let i = 0;
                const p = this.particles;
                const l = p ? p.length : 0;
                const position = this.position;
                for (i = 0; i < l; ++i) {
                    p[i].render(position, deltaTime);
                }
            },
            update() {
                this.animateParticles();
            },
            init() {
                Controller.addElement(this);
                setInterval(obj.generateParticle, 1000 / this.emissionRate);
            },
        };
        let obj = Object.assign({}, defaultOpts, opts);
        obj.init();
        return obj;
    };

    let Particle = function (parent, startTime, opts) {
        const defaultOpts = {
            speed: {
                x: 0,
                y: 250,
            },
            size: 50,
            lifeTime: 1,
            getSize() {
                return this.size * parent.sizeGradient.getValueAtTime(this.deltaTime / this.lifeTime, true);
            },
            position: {
                x: 0,
                y: 0,
            },
            time: 0,
            deltaTime: 0,
            render() {
                this.deltaTime = (Date.now() - this.time) / 1000;
                if (this.deltaTime > this.lifeTime) {
                    return;
                }
                const size = this.getSize();
                ctx.beginPath();
                ctx.arc(this.origin.x + this.position.x, this.origin.y + this.position.y - this.speed.y * this.deltaTime, size, 0, Math.PI * 2);
                ctx.fillStyle = parent.colourGradient.getValueAtTime(this.deltaTime / this.lifeTime, true);
                ctx.fill();
            },
            randomize() {
                this.lifeTime *= Math.random() * 0.4 + 0.8;
                this.position.x += Math.random() * 40 - 20;
                this.position.y += Math.random() * 10 - 5;
                this.speed.y += Math.random() * 10 - 5;
            },
        };

        const obj = Object.assign({}, defaultOpts, opts);
        obj.time = startTime;
        obj.parent = parent;
        obj.origin = {
            x: parent.position.x,
            y: parent.position.y,
        };
        obj.randomize();
        return obj;
    };

    let Controller = {
        elements: [],
        update() {
            Controller.clearCanvas();
            for (let i = 0, l = Controller.elements.length; i < l; ++i) {
                Controller.elements[i].update();
            }
            requestAnimationFrame(Controller.update);
        },
        clearCanvas() {
            canvas.width = canvas.width;
        },
        addElement(el) {
            Controller.elements.push(el);
        },

    };

    let Animation = function () {
        return {
            frames: {
                0: 0,
                1: 1,
            },
            addFrame(time, value) {
                this.frames[time] = value;
            },
            getValueAtTime(time, interpolate) {
                let prevFrame,
                    nextFrame,
                    prevFrameTime,
                    keys = [],
                    k;
                for (let j in this.frames) {
                    keys.push(parseFloat(j));
                }
                keys.sort();
                for (let i = 0, l = keys.length; i < l; ++i) {
                    k = keys[i];
                    if (time < k) {
                        nextFrame = this.frames[k];
                        break;
                    }
                    prevFrameTime = k;
                    prevFrame = this.frames[k];
                }

                if (interpolate) {
                    return prevFrame + (nextFrame - prevFrame) * ((time - prevFrameTime) * 1 / (k - prevFrameTime));
                }
                return prevFrame;
            },
        };
    };

    let ColorAnimation = function () {
        return {
            r: new Animation(),
            g: new Animation(),
            b: new Animation(),
            a: new Animation(),
            addFrame(time, rgb) {
                if (typeof rgb === 'string') {
                    rgb = hexToRgb(rgb);
                }
                this.r.addFrame(time, rgb.r);
                this.g.addFrame(time, rgb.g);
                this.b.addFrame(time, rgb.b);
                this.a.addFrame(time, rgb.a);
            },
            getValueAtTime(time, interpolate) {
                const r = Math.round(this.r.getValueAtTime(time, interpolate)).toString(16);
                const g = Math.round(this.g.getValueAtTime(time, interpolate)).toString(16);
                const b = Math.round(this.b.getValueAtTime(time, interpolate)).toString(16);
                const a = this.a.getValueAtTime(time, interpolate);
                ctx.globalAlpha = a;
                return `#${r.length > 1 ? r : `0${r}`}${g.length > 1 ? g : `0${g}`}${b.length > 1 ? b : `0${b}`}`;
            },
        };
    };

    requestAnimationFrame(Controller.update);

    canvas.width = 280;
    canvas.height = 500;
    const ps = new ParticleSystem();

    ps.colourGradient.addFrame(0, '#d5000000');
    ps.colourGradient.addFrame(0.25, '#ff980088');
    ps.colourGradient.addFrame(0.66, '#44444433');
    ps.colourGradient.addFrame(1, '#22222200');
    ps.sizeGradient.addFrame(0, 0.25);
    ps.sizeGradient.addFrame(0.25, 1);
    ps.sizeGradient.addFrame(0.66, 0.2);
    ps.sizeGradient.addFrame(1, 0.75);
    ps.generateParticle();

    function hexToRgb(hex) {
        const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})?$/i.exec(hex);
        return result ? {
            r: parseInt(result[1], 16),
            g: parseInt(result[2], 16),
            b: parseInt(result[3], 16),
            a: typeof result[4] === 'undefined' ? 1 : parseInt(result[4], 16) / 255,
        } : null;
    }

    setTimeout(() => {
        makeSounds('../sound/burning.mp3');
    }, 2000);

    setTimeout(() => {
        document.querySelector(`${div1}`).innerHTML = '';
    }, 4000);
}
