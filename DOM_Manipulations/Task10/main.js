let form = document.getElementById('my-form');

//Form submit event
form.addEventListener('submit',storeUserDetails);

//store user details
function storeUserDetails(e){
    e.preventDefault();
    //get userName and userEmail inputs
    let userName = document.getElementById('name').value;
    let userEmail = document.getElementById('email').value;
    //store the current userName and userEmail in local storage
    localStorage.setItem('name',userName);
    localStorage.setItem('email',userEmail);
    //check if the current userName and userEmail already exists
    let userExists = false;
    for(let i=0; i<usersDetail.length; i++){
        if(usersDetail[i][0] == userName && usersDetail[i][1] == userEmail){
            userExists = true;
        }
    }
    //if the current userName and userEmail does not exist
    //push the current userName and userEmail into the usersDetail array
    if(userExists==false){
        usersDetail.push([userName,userEmail]);
    }
    //store the usersDetail array in local storage
    localStorage.setItem('usersDetail',usersDetail);
}
//array to store userName and userEmail of all users
const usersDetail = [];

