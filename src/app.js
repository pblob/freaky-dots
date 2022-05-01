import { DotField, PetalField } from './field.js';
import { Rect } from './geom.js'
import { Utils } from './utils.js'
import { CircleMask } from './shapes.js'
import TWEEN from './tween.js'

class App {


	// What we call chaos is just patterns we haven't recognized. 
	// What we call random is just patterns we can't decipher. 
	// What we can't understand we call nonsense. What we can't read we call gibberish.
	// There is no free will. 
	// There are no variables.

	yourIrrationalFear = 0.66;
	secondsToTranscendance = 40;
	scopeOfYourFeeling = 1000;
	scaleOfYourResponse = 20;

	colour1 = 'rgb(0, 0, 0)';
	colour2 = 'rgb(255, 255, 255)';

	responsive = true;

	constructor() {

		// Create the freaky fields

		const rect = new Rect(0, 0, this.scopeOfYourFeeling, this.scopeOfYourFeeling);

		this.topDotsField = new DotField(rect.clone());
		this.bottomDotsField = this.topDotsField.clone();
		this.petalField = new PetalField(rect.clone(), 'rgb(0,0,255)');
		
		const offset = 100;
		this.petalField.rect.shrink(offset, offset);

		this.bottomDotsField.draw(this.colour1, this.scaleOfYourResponse);
		this.topDotsField.draw(this.colour1, this.scaleOfYourResponse);
		this.petalField.draw(this.colour1);

		const maskCanvas = Utils.makeCanvas(rect.clone());
		const mask = new CircleMask(maskCanvas.getContext('2d'), rect.clone(), this.colour2);
		mask.draw(offset);
		
		// Append to DOM

		const frame = Utils.appendDiv(document.body, 'frame');
		const matte = Utils.appendDiv(frame, 'matte');
		const inner = Utils.appendDiv(matte, 'inner');
		
		inner.append(this.bottomDotsField.canvas);
		inner.append(this.topDotsField.canvas);
		inner.append(maskCanvas);
		inner.append(this.petalField.canvas);
		
		// Style

		document.body.style.backgroundColor = this.colour2;
		if (this.responsive) {
			inner.classList.add('responsive');
		} else {
			inner.style.width = inner.style.height = this.scopeOfYourFeeling + 'px';
		}
		// ensure canvasses are drawn correctly when transformed
		maskCanvas.style.zIndex = 1;
		this.petalField.canvas.style.zIndex = 2;
		
		// Animate

		const coords = {r: 0};
		new TWEEN.Tween(coords)
			.to({r: '+' + Math.PI * this.yourIrrationalFear + ''}, this.secondsToTranscendance * 1100)
			.onUpdate(() => {
				this.rotate(this.bottomDotsField, coords);
				this.rotate(this.petalField, coords);
			})
			.repeat(Infinity)
			.start();

		requestAnimationFrame(this.animate);
		
	}

	rotate = (field, coords, reverse) => {

		let rev = reverse ? '-' : '';
		field.canvas.style.transform = 'rotate(' + rev + coords.r + 'rad)';

	}

	animate = (time) => {

		TWEEN.update(time);
		requestAnimationFrame(this.animate);

	}

}

export { App };