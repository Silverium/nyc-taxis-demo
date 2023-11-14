import generatePrimeNumbersObject from './generatePrimeNumbersObject';

describe('generatePrimeNumbersObject', () => {
    it('should return an object with prime numbers up to the given limit', () => {
        const result = generatePrimeNumbersObject(10);
        expect(result).toEqual({
            2: true,
            3: true,
            5: true,
            7: true,
        });
    });

    it('should return an empty object if the limit is less than 2', () => {
        const result = generatePrimeNumbersObject(1);
        expect(result).toEqual({});
    });

    it('should handle large limits', () => {
        const result = generatePrimeNumbersObject(100000);
        expect(Object.keys(result).length).toBe(9592);
    });
});
