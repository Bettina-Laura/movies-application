
const bootstrap = require('bootstrap');
const $ = require('jquery');

const loader = require('./page-load.js');
const {getMovies} = require('./api.js')
// let id = document.getElementById('movieID');
/*const rating = document.getElementById('rateForm');*/
let id;

let movieTitles = document.getElementById("movie-title");

function updatePage() {
    getMovies().then((movies) => {
        loader.showPage();
        console.log('Movies displaying on HTML');
        movieTitles.innerHTML = ('');
        movies.forEach(({title, rating, id}) => {
            movieTitles.innerHTML +=
                `
            <div id="movieDisplay">
             ${id}. ${title} - Rating: ${rating} <button id="del-btn-${id}" type="button" class="btn-danger col-1">X</button>
             </div>
            `;
            // movieTitles.innerHTML +=
            //     `
            //     <button id="deleteButton-${id}" class="btn-primary col-2">Delete</button>
            //     `
        });

        $('.btn-danger').click((e) => {
            let id = event.currentTarget.id.split('-');
            removeMovie(id[2]);
            $('' + id[2]).hide();
        });

        // $("#deleteButton").click(() => {
        //     // e.target.value;
        //     removeMovie();
        // })
    })
        .catch((error) => {
            alert('Oh no! Something went wrong.\nCheck the console for details.');
            console.log(error);
        });
}

//-----------_--_-_-__-Allow users to add new movies

$("#movieButton").click((e) => {
    e.preventDefault();
    const newestMovie = {title: $('#newMovie').val(), rating: $('#rateForm').val()};
    const url = '/api/movies/';
    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(newestMovie),
    };
    fetch(url, options)
        .then( () => updatePage())
        .catch((error) => {
            alert('Oh no! Something went wrong.\nCheck the console for details.');
            console.log(error);

        });
});

//=================================Allow users to EDIT a movie

$("#editButton").click((e) => {
    e.preventDefault();
    const changeMovie = {title: $('#editMovie').val(), rating: $('#editForm').val(), id: $('#movieID').val()};
    const url = '/api/movies/' + $('#movieID').val();
    const options = {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(changeMovie),
    };
    fetch(url, options)
        .then(updatePage);
});

//====+==+========+=+=============+=+==+==DELETE A MOVIE

function removeMovie(id) {
         const options = {
             method: 'DELETE',
};
    fetch(`/api/movies/${id}`, options)
        .then(response => response.json())
        .catch(error => console.log(error))

}
//
// delMovies: (id) => {
//     options.method = "DELETE";
//     return fetch(`/api/movies/${id}`, options)
//         .then(response => response.json())
//         .catch(error => console.log(error))
// },

updatePage();


