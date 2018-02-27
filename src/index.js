
const bootstrap = require('bootstrap');
const $ = require('jquery');

const loader = require('./page-load.js');
const {getMovies} = require('./api.js')


let movieTitles = document.getElementById("movie-title");

function updatePage() {
    getMovies().then((movies) => {
        loader.showPage();
        console.log('Movies displaying on HTML');
        movieTitles.innerHTML = ("");


        movies.forEach(({title, rating, id, genre}) => {
            movieTitles.innerHTML +=
                `
          <tr> 
            <td>${id}</td> 
            <td>${title}</td> 
            <td>${genre}</td>
            <td>${rating}</td> 
            <td><button id="del-btn-${id}" type="button" class="btn-danger">Delete</button></td>
          </tr>
            `;
        });


        $('.btn-danger').click((e) => {
            e.preventDefault();
            let id = event.currentTarget.id.split('-');
            removeMovie(id[2]);
            $('#movieTitle' + id[2]).hide();
            updatePage();
        });

    })
        .catch((error) => {
            alert('Oh no! Something went wrong.');
            console.log(error);
        });
}

//-----------_--_-_-__-Allow users to add new movies

$("#movieButton").click((e) => {
    e.preventDefault();
    const newestMovie = {title: $('#newMovie').val(), rating: $('#rateForm').val(), genre: $('#newGenre').val()};
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
            alert('Oh no! Something went wrong.');
            console.log(error);

        });
});

//=================================Allow users to EDIT a movie

$("#editButton").click((e) => {
    e.preventDefault();
    const changeMovie = {title: $('#editMovie').val(), rating: $('#editForm').val(), id: $('#movieID').val(), genre: $('#editGenre').val()};
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


updatePage();

//SEARCH MOVIES


function searchMovie() {
// Declare variables
    var input, filter, table, tr, td, i;
    input = document.getElementById("myInput");
    filter = input.value.toUpperCase();
    table = document.getElementById("movieDisplay");
    tr = table.getElementsByTagName("tr");
// var searchCategory = (radio button input value)
//     var userChoice = searchCategory ? 2 : 1;
// Loop through all table rows, and hide those who don't match the search query
    for (i = 0; i < tr.length; i++) {
        td = tr[i].getElementsByTagName("td")[1];
        console.log("td.innerHTML", td);
        if (td) {
            if (td.innerHTML.toUpperCase().indexOf(filter) > -1) {
                tr[i].style.display = "";
            } else {
                tr[i].style.display = "none";
            }
        }
    }


}
$('#myInput').on('keyup', searchMovie);