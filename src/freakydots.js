
import { Triangle } from './shapes.js'
import { Rect } from './geom.js'
import { Field } from './field.js'

class DotField extends Field {

	constructor(rect) {
		super(rect);
	}

	draw(colour, width, height) {

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
		return new DotField(this.rect.clone());
	}

}

export { DotField }