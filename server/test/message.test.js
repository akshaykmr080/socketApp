var expect = require('expect');
var {generateMessage, generateLocationMessage} = require('../utils/message');

describe('generate message', () => {
    it('should generate the correct message object', () => {
        var from = 'Akshay';
        var text = 'Hello there';
        var res = generateMessage(from, text);
        console.log(res)
        expect(typeof res.createdAt).toBe('number');
        expect(res).toMatchObject({from,text});
    });
});

describe('generateLocationMessage', () => {
    it('should generate correct location object', ()=> {
        var from = 'jhon';
        var latitude = 15;
        var longitude = 19;
        var url = `https://www.google.com/maps?q=15,19`;

        var message = generateLocationMessage(from, {latitude, longitude});
        expect(typeof message.createdAt).toBe('number');
        expect(message).toMatchObject({from, url});
    })
})