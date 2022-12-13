const changeBtn = document.querySelector('#saveChanges');
// changeBtn.addEventListener('click', )

function changePost() {
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
}

const deleteBtn = document.querySelector('#clearThisPost');
deleteBtn.addEventListener('click', deletePost);

function deletePost(event) {
    let idPost = event.target.getAttribute('deleteid');
    fetch(`http://localhost:3000/posts/${idPost}`, {
        method: 'DELETE'
    })
    window.location.reload();

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
    window.location.reload();
}