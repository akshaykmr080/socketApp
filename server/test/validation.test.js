var expect = require('expect');
var {isRealString} = require('../utils/validation');

describe('is Real String', () => {
    it('should reject non string values', () => {

        var res = isRealString(98);
        expect(res).toBe(false);
    });

    it('should reject string with omly spaces', () => {
        var res = isRealString('  ');
        expect(res).toBe(false);
    });

    it('should allow string with non space charecters', () => {
        var res = isRealString(' Akshay Kumar   ');
        expect(res).toBe(true);
    })
})