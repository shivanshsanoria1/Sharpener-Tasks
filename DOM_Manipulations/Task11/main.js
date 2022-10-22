let form = document.getElementById('my-form');

//Form submit event
form.addEventListener('submit',storeUserDetails);

//store user details
function storeUserDetails(e){
    e.preventDefault();
    //get userName and userEmail inputs and store them in an user object
    let userObj ={
        name: document.getElementById('name').value, //userName
        email: document.getElementById('email').value //userEmail
    };
    //Convert a JavaScript object into a string
    let userObj_serialized = JSON.stringify(userObj);
    //store the serialized string in local storage
    localStorage.setItem('userObj',userObj_serialized);
}

// NOTE: Local Storage only stores strings, so we have to convert object into string