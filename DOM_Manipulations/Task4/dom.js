let items = document.getElementsByClassName('list-group-item');

items[2].style.backgroundColor = 'green'; //3rd element in the list have green background color

for(let i=0; i<items.length; i++)
{
    items[i].style.fontWeight = 'bold'; //all the elements in the list have bold color font
}