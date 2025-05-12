// module.exports -> export
// require -> import

const firtModule = require('./fist-module');

console.log(firtModule.add(1, 2));

try {
    console.log('Trying to divide by 0');
    let result = firtModule.divide(2, 10);
    console.log(result);
} catch (error) {
    console.log('Caught an error',error);
}

// moudle wrapper

// (
//     function(exports, require, module, __filename, __dirname) {
//         // your module code goes here
//     }
// )