//crudcrud.com endpoint (which can be modified)
const crudcrudEndpoint = "b1d2124f6c564e4f93dafe7a314f2eaa";

//grab from elements from the html file
const form = document.getElementById('my-form');
const expenseList = document.getElementById('expenses'); //ul
const amountInput = document.getElementById('amount');
const descriptionInput = document.getElementById('description');
const categoryInput = document.getElementById('category');
const errorMessage = document.querySelector('.err-msg');

function storeExpenseDetails(e){
    //prevent default
    e.preventDefault();
    if(amountInput.value === '' || descriptionInput.value.trim() === ''){
        //show error if any field is empty
        displayError('Error: Please enter all fields!');
    }else{
        //generate an object for expense details
        const expenseObj = {
            amount: amountInput.value,
            description: descriptionInput.value.trim(),
            category: categoryInput.value
        };
        //add the expense object to crudcrud.com
        axios
        .post("https://crudcrud.com/api/" + crudcrudEndpoint + "/ExpenseData", expenseObj)
        .then((response) => {
            //received expense object from crudcrud.com
            const expenseObj = response.data;
            //display the expense in DOM
            displayExpense(expenseObj);
            //clear the input fields if the expense object is successfully submitted to crudcrud.com
            amountInput.value = '';
            descriptionInput.value = '';
            categoryInput.selectedIndex = 0;
        })
        .catch((err) => {
            displayError('Error: Could not add the expense details :(');
        })
    }
}

function deleteExpenseDetails(e){
    //find the li whose delete button is clicked
    const li = e.target.parentElement;
    axios
    .delete("https://crudcrud.com/api/" + crudcrudEndpoint + "/ExpenseData/" + li.id)
    .then((response) => {
        //remove the expense from the displayed list
        expenseList.removeChild(li);
    })
    .catch((err) => {
        displayError('Error: Could not delete the expense details :(');
    });
}

function editExpenseDetails(e){
    //find the li whose edit button is clicked
    const li = e.target.parentElement;
    //the GET response of the current expense details
    axios
    .get("https://crudcrud.com/api/" + crudcrudEndpoint + "/ExpenseData/" + li.id)
    .then((response) => {
        //get the expense object
        const expenseObj = response.data;
        //fill the expense object details to be edited in the input fields
        amountInput.value = expenseObj.amount;
        descriptionInput.value = expenseObj.description;
        categoryInput.value = expenseObj.category;
        //remove the expense from displayed list
        expenseList.removeChild(li);
        //remove the storeExpenseDetails event on form submit
        form.removeEventListener('submit', storeExpenseDetails);
        //add the editExpenseDetailsHelper event on form submit
        form.addEventListener('submit', editExpenseDetailsHelper);
    })
    .catch((err) => {
        displayError('Error: Could not get the expense details :(');
    });

    async function editExpenseDetailsHelper(e){
        //prevent default
        e.preventDefault();
        if(amountInput.value === '' || descriptionInput.value === ''){
            //show error if any field is empty
            displayError('Error: Please enter all fields!');
        }else{
            //updated expense object
            const updatedExpenseObj = {
                amount: amountInput.value,
                description: descriptionInput.value.trim(),
                category: categoryInput.value
            };
            try{
                //wait for the PUT response of the updated expense details
                await axios
                .put("https://crudcrud.com/api/" + crudcrudEndpoint + "/ExpenseData/" + li.id, updatedExpenseObj);
                //wait for the GET response of the updated expense details
                const response = await axios
                .get("https://crudcrud.com/api/" + crudcrudEndpoint + "/ExpenseData/" + li.id);
                //display the updated expense data
                displayExpense(response.data);
                //clear the input fields if the expense object is successfully updated at crudcrud.com
                amountInput.value = '';
                descriptionInput.value = '';
                categoryInput.selectedIndex = 0;
            }catch(err){
                displayError('Error: something went wrong :(');
                //reload the webpage after 3000ms
                setTimeout(() => { location.reload(); }, 3000);
            }
            //remove the editExpenseDetailsHelper event on form submit
            form.removeEventListener('submit', editExpenseDetailsHelper);
            //add the storeExpenseDetails event on form submit
            form.addEventListener('submit', storeExpenseDetails);
        }
    }
}

//display all the expenses details stored in crudcrud.com when the webpage is reloaded
function displayAllExpenses(){
    axios
    .get("https://crudcrud.com/api/" + crudcrudEndpoint + "/ExpenseData")
    .then((response) => {
        //display all the expense objects present in response.data array
        response.data.forEach((expenseObj) => {
            displayExpense(expenseObj);
        });
    })
    .catch((err) => {
        displayError('Error: Could not get the expense details :(');
    });
}

//display the expense details (stored in crudcrud.com) in DOM based on the expense object passed
function displayExpense(expenseObj){
    //create new list item
    const li = document.createElement('li');
    //set the class of li 
    li.className = 'list-group-item';
    //the id of li must be the same as _id (generated by crudcrud.com) of expenseObj
    li.id = expenseObj._id;
    //append textnode with the value of amount, description, category of expense
    li.appendChild(document.createTextNode(expenseObj.amount + ' : ' + expenseObj.category + ' : ' + expenseObj.description));
    
    //create edit button
    const editBtn = document.createElement('button');
    //set the class of edit button
    editBtn.className = 'btn btn-outline-success mx-1';
    //append textnode to edit button
    editBtn.appendChild(document.createTextNode('Edit'));
    //add event listener on edit button
    editBtn.addEventListener('click', editExpenseDetails);
    //append edit button to li
    li.appendChild(editBtn);

    //create delete button
    const deleteBtn = document.createElement('button');
    //set the class of delete button
    deleteBtn.className = 'btn btn-outline-danger mx-1';
    //append textnode to delete button
    deleteBtn.appendChild(document.createTextNode('Delete'));
    //add event listener on delete button
    deleteBtn.addEventListener('click', deleteExpenseDetails);
    //append delete button to li
    li.appendChild(deleteBtn);

    //append li to ul
    expenseList.appendChild(li);
}

//displays error message in DOM
function displayError(msg){
    //show the error message in DOM
    errorMessage.innerHTML = `<h4>${msg}</h4>`;
    //error message disappears after 3000ms
    setTimeout(() => { errorMessage.innerHTML = ''; }, 3000);
}

/* EVENT LISTENERS*/

//display all expenses event
window.addEventListener('DOMContentLoaded', displayAllExpenses);
//form submit event
form.addEventListener('submit', storeExpenseDetails);
