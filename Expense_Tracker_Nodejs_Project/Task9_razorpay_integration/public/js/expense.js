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
    li.className = 'list-group-item'
    li.id = expense.id;
    li.innerText = `${expense.amount} : ${expense.description} : ${expense.category}`;

    const delBtn = document.createElement('button');
    delBtn.className = 'btn btn-outline-danger mx-2 py-1';
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
        expenseList.innerHTML = '';
        expenses.forEach((expense) => {
            showExpenseInDOM(expense);
        });
        calculateBalanceDOM(expenses);
        showUserInfoInDOM();
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
        var options = {
            "key": res.data.key_id, //enter the key id generated from the dashboard
            "order_id": res.data.order.id, //for one time payment
            "handler": async function (res) {
                await axios.post('http://localhost:' + PORT + '/purchase/update-transaction-status', {
                    order_id: options.order_id,
                    payment_id: res.razorpay_payment_id
                }, {headers: {'Authorization': token}});

                alert('You are now a Premium user!');
                showUserInfoInDOM();
            }
        };
        const rzp1 = new Razorpay(options);
        rzp1.open();
        e.preventDefault();

        rzp1.on('payment.failed', function(res) {
            alert('Something went wrong!');
        });
    })
    .catch((err) => console.log(err));
}

function showUserInfoInDOM(){
    axios.get('http://localhost:' + PORT + '/user/user-info', {headers: {'Authorization': token}})
    .then((res) => {
        const username = res.data.username;
        const isPremiumUser = res.data.isPremiumUser;
        showUsername.innerText = username;
        if(isPremiumUser){
            premium.innerText = 'Premium User';
        }else{
            const premiumBtn = document.createElement('button');
            premiumBtn.className = 'btn btn-outline-warning';
            premiumBtn.innerText = 'Premium';
            premiumBtn.addEventListener('click', razorpay);
            premium.appendChild(premiumBtn);
        }
    })
    .catch((err) => showErrorInDOM('Could not get user info!'));
}

form.addEventListener('submit', addExpense);
premium.addEventListener('click', razorpay);

window.addEventListener('DOMContentLoaded', showAllExpensesInDOM);
