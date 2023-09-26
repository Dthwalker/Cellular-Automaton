export default class Canvas {

    constructor(canvas, config) {
        this.canvas   = canvas;
        this.ctx      = this.canvas.getContext('2d');
        this.cellBase = null;
        this.cellSize = config.cellSize;
        this.w        = 0;
        this.h        = 0;
        
        this.init();
    }

    canvasResize() {
        let cell = this.cellSize
        this.w = this.canvas.width = this.cellBase[0].length * cell
        this.h = this.canvas.height = this.cellBase.length * cell
    }

    drawLines() {
        for(let i = 0 ; i < this.cellBase.length; i++) {
            this.ctx.fillStyle = 'rgb(20,20,20)'
            this.ctx.fillRect(0, i*this.cellSize, this.h, 1)
            this.ctx.fillRect(i * this.cellSize, 0, 1, this.w)
        }
    }

    drawCells() {
        let s = this.cellSize;
        this.ctx.fillStyle = 'rgb(200,200,200)'
        this.cellBase.forEach((a, y) => {
            a.forEach((e,x) => {
                e.stage ? this.ctx.fillRect(x*s,y*s,s,s) : null
            })
        })
    }

    init() {
        console.log('Canvas is loaded');
    }

    update() {
        this.canvasResize();
        this.drawLines();
        this.drawCells()
    }

}