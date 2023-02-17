const PORT = '3000';
const token = localStorage.getItem('token');
let balance = 0;

const expenseList = document.getElementById('expense-list');
const form = document.getElementById('expense-form');
const amountInput = document.getElementById('amount');
const descriptionInput = document.getElementById('description');
const categoryInput = document.getElementById('category');
const errMsg = document.getElementById('err-msg');
const balanceDisplay = document.getElementById('balance');
const showUsername = document.getElementById('username');
const premium = document.getElementById('premium');
const leaderboard = document.getElementById('leaderboard');
const leaderboardList = document.getElementById('leaderboard-list');
const expenseListHeading = document.getElementById('expense-list-heading');
const leaderboardHeading = document.getElementById('leaderboard-heading');
const logout = document.getElementById('logout');

function calculateBalanceDOM(expenses){
    balance = expenses.reduce((total, expense) => total + expense.amount, 0);
    balanceDisplay.innerText = balance;
}

//mode = '+' means add the amount, '-' means substract the amount
function updateBalanceDOM(amount, mode){ 
    if(mode === '+'){
        balance += parseInt(amount);
    }else if(mode === '-'){
        balance -= parseInt(amount);
    }
    balanceDisplay.innerText = balance;
}

function deleteExpense(li){
    const expenseId = li.id;
    axios.post('http://localhost:' + PORT + '/expense/delete-expense/' + expenseId, {}, {headers: {'Authorization': token}})
    .then((res) => {
        expenseList.removeChild(li);
        updateBalanceDOM(res.data.amount, '-');
    })
    .catch((err) => {
        showErrorInDOM('Error: Could not Delete Expense :(');
    });
}

function showExpenseInDOM(expense){
    const li = document.createElement('li');
    if(expense.amount >= 0){
        li.className = 'list-group-item list-group-item-success';
    }else{
        li.className = 'list-group-item list-group-item-danger';
    }
    li.id = expense.id;
    li.innerText = `${expense.amount} : ${expense.description} : ${expense.category}`;

    const delBtn = document.createElement('button');
    delBtn.className = 'btn btn-outline-danger mx-2 py-1 float-end';
    delBtn.innerText = 'Delete';
    delBtn.addEventListener('click', (e) => {
        deleteExpense(li);
    });

    li.appendChild(delBtn);
    expenseList.appendChild(li);
}

function showAllExpensesInDOM(){
    axios.get('http://localhost:' + PORT + '/expense/get-expenses', {headers: {'Authorization': token}})
    .then((res) => {
        const expenses = res.data;
        if(expenses.length > 0){
            expenseListHeading.innerText = 'Expense List';
        }
        expenseList.innerHTML = '';
        expenses.forEach((expense) => {
            showExpenseInDOM(expense);
        });
        calculateBalanceDOM(expenses);
    })
    .catch((err) => {
        showErrorInDOM('Error: Could not Fetch Expenses :(');
    });
}

function addExpense(e){
    e.preventDefault();
    const expense = {
        amount: amountInput.value,
        description: descriptionInput.value,
        category: categoryInput.value
    };
    axios.post('http://localhost:' + PORT + '/expense/add-expense', expense, {headers: {'Authorization': token}})
    .then((res) => {
        showExpenseInDOM(res.data);
        updateBalanceDOM(res.data.amount, '+');
        amountInput.value = '';
        descriptionInput.value = '';
        categoryInput.selectedIndex = 0;
    })
    .catch((err) => {
        showErrorInDOM('Error: Could not add Expense :(');
    });
}

function showErrorInDOM(msg){
    errMsg.innerHTML = `<h4>${msg}</h4>`;
    setTimeout(() => errMsg.innerHTML = '', 3000);
}

