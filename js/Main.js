// Mycelium Automat

import Config from "/js/Config.js";
import Canvas from "/js/Canvas.js"
import CellBase from "/js/CellBase.js";

class Main {

    static init() {
        console.log('Initialization')
        this.config = new Config();
        this.canvas = new Canvas(document.querySelector('#cnv'), this.config);
        this.cellBase = new CellBase(this.config);
        this.canvas.cellBase = this.cellBase.base;
        this.mouse = {x: 0, y: 0}
        this.addListeners();
        this.info  = document.querySelector('#info');
        this.start = false;
        this.clock = 0;
        this.speed = 100;

        this.cellBase.base.forEach(a => a.forEach(e => {
            if(Math.round(Math.random() * 100) < 20) {
                e.stage = true
            }
        }))

        console.log('Start')
        this.update();
    }

    static addListeners() {
        let size = document.querySelectorAll('.size button');
        size.forEach(e => {
            e.onclick = () => {
                this.cellBase.resize(e.innerHTML);
                this.canvas.update();
                this.addInfo();
            }
        })

        let zoom = document.querySelectorAll('.zoom button');
        zoom.forEach(e => {
            e.onclick = () => {
                e.innerHTML == '+' ? this.canvas.cellSize++ : this.canvas.cellSize--
                this.canvas.update();
                this.addInfo();
            }
        })

        let start = document.querySelector('#start');
        start.onclick = () => {
            this.start = !this.start
            start.innerHTML = start.innerHTML == 'Start' ? 'Pause' : 'Start'
            clearTimeout(this.timeout)
            this.start ? this.update(): null;
        }

        let reset = document.querySelector('#reset');
        reset.addEventListener('click', () => {
            clearTimeout(this.timeout);
            this.start = !this.start
            start.innerHTML = start.innerHTML == 'Start' ? 'Pause' : 'Start'
            this.clock = 0;
            this.cellBase.clear();
            this.canvas.update();
            this.addInfo();
        })

        let speed = [document.querySelector('#sm'),
                     document.querySelector('#sp')]
        speed.forEach((e,i) => e.onclick = () => {
            if (this.speed > 200){
                i != 0 ? this.speed+=100 : this.speed-=100
            } else {
                i != 0 ? this.speed+=10 : this.speed-=10
            }
            this.addInfo();
        })

        this.canvas.canvas
            .addEventListener('mousemove', ({offsetX, offsetY}) => {
                [this.mouse.x, this.mouse.y] = [offsetX, offsetY];
                this.canvas.update();
            });
        this.canvas.canvas
            .addEventListener('click', () => {
                this.cellBase.click(
                    this.mouse.x,
                    this.mouse.y,
                    this.canvas.cellSize);
                this.canvas.update();
            })
    }

    static addInfo() {
        let b = this.cellBase.base
        let z = this.canvas.cellSize
        let s = this.speed
        this.info.innerHTML = `size: ${b.length}; zoom: ${z}; clock: ${this.clock}; speed: ${s}`;
    }

    static update() {
        this.cellBase.update();
        this.canvas.update();
        this.addInfo();
        if (this.start) {
            this.clock++
            this.timeout = setTimeout(this.update.bind(this), this.speed)
        }
    }

}

Main.init();