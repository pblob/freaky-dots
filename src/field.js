import { Utils } from './utils.js'

class Field {

	rect;
	canvas;
	ctx;

	constructor(rect) {
		this.rect = rect;
		this.canvas = Utils.makeCanvas(this.rect);
		this.ctx = this.canvas.getContext('2d');
	}

	clear() {
		this.ctx.save();
		this.ctx.setTransform(1, 0, 0, 1, 0, 0);
		this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
		this.ctx.restore();
	}

}

export { Field }