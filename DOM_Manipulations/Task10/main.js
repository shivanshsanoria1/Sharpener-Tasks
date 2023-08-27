let form = document.getElementById('my-form');

//Form submit event
form.addEventListener('submit',storeUserDetails);

//store user details
function storeUserDetails(e){
    e.preventDefault();
    //get userName and userEmail inputs
    let userName = document.getElementById('name').value;
    let userEmail = document.getElementById('email').value;
    //check if the current userEmail already exists
    let userExists = false;
    for(let i=0; i<localStorage.length; i++){
        if(localStorage.key(i) === userEmail){
            userExists = true;
            break;
        }
    }
    //if the current userEmail does not exist
    //push the current userName and userEmail into the local storage
    if(userExists===false){
        //store the current userName and userEmail in local storage (use email as key and name as value)
        localStorage.setItem(userEmail,userName);
    }
}
