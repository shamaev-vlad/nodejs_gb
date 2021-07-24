const { workerData, parentPort } = require('worker_threads')

const isPrimeSqrt = (num) => {
  for (let i = 2; i < num; i++) {
    if (num % i === 0) {
      return false;
    }
  }
  return true;
};

const getPrimeNumber = (max) => {
  for (let n = max; n >= 2; n--) {
    for (let i = n; (i) => 2; i--) {
      if (isPrimeSqrt(i)) {
        return i;
      }
    }
  }
  return 2;
};

const start = performance.now();
parentPort.postMessage(`Простое число: ${getPrimeNumber(workerData.max)}`)
const end = performance.now();
console.log(`Продолжительность: ${Math.floor(end - start)}ms`);
parentPort.on('message', (msg) => {
  console.log(msg)
})