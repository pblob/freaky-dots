import { Utils } from './utils.js'
import { Rect, Point } from './geom.js'
import { Triangle } from './shapes.js'

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

class DotField extends Field {

	constructor(rect) {
		super(rect);
	}

	draw(colour, width, height) {

		this.ctx.beginPath();
		this.ctx.arc(this.rect.width * 0.5, this.rect.height * 0.5, this.rect.width * 0.5, 0, 2 * Math.PI);
		this.ctx.clip();

		let a = 0, b = 0, h = height || width;
		while (a < this.rect.width) {
			let c = true;
			let olda = a;
			while (b < this.rect.height) {
				let tri = new Triangle(this.ctx, new Rect(a, b, width, h), colour);
				a = c ? a + h * 0.5 : olda;
				b += tri.draw();
				c = !c;
			}
			a += h;
			b = 0;
		}
	}

	clone() {
		return new DotField(this.rect.clone());
	}

}

class PetalField extends Field {

	constructor(rect) {
		super(rect);
	}

	draw(colour) {
		
		const centrePt = new Point(
			this.rect.x + this.rect.width * 0.5, 
			this.rect.y + this.rect.width * 0.5);

		const growth = 20;
		this.ctx.lineWidth = 5;
		centrePt.draw(this.ctx, colour, this.rect.width * 0.5);

		this.rect.grow(growth, growth);

		const r = this.rect.width * 0.5;

		const points = 50;
		for (let i = 1; i <= points; i++) {

			let angle = i * (Math.PI / (points * 0.5));
			let pt = new Point(
				this.rect.x + (r * Math.cos(angle)) + r,
				this.rect.y + (r * Math.sin(angle)) + r
			);
			let w = 20;
			let petalRect = new Rect(pt.x, pt.y, w, w);

			this.ctx.save();
			this.ctx.translate(pt.x, pt.y);
			this.ctx.rotate(angle + Math.PI * 0.5);
			this.ctx.translate(-pt.x, -pt.y);

			let tri = new Triangle(
				this.ctx, 
				new Rect(
					petalRect.x - w * 0.5,
					petalRect.y - w * 0.5,
					petalRect.width,
					petalRect.height),
				colour
			);
			tri.draw();
			
			this.ctx.restore();
			
			// debug draw
			//pt.draw(this.ctx);
			//pt.drawNormal(centrePt, this.ctx);

		}

	}

}

export { DotField, PetalField }