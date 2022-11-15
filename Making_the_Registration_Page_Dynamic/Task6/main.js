const posts = [
    {title:'post 1', body:'this is post 1', createdAt:new Date()},
    {title:'post 2', body:'this is post 2', createdAt:new Date()},
];

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

// Method 1
createPost({title: 'post 3' , body:'this is post 3'}) //create post 3
.then(() => {
    getPosts();
    deletePost() //delete post 3
    .then(() => {
        getPosts();
        deletePost() //delete post 2
        .then(() => {
            getPosts();
            deletePost() //delete post 1
            .then(() => {
                getPosts();
                const promise4 = createPost({title: 'post 4' , body:'this is post 4'}) //create post 4
                .then(() => {
                    getPosts();
                    deletePost() // delete post 4
                    .then(() => {
                        getPosts();
                        deletePost() //cannot delete as posts[] is empty
                        .then(() =>{
                            getPosts();
                        })
                        .catch((err) => { console.log(err); });
                    })
                    .catch((err) => { console.log(err); });
                })
            })
            .catch((err) => { console.log(err); });
        })
        .catch((err) => { console.log(err); });
    })
    .catch((err) => { console.log(err); });
})
.catch((err) => { console.log(err); });

// Method 2
/*
createPost({title: 'post 3' , body:'this is post 3'}) //create post 3
.then(() => {getPosts(); return deletePost();}) //delete post 3
.catch((err) => { console.log(err); })
.then(() => {getPosts(); return deletePost();}) //delete post 2
.catch((err) => { console.log(err); })
.then(() => {getPosts(); return deletePost();}) //delete post 1
.catch((err) => { console.log(err); })
.then(() => {
    getPosts(); 
    const promise4 = createPost({title: 'post 4' , body:'this is post 4'}) //create post 4
    .then(() => {getPosts(); return deletePost();}) //delete post 4
    .catch((err) => { console.log(err); });
    return promise4;
    })
.then(() => {getPosts(); return deletePost();}) //cannot delete as posts[] is empty
.catch((err) => { console.log(err); });
*/