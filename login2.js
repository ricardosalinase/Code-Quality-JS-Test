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
		//prevent logout catch from outside if throw an exception
		try{
		this.logout(user);
        }
        catch(e){}
		finally{	
		delete this.registeredUsers[user];
		}
 	}
	login(user, password){
	
		if(this.registeredUsers[user] != password){
			throw {err:'Incorrect Password'};	
		}
        if(this.sessions.indexOf(user) != -1)
            throw {err:'user already logged'};
		this.sessions.push(user);		
	}
	//i think oldpass is not necessary for modify a pass
	updatePassword(user, newPassword) {

		if(!this.registeredUsers.hasOwnProperty(user))
			throw{err:'User not exists for upgrade password'};
		this.registeredUsers[user] = newPassword;
  	}
}

module.exports.Login = Login;