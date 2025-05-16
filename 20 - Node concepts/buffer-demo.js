const buffOne = Buffer.alloc(10); //allocate a buffer of 10 bytes -> zeros
console.log(buffOne);

const buffFromString = Buffer.from('Hello');
console.log(buffFromString);

const buffFromArrayOfIntegers = Buffer.from([1, 2, 3, 4, 5, 0]);
console.log(buffFromArrayOfIntegers);

buffOne.write('Node js');
console.log('After writing node js to buffer one', buffOne.toString());

console.log(buffFromString[0]);

console.log(buffFromString.slice(0, 3));

const concactBuffer = Buffer.concat([buffOne, buffFromString]);
console.log(concactBuffer);

console.log(concactBuffer.toJSON());