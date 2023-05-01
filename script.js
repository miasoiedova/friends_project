const divUsers = document.querySelector('.users');
const apiUsers = 'https://gorest.co.in/public/v2/users';
const apiPosts = 'https://gorest.co.in/public/v2/posts';

const postsDiv = document.getElementById('posts');

let selectedUserId = null;

async function loadUsers () {
    const allUsers = await fetch(apiUsers)
    const loadedUser = await allUsers.json()

    loadedUser.forEach((user) => {
        const userLink = document.createElement('a');
        userLink.textContent = user.name;
        // userLink.setAttribute('href', `${apiPosts}?user_id=${user.id}`);
        userLink.addEventListener('click', () => {
            // event.preventDefault();
            selectedUserId = user.id;
            loadPosts(user.id);
        });
        divUsers.appendChild(userLink);
        });
}

async function loadPosts (userId) {
    const allPosts = await fetch(`${apiPosts}?user_id=${userId}`)
    const loadedPost = await allPosts.json()

    postsDiv.innerHTML = '';

    loadedPost.forEach((post) => {
        const userPostDiv = document.createElement('div');
        postsDiv.appendChild(userPostDiv);

        const titlePost = document.createElement('a');
        titlePost.setAttribute('href', `https://gorest.co.in/public/v2/posts/${post.id}`);
        titlePost.textContent = post.title;

        userPostDiv.appendChild(titlePost)

        if(post.body) {
            const descPost = document.createElement('p');
            descPost.textContent = post.body;
        
            userPostDiv.appendChild(descPost);
         };
        }) 
    };

loadUsers();
