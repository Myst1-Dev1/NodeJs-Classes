const fs = require('fs');
const crypto = require('crypto');

console.log('1', 'Script start');


setTimeout(() => {
    console.log('2', 'settimeout 0 callback(macrotask)');
}, 0);

setTimeout(() => {
    console.log('3', 'settimeout 0 callback(macrotask)');
}, 0);

setImmediate(() => {
    console.log('4. setImmediate (check)');
});

Promise.resolve().then(() => {
    console.log('5', 'Promise resolved(microtask)');
});

process.nextTick(() => {
    console.log('6 process.nextTick callback (microtask)');
});

fs.readFile(__filename, () => {
    console.log('7 file read operation (I/0 Callback)');
});

crypto.pbkdf2('secret', 'salt', 10000, 64, 'sha512', (err, key) => {
    if(err) throw err;
    console.log('8. pbkdf2 operation completed (CPU Intensive task)');
});

console.log('9. Script ends');