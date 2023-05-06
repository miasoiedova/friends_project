const apiPosts = 'https://gorest.co.in/public/v2/posts';
const postsDiv = document.querySelector('.posts');

function getPosts (post) {
    const userPostDiv = document.createElement('div');
    userPostDiv.classList.add('user-post');
    postsDiv.appendChild(userPostDiv);

    const titlePost = document.createElement('a');
    titlePost.setAttribute('href', `onePost.html?id=${post.id}`);
    titlePost.textContent = post.title;

    userPostDiv.appendChild(titlePost)

    if(post.body) {
        const descPost = document.createElement('p');
        const text = post.body.length > 100 ? post.body.substring(0, 100) + '...' : post.body;
        descPost.textContent = text;
        
        userPostDiv.appendChild(descPost);
    };
}

function getUserId () {
    const urlUserId = window.location.search;
    const urlParam = new URLSearchParams(urlUserId);
    return urlParam.get('user_id')
}

const selectedUserId = getUserId();

async function loadPosts () {
    const allPosts = await fetch(`${apiPosts}?user_id=${selectedUserId}`)
    const loadedPost = await allPosts.json();

    if (loadedPost.length === 0) {
        const errorDivUsers = document.createElement('div');
        errorDivUsers.classList.add('error-post');

        const errorMessage = document.createElement('p');
        errorMessage.textContent = 'У даного користувача відсутні пости';

        const returnLink = document.createElement('a');
        returnLink.textContent = 'Назад';
        returnLink.setAttribute('href', 'index.html');

        errorDivUsers.appendChild(errorMessage);
        errorDivUsers.appendChild(returnLink);

        postsDiv.appendChild(errorDivUsers);
    } else {
    loadedPost.forEach((post) => {
        getPosts(post);
        }) 
    }
    };

loadPosts();

