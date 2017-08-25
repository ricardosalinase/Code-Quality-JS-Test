'use strict';

class Login{
    constructor(hash) {
    	this.sessions = [];
		this.registeredUsers = hash;
	}

	logout(user) {

		let idx = this.sessions.indexOf(user);
		if(idx === -1)
			throw('User is not logged');		
		this.sessions[idx] = null;
	}
	registerUser(user, password){
	
		//new: check if new user exist and return false if not: 
		if(this.registeredUsers.hasOwnProperty(user))
			throw {err:'User exists'};
		this.registeredUsers[user] = password;
		//use last index for storage the new [user,pass](better with push in hash or JSonObject for a more comprenhesive code)
	}
	
	removeUser(user) {
		if(!this.registeredUsers.hasOwnProperty(user))
			throw {err:'User exists'}
		//prevent throw to outside
		try{
		logout(user);
		}
		finally{	
		delete this.registeredUsers[user];
		}
 	}
	login(user, password){
	
		if(this.registeredUsers[user] != password){
			throw {err:'Incorrect Password'};	
		}
		//¿what happen if the user has logged?
		this.sessions.push(user);		
	}
	
	updatePassword(user, newPassword) {

		if(!this.registeredUsers.hasOwnProperty(user))
			throw{err:'User not exists for upgrade password'};
		this.registeredUsers[user] = newPassword;
  	}
}

//login all the users
let registeredUsers = {
  user1: 'pass1',
  user2: 'pass2',
  user3: 'pass3'
};
let login = new Login(registeredUsers);

//add a error handle block
try{
	//an user join to the system
	login.registerUser('user4', 'pass4');
	login.login('user4','pass4');
	
	//an user change the password (probably because forgot that)
	login.updatePassword('user3','pass5'); 
	login.login('user3','pass5');
	
	//logout users
	login.logout('user4');
	login.logout('user3');

	//remove user test
	login.removeUser('user4');
}
//response with the error to the user 
catch(e){
	console.log(e);
};
 