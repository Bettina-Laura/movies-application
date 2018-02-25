
const bootstrap = require('bootstrap');
const $ = require('jquery');

const loader = require('./page-load.js');
const {getMovies} = require('./api.js')
// const title = document.getElementById('newMovie');
/*const rating = document.getElementById('rateForm');*/

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
             ${id}. ${title} - Rating: ${rating} 
             </div>
            `;
        })
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

updatePage();







// movieButton.addEventListener('click', () => {
//     event.preventDefault();
//     addMovie();
// });

// $('#addForm').on(movieButton, (e) => {
//     const id = (movies.id.val());
//     console.log($('#new-movie').val());
//     e.preventDefault();
//     addMovie();
// });