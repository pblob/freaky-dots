class DotField {

	constructor(rect) {
		this.rect = rect;
		this.canvas = Utils.makeCanvas(rect);
		this.ctx = this.canvas.getContext('2d');
	}

	clear() {
		this.ctx.save();
		this.ctx.setTransform(1, 0, 0, 1, 0, 0);
		this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
		this.ctx.restore();
	}

	paint(colour, width, height) {

		//this.ctx.beginPath();
		//this.ctx.arc(this.rect.width * 0.5, this.rect.height * 0.5, this.rect.width * 0.5, 0, 2 * Math.PI);
		//this.ctx.clip();

		let a = 0, b = 0, h = height || width;
		while (a < this.rect.width) {
			let c = true;
			let olda = a;
			while (b < this.rect.height) {
				let tri = new Triangle(this.ctx, new Rect(a,b,width,h), colour);
				a = c ? a + h * 0.5 : olda;
				b += tri.draw();
				c = !c;
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

		// to make it equilateral
		//     c
		//
		//  a     b

		let ax = this.rect.x;
		let ay = this.rect.y + this.rect.width;

		let bx = this.rect.x + this.rect.width;
		let by = ay;

		let dx = bx - ax;
		let dy = by - ay;

		let angle = Math.atan2(dy, dx) - Math.PI / 3;
		let length = Math.sqrt(dx * dx + dy * dy);

		let cx = Math.cos(angle) * length + ax;
		let cy = Math.sin(angle) * length + ay;

		this.ctx.beginPath();
		this.ctx.moveTo(ax, ay);
		this.ctx.lineTo(bx, by);
		this.ctx.lineTo(cx, cy);
		this.ctx.fill ();
		this.ctx.closePath ();

		return ay - cy;

	}

}

class CircleMask {

	constructor(ctx, rect, colour) {
		this.ctx = ctx;
		this.rect = rect;
		this.ctx.fillStyle = colour || 'rgb(255, 255, 255)';
	}

	draw(offset) {
		this.ctx.beginPath();
		this.ctx.arc(
			this.rect.x + this.rect.width * 0.5, 
			this.rect.y + this.rect.height * 0.5, 
			(this.rect.width - offset) * 0.5, 
			0, Math.PI * 2, true);
		this.ctx.rect(this.rect.x, this.rect.y, this.rect.width, this.rect.height)
		this.ctx.fill();
	}

}

class Utils {

	static makeCanvas(rect) {
		let c = document.createElement('canvas');
		c.width = rect.width;
		c.height = rect.height;
		return c;
	}

}