'use strict';

// This class is used for logins
class Login {

  constructor(hash) {
    this.sessions = [];
    this.users = [];
    this.passwords = [];
    Object.keys(hash).map(k => ({k, v: hash[k]})).map(e => {
      this.users = this.users.concat([e.k]);
      this.passwords = this.passwords.concat([e.v]);
    });
  }

  logout(user) {
    this.sessions.forEach((session, i) => {
      if (session === user) {
        this.sessions[i] = null;
      }
    });
    this.sessions = this.sessions.filter(session => session !== null);
  }

  // Checks if user exists  
  //todo:userExists could return an int instead of use the idx function for indexing
  userExists(user) {
    // Temp variable for storing the user if found
    let temp = '';
    for (let i of this.users) {
      if (i === user) {
        temp = user;
      }
    }
    let exists = (temp !== '' && temp === user);
    return exists;
  }

  // Register user
  registerUser(user, password) {
    
    if(this.userExists(user))
      throw({err:'User exists'})
    //use last index for storage the new 
    let lastIndex = this.users.length;
    this.users[lastIndex] = user;
    this.passwords[lastIndex] = password;
  }

  removeUser(user) {
    if(!userExists)
      throw({err:'The user does not exist'})
    let index = this.idx(user, this.users);
    this.users[index] = null;
    this.passwords[index] = null;
    this.users = this.users.filter(user => user !== null);
    this.passwords = this.passwords.filter(password => password !== null);
  }

  checkPassword(user, password) {
    let index = this.idx(user, this.users);
    let passwordCorrect = this.passwords[index] === password;
    return passwordCorrect;
  }

  updatePassword(user, oldPassword, newPassword) {
    // First we check if the user exists
    for (let i of this.users) {
      if (i === user) {
        if(!this.checkPassword(user,oldPassword))
          throw('old Password not matches with the register password, contact admin')  
        let index = this.idx(user, this.users);
        this.passwords[index] = newPassword;
        return true;     
      }
    }
    throw('user not exists');
  }

  login(user, password){
   
    if(!this.checkPassword(user,password))
        throw({err:'Password Incorrect'});  
    //todo:¿what happen if the user has logged?
    this.sessions.push(user);
  }

  // Gets index of an element in an array(sounds code more complex)
  idx(element, array) {
    let cont=0;
    for (let i of array) {
      if (i === element) {
        return cont;
      }
      cont += 1;
    }
    return cont;
  }
}

let registeredUsers = {
  user1: 'pass1',
  user2: 'pass2',
  user3: 'pass3'
};

//todo:this code is serial, we can improve the high avalaibility of thousands of user requeriments using asynchronous programming. 
try{

  //initial state of the "system"
  let login = new Login(registeredUsers);

  //Warning: we can access easily to users and password outside the class, we must set users and pass private for prevent unauthorized access outside the class
  
  //an users want to register to the system
  login.registerUser('user4', 'pass4');
  //in many situations, the user registered to the system want's  to login inmediatly like that, so we can join the register
  //and login of the same user with an async routine. 
  login.login('user4', 'pass4');
  //update password of 3 (independent of 4) 
  //case: an user forgot the password and with his mail can change that password
  
  login.updatePassword('user3', 'pass3', 'pass5');
  //login that user again with new pass
  login.login('user3', 'pass5');
  //some user interaction and then exit  
  login.logout('user4');
  login.logout('user3');
}
//response with the error to the user
catch(e){
  console.error(e);
}