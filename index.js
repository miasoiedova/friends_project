const divUsers = document.querySelector('.users');
const apiUsers = 'https://gorest.co.in/public/v2/users';

// let selectedUserId = null;

async function loadUsers () {
    const allUsers = await fetch(apiUsers)
    const loadedUser = await allUsers.json()

    if(loadedUser.length === 0) {
        const errorMessageUsers = document.createElement('div');
        errorMessageUsers.textContent = 'Користувачі незнайдені';
        errorMessageUsers.classList.add('error-users')
        divUsers.appendChild(errorMessageUsers);
    }
    else {
    loadedUser.forEach((user) => {
        const userLink = document.createElement('a');
        userLink.textContent = user.name;
        userLink.setAttribute('href', `posts.html?user_id=${user.id}`);
        // userLink.addEventListener('click', () => {
        //     // event.preventDefault();
        //     selectedUserId = user.id;
        // });
        divUsers.appendChild(userLink);
        });
    }
}

loadUsers();

