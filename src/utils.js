class Utils {

	static makeCanvas(rect) {
		let c = document.createElement('canvas');
		c.width = rect.width;
		c.height = rect.height;
		return c;
	}

	static appendDiv(to, id) {
		let d = to.appendChild(document.createElement('div'));
		d.id = id;
		return d;
	}

}

export { Utils }