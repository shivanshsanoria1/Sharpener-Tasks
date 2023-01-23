const PORT = '3000';

const form = document.getElementById('user-form');
const usernameInput = document.getElementById('username');
const emailInput = document.getElementById('email');
const passwordInput = document.getElementById('password');
const errorMsg = document.getElementById('err-msg');
const successMsg = document.getElementById('success-msg');

function addUser(e){
    e.preventDefault();
    const user = {
        username: usernameInput.value,
        email: emailInput.value,
        password: passwordInput.value
    };
    axios.post('http://localhost:' + PORT + '/user/signup', user)
    .then((res) => {
        const msg = res.data.msg;
        showSuccessInDOM(msg);
        usernameInput.value = '';
        emailInput.value = '';
        passwordInput.value = '';
    })
    .catch((err) => {
        const msg = err.response.data.msg ? err.response.data.msg : 'Could not add user';
        showErrorInDOM(msg);
    });
}

function showSuccessInDOM(msg){
    successMsg.innerText = msg;
    setTimeout(() => successMsg.innerText = '', 3000);
}

function showErrorInDOM(msg){
    errorMsg.innerText = msg;
    setTimeout(() => errorMsg.innerText = '', 3000);
}

form.addEventListener('submit', addUser);