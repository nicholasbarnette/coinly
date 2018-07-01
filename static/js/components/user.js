export default class User {
	
	constructor(first, last, username) {
		this.firstName = first;
		this.lastName = last;
		this.username = username;
	}
	
	getUsername() {
		return this.username;
	}
	
	getFirstName() {
		return this.firstName;
	}
	
	getLastName() {
		return this.lastName;
	}
	
	getFullName() {
		return this.firstName + ' ' + this.lastName;
	}
}