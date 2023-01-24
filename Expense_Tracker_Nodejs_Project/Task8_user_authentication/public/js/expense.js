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

form.addEventListener('submit', addExpense);

window.addEventListener('DOMContentLoaded', showAllExpensesInDOM);
