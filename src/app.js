const sectionElement = document.getElementById('postBox');

fetch('http://localhost:3000/posts')
    .then(response => response.json())
    .then(data => {
        data.forEach(data => {
            sectionElement.innerHTML += `<div class="col card p-0">
            <img src="http://c.files.bbci.co.uk/653B/production/_95151952_mediaitem95151800.jpg" class="card-img-top img-fluid"
                alt="...">
            <div class="card-body">
                <p class="card-title fw-bold">${data.title}</p>
            </div>
            </div>`;
        });
    })