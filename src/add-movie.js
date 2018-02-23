
"use strict";

function renderMovie(movie) {
    var html = '<div class="films">';
    html += '<h2>' + movie.title + '</h2>';
    html += '<p>' + movie.rating + '</p>';
    html += '</div>';

    return html;
}

function renderMovies(movies) {
    var html = '';
    for(var i = 0; i < movies.length; i++) {
        html += renderMovie(movies[i]);
    }
    return html;
}

//____--this function= displays coffees that match search terms-__-

function updateMovies(e) {
    e.preventDefault(); // don't submit the form, we just want to update the data
    interactiveKey();
}




function interactiveKey() {
    var form = document.getElementById("input").value.toLowerCase();
    // var selector = notUsed.value;
    var sortMovies = [];
    movies.forEach(function(movie) {
        var lowerMovie = movie.name;
        lowerMovie = lowerMovie.toLowerCase();
        if (lowerMovie.indexOf(form) !== -1 && selector === "all") {
            sortMovies.push(movie);
        }
        else {
            if (movie.rating === selector && form === "") {
                sortMovies.push(movie);
            }
            else if (lowerMovie.indexOf(form) !== -1 && movie.rating === selector) {
                sortMovies.push(movie);
            }
        }

    });

    movieList.innerHTML = renderMovies(sortMovies);

}

function addNewMovie(e) {
    e.preventDefault();
    var newMovie = document.getElementById("new-movie").value;
    var rateForm = document.getElementById("rate-Form").value;
    var ratingOne = movies.findIndex(function(movie, index) { return movie.rating == "1"});
    var ratingTwo = movies.findIndex(function(movie, index) { return movie.rating == "2"});
    var ratingThree = movies.findIndex(function(movie, index) { return movie.rating == "3"});
    var ratingFour = movies.findIndex(function(movie, index) { return movie.rating == "4"});
    var ratingFive = movies.length + 1;
    var movie = {
        id: "",
        title: newMovie,
        rating: rateForm
    };
    if (newMovie != "") {
        if (rateForm == "1") {
            movie.id = ratingOne;
            movies.splice(ratingOne, 0, movie);
            for(var i = ratingOne; i < movies.length; i++){
                movies[i].id += 1;
            }
        }
        else if (rateForm == "2") {
            movie.id = ratingTwo;
            movies.splice(ratingTwo, 0, movie);
            for(var i = ratingTwo; i < movies.length; i++){
                movies[i].id += 1;
            }
        } else if (rateForm == "3") {
            movie.id = ratingThree;
            movies.splice(ratingThree, 0, movie);
            for(var i = ratingThree; i < movies.length; i++){
                movies[i].id += 1;
            }
        } else if (rateForm == "4") {
            movie.id = ratingFour;
            movies.splice(ratingFour, 0, movie);
            for (var i = ratingFour; i < movies.length; i++) {
                movies[i].id += 1;
            }
        } else if (rateForm == "5") {
            movie.id = ratingFive;
            movies.push(movie);
        }


        interactiveKey();
        document.getElementById("new-movie").value = "";
    }
}



var movieList = document.querySelector('#movies');
var submitButton = document.querySelector('#submit');
// var notUsed = document.querySelector('#notUsed');
var newMovie = document.querySelector('#make-movie');


//this is what makes the movies show up
movieList.innerHTML = renderMovies(movies);

submitButton.addEventListener('click', updateMovies);
newMovie.addEventListener('click', addNewMovie);


module.exports = {addNewMovie, renderMovie, renderMovies, updateMovies, interactiveKey};










