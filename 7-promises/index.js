function delayFunction(time) {
    return new Promise((resolve) => setTimeout(resolve, time));
}

console.log('Promise lecture starts');
delayFunction(2000).then(() => console.log('after 2 seconds promise resolved'));
console.log('end');

function divideFn(num1, num2) {
    return new Promise((resolve, reject) => {
        if(num2 === 0) {
            reject('Can not perform divison by 0')
        } else {
            resolve(num1 / num2);
        }
    } )
}

divideFn(120, 20).then(result => console.log(result, 'res'))
.catch(error => console.log(error, 'err'));