'use strict';
//external class for better modular code
var Login = require('./login1').Login;

//initial data for users with pass to the Login class
let registeredUsers = {
  user1: 'pass1',
  user2: 'pass2',
  user3: 'pass3'
};

try {

  //initial state of the "system"
  let login = new Login(registeredUsers);

  //an users want to register to the system
  login.registerUser('user4', 'pass4');
  login.login('user4', 'pass4');

  login.updatePassword('user3', 'pass3', 'pass5');
  login.login('user3', 'pass5');

  login.logout('user4');
  login.logout('user3');

  //remove user test
  login.removeUser('user2');
  console.log('after remove user2',login.users);
}
//response with the error to the user (web response in real case)
catch (e) {
  console.error(e);
}
