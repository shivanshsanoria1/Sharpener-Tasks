let form = document.getElementById('my-form');
let userList = document.getElementById('users'); //ul

//Form submit event
form.addEventListener('submit',storeUserDetails);
//Delete user event
userList.addEventListener('click',removeUser);
//Edit user event
userList.addEventListener('click',editUser);

//display all the users
for(let i=0; i<localStorage.length; i++){
    displayUser(localStorage.key(i));
}

//store user details
function storeUserDetails(e){
    e.preventDefault();
    //get userName and userEmail inputs and store them in an user object
    let userObj ={
        name: document.getElementById('name').value, //userName
        email: document.getElementById('email').value //userEmail
    };
    //use the email of user as the key
    const key = userObj.email;
    //entered email already exists in local storage
    if(localStorage.getItem(key) !== null){
        //get the li to be deleted
        let li = document.getElementById(key);
        //remove the li from the ul
        userList.removeChild(li);
        //remove the old user with the same email from local storage
        localStorage.removeItem(key);
    }
    //store the serialized string in local storage and 
    localStorage.setItem(key, JSON.stringify(userObj));
    //display the current user details
    displayUser(key);
}

//display user stored in local storage based on the key passed
function displayUser(key){
    let userDetails = JSON.parse(localStorage.getItem(key));

    //create new list item
    let li = document.createElement('li');
    li.id = key;
    li.className = 'item';
    //append textnode with the value of userName and userEmail to li
    li.appendChild(document.createTextNode(userDetails.name + ' ' + userDetails.email));
    
    //create edit button
    let editBtn = document.createElement('button');
    editBtn.className = 'edit';
    editBtn.style.borderColor='green';
    editBtn.style.float='right';
    //append textnode to edit button
    editBtn.appendChild(document.createTextNode('Edit'));
    //append edit button to li
    li.appendChild(editBtn);

    //create delete button
    let deleteBtn = document.createElement('button');
    deleteBtn.className = 'delete';
    deleteBtn.style.borderColor='red';
    deleteBtn.style.float='right';
    //append textnode to delete button
    deleteBtn.appendChild(document.createTextNode('Delete'));
    //append delete button to li
    li.appendChild(deleteBtn);

    //append li to ul
    userList.appendChild(li);
}

//remove the user from both local storage and screen
function removeUser(e){
    if(e.target.classList.contains('delete')){
        let li = e.target.parentElement;
        //remove the user from the displayed list
        userList.removeChild(li);
        //remove the user from local storage
        localStorage.removeItem(li.id);
    }
}

//edit user
function editUser(e){
    if(e.target.classList.contains('edit')){
        let li = e.target.parentElement;
        //get the user object of the user to edit
        let userObj = JSON.parse(localStorage.getItem(li.id));
        //remove the old user from the displayed list
        userList.removeChild(li);
        //remove the old user from local storage
        localStorage.removeItem(li.id);
        //add userName in the 'Name' text input area
        document.getElementById('name').value = userObj.name;
        //add userEmail in the 'Email' text input area
        document.getElementById('email').value = userObj.email;
    }
}