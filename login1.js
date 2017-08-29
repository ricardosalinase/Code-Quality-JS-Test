// This class is used for logins
class Login {

    constructor(hash) {
        this.sessions = [];
        this.users = [];
        this.passwords = [];
        Object.keys(hash).map(k => ({ k, v: hash[k] })).map(e => {
            this.users = this.users.concat([e.k]);
            this.passwords = this.passwords.concat([e.v]);
        });
    }

    logout(user) {
        let idx = this.sessions.indexOf(user);
        if (idx == 1)
            throw ({ err: 'user not logged' })
        this.sessions.splice(idx, 1);
    }

    // Checks if user exists  
    //todo:userExists could return an int instead of use the idx function for indexing
    userExists(user) {
        return this.users.indexOf(user) != -1;
    }

    // Register user
    registerUser(user, password) {

        if (this.userExists(user))
            throw ({ err: 'User exists' })
        //use last index for storage the new 
        this.users.push(user);
        this.passwords.push(password);
    }

    removeUser(user) {
        let idx = this.users.indexOf(user);
        if (idx == -1)
            throw ({ err: 'The user does not exist' })
        //try for prevent the outside catch of logout
        try {
            this.logout(user)
        }
        catch(e){}
        finally {
            this.users.splice(idx, 1);
            this.passwords.splice(idx, 1);
        }
    }

    checkPassword(user, password) {
        let index = this.users.indexOf(user);
        let passwordCorrect = this.passwords[index] === password;
        return passwordCorrect;
    }

    updatePassword(user, oldPassword, newPassword) {
        // First we check if the user exists
        let idx = this.users.indexOf(user);
        if (idx == -1)
            throw ({ err: 'user not exists' });
        if (!this.checkPassword(user, oldPassword))
            throw ('old Password not matches with the register password, contact admin')
        this.passwords[idx] = newPassword;
    }

    login(user, password) {

        if (!this.userExists(user))
            throw ({ err: `user ${user} not exists` })
        if (!this.checkPassword(user, password))
            throw ({ err: ` ${user} Password Incorrect` });
        if (this.sessions.indexOf(user) != -1)
            throw ({ err: `user ${user} already logged` });
        this.sessions.push(user);
    }
}

module.exports.Login = Login;