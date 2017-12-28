var expect = require('expect');
var {generateMessage} = require('../utils/message');

describe('generate message', () => {
    it('should generate the correct message object', () => {
        var from = 'Akshay';
        var text = 'Hello there';
        var res = generateMessage(from, text);
        console.log(res)
        expect(typeof res.createdAt).toBe('number');
        expect(res).toMatchObject({from,text});
    })
})