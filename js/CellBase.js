import Cell from "/js/Cell.js";

export default class CellBase {

    constructor(config) {
        this.base = [];
        this.config = config;

        this.init()
    }

    get length() { return [this.base[0].length - 1,
                           this.base.length - 1] }

    addLine() {
        this.base.forEach(e => {
            e.push(new Cell()); e.unshift(new Cell());
        })
        let newLine = () => {
            let data = [];
            for (let i = 0; i < this.base[1].length; i++) {
                data.push(new Cell());
            }
            return data
        }
        this.base.unshift(newLine());
        this.base.push(newLine())
    }

    removeLine() {
        this.base.pop(); this.base.shift()
        this.base.forEach(e => {
            e.pop(); e.shift()
        })
    }

    createData() {
        let s = this.config.baseSize

        for (let y = 0; y < s.h; y++) {
            this.base.push([]);
            for (let x = 0; x < s.w; x++) {
                this.base[y].push(new Cell());
            }
        }
    }

    resize(a) {
        switch (a) {
            case '+': this.addLine();    break;
            case '-': this.removeLine(); break;
        }
    }

    clear() {
        this.base.forEach(a => a.forEach(e => e.stage = false))
    }

    init() {
        console.log('Create data');
        this.createData();
    }

    click(x, y, cell) {
        x = Math.floor(x / cell)
        y = Math.floor(y / cell)
        let target = this.base[y][x]
        target.stage = !target.stage
    }

    getNb() {
        let b = this.base;
        b.forEach((a,y) => a.forEach((e,x) => {
            e.nb = 0;
            try{b[y-1][x-1].stage ? e.nb++: null}catch{}
            try{b[y-1][x].stage   ? e.nb++: null}catch{}
            try{b[y-1][x+1].stage ? e.nb++: null}catch{}
            try{b[y][x-1].stage   ? e.nb++: null}catch{}
            try{b[y][x+1].stage   ? e.nb++: null}catch{}
            try{b[y+1][x-1].stage ? e.nb++: null}catch{}
            try{b[y+1][x].stage   ? e.nb++: null}catch{}
            try{b[y+1][x+1].stage ? e.nb++: null}catch{}
        }))
    }

    logic() {
        this.getNb();
        this.base.forEach((a) => a.forEach((e) => {
            !e.stage && e.nb == 3   ? e.stage = true : null
            e.stage && (e.nb == 2 || e.nb == 3 ) ? null : e.stage = false
        }))
    }

    update() {
        this.logic()
    }

}