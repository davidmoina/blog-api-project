window.addEventListener('DOMContentLoaded', initPage);

const sectionElement = document.getElementById('postBox');
const commentButton = document.getElementById("commentsButton");
const commentsDiv = document.getElementById("commentsDiv");
const showButton = document.getElementById("showButton");
const selectDate = document.querySelector('#date');
const btnComments = document.getElementById("commentsButton");
const collapseDiv = document.getElementById("collapseDiv");

let imagesArr = [];

function initPage() {
    let funnyCatLoaders = ['https://4.bp.blogspot.com/-zw3S34spthE/Xl7y9Z6r0VI/AAAAAAAm6SE/AfGKzsplCEc1dorHrO586jvS8jd7hTF0QCLcBGAsYHQ/s1600/AW4165808_06.gif', 'https://orig11.deviantart.net/dcab/f/2011/158/1/6/nyan_cat_by_valcreon-d3iapfh.gif', 'https://media0.giphy.com/media/IbyhhY66Z8ovFt0Cv3/giphy.gif', 'https://media.tenor.com/ioO0m0kOufEAAAAi/capoo-bugcat.gif', 'https://media.tenor.com/fjdydcAjFo8AAAAj/capoo-blue.gif']
    let randImage = Math.floor(Math.random() * 5);

    fetch('http://localhost:3000/posts')
        .then(response => response.json())
        .then(data => {
            sectionElement.innerHTML = '';
            sectionElement.innerHTML += `<img class="loader" width="200px" height="200px" src='${funnyCatLoaders[randImage]}'>`;
            setTimeout(() => {
                sectionElement.innerHTML = '';
                document.querySelector('#btnShowMore').classList.toggle('visually-hidden');
            }, 2199)

            if (imagesArr.length !== data.length) {
                for (i = 0; i <= data[data.length - 1].id; i++) {
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

                    if (newArr.length == data.length) {
                        showButton.innerText = "No more posts";
                    } else {
                        counter += 10;
                        data.slice(counter - 10, counter).forEach(item => {
                            newArr.push(item);
                        })
                        createMain(newArr);
                    }
                })
            }, 2200)
        })
}

function createMain(data) {
    sectionElement.innerHTML = '';

    info(data);
}

function createCards(id, title) {
    sectionElement.innerHTML += `
        <div class="card-div col-3 card p-0" data-bs-toggle="modal" data-bs-target="#modalPost" id="ID${id}">
            <img loading="lazy" src="${imagesArr[id]}" class="card-img-top img-fluid">
            <div class="card-body text-center">
                <p class="card-title fw-bold">${title}</p>
            </div>
        </div>`;
}

function info(data) {
    data.forEach(data => {
        const id = data.id;
        const title = data.title;

        createCards(id, title);
    });
}

const gridPost = document.querySelector('#postBox');
gridPost.addEventListener('click', showModal);

let withoutID;

function showModal(event) {
    if (event.target.parentElement.matches('.card')) {
        let parentDiv = String(event.target.parentNode.id);
        withoutID = parentDiv.replace('ID', '');
    } else if (event.target.parentElement.matches('.card-body')) {
        let parentDiv = String(event.target.parentNode.parentElement.id)
        withoutID = parentDiv.replace('ID', '');
    };

    fetch(`http://localhost:3000/posts/${withoutID}`)
        .then(response => response.json())
        .then(data => changeModal(data))
};

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

    obtainComments(withoutID);
};

function changeModalUser(data) {
    const modalUsername = document.querySelector('#modalUsername');
    const modalName = document.querySelector('#modalName');
    const modalEmail = document.querySelector('#modalEmail');
    const clearBtn = document.querySelector('#clearThisPost');
    const changeBtn = document.querySelector('#changeThisPost');
    const userId = document.querySelector('#userId');
    const imgModal = document.getElementById("imgModal");

    modalEmail.innerText = data.email;
    modalName.innerText = data.name;
    modalUsername.innerText = data.username;
    clearBtn.setAttribute("deleteid", withoutID);
    changeBtn.setAttribute("changeid", withoutID);
    userId.value = data.id;
    imgModal.innerHTML = `
    <img loading="lazy" src="${imagesArr[withoutID]}" class="card-img-top img-fluid rounded align-middle" style='height: 200px;
    object-fit: cover; repeat: no-repeat;'>
    `
};

function obtainComments(id) {
    fetch(` http://localhost:3000/posts/${id}/comments`)
        .then(response => response.json())
        .then(data => {
            commentsDiv.innerHTML = "";
            data.forEach(item => {
                commentsDiv.innerHTML += `
                    <div class="dp-flex column">
                        <span class="text-dark">${item.name} - ${item.email}</span>
                        <p class="mt-1 mb-1">${item.body}</p>
                    </div>
                `
            })
        });
};


