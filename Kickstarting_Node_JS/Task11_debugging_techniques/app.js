

const http = require('http'); 

const routes = require('./routes');

const server = http.createServer(routes);

server.listen(3000);







/* console.log(req.url);
	console.log(req.method);
	console.log(req.headers);
 */




/* function returnsPromise(val,time){ //returns a promise after 'time' ms and resolves with value 'val'
	return new Promise((resolve,reject) => {
		setTimeout(() => resolve(val), time);
	});
}

async function display(){
	console.log('a');
	console.log('b');
	console.log(await returnsPromise('c',3000));
	console.log(await returnsPromise('d',0));
	console.log('e');
}

display();
 */




/* const obj1 = {'key1': 1}
const obj2 = { ...obj1}
if(obj2 === obj1){
console.log('same objects')
}
else{
console.log('different objects')
} */



/* //array
const fruits = ['apple','oranges','','mango','','lemon'];
const fruitsMapped = fruits.map((fruit) => {
    if(fruit === '')
        fruit = 'empty string';
    return fruit;
});

console.log(fruits);
console.log(fruitsMapped);




function toArray(...args){
	return [args];
}
const arr = toArray(1,2,3,4,5);
console.log(arr); // [1,2,3,4,5] */






/* const person = {
	name:'tony',
	age:35
};
const person1 = {...person}; //copy of person object using spread operator
person1.name='bruce';
console.log(person);
console.log(person1); */





/* const arr = [10,20,30];
const arr1 = arr.slice();
arr1[0]=100;
const arr2 = [...arr];
arr2[0]=100;

console.log(arr);
console.log(arr1);
console.log(arr2);
 */





/* class Names{
	constructor(){
		this.names = ['tony','peter','clark','bruce'];
		this.index=0;
		const btn = document.getElementById('button');
		btn.addEventListener('click',this.printName.bind(this));
	}

	printName(){
		console.log(this.names[this.index]);
		this.index++;
		if(this.index >= this.names.length){
			this.index=0;
		}
	}
}

const n1 = new Names();
 */










/* var age=33;
var marks=99;
console.log(this.age);
class Student{
	constructor(name,age,marks){
		this.name=name;
		this.age=age;
		this.marks=marks;
	}

	setMinAge(minAge){console.log(this);
		return function(minMarks){console.log(this);
			if(this.age > minAge && this.marks > minMarks){
				console.log(this.name + ' is eligible');
			}else{
				console.log(this.name + ' is not eligible');
			}
		}
	}
}

const s1 = new Student('peter',16,80);
const s2 = new Student('barry',16,50);
const s3 = new Student('bruce',20,80);
const s4 = new Student('clark',20,50);

s1.setMinAge(18)(75);
s2.setMinAge(18)(75);
s3.setMinAge(18)(75);
s4.setMinAge(18)(75); */




//GET using fetch()
/* fetch('https://jsonplaceholder.typicode.com/users')
.then((res) => res.json())
.then((res) => {
	console.log(res);
	res.forEach((user) => {
		console.log(user.name);
	});
})
.catch((err)=>{
	console.log(err);
}); */

//GET using axios
/* axios.get('https://jsonplaceholder.typicode.com/users')
.then((res)=>{
	console.log(res.data);
	res.data.forEach((user) => {
		console.log(user.name);
	});
})
.catch((err)=>{
	console.log(err);
}); */

//////////////////////////////////////////////////

/* localStorage.clear();

const arr = [1,2,3];
const obj = {
	name: 'bruce',
	age: 45
};

localStorage.setItem('item1',JSON.stringify('tony'));
localStorage.setItem('item2',26);
localStorage.setItem('item3',JSON.stringify(arr));
localStorage.setItem('item4',JSON.stringify(obj));

for(let i=0; i<localStorage.length; i++){
	const k = localStorage.key(i);
	console.log(JSON.parse(localStorage.getItem(k)));
}
console.log(localStorage.getItem('item')); //null

localStorage.removeItem('item'); //no error
localStorage.removeItem('item2');
localStorage.setItem('item1',JSON.stringify('tony144444'));
console.log(localStorage);
 */










/* 
const student = {
	name:'peter',
	age:20,
	isEnrolled: true,
	awards: null,
	points:[8,7,9],
	marks:{
		maths: 90,
		chemistry: 95,
		physics: 85
	}
};

const studentjson = JSON.stringify(student);
console.log(studentjson);

for(m of student.points){
	console.log(m);
}
 */



/* function mult(a,b,c){
	return a*b*c;
}
console.log(mult(2,3,4));

const mult2 = mult.bind(this,2);
console.log(mult2(3,4)); */







/* function sum(a,b,c){
	return a+b+c;
}
console.log(sum(10,20,30));

function curry(fn){
	return curried = (...args)=>{
		if(fn.length !== args.length){
			return curriedSum.bind(null,...args);
		}
		return fn(...args);
	}
}

const curriedSum = curry(sum);
console.log(curriedSum(10)(20)(30));
 */



