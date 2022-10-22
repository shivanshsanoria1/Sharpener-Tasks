let form = document.getElementById('my-form');
let userList = document.getElementById('users'); //ul

//Form submit event
form.addEventListener('submit',storeUserDetails);

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
    li.className = 'item';
    //append textnode with the value of userName and userEmail to li
    li.appendChild(document.createTextNode(userDetails.name + ' ' + userDetails.email));
    
    //create edit button
    let editBtn = document.createElement('button');
    editBtn.style.borderColor='green';
    //append textnode to edit button
    editBtn.appendChild(document.createTextNode('Edit'));
    //append edit button to li
    li.appendChild(editBtn);

    //create delete button
    let deleteBtn = document.createElement('button');
    deleteBtn.style.borderColor='red';
    //append textnode to delete button
    deleteBtn.appendChild(document.createTextNode('Delete'));
    //append delete button to li
    li.appendChild(deleteBtn);

    //append li to ul
    userList.appendChild(li);
}
