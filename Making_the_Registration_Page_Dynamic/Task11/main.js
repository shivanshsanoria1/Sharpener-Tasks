const form = document.getElementById('my-form');
const userList = document.getElementById('users'); //ul

//display all the users stored in crudcrud.com when webpage is reloaded
function init(){
    axios
    .get("https://crudcrud.com/api/600ce0b3d94145daa9f831310469a028/appointmentData")
    .then((response) => {
        response.data.forEach((userObj) => {
            displayUser(userObj);
        });
    })
    .catch((err) => {
        console.log(err);
        displayError();
    });
}

//store user details
function storeUserDetails(e){
    e.preventDefault();
    //get userName, userEmail, user phone number inputs and store them in an user object
    let userObj ={
        name: document.getElementById('name').value, //userName
        email: document.getElementById('email').value, //userEmail
        phoneNumber: document.getElementById('phoneNumber').value //user phone number
    };
    //add the user to crudcrud.com
    axios
    .post("https://crudcrud.com/api/600ce0b3d94145daa9f831310469a028/appointmentData",userObj)
    .then((response) => {
        displayUser(response.data);
    })
    .catch((err) => {
        console.log(err);
        displayError();
    });
}

//display user stored in crudcrud.com based on the user object passed
function displayUser(userObj){
    //create new list item
    const li = document.createElement('li');
    li.className = 'item';
    //append textnode with the value of userName, userEmail, user phone number to li
    li.appendChild(document.createTextNode(userObj.name + ' : ' + userObj.email + ' : ' + userObj.phoneNumber));
    
    //create edit button
    const editBtn = document.createElement('button');
    editBtn.className = 'edit';
    //append textnode to edit button
    editBtn.appendChild(document.createTextNode('Edit'));
    //append edit button to li
    li.appendChild(editBtn);

    //create delete button
    const deleteBtn = document.createElement('button');
    deleteBtn.className = 'delete';
    //append textnode to delete button
    deleteBtn.appendChild(document.createTextNode('Delete'));
    //append delete button to li
    li.appendChild(deleteBtn);

    //append li to ul
    userList.appendChild(li);
}

//displays error message in DOM
function displayError(){
    //create new list item
    const li = document.createElement('li');
    li.className = 'error';
    //append textnode showing error to li
    li.appendChild(document.createTextNode('Error: something went wrong :('));

    //append li to ul
    userList.appendChild(li);
}

//Form submit event
form.addEventListener('submit',storeUserDetails);

//start the app
init();