/* function calculateVolume(l,b,h){
	return l*b*h;
}
console.log(calculateVolume(10,20,30));

function calculateVolume2(l){
	return function (b){
		return function (h){
			return l*b*h;
		}
	}
}
console.log(calculateVolume); */








/* const Student = {
	name:'peter',
	age: 18,
	display: function(){
		console.log(this.name,this.age);
	}
};
setTimeout(Student.display,2000);
setTimeout(Student.display.bind(Student),2000); */






/* const Student = {
	name:'peter',
	age: 18
};

function getDetails(m1,m2,m3){
	console.log(this.name,this.age);
	console.log('marks= ' + parseInt(m1+m2+m3));
}

getDetails.call(Student,80,60,70);
getDetails.apply(Student,[80,60,70]);
const getAllDetails = getDetails.bind(Student);
getAllDetails(80,60,70); */






/* console.log(null == undefined);
console.log(null === undefined);

console.log(typeof null);
console.log(typeof undefined);

console.log(10 + null);
console.log(10 + undefined);

console.log(!null);
console.log(!!null);
console.log(!undefined);
console.log(!!undefined);

console.log(0 == null);
console.log(0 == undefined);
console.log('' == null);
console.log('' == undefined);
console.log([] == null);
console.log([] == undefined);
console.log({} == null);
console.log({} == undefined); */





/* class Person{
	constructor(name,age){
		this.name=name;
		this.age=age;
	}

	getDetails1(){
		console.log(this.name,this.age);
	}
	getDetails2 = () => {
		console.log(this.name,this.age);
	}
}

const p1 = new Person('tony',35);
setTimeout(p1.getDetails1,2000);
setTimeout(p1.getDetails1.bind(p1),2000);
setTimeout(p1.getDetails2,2000);

 */








/* function double(a,a){
	return 2*a;
} */
/* const double = (a,a)=> {
	return 2*a;
}
console.log(double(5,10));
 */

/* add();

function add(){
	console.log('hello');
}

const add = ()=>{
	console.log('hello');
} */









/* function a(){
	console.log(this); //window obj
}
a();

const student  ={
	name:'peter',
	b(){
		console.log(this);
	}
}
student.b();

const teacher = {name:'tony'};
function c(){
	console.log(this);
}
c.call(teacher);
c.apply(teacher);

function d(){
	console.log(this);
}
const p = new d();
 */




//THIS
/* var name='bruce';
const Person={
	name:'tony',
	greet: function(){
		console.log('hello '+this.name);
	},
	greet2: ()=>{console.log(this);
		console.log('hello '+this.name);
	}
}
Person.greet();
Person.greet2();
 */
//IMPLICT RETURN
/* function add(a,b,c){
	return a+b+c;
} */
/* const add= (a,b,c) => a+b+c;
console.log(add(10,20,30)); */

//CONSTRUCTOR
/* function Person(name,age){
	this.name=name;
	this.age=age;
} */
/* const Person = (name,age)=>{
	this.name=name;
	this.age=age;
}
const p1 = new Person('tony',35);
console.log(p1.name,p1.age); */

//ARGUMENTS
/* function add(a,b,c){
	console.log(arguments);
	return a+b+c;
} */
/* const add = (a,b,c) => {
	console.log(arguments);
	return a+b+c;
}
console.log(add(10,20,30)); */

////////////////////////////////

/* function add(...args){
	let total=0;
	for(let i=0; i<args.length; i++){
		total += args[i];
	}
	console.log(total);
}

add(2,5);
add(3,6,8);
add(5,8,2,4); */






/* const a1 = [1,2,3,4];
const a2 = [5,6,7];
const a3=[8,9];
const a=a1.concat(a2,a3);
console.log(a);  */
/* ///deep copy
const arr1= [1,2,3,4];
const arr2 = [...arr1];
arr2[1]=20;
console.log(arr2);
console.log(arr1); */

//array join
/* const a1 = [1,2,3,4];
const a2 = [5,6,7];
const a3=[8,9];
const a = [...a1,...a2,...a3];
console.log(a); */

/* class Person{
	static count=0;

	constructor(name,age){
		this.name=name;
		this.age=age;
		Person.count++;
	}

	getDetails(){
		console.log(this.name,this.age);
	}

	static getCount(){
		return Person.count;
	}
}

const p1 = new Person('tony',45);
p1.getDetails();
console.log(Person.getCount());
const p2 = new Person('peter',20);
p2.getDetails();
console.log(Person.getCount());
const p3 = new Person('clark',35);
p3.getDetails();
console.log(Person.getCount());

console.log(Person.count);
 */







