//arrow function
const product = (a,b) => a*b;
console.log(product(4,5));

//object
const student = {
    name: 'peter',
    age: 18,
    greet(){
        console.log('hi, i am ' + this.name);
    }
}
student.greet();