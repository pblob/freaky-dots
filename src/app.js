import { DotField } from './freakydots.js';
import { PetalField } from './petals.js';
import { Rect } from './geom.js'
import { Utils } from './utils.js'
import { CircleMask } from './shapes.js'

class App {


	// What we call chaos is just patterns we haven't recognized. 
	// What we call random is just patterns we can't decipher. 
	// What we can't understand we call nonsense. What we can't read we call gibberish.
	// There is no free will. 
	// There are no variables.

	freakFactors = {x: 0, y: 0}; // 0 = no offset
	yourIrrationalFear = 0.66;
	secondsToTranscendance = 40;
	scopeOfYourFeeling = 1000;
	scaleOfYourResponse = 20;

	colour1 = 'rgb(0, 0, 0)';
	colour2 = 'rgb(255, 255, 255)';

	constructor() {

		// Create the freaky things

		const rect = new Rect(0, 0, this.scopeOfYourFeeling, this.scopeOfYourFeeling);

		this.topDotsField = new DotField(rect);
		this.bottomDotsField = this.topDotsField.clone();

		const offset = 100;
		const mask = new CircleMask(this.topDotsField.ctx, rect, this.colour2);
		this.petals = new PetalField(rect, this.colour1);

		this.petals.rect.shrink(offset, offset);

		this.bottomDotsField.draw(this.colour1, this.scaleOfYourResponse);
		this.topDotsField.draw(this.colour1, this.scaleOfYourResponse);
		mask.draw(offset);
		this.petals.draw(this.colour1);

		// Append to DOM

		const frame = Utils.appendDiv(document.body, 'frame');
		const matte = Utils.appendDiv(frame, 'matte');
		const inner = Utils.appendDiv(matte, 'inner');

		inner.append(this.bottomDotsField.canvas);
		inner.append(this.topDotsField.canvas);
		inner.append(this.petals.canvas);

		// Style

		const responsive = false;
		if (responsive) {
			// add responsive class list to inner and canvasses
		} else {
			inner.style.width = inner.style.height = this.scopeOfYourFeeling + 'px';
		}
		document.body.style.backgroundColor = this.colour2;

		// Animate

		const coords = {x:0, y: 0, r: 0};

		new TWEEN.Tween(coords)
			.to({x: this.freakFactors.x, y: this.freakFactors.y}, this.secondsToTranscendance * 1000)
			.easing(TWEEN.Easing.Sinusoidal.InOut)
			.repeat(Infinity)
			.yoyo(true)
			.start();
		
		new TWEEN.Tween(coords)
			.to({r: '+' + Math.PI * this.yourIrrationalFear + ''}, this.secondsToTranscendance * 1100)
			.onUpdate(() => {
				this.rotate(this.bottomDotsField, coords);
				this.rotate(this.petals, coords);
			})
			.repeat(Infinity)
			.start();

		requestAnimationFrame(this.animate);
		
	}

	rotate = (field, coords, reverse) => {

		let rev = reverse ? '-' : '';
		field.canvas.style.transform = 'translate(' + rev + coords.x + 'px,' + rev + coords.y + 'px) rotate(' + rev + coords.r + 'rad)';

	}

	animate = (time) => {

		TWEEN.update(time);
		requestAnimationFrame(this.animate);

	}

}

export { App };