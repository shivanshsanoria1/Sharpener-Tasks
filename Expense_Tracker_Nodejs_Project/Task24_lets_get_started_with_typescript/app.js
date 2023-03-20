"use strict";
const num1Element = document.getElementById('num1');
const num2Element = document.getElementById('num2');
const buttonElement = document.querySelector('button');
const numResults = [];
const stringResults = [];
function add(num1, num2) {
    if (typeof num1 === 'number' && typeof num2 === 'number') {
        return num1 + num2;
    }
    else if (typeof num1 === 'string' && typeof num2 === 'string') {
        return num1 + ' ' + num2;
    }
    return +num1 + +num2;
}
function printResult(resultObj) {
    console.log(resultObj.val, resultObj.timestamp);
}
//console.log(add(2,5));
//console.log(add('2','5'));
buttonElement.addEventListener('click', () => {
    const num1 = num1Element.value;
    const num2 = num2Element.value;
    const result = add(+num1, +num2);
    const stringResult = add(num1, num2);
    console.log(result);
    numResults.push(result);
    console.log(stringResult);
    stringResults.push(stringResult);
    printResult({ val: result, timestamp: new Date() });
    console.log(numResults, stringResults);
});
const myPromise = new Promise((resolve, reject) => {
    setTimeout(() => {
        resolve('hello world');
    }, 3000);
});
myPromise.then((res) => {
    console.log(res.split(' '));
});
