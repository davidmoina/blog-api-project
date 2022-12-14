const sectionElement = document.getElementById('postBox');
const commentButton = document.getElementById("commentsButton");
const commentsDiv = document.getElementById("commentsDiv");
const showButton = document.getElementById("showButton");
const selectDate = document.querySelector('#date');

let imagesArr = [];

function initPage() {
    fetch('http://localhost:3000/posts')
        .then(response => response.json())
        .then(data => {
            console.log(data)
            sectionElement.innerHTML = '';
            sectionElement.innerHTML += `<img src='https://media2.giphy.com/media/3oEjI6SIIHBdRxXI40/giphy.gif'>`;
            setTimeout(() => {
                sectionElement.innerHTML = '';
            }, 1999)

            if (imagesArr.length !== data.length) {
                for (i = 0; i <= data.length + 1; i++) {
                    fetch('https://aws.random.cat/meow')
                        .then(response => response.json())
                        .then(data => imagesArr.push(data.file))
                }
            }

            let counter = 10;

            selectDate.addEventListener('change', () => {
                dataType = data.reverse();
                counter = 10;
                newArr = dataType.slice(0, counter)
                createMain(newArr);
            })

            setTimeout(() => {
                if (selectDate.value === 'last') {
                    dataType = data.reverse();
                } else if (selectDate.value === 'old') {
                    dataType = data;
                }

                newArr = dataType.slice(0, counter)

                createMain(newArr)

                showButton.addEventListener("click", () => {
                    if (counter === data.length) {
                        showButton.innerText = "No more posts";
                    } else {
                        counter += 10;
                        data.slice(counter - 10, counter).forEach(item => {
                            newArr.push(item);
                        })
                        createMain(newArr)
                        console.log(newArr)
                    }
                })
            }, 2000)
        })
}

function createMain(data) {
    sectionElement.innerHTML = '';

    function info(data) {
        data.forEach(data => {
            const id = data.id;
            const title = data.title;

            createCards(id, title);
        });
    }

    function createCards(id, title) {
        sectionElement.innerHTML += `
    <div class="col card p-0" data-bs-toggle="modal" data-bs-target="#modalPost" id="ID${id}">
        <img loading="lazy" src="${imagesArr[id]}" class="card-img-top img-fluid" style='max-height: 165px;
            object-fit: cover;'>
        <div class="card-body">
            <p class="card-title fw-bold">${title}</p>
            <p>${id}</p>
        </div>
    </div>`;
    }

    info(data);
}

const gridPost = document.querySelector('.row');
gridPost.addEventListener('click', showModal);

function showModal(event) {
    let withoutID;
    if (event.target.parentElement.matches('.card')) {
        let parentDiv = String(event.target.parentNode.id);
        withoutID = parentDiv.replace('ID', '');
    } else if (event.target.parentElement.matches('.card-body')) {
        let parentDiv = String(event.target.parentNode.parentElement.id)
        withoutID = parentDiv.replace('ID', '');
    }

    fetch(`http://localhost:3000/posts/${withoutID}`)
        .then(response => response.json())
        .then(data => changeModal(data))

    function changeModal(data) {
        const modalTitle = document.querySelector('#modalTitle');
        const modalBody = document.querySelector('#modalBody');

        const changeModalTitle = document.querySelector('#changeModalTitle');
        const changeBodyTitle = document.querySelector('#changeModalBody');

        modalTitle.innerText = data.title;
        modalBody.innerText = data.body;

        changeModalTitle.value = data.title;
        changeBodyTitle.value = data.body;

        fetch(`http://localhost:3000/users/${data.userId}`)
            .then(response => response.json())
            .then(data => changeModalUser(data))

        function changeModalUser(data) {
            const modalUsername = document.querySelector('#modalUsername');
            const modalName = document.querySelector('#modalName');
            const modalEmail = document.querySelector('#modalEmail');
            const clearBtn = document.querySelector('#clearThisPost');
            const changeBtn = document.querySelector('#changeThisPost');
            const userId = document.querySelector('#userId');

            modalEmail.innerText = data.email;
            modalName.innerText = data.name;
            modalUsername.innerText = data.username;
            clearBtn.setAttribute("deleteid", withoutID);
            changeBtn.setAttribute("changeid", withoutID);
            userId.value = data.id;
        }

        obtainComments(withoutID);
    }
}

function obtainComments(id) {
    fetch(` http://localhost:3000/posts/${id}/comments`)
        .then(response => response.json())
        .then(data => {
            commentsDiv.innerHTML = "";
            data.forEach(item => {
                commentsDiv.innerHTML += `
                    <div class="dp-flex column">
                        <span class="text-light bg-dark p-1">${item.name} - ${item.email}</span>
                        <p class="mt-1 mb-1">${item.body}</p>
                    </div>
                `
            })
        });
}