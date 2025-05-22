const numbers = Array.from({
  length: 10,
}).map(() => Math.floor(Math.random() * 1000)); // generate ten number randoms

console.log(numbers);

let minorNumber = numbers[0];
let biggerNumber = numbers[0];

for (let position = 0; position < numbers.length; position++) {
  let numberTarget = numbers[position];

  if (numberTarget < minorNumber) {
    minorNumber = numberTarget;
  }

  if (numberTarget > biggerNumber) {
    biggerNumber = numberTarget;
  }
}
console.log({
  minorNumber,
  biggerNumber,
});
