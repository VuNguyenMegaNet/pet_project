class Mammels {
	constructor(legs) {
		this.legs = legs;
	}

	eat(name) {
		console.log(`${name} is eating...`);
	}

	static count() {
		console.log('static count...');
	}
}

module.exports = Mammels;
