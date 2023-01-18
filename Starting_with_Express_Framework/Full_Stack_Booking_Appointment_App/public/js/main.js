const PORT = '3000';

const userList = document.getElementById('user-list');
const form = document.getElementById('user-form');
const usernameInput = document.getElementById('username');
const emailInput = document.getElementById('email');
const phoneNumberInput = document.getElementById('phoneNumber');
const errMsg = document.getElementById('err-msg');

function deleteUser(li){
    const userId = li.id;
    axios.post('http://localhost:' + PORT + '/users/delete-user/' + userId)
    .then((res) => {
        userList.removeChild(li);
    })
    .catch((err) => {
        showErrorInDOM('Error: Could not Delete User :(');
    });
}

function showUserInDOM(user){
    const li = document.createElement('li');
    li.id = user.id;
    li.innerText = `${user.username} : ${user.email} : ${user.phoneNumber}`;

    const delBtn = document.createElement('button');
    delBtn.className = 'btn-delete';
    delBtn.innerText = 'Delete';
    delBtn.addEventListener('click', (e) => {
        deleteUser(li);
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
        const user = res.data;
        showUserInDOM(user);
        usernameInput.value = '';
        emailInput.value = '';
        phoneNumberInput.value = '';
    })
    .catch((err) => {
        showErrorInDOM('Error: Could not add user :(');
    });
}

function showAllUsersInDOM(){
    axios.get('http://localhost:' + PORT + '/users/get-users')
    .then((res) => {
        const users = res.data;
        userList.innerHTML = '';
        users.forEach((user) => {
            showUserInDOM(user);
        });
    })
    .catch((err) => {
        showErrorInDOM('Error: Could not Fetch Users :(');
    });
}

function showErrorInDOM(msg){
    errMsg.innerHTML = `<h4>${msg}</h4>`;
    setTimeout(() => errMsg.innerHTML = '', 3000);
}

form.addEventListener('submit', addUser);

window.addEventListener('DOMContentLoaded', showAllUsersInDOM);
