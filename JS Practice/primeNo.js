let arr = [10, 20, 30, 45, 99, 100, -2, 100, 90, 99, 37, 7, 0, 4, 1];

function primeNo(num) {
    if (num <= 1) return false;
    for (i = 2; i < num; i++) {

        if (num % i === 0) return false;

    }
    return true
}

const primes = arr.filter(primeNo);
console.log(`These are the Prime No: ${primes}`);