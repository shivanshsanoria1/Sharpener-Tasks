async function showAllUsers(){
    const users = await axios.get('http://localhost:3000/users');
    const userList = document.getElementById('user-list');
    userList.innerHTML = '';
    users.data.forEach((user) => {
        const li = document.createElement('li');
        li.id = user.id;
        li.innerText = `${user.username} : ${user.email} : ${user.phoneNumber}`;
        
        const form = document.createElement('form');
        form.action = '/delete-user/' + li.id;
        form.method = 'post';

        const delBtn = document.createElement('button');
        delBtn.className = 'btn-delete';
        delBtn.innerText = 'Delete';
        delBtn.type = 'submit';
        
        form.appendChild(delBtn);
        li.appendChild(form);
        userList.appendChild(li);
    });
}

window.addEventListener('DOMContentLoaded', (e) => {
    showAllUsers();
});