class DotField {

	constructor(rect) {
		this.rect = rect;
		this.canvas = this.makeCanvas();
	}

	makeCanvas() {
		let c = document.createElement('canvas');
		c.width = this.rect.width;
		c.height = this.rect.height;
		this.ctx = c.getContext('2d');
		return c;
	}

	clear() {
		this.ctx.save();
		this.ctx.setTransform(1, 0, 0, 1, 0, 0);
		this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
		this.ctx.restore();
	}

	paint(colour, width, height) {
		let a = 0, b = 0, h = height || width;
		while (a < this.rect.width) {
			let tri = new Triangle(this.ctx, new Rect(a,0,width,h), colour);
			tri.draw();
			while (b < this.rect.height) {
				let tri = new Triangle(this.ctx, new Rect(a,b,width,h), colour);
				tri.draw();
				b += h;
			}
			a += h;
			b = 0;
		}
	}

	clone() {
		return new DotField(this.rect);
	}

}

class Rect {

	constructor(x, y, width, height) {
		this.x = x;
		this.y = y;
		this.width = width;
		this.height = height;
	}

}

class Triangle {

	constructor(ctx, rect, colour) {
		this.ctx = ctx;
		this.rect = rect;
		this.ctx.fillStyle = colour || 'rgb(0, 0, 0)';
	}

	draw() {
		this.ctx.beginPath();
		this.ctx.moveTo(this.rect.x + this.rect.width * 0.5, this.rect.y);
		this.ctx.lineTo(this.rect.x + this.rect.width, this.rect.y + this.rect.height);
		this.ctx.lineTo(this.rect.x, this.rect.y + this.rect.height);
		this.ctx.lineTo(this.rect.x + this.rect.width * 0.5, this.rect.y);
		this.ctx.fill ();
		this.ctx.closePath ();
	}

}