/* class Person{
	constructor(name,age){
		this.name=name;
		this.age=age;
	}

	getDetails(){
		console.log(this.name,this.age);
	}
}

class Student extends Person{
	constructor(name,age,rollNo){
		super(name,age);
		this.rollNo=rollNo;
	}

	getDetails(){
		console.log(this.name,this.age,this.rollNo);
	}
}

const p1 = new Person('tony',35);
p1.getDetails();

const s1 = new Student('peter',20,152);
s1.getDetails(); */




/* const a = [400,20,30,50,10];
console.log(a);
a.sort(); //string sort
console.log(a);
a.sort((a,b) => a-b); //number sort
console.log(a);
a.sort((a,b) => b-a); //number sort
console.log(a);
console.log(Math.max.apply(null,a));
console.log(Math.min.apply(null,a)); */

/* const students = [
	{name:'tony', age:45},
	{name:'peter', age:25},
	{name:'clark', age:35},
	{name:'bruce', age:45},
]
students.sort((a,b) => a.age - b.age);
console.log(students); */





/* const fruits = ["Banana", "Orange", "Apple", "Mango"];
console.log(fruits.toString());
console.log(fruits.join(', ')); */


/* const arr = [10,20,30,40,50];
console.log(arr.push(60));
console.log(arr);
console.log(arr.pop());
console.log(arr);
console.log(arr.unshift(8));
console.log(arr);
console.log(arr.shift());
console.log(arr);
delete arr[0];
console.log(arr); */






/*
// Class for a node of deque
class DQueNode{
	constructor(){
		this.value = 0;
		this.next = null;
		this.prev = null;
	}
}

// Implementation of deque class
class deque{
	// Constructor
	constructor(){
		this.head = this.tail = null;
	}
	
	// If list is empty
	isEmpty(){
        return this.head == null ? true : false;
	}
	
	// count the number of nodes in list
	size(){
		// If list is not empty
		if (!this.isEmpty()){
			let temp = this.head;
			let len = 0;
			while (temp != null){
				len++;
				temp = temp.next;
			}
			return len;
		}
		return 0;
	}
	
	// Insert at the first position
	insert_first(element){
		// Allocating node of DQueNode type
		let temp = new DQueNode();
		temp.value = element;

		// If the element is first element
		if (this.head == null){
			this.head = this.tail = temp;
			temp.next = temp.prev = null;
		}else{
			this.head.prev = temp;
			temp.next = this.head;
			temp.prev = null;
			this.head = temp;
		}
	}
	
	// Insert at last position of deque
	insert_last(element){
		// Allocating node of DQueNode type
		let temp = new DQueNode();
		temp.value = element;

		// If element is the first element
		if (this.head == null){
			this.head = this.tail = temp;
			temp.next = temp.prev = null;
		}else{
			this.tail.next = temp;
			temp.next = null;
			temp.prev = this.tail;
			this.tail = temp;
		}
	}
	
	// Remove element at the first position
	remove_first(){
		// If list is not empty
		if (!this.isEmpty()){
			let temp = this.head;
			this.head = this.head.next;
			this.head.prev = null;
			return;
		}
		console.log("List is Empty");
	}
	
	// Remove element at the last position
	remove_last(){
		// If list is not empty
		if (!this.isEmpty()){
			let temp = this.tail;
			this.tail = this.tail.prev;
			this.tail.next = null;
			return;
		}
		console.log("List is Empty");
	}
	
	// Displays the elements in deque
	display(){
		// If list is not empty
		if (!this.isEmpty()){
			let temp = this.head;
			while (temp != null){
				console.log(temp.value + " ");
				temp = temp.next;
			}
			return;
		}
		console.log("List is Empty");
	}
}

// Class to implement stack using Deque
class Stack{
	constructor(){
		this.d = new deque();
	}
	
	// push to push element at top of stack
	// using insert at last function of deque
	push(val){
		this.d.insert_last(val);
	}
	
	// Returns size
	size(){
		return this.d.size();
	}
	
	// pop to remove element at top of stack
	// using remove at last function of deque
	pop(){
		this.d.remove_last();
	}
	
	// Display
	display(){
		this.d.display();
	}
}

// Driver Code
// Object of Stack
let st = new Stack();

// push 7 and 8 at top of stack
st.push(7);
st.push(8);
console.log("Stack: ");
st.display();

// For new line
console.log("");

// pop an element
st.pop();
console.log("Stack: ");
st.display();
*/



//////////////////////////////////////////
/*
const arr=[1,2,3];
console.log(arr);
arr[0]=10;
console.log(arr);
arr.push(4);
console.log(arr);
arr.pop();
console.log(arr);
//arr=[];

const obj = {
    name:'tony',
    age:35,
}
console.log(obj);
obj.age=40;
console.log(obj);
obj.email='tony@gmail.com';
console.log(obj);
delete obj.email;
console.log(obj);
obj={}
*/