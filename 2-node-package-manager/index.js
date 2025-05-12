const lodash = require('lodash');

const names = ['ab', 'bc', 'cd', 'de'];

const capitalize = lodash.map(names, lodash.capitalize);

console.log(capitalize);;
