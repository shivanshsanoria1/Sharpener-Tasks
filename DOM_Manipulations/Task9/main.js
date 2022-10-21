let form = document.getElementById('addForm');
let itemList = document.getElementById('items');
let filter = document.getElementById('filter');

//Form submit event
form.addEventListener('submit',addItem);
//Delete event
itemList.addEventListener('click',removeItem);
//Filter event
filter.addEventListener('keyup',filterItems);

//Add item
function addItem(e){
    e.preventDefault();

    //get input value
    let newItem = document.getElementById('item').value;
    //get input description value
    let newDescription = document.getElementById('description').value;
    //create new list item
    let li = document.createElement('li');
    li.className = 'list-group-item';
    //append textnode with the value of newItem and newDescription to li
    li.appendChild(document.createTextNode(newItem + ' ' + newDescription));

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

//Remove item
function removeItem(e){
    if(e.target.classList.contains('delete')){
        if(confirm('Are you sure?')){
            let li = e.target.parentElement; //finds the li of the button clicked
            itemList.removeChild(li); //remove the li from the ul
        }
    }
}

//Filter Items
function filterItems(e){
    //convert text to lowercase
    let text = e.target.value.toLowerCase();
    //get the li's
    let items = itemList.getElementsByTagName('li');
    //convert HTML collection of li's into an array
    Array.from(items).forEach(function(item){
        let itemName = item.firstChild.textContent;
        if(itemName.toLowerCase().indexOf(text) != -1){ //'text' found in array
            item.style.display = 'block'; //show the matching items
        }
        else{
            item.style.display = 'none'; //don't show the non-matching items
        }
    });
}

