const sectionElement = document.getElementById('postBox');

fetch(' http://localhost:3000/posts')
    .then(response => response.json())
    .then(data => {
        data.forEach(data => {
            console.log(data)
            sectionElement.innerHTML += `
            <div class="col card p-0" data-bs-toggle="modal" data-bs-target="#modal${data.id}">
                <img src="http://c.files.bbci.co.uk/653B/production/_95151952_mediaitem95151800.jpg" class="card-img-top img-fluid"
                    alt="...">
                <div class="card-body">
                    <p class="card-title fw-bold">${data.title}</p>
                </div>
            </div>
            <div class="modal fade" id="modal${data.id}" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div class="modal-dialog modal-dialog-centered modal-dialog-scrollable">
                    <div class="modal-content">
                        <div class="modal-header">
                        <h1 class="modal-title fs-5" id="exampleModalLabel">${data.title}</h1>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div class="modal-body">
                            <p>${data.body}</p>
                            <hr>
                            <h4>user</h4>
                            <p>name123</p>
                            <p>mail@mail.com</p>
                        </div>
                        <div class="modal-footer dp-flex flex-column">
                            <h4>Comments</h4>
                        <button type="button" class="btn btn-primary">Show comments</button>
                        </div>
                    </div>
                </div>
            </div>`;
        });
    })