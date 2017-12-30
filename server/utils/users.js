class Users{
    constructor( ){
        this.users = [];
    }

    addUser(id, name, room){
        var user = {
            id,
            name,
            room
        }

        this.users.push(user);
        return user;
    }

    removeUser(id) {
        var userData = this.getUser(id);
        var newUserList = this.users.filter((user) => user.id !== id);
        this.users = newUserList;

        return userData;
    }

    getUser(id) {
        var userData = this.users.filter((user) => user.id === id);
        return userData[0];
    }

    getUsersList(room) {
        var userList = this.users.filter((user) => {
            return user.room === room
        });

        var namesArray = userList.map((user) => user.name);

        return namesArray;
    }
}

module.exports = {Users};
