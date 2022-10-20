// querySelector
let secondItem = document.querySelector('.list-group-item:nth-child(2)');
secondItem.style.backgroundColor = 'green'; //2nd list item have green background color

let thirdItem = document.querySelector('.list-group-item:nth-child(3)');
thirdItem.style.display = 'none'; //3rd list item invisible

//querySelectorAll
let liItems = document.querySelectorAll('li');
liItems[1].style.color = 'green'; //2nd list item have green font color

let odd = document.querySelectorAll('li:nth-child(odd)');
for(let i=0; i<odd.length; i++)
{
    odd[i].style.backgroundColor = 'green'; //odd items in list have green background color
}