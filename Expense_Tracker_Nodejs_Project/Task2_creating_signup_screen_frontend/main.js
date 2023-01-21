const PORT = '3000';

const form = document.getElementById('user-form');
const usernameInput = document.getElementById('username');
const emailInput = document.getElementById('email');
const passwordInput = document.getElementById('password');
const errorMsg = document.getElementById('err-msg');

function addUser(e){
    e.preventDefault();
    const user = {
        username: usernameInput.value,
        email: emailInput.value,
        password: passwordInput.value
    };
    axios.post('http://localhost:' + PORT + '/user/signup', user)
    .then((res) => {
        console.log('signup successful');
        console.log(res);
        usernameInput.value = '';
        emailInput.value = '';
        passwordInput.value = '';
    })
    .catch((err) => showErrorInDOM('Could not add user'));
}

function showErrorInDOM(msg){
    errorMsg.innerText = msg;
    setTimeout(() => errorMsg.innerText = '', 3000);
}

form.addEventListener('submit', addUser);