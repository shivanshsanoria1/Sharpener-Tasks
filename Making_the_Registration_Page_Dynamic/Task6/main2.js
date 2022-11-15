const posts = [
    {title:'post 1', body:'this is post 1', createdAt:new Date()},
    {title:'post 2', body:'this is post 2', createdAt:new Date()},
];

const user = {name:'Clark', lastActivityTime:new Date()};

function getPosts(){
    setTimeout(() => {
        let output='';
        if(posts.length === 0){
            document.body.innerHTML = '';
        }
        posts.forEach((post) => {
            const timeStamp = Math.floor((new Date() - post.createdAt)/1000);
            output += `<li>${post.title}, created ${timeStamp} seconds ago</li>`;
            document.body.innerHTML = output;
        });
    }, 1000);
}

function createPost(post){
    return new Promise((resolve,reject) => {
        setTimeout(() => {
            post.createdAt = new Date();
            posts.push(post);
            const err = false;
            if(!err){
                resolve(posts);
            }
            else{
                reject('Error: something went wrong :(');
            }
        }, 2000);
    });
}

function deletePost(){
    return new Promise((resolve,reject) => {
        setTimeout(() => {
            if(posts.length > 0){
                resolve(posts.pop());
            }
            else{
                reject('Error: no more posts!');
            }
        }, 1000);
    });
}

function updateLastUserActivityTime(){
    return new Promise((resolve,reject) => {
        setTimeout(() => {
            user.lastActivityTime = new Date();
            const err = false;
            if(!err){
                resolve(user.lastActivityTime);
            }
            else{
                reject('Error: something went wrong :(');
            }
        }, 1000);
    });
}

console.log('Before creating post 3, user last activity time:' + user.lastActivityTime);
Promise.all([createPost({title: 'post 3' , body:'this is post 3'}), updateLastUserActivityTime()])
.then(([createPostResolves, updateLastUserActivityTimeResolves]) => {
    console.log('All posts: ');
    createPostResolves.forEach((post) => {console.log(post);});
    console.log('user last activity time: ' + updateLastUserActivityTimeResolves);
    getPosts();
    deletePost()
    .then(() => {
        getPosts();
        console.log('All posts: ');
        createPostResolves.forEach((post) => {console.log(post);});
    })
    .catch((err) => { console.log(err); });
})
.catch((err) => { console.log(err); });


//promise.all
/*
const promise1 = Promise.resolve('hello world');
const promise2 = 10;
const promise3 = new Promise((resolve,reject) => {
    setTimeout(resolve, 2000, 'goodbye');
});
const promise4 = fetch('https://jsonplaceholder.typicode.com/users')
.then(res => res.json());

Promise.all([promise1,promise2,promise3,promise4])
.then((values) => console.log(values));
*/