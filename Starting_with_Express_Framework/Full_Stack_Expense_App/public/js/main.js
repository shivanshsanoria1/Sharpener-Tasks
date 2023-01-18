const PORT = '3000';
let ID = 'null';
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
    axios.post('http://localhost:' + PORT + '/expenses/delete-expense/' + expenseId)
    .then((res) => {
        expenseList.removeChild(li);
        updateBalanceDOM(res.data.amount, '-');
    })
    .catch((err) => {
        showError('Error: Could not Delete Expense :(');
    });
}

function editExpense(li){
    const expenseId = li.id;
    axios.get('http://localhost:' + PORT + '/expenses/edit-expense/' + expenseId)
    .then((res) => {
        amountInput.value = res.data.amount;
        descriptionInput.value = res.data.description;
        categoryInput.value = res.data.category;
        expenseList.removeChild(li);
        updateBalanceDOM(res.data.amount, '-');
        //update the ID to the id of the item to be updated
        ID = expenseId;
    })
    .catch((err) => {
        showError('Error: Could not get Expense details :(');
    });
}

function showExpenseInDOM(expense){
    const li = document.createElement('li');
    li.className = 'list-group-item'
    li.id = expense.id;
    li.innerText = `${expense.amount} : ${expense.description} : ${expense.category}`;

    const delBtn = document.createElement('button');
    delBtn.className = 'btn btn-outline-danger mx-1 py-1';
    delBtn.innerText = 'Delete';
    delBtn.addEventListener('click', (e) => {
        deleteExpense(li);
    });

    const editBtn = document.createElement('button');
    editBtn.className = 'btn btn-outline-success mx-1 py-1';
    editBtn.innerText = 'Edit';
    editBtn.addEventListener('click', (e) => {
        editExpense(li);
    });

    li.appendChild(editBtn);
    li.appendChild(delBtn);
    expenseList.appendChild(li);
}

function showAllExpensesInDOM(){
    axios.get('http://localhost:' + PORT + '/expenses/get-expenses')
    .then((res) => {
        const expenses = res.data;
        expenseList.innerHTML = '';
        expenses.forEach((expense) => {
            showExpenseInDOM(expense);
        });
        calculateBalanceDOM(expenses);
    })
    .catch((err) => {
        showError('Error: Could not Fetch Expenses :(');
    });
}

function addExpense(ID){
    const expense = {
        id: ID,
        amount: amountInput.value,
        description: descriptionInput.value,
        category: categoryInput.value
    };
    axios.post('http://localhost:' + PORT + '/expenses/add-expense' + `/${ID}`, expense)
    .then((res) => {
        showExpenseInDOM(res.data);
        updateBalanceDOM(res.data.amount, '+');
        amountInput.value = '';
        descriptionInput.value = '';
        categoryInput.selectedIndex = 0;
        //restore the ID
        ID='null';
    })
    .catch((err) => {
        showError('Error: Could not add Expense :(');
        //restore the ID
        ID='null';
    });
}

function showError(msg){
    errMsg.innerHTML = `<h4>${msg}</h4>`;
    setTimeout(() => errMsg.innerHTML = '', 3000);
}

form.addEventListener('submit', (e) => {
    e.preventDefault();
    addExpense(ID);
});

window.addEventListener('DOMContentLoaded', showAllExpensesInDOM);
