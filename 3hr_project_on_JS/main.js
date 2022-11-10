const form = document.getElementById('my-form');
const expenseList = document.getElementById('expenses'); //ul
const amountInput = document.getElementById('amount');
const descriptionInput = document.getElementById('description');
const categoryInput = document.getElementById('category');
const TotalAmountDisplay = document.getElementById('total');

//displays all transactions from local storage in DOM
function init(){
    for(let i=0; i<localStorage.length; i++){
        addTransactionDOM(localStorage.key(i));
    }
    //display the total amount in DOM
    TotalAmountDisplay.innerText = findTotalAmount();
}

//finds the total amount from local storage
function findTotalAmount(){
    let total = 0;
    for(let i=0; i<localStorage.length; i++){
        const key = localStorage.key(i);
        total += parseInt(JSON.parse(localStorage.getItem(key)).amount);
    }
    return total;
}

//adds transaction 
function addTransaction(e){
    e.preventDefault();
    if(amountInput.value === '' || descriptionInput.value === ''){
        //show alert if any field is empty
        alert('Please enter all fields!');
    }
    else{
        //generate an object for transaction
        const transaction ={
            id: generateID(),
            amount: amountInput.value,
            description: descriptionInput.value,
            category: categoryInput.value,
        };
        //add transaction to local storage
        localStorage.setItem(transaction.id,JSON.stringify(transaction));
        //add transaction to DOM
        addTransactionDOM(transaction.id);
        //display the total amount in DOM
        TotalAmountDisplay.innerText = findTotalAmount();
        //clear the amount input field
        amountInput.value='';
        //clear the description input field
        descriptionInput.value='';
    }
}

//generates a random id
function generateID(){
    return Math.floor(Math.random()*10000000);
}

//adds transaction to DOM based on the key passed
function addTransactionDOM(key){
    //get the transaction object from local storage
    const transaction = JSON.parse(localStorage.getItem(key));

    //create new list item
    const li = document.createElement('li');
    li.id = key;
    li.className = 'item';
    //append textnode with the value of amount, description and category of transaction to li
    li.appendChild(document.createTextNode(transaction.amount + ' : ' + transaction.description + ' : ' + transaction.category));

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
    expenseList.appendChild(li);
}

//remove transaction
function removeTransaction(e){
    if(e.target.classList.contains('delete')){
        const li = e.target.parentElement;
        //remove current transaction from DOM
        expenseList.removeChild(li);
        //remove current transaction from local storage
        localStorage.removeItem(li.id);
        //display the total amount in DOM
        TotalAmountDisplay.innerText = findTotalAmount();
    }
}

//edit transaction
function editTransaction(e){
    if(e.target.classList.contains('edit')){
        const li = e.target.parentElement;
        //remove current transaction from DOM
        expenseList.removeChild(li);
        //get the transaction from local storage
        const transaction = JSON.parse(localStorage.getItem(li.id));
        //remove current transaction from local storage
        localStorage.removeItem(li.id);
        //add the amount to be edited in the amount input field
        amountInput.value = transaction.amount;
        //add the description to be edited in the description input field
        descriptionInput.value = transaction.description;
        //add the category to be edited in the category select menu
        categoryInput.value = transaction.category;
        //display the total amount in DOM
        TotalAmountDisplay.innerText = findTotalAmount();
    }
}

//start the app
init();

//form submit event
form.addEventListener('submit',addTransaction);
//delete transaction
expenseList.addEventListener('click',removeTransaction);
//edit transaction
expenseList.addEventListener('click',editTransaction);