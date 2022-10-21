let form = document.getElementById('addForm');
let itemList = document.getElementById('items');

//Form submit event
form.addEventListener('submit',addItem);
//Delete event
itemList.addEventListener('click',removeItem);

//Add item
function addItem(e){
    e.preventDefault();

    //get input value
    let newItem = document.getElementById('item').value;
    //create new list item
    let li = document.createElement('li');
    li.className = 'list-group-item';
    //append textnode with the value of newItem to li
    li.appendChild(document.createTextNode(newItem));
    
    //create delete button
    let deleteBtn = document.createElement('button');
    deleteBtn.className = 'btn btn-danger btn-sm float-right delete';
    //append textnode to delete button
    deleteBtn.appendChild(document.createTextNode('X'));
    //append delete button to li
    li.appendChild(deleteBtn);

    //create edit button
    let editBtn = document.createElement('button');
    editBtn.className = 'btn btn-primary float-right';
    //append textnode to edit button
    editBtn.appendChild(document.createTextNode('Edit'));
    //append edit button to li
    li.appendChild(editBtn);

    //append li to ul
    itemList.appendChild(li);
}

function removeItem(e){
    if(e.target.classList.contains('delete')){
        if(confirm('Are you sure?')){
            let li = e.target.parentElement; //finds the li of the button clicked
            itemList.removeChild(li); //remove the li from the ul
        }
    }
}