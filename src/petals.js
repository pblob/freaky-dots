class PetalField {

	constructor(rect) {
		this.rect = rect;
		this.canvas = Utils.makeCanvas(rect);
		this.ctx = this.canvas.getContext('2d');
	}

	draw(colour) {
		
		const centrePt = new Point(
			this.rect.x + this.rect.width * 0.5, 
			this.rect.y + this.rect.width * 0.5);

		const growth = 20;
		this.ctx.lineWidth = 5;
		centrePt.draw(this.ctx, 'rgb(0, 0, 0)', this.rect.width * 0.5);
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
					petalRect.height)
			);
			tri.draw();
			
			this.ctx.restore();
			
			// debug draw
			//pt.draw(this.ctx);
			//pt.drawNormal(centrePt, this.ctx);

		}

	}


}
