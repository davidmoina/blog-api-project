const sectionElement = document.getElementById('postBox');

fetch('http://localhost:3000/posts')
    .then(response => response.json())
    .then(data => info(data))

function info(data){
    data.forEach(data => {
        sectionElement.innerHTML += `
        <div class="col card p-0" data-bs-toggle="modal" data-bs-target="#modalPost" id="ID${data.id}">
            <img src="http://c.files.bbci.co.uk/653B/production/_95151952_mediaitem95151800.jpg" class="card-img-top img-fluid"
                alt="...">
            <div class="card-body">
                <p class="card-title fw-bold">${data.title}</p>
            </div>
        </div>`;
    });
}

const gridPost = document.querySelector('.row');
gridPost.addEventListener('click', showModal);

function showModal(event){
    let withoutID;
    if(event.target.parentElement.matches('.card')){
        let parentDiv = String(event.target.parentNode.id);
        withoutID = parentDiv.replace('ID', '');
    }else if(event.target.parentElement.matches('.card-body')){
        let parentDiv = String(event.target.parentNode.parentElement.id)
        withoutID = parentDiv.replace('ID', '');
    }
  
    fetch(`http://localhost:3000/posts/${withoutID}`)
    .then(response => response.json())
    .then(data => changeModal(data))

    function changeModal(data){
           const modalTitle = document.querySelector('#modalTitle');
           const modalBody = document.querySelector('#modalBody');

           modalTitle.innerText = data.title;
           modalBody.innerText = data.body;

           fetch(`http://localhost:3000/users/${data.userId}`)
           .then(response => response.json())
           .then(data => changeModalUser(data))

           function changeModalUser(data){
            const modalUsername = document.querySelector('#modalUsername');
            const modalName = document.querySelector('#modalName');
            const modalEmail = document.querySelector('#modalEmail');
            const clearBtn = document.querySelector('#clearThisPost');

            modalEmail.innerText = data.email;
            modalName.innerText = data.name;
            modalUsername.innerText = data.username;
            clearBtn.setAttribute("deleteid", withoutID);
           }
    }
}