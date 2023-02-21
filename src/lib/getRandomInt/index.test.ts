import { getRandomInt } from '.';

describe('getRandomInt', () => {
    beforeEach(() => {
        jest.spyOn(Math, 'random').mockReturnValue(.5);
    });

    afterEach(() => jest.clearAllMocks());

    it('should return random integer', () => {
        expect(getRandomInt(0, 5)).toBe(3);
        expect(getRandomInt(-5, 0)).toBe(-2);
        expect(getRandomInt(-5, 5)).toBe(0);
    });
});
