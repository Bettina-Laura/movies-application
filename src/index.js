
const bootstrap = require('bootstrap');
const $ = require('jquery');

const loader = require('./page-load.js');
const  addMoviesHere = require('./add-movie.js');
const {getMovies} = require('./api.js');

let movieTitles = document.getElementById("movie-title");

getMovies().then((movies) => {
    addMoviesHere.addNewMovie();
    addMoviesHere.renderMovie();
    addMoviesHere.renderMovies();
    addMoviesHere.updateMovies();
    addMoviesHere.interactiveKey();

    loader.showPage();
    console.log('Here are all the movies:');
    console.log(addNewMovie);

    movies.forEach(({title, rating}) => {
        // console.log(`id#${id} - ${title} - rating: ${rating}`);
        movieTitles.innerHTML +=
            `
            <div>
             ${title} - rating: ${rating} 
             </div>
            `;
    })
})
    .catch((error) => {
    alert('Oh no! Something went wrong.\nCheck the console for details.');
    console.log(error);
});
// {addNewMovie, renderMovie, renderMovies, updateMovies, interactiveKey}



