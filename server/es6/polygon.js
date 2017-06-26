class Person {
	constructor(name) {
		this.name = name;
	}

	toString() {
		return `Person named ${this.name}`;
	}

	static logNames(persons) {
		for (const person of persons) {
			console.log(person);
		}
	}
}

class Employee extends Person {
	constructor(name, title) {
		super(name);
		this.title = title;
	}

	toString2() {
		return `${super.toString()} (${this.title})`;
	}
}

class Employ1 extends Employee {
	constructor(name, title, age) {
		super(name, title);
		this.age = age;
	}

	introduce() {
		return `Hello world, I'm ${this.name}, I'm ${this.age} years old, my title is ${this.title}`;
	}
}

class Employ2 extends Employee {
	constructor(name, title, age, address) {
		super(name, title);
		this.age = age;
		this.address = address;
	}

	introduce() {
		return `Hello world, I'm ${this.name}, I'm ${this.age} years old, my title is ${this.title}, my address is ${this.address}`;
	}
}

const e = new Employ1('Anh Vu', 'developer', 24);
console.log(e.introduce());

const e2 = new Employ2('Jack', 'actor', 35, 'New York123');
e2.age = 20;
console.log(e2.introduce());
