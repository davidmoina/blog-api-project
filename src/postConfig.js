let idPost = 1;
let newTitle = 'hola';
let newBody;

const changeBtn = document.querySelector('#saveChanges');
changeBtn.addEventListener('click', changeSuccess)

function changeSuccess(){
    console.log('hola')
}

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

function deletePost(){
    fetch(`http://localhost:3000/posts/${idPost}`, {
        method: 'DELETE'})
}

function createPost() {
    fetch('http://localhost:3000/posts', {
        method: 'POST',
        body: JSON.stringify({
            userId: 1,
            title: "Primer post del ano",
            body: 'minecraft'

        }),
        headers: {
            'Content-type': 'application/json; charset=UTF-8',
        }
    })
}