function razorpay(e){
    axios.get('http://localhost:' + PORT + '/purchase/premium-membership', {headers: {'Authorization': token}})
    .then((res) => {
        const options = {
            "key": res.data.key_id, //enter the key id generated from the dashboard
            "order_id": res.data.order.id, //for one time payment
            "handler": async function () {
                try{
                    const res1 = await axios.post('http://localhost:' + PORT + '/purchase/update-transaction-status', {
                        status: 'success',
                        order_id: options.order_id,
                        payment_id: res.razorpay_payment_id
                    }, {headers: {'Authorization': token}});
                    alert('Congrats! You are now a Premium user!');
                    localStorage.setItem('token', res1.data.token);
                    showUserInfoInDOM();
                }catch(err){
                    console.log(err);
                }
            }
        };

        const rzp1 = new Razorpay(options);
        rzp1.on('payment.failed', async (err) => {
            try{
                await axios.post('http://localhost:' + PORT + '/purchase/update-transaction-status', {
                    status: 'failed',
                    order_id: err.error.metadata.order_id
                }, {headers: {'Authorization': token}});
                alert('Payment Failed!');
            }catch(err){
                console.log(err);
            }
        });

        rzp1.open();
        e.preventDefault();
    })
    .catch((err) => console.log(err));
}

function parseJwt (token) {
    var base64Url = token.split('.')[1];
    var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    var jsonPayload = decodeURIComponent(window.atob(base64).split('').map(function(c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));
    return JSON.parse(jsonPayload);
}

function logoutUser(){
    localStorage.removeItem('token');
    window.location.href = 'http://localhost:' + PORT + '/user/login';
}

function showUserInfoInDOM(){
    const token = localStorage.getItem('token');
    const decodedToken = parseJwt(token);
    const username = decodedToken.username;
    const isPremiumUser = decodedToken.isPremiumUser;
    showUsername.innerText = username;

    if(isPremiumUser){
        premium.innerText = 'Premium User';

        const leaderboardBtn = document.createElement('button');
        leaderboardBtn.className = 'btn btn-outline-warning';
        leaderboardBtn.innerText = 'Show Leaderboard';
        leaderboardBtn.addEventListener('click', showLeaderboardInDOM);
        leaderboard.innerText = '';
        leaderboard.appendChild(leaderboardBtn);
    }else{
        const premiumBtn = document.createElement('button');
        premiumBtn.className = 'btn btn-outline-warning';
        premiumBtn.innerText = 'Get Premium';
        premiumBtn.addEventListener('click', razorpay);
        premium.innerText = '';
        premium.appendChild(premiumBtn);
    }

    const logoutBtn = document.createElement('button');
    logoutBtn.className = 'btn btn-outline-warning border-0';
    logoutBtn.innerText = 'Logout';
    logoutBtn.addEventListener('click', logoutUser);
    logout.innerText = '';
    logout.appendChild(logoutBtn);
}

function showLeaderInDOM(leader, rank){
    const li = document.createElement('li');
    li.className = 'list-group-item list-group-item-warning';
    li.innerText = `${rank}. Name: ${leader.username} , Balance: ${leader.balance}`;
    leaderboardList.appendChild(li);
}

function showLeaderboardInDOM(){
    axios.get('http://localhost:' + PORT + '/premium/get-leaderboard', {headers: {'Authorization': token}})
    .then((res) => {
        leaderboardHeading.innerText = 'Leaderboard (Top 5)';
        const list = res.data;
        leaderboardList.innerText = '';
        let rank = 1;
        list.forEach((leader) => {
            showLeaderInDOM(leader, rank);
            rank++;
        });
        hideLeaderboardInDOM();
    })
    .catch((err) => showErrorInDOM('Could not fetch leaderboard!'));
}

function hideLeaderboardInDOM(){
    const leaderboardBtn = document.createElement('button');
    leaderboardBtn.className = 'btn btn-outline-warning';
    leaderboardBtn.innerText = 'Hide Leaderboard';
    leaderboardBtn.addEventListener('click', () => {
        leaderboardHeading.innerText = '';
        leaderboardList.innerText = '';
        showUserInfoInDOM();
    });
    leaderboard.innerText = '';
    leaderboard.appendChild(leaderboardBtn);
}

form.addEventListener('submit', addExpense);

window.addEventListener('DOMContentLoaded', () => {
    showAllExpensesInDOM();
    showUserInfoInDOM();
});
