
const bootstrap = require('bootstrap');
const $ = require('jquery');

const loader = require('./page-load.js');
const {getMovies} = require('./api.js');

let movieTitles = document.getElementById("movie-title");

getMovies().then((movies) => {
    loader.showPage();
    console.log('Here are all the movies:');
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




