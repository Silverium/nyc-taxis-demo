/**
 * 
 * @param num  number to round
 * @param steps  array of numbers to round to
 * @returns  the number rounded to the nearest number in the steps array
 */
export default function roundToNearest(num: number, steps: number[]) {
    const nearest = steps.reduce((prev, curr) => Math.abs(curr - num) > Math.abs(prev - num) ? prev : curr, steps[0] || 0);
    return nearest
}
