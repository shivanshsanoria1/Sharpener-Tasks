// PLEASE UN-COMMENT THE CODE BETWEEN /* */ TO RUN IT


//(1) using another variable to store 'this'
/*
this.table = 'window table';

const cleanTable = function(soap){
    let that = this;
    const innerFunction = function(_soap){
        console.log(`cleaning ${that.table} using ${_soap}`);
    }
    innerFunction(soap);
}

cleanTable.call(this, 'some soap');
*/
//---------------------------------------------------------------------------
//(2) using call()
/*
this.table = 'window table';

const cleanTable = function(soap){
    const innerFunction = function(_soap){
        console.log(`cleaning ${this.table} using ${_soap}`);
    }
    innerFunction.call(this,soap);
}

cleanTable.call(this, 'some soap');
*/
//---------------------------------------------------------------------------
//(3) using bind()
/*
this.table = 'window table';

const cleanTable = function(soap){
    const innerFunction = function(_soap){
        console.log(`cleaning ${this.table} using ${_soap}`);
    }
    innerFunction.bind(this)(soap);
}

cleanTable.call(this, 'some soap');
*/
//---------------------------------------------------------------------------
//(4) using Arrow function
/*
this.table = 'window table';

const cleanTable = function(soap){
    const innerFunction = (_soap) => {
        console.log(`cleaning ${this.table} using ${_soap}`);
    }
    innerFunction(soap);
}

cleanTable.call(this, 'some soap');
*/
//---------------------------------------------------------------------------
/*
class Student{
    static count=0;

    constructor(name, age, phNumber, marks){
        this.name = name;
        this.age = age;
        this.phNumber = phNumber;
        this.marks = marks;
        Student.count++;
    }

    getDetails(){
        console.log(this.name, this.age, this.phNumber, this.marks);
    }

    isEligible(){
        if(this.marks >= 40)
            console.log('Eligible');
        else
            console.log('Not Eligible');
    }

    studentCount(){
        return count;
    }
};

const s1 = new Student('Tony',35,987654321,85);
const s2 = new Student('Peter',20,987654322,95);
const s3 = new Student('Clark',38,987654323,25);
const s4 = new Student('Bruce',40,987654324,55);
const s5 = new Student('Barry',25,987654325,35);
s1.isEligible();
s2.isEligible();
s3.isEligible();
s4.isEligible();
s5.isEligible();
console.log('Number of students = ' + Student.count);
*/
//---------------------------------------------------------------------------
/*
var x = function(){
    this.val=1;
    setTimeout(() => {
        this.val++; //Arrow function does not have its own 'this' it uses its parent function's 'this'
        console.log(this.val);
    }, 1000);
}
x();

var xx = (...n) => { //passing n arguments to arrow function
    for(let i=0; i<n.length; i++)
        console.log(n[i]);
}
xx(1,2,3,4,5);
*/
//---------------------------------------------------------------------------

class Student{
    static count=0;

    constructor(name, age, phNumber, marks){
        this.name = name;
        this.age = age;
        this.phNumber = phNumber;
        this.marks = marks;
        Student.count++;
    }

    getDetails(){
        console.log(this.name, this.age, this.phNumber, this.marks);
    }

    getName(){
        return this.name;
    }

    isEligible(){
        if(this.marks >= 40)
            console.log('Eligible');
        else
            console.log('Not Eligible');
    }

    studentCount(){
        return count;
    }

    eligibleForPlacements(min_marks){
        this.min_marks = min_marks;
        return (min_age) => {
            if(this.marks >= this.min_marks && this.age >= min_age)
                return true;
            else
                return false;
        }
    }
};

const s1 = new Student('Tony',35,987654321,85);
const s2 = new Student('Peter',16,987654322,75);
const s3 = new Student('Clark',30,987654323,45);
const s4 = new Student('Bruce',40,987654324,65);
const s5 = new Student('Barry',18,987654325,35);
const students = [s1,s2,s3,s4,s5];
//company set the min marks = 50 and min age = 20
for(let i=0; i<students.length; i++)
    if(students[i].eligibleForPlacements(50)(20) == true)
        console.log(students[i].getName() + ' is Eligible for placements');

//---------------------------------------------------------------------------

