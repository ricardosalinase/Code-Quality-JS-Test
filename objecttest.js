'use strict';

var Login = require('./login2').Login;


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
 