const PORT = '3000';

const userList = document.getElementById('user-list');
const form = document.getElementById('user-form');
const usernameInput = document.getElementById('username');
const emailInput = document.getElementById('email');
const phoneNumberInput = document.getElementById('phoneNumber');
const errMsg = document.getElementById('err-msg');

function showUserInDOM(user){
    const li = document.createElement('li');
    li.id = user.id;
    li.innerText = `${user.username} : ${user.email} : ${user.phoneNumber}`;

    const delBtn = document.createElement('button');
    delBtn.className = 'btn-delete';
    delBtn.innerText = 'Delete';
    delBtn.addEventListener('click', (e) => {
        axios.post('http://localhost:' + PORT + '/users/delete-user/' + li.id)
        .then((res) => {
            console.log(res);
            //remove user from DOM
            userList.removeChild(li);
        })
        .catch((err) => {
            showError('Error: Could not Delete User :(');
        });
    });
    li.appendChild(delBtn);
    userList.appendChild(li);
}

function addUser(e){
    e.preventDefault();
    const user = {
        username: usernameInput.value,
        email: emailInput.value,
        phoneNumber: phoneNumberInput.value
    };
    axios.post('http://localhost:' + PORT + '/users/add-user', user)
    .then((res) => {
        console.log(res);
        showUserInDOM(user);
    })
    .catch((err) => {
        showError('Error: Could not add user :(');
    });
}

function showAllUsers(){
    axios.get('http://localhost:' + PORT + '/users/get-users')
    .then((users) => {
        userList.innerHTML = '';
        users.data.forEach((user) => {
            showUserInDOM(user);
        });
    })
    .catch((err) => {
        showError('Error: Could not Fetch Users :(');
    });
}

function showError(msg){
    errMsg.innerHTML = `<h4>${msg}</h4>`;
    setTimeout(() => errMsg.innerHTML = '', 3000);
}

form.addEventListener('submit', addUser);

window.addEventListener('DOMContentLoaded', (e) => {
    showAllUsers();
});