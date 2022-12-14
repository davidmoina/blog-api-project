const changeBtn = document.querySelector('#changeThisPost');
changeBtn.addEventListener('click', changePost)

function changePost(event) {
    let idPost = event.target.getAttribute('changeid');
    let userId = document.querySelector('#userId').value;
    let newTitle = document.querySelector('#changeModalTitle').value;
    let newBody = document.querySelector('#changeModalBody').value;

    let toString = {
        userId: userId,
        title: newTitle,
        body: newBody
    };

    fetch(`http://localhost:3000/posts/${idPost}`, {
        method: 'PUT',
        body: JSON.stringify(toString),
        headers: {
            'Content-type': 'application/json; charset=UTF-8',
        }
    })

    // initPage();
    initPage();
}

const deleteBtn = document.querySelector('#clearThisPost');
deleteBtn.addEventListener('click', deletePost);

function deletePost(event) {
    let idPost = event.target.getAttribute('deleteid');
    fetch(`http://localhost:3000/posts/${idPost}`, {
        method: 'DELETE'
    })
    // initPage();
    initPage();
}

const createBtn = document.querySelector('#createPostBtn');
createBtn.addEventListener('click', createPost)

function createPost() {
    let titleCreate = document.querySelector('#createPostTitle').value;
    let bodyCreate = document.querySelector('#createPostBody').value;

    fetch('http://localhost:3000/posts', {
        method: 'POST',
        body: JSON.stringify({
            userId: 1,
            title: titleCreate,
            body: bodyCreate
        }),
        headers: {
            'Content-type': 'application/json; charset=UTF-8',
        }
    })
    // initPage();
    initPage();
}