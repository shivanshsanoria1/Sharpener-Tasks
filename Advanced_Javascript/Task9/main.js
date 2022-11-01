//object
var obj = { num:2 };
//function
var addToThis = function(a,b,c){
    return this.num+a+b+c;
}
//call
console.log(addToThis.call(obj,1,2,3));
//apply
var arr = [1,2,3];
console.log(addToThis.apply(obj,arr));
//bind
var bound1 = addToThis.bind(obj);
console.log(bound1(1,2,3));
//------------------------------------------------

//print age of student
var student = { age:20 };
function printAge(){
    console.log(this.age);
}
var bound = printAge.bind(student);
bound();
//------------------------------------------------

//currying using bind()
let multiply = function(x,y){
    console.log(x*y);
}

let multiplyBy2 = multiply.bind(this,2) //essentially fixing x=2
multiplyBy2(5); //equivalent to multiply(2,4)

let multiplyBy3 = multiply.bind(this,3) //essentially fixing x=3
multiplyBy3(5); //equivalent to multiply(3,4)

//currying using closures
let multiply_ = function(x){
    return function(y){
        console.log(x*y);
    }
}

let multiplyBy2_ = multiply_(2);
multiplyBy2(5);

let multiplyBy3_ = multiply_(3);
multiplyBy3(5);