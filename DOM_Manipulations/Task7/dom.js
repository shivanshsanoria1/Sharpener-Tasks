let itemList = document.querySelector('#items');

/*
//parentElement
console.log(itemList.parentElement);
itemList.parentElement.style.backgroundColor = '#f4f4f4';
//firstChild
console.log(itemList.firstChild);
itemList.firstChild.textContent = 'Hello firstChild';
//firstElementChild
console.log(itemList.firstElementChild);
itemList.firstElementChild.textContent = 'Hello 1';
//lastChild
console.log(itemList.lastChild);
itemList.lastChild.textContent = 'Hello lastChild';
//lastElementChild
console.log(itemList.lastElementChild);
itemList.lastElementChild.textContent = 'Hello 4';
//nextSibling
console.log(itemList.nextSibling);
itemList.nextSibling.textContent = 'Hello nextSibling';
//nextElementSibling
console.log(itemList.nextElementSibling);
itemList.nextElementSibling.textContent = 'Hello nextElementSibling';
//previousSibling
console.log(itemList.previousSibling);
itemList.previousSibling.textContent = 'Hello previousSibling';
//previousElementSibling
console.log(itemList.previousElementSibling);
itemList.previousElementSibling.style.color = 'green';
*/

// 1. Add Hello World before Item Lister
//createElement
let newDiv = document.createElement('div');
newDiv.className = 'New-Class';
newDiv.id = 'New-id';
//setAttribute
newDiv.setAttribute('title','New-Attribute');
//createTextNode
let newDivText = document.createTextNode('Hello World!');
//appendChild
newDiv.appendChild(newDivText);

let conatiner = document.querySelector('header .container');
let h1 = document.querySelector('header h1');
//insertBefore
conatiner.insertBefore(newDiv,h1); //insert newDiv before h1
console.log(newDiv);

// 2. Add Hello World before Item1
let newLI = document.createElement('li');
newLI.className = 'list-group-item';
let newLIText = document.createTextNode('Hello World');
newLI.appendChild(newLIText);
let ul = document.querySelector('#items');
let li1 = ul.firstElementChild;
ul.insertBefore(newLI,li1); //insert newLI before li1
console.log(newLI);