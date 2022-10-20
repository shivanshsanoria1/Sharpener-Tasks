let items = document.getElementsByClassName('list-group-item');
let li = document.getElementsByTagName('li');

for(let i=0; i<li.length; i++) //newly added <li> is also affected
{
    li[i].style.fontWeight = 'bold';
}

for(let i=0; i<items.length; i++) //newly added <li> is not affected as it does not have the same class name
{
    li[i].style.color = 'green';
}