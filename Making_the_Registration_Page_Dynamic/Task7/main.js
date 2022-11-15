// using promises
/*
console.log('person1: shows ticket');
console.log('person2: shows ticket');

const wifeBringingTickets = new Promise((resolve,reject) => {
    setTimeout(() => {
        resolve('ticket');
    }, 2000);
})

const getPopcorn = wifeBringingTickets.then((t) => {
    console.log('wife: i have tickets');
    console.log('husband: we should go in');
    console.log('wife: no, i am hungry');
    return new Promise((resolve,reject) => resolve(`${t} popcorn`));
});

const getButter = getPopcorn.then((t) => {
    console.log('husband: i got popcorn');
    console.log('husband: we should go in');
    console.log('wife: no, i need butter on my popcorn');
    return new Promise((resolve,reject) => resolve(`${t} butter`));
});

getButter.then((t) => console.log(t));

console.log('person4: shows ticket');
console.log('person5: shows ticket');
*/

//using async await

console.log('person1: shows ticket');
console.log('person2: shows ticket');

const preMovie = async () => {
    const wifeBringingTickets = new Promise((resolve,reject) => {
        setTimeout(() => {
            resolve('ticket');
        }, 2000);
    });

    const getPopcorn = new Promise((resolve,reject) => resolve('popcorn'));

    const getButter = new Promise((resolve,reject) => resolve('butter'));

    const getColdDrinks = new Promise((resolve,reject) => resolve('cold drinks'));

    const ticket = await wifeBringingTickets;
    console.log(`wife: i have ${ticket}`);
    console.log('husband: we should go in');
    console.log('wife: no, i am hungry');

    const popcorn = await getPopcorn;
    console.log(`husband: i got ${popcorn}`);
    console.log('husband: we should go in');
    console.log('wife: no, i need butter on my popcorn');

    const butter = await getButter;
    console.log(`husband: i got ${butter}`);
    console.log('husband: anything else ?');
    console.log('wife: yes, i want cold drink');

    const coldDrinks = await getColdDrinks;
    console.log(`husband: i got ${coldDrinks}`);
    console.log('husband: anything else ?');
    console.log('wife: no, lets go in');

    return ticket;
}

preMovie().then((t) => console.log(`person3: shows ${t}`));

console.log('person4: shows ticket');
console.log('person5: shows ticket');


// using Promise.all
/*
console.log('person1: shows ticket');
console.log('person2: shows ticket');

const preMovie = async () => {
    const wifeBringingTickets = new Promise((resolve,reject) => {
        setTimeout(() => {
            resolve('ticket');
        }, 2000);
    });

    const getPopcorn = new Promise((resolve,reject) => resolve('popcorn'));

    const getButter = new Promise((resolve,reject) => resolve('butter'));

    const getColdDrinks = new Promise((resolve,reject) => resolve('cold drinks'));

    const ticket = await wifeBringingTickets;
    const [popcorn,butter,coldDrinks] = await Promise.all([getPopcorn,getButter,getColdDrinks]);

    console.log(`${popcorn}, ${butter}, ${coldDrinks}`);

    return ticket;
}

preMovie().then((t) => console.log(`person3: shows ${t}`));

console.log('person4: shows ticket');
console.log('person5: shows ticket');
*/