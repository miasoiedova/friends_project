const apiPosts = 'https://gorest.co.in/public/v2/posts';
const apiComments = 'https://gorest.co.in/public/v2/comments';
const divOnePost = document.querySelector('.one-post');
const divComment = document.querySelector('.comments');

function getPostId () {
    const urlPostId = window.location.search;
    const urlParamPost = new URLSearchParams(urlPostId);
    return urlParamPost.get('id');
}

const selectedPostId = getPostId();

async function LoadComments() {
    divComment.innerHTML = '';
    const allComments = await fetch(`${apiComments}?post_id=${selectedPostId}`);
    const loadedComments = await allComments.json();

    if(loadedComments.length === 0) {
        const errorComments = document.createElement('p');
        errorComments.textContent = 'Коментарі відсутні';
        errorComments.classList.add('error-comm')
        divComment.appendChild(errorComments);
    } else {
        loadedComments.forEach((comment) => {
            const oneComment = document.createElement('div');
            oneComment.classList.add('one-comm')

            const nameComment = document.createElement('p');
            nameComment.textContent = comment.name;
            nameComment.classList.add('name-comm')

            const commentText = document.createElement('p');
            commentText.textContent = comment.body;
            commentText.classList.add('text-comm')

            oneComment.appendChild(nameComment);
            oneComment.appendChild(commentText);
            divComment.appendChild(oneComment);
    });
}
}

async function loadOnePost (postId) {
    const onePostFetch = await fetch(`${apiPosts}/${postId}`)
    const loadedOnePost = await onePostFetch.json()

    getOnePost(loadedOnePost, loadedOnePost.userId);
}

if (location.pathname === '/onePost.html') {
    const postId = new URLSearchParams(location.search).get('id');
    loadOnePost(postId);
}

function getOnePost (onePost, userId) {
    const titleOnePost = document.createElement('h1');
    titleOnePost.textContent = onePost.title;

    const textOnePost = document.createElement('p');
    textOnePost.textContent = onePost.body;

    const divBottom  = document.createElement('div');
    divBottom.classList.add('bottom');

    const returnLink = document.createElement('a');
    returnLink.textContent = ('Назад'); 
    returnLink.setAttribute('href', `posts.html?userId=${userId}`);

    const buttonComments = document.createElement('button');
    buttonComments.textContent = 'Коментарі';
    buttonComments.addEventListener('click', () => {
        LoadComments();
    })

    divBottom.appendChild(buttonComments);
    divBottom.appendChild(returnLink);

    divOnePost.appendChild(titleOnePost);
    divOnePost.appendChild(textOnePost);
    divOnePost.appendChild(divBottom)
}

