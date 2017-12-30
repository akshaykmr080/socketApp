const expect = require('expect');

const {Users} = require('../utils/users');

var users;
describe('Users', () => {
    beforeEach(() => {
        users = new Users();
        users.users = [{id: '1', name: 'Akshay', room: 'Room 1'},
                      {id: '2', name: 'Vidhatri', room: 'Room 2'},
                      {id: '3', name: 'Govardhan', room: 'Room 1'}]
    })

    it('should add new users', () => {
        var users = new Users()
        var user = {
            id: '123',
            name: 'Akshay',
            room: 'Class room'
        }

        users.addUser(user.id, user.name, user.room);
        expect(users.users).toEqual([user])
    });

    it('should return names of users in room 1', () => {
        var userList = users.getUsersList('Room 1');

        expect(userList).toEqual(['Akshay', 'Govardhan']);
    });

    it('should remove a user', () => {
        users.removeUser('2');
        expect(users.users.length).toBe(2);
    });

    it('should not remove a user', () =>{
        users.removeUser('6');
        expect(users.users.length).toBe(3);
    });

    it('should find a user', () =>{
        var userData = users.getUser('2');
        expect(userData.name).toEqual('Vidhatri')
    })

    it('should not find a user', () => {
        var userData = users.getUser('5');
        expect(userData).toEqual(undefined)
    })
})