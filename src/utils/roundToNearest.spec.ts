import roundToNearest from './roundToNearest';
describe('roundToNearest', () => {
    it('should round a number to the nearest margin', () => {
        expect(roundToNearest(-7.2, [1, 2, 5])).toBe(1);
        expect(roundToNearest(1.5, [1, 2, 5])).toBe(2);
        expect(roundToNearest(2.3, [1, 2, 5])).toBe(2);
        expect(roundToNearest(2.3, [5, 1, 2, 400])).toBe(2);
        expect(roundToNearest(4, [1, 2, 5])).toBe(5);
        expect(roundToNearest(700, [1, 2, 5])).toBe(5);
    });


    it('should return 0 if the margins array is empty', () => {
        expect(roundToNearest(5.3, [])).toBe(0);
    });
});
