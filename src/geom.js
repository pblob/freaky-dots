class Rect {

	x;
	y;
	width;
	height;

	constructor(x, y, width, height) {
		this.x = x;
		this.y = y;
		this.width = width;
		this.height = height;
	}

	shrink(byW, byH) {
		this.x += byW * 0.5;
		this.y += byH * 0.5;
		this.width -= byW;
		this.height -= byH;
	}

	grow(byW, byH) {
		this.x -= byW * 0.5;
		this.y -= byH * 0.5;
		this.width += byW;
		this.height += byH;
	}

	clone() {
		return new Rect(this.x, this.y, this.width, this.height);
	}

}

class Point {

	x;
	y;

	constructor(x, y) {
		this.x = x || 0;
		this.y = y || 0;
	}
	
	translateRadians(angle, distance) {
		this.x += Math.cos(angle) * distance;
		this.y += Math.sin(angle) * distance;
	}

	draw(ctx, colour, radius) {
		ctx.save();
		ctx.strokeStyle = colour || 'rgb(255, 0, 0)';
		radius = radius || 5;
		ctx.beginPath();
		ctx.arc(
			this.x, 
			this.y, 
			radius, 0, Math.PI * 2);
		ctx.stroke();
		ctx.closePath();
		ctx.restore();
	}

	drawNormal(fromPt, ctx, colour, length) {
		ctx.save();
		ctx.strokeStyle = colour || 'rgb(255, 0, 0)';
		ctx.beginPath();
		ctx.moveTo(this.x, this.y);
		let pt = this.getNormal(fromPt, length);
		ctx.lineTo(pt.x, pt.y);
		ctx.stroke();
		ctx.closePath();
		ctx.restore();
		return pt;
	}

	getNormal(fromPt, length) {
		let pt = this.clone();
		pt.translateRadians(Point.angle(fromPt, pt), length || 20);
		return pt;
	}
	
	clone() {
		return new Point(this.x, this.y);
	}

	static angle(pt0, pt1) {
		return Math.atan2(pt1.y - pt0.y, pt1.x - pt0.x);
	}

}

export { Rect, Point }