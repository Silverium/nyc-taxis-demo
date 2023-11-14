// this is a function that generates prime numbers from 2 to n, but it's very slow and has no caching strategy
// in any case the use case is just for testing purposes, so it's fine.
// I wouldn't run this function in production, I would rather have a collection of prime numbers and use that instead
export default function generatePrimeNumbersObject(n: number): { [key: number]: boolean } {
    const primes: { [key: number]: boolean } = {};
  
    for (let i = 2; i <= n; i++) {
      let isPrime = true;
  
      for (let j = 2; j <= Math.sqrt(i); j++) {
        if (i % j === 0) {
          isPrime = false;
          break;
        }
      }
  
      if (isPrime) {
        primes[i] = true;
      }
    }
  
    return primes;
  }