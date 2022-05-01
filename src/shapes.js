class Triangle {

	ctx;
	rect;

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

		this.ctx.save();
		this.ctx.beginPath();
		this.ctx.moveTo(ax, ay);
		this.ctx.lineTo(bx, by);
		this.ctx.lineTo(cx, cy);
		this.ctx.fill ();
		this.ctx.closePath();
		this.ctx.restore();

		return ay - cy;

	}

}

class CircleMask {

	ctx;
	rect;

	constructor(ctx, rect, colour) {
		this.ctx = ctx;
		this.rect = rect.clone();
		this.colour = colour || 'rgb(255, 255, 255)';
	}

	draw(offset) {
		this.ctx.save();
		this.ctx.fillStyle = this.colour;
		this.ctx.beginPath();
		this.ctx.arc(
			this.rect.x + this.rect.width * 0.5, 
			this.rect.y + this.rect.height * 0.5, 
			(this.rect.width - offset) * 0.5, 
			0, Math.PI * 2, true);
		this.ctx.rect(this.rect.x, this.rect.y, this.rect.width, this.rect.height)
		this.ctx.fill();
		this.ctx.restore();
	}

}

export { CircleMask, Triangle }