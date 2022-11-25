//Handle All CLICK EVENTS ON DOM
document.addEventListener('click',(e)=>{
    let movieId = e.target.dataset.movieid;
    //search icon click
    if(e.target.classList.contains("fa-magnifying-glass")){
        searchMovies();
        typeMovieName();
    }
    //if search close icon click
    else if(e.target.classList.contains("fa-xmark")){
        closeSearchBar();
    }
    //if we click on movie image or movie title 
    else if(e.target.classList.contains("movie-image") || e.target.classList.contains("movie-name")){
        openMovieInfoPage(movieId);
    }
    //if we click on heart btn add movie id to favourite movie list
    else if(e.target.classList.contains("fa-heart")){
        addMovieIdToFavMovieList(movieId);
    }
    //if we click on watchlist btn redirect to favourite movie 
    else if(e.target.classList.contains("fav-movies")){
        redirectToFavMoviesPage();
    }
});


//url const here
const BASE_URL = "https://www.omdbapi.com/";
const API_KEY = "cb18c2cb";



var searchIcon = document.getElementById('search-icon');
var searchBoxInput = document.getElementById('search');
var searchBoxCloseBtn = document.getElementById('searc-close-btn');
//when search icon click show search bar 
function searchMovies(){
    searchBoxInput.style.top = "0px";
    searchBoxCloseBtn.style.display = "inline-block";
    searchIcon.style.display = "none";
}
function closeSearchBar(){
    searchIcon.style.display = "inline-block";
    searchBoxInput.style.top = "-60px";
    searchBoxCloseBtn.style.display = "none";
}


//Searching Section
//whenver you type something in search box, movies with closest match will fetch from omdb api
function typeMovieName(){
    searchBoxInput.addEventListener('input', (e) => {
        getMoviesByTitleSearch((e.target.value).trim());
    });
}


async function getMoviesByTitleSearch(movieTitle) {
    try {
        const url = BASE_URL + '?s=' + movieTitle + '&apikey=' + API_KEY;
        const response = await fetch(url);
        const data = await response.json();
        console.log(data);
       
        showMoviesOnDOM(data.Search);
    }
    catch (error) {
        console.log(`Error while fetching movies ${error}`);
    }

}
//for showing movies on our home page we need to append our result to 
//movie list. 

var MOVIE_LIST = document.getElementById('movies-list');

function showMoviesOnDOM(matchedMovies) {
    MOVIE_LIST.innerHTML = '';
    
    matchedMovies.forEach(movie => {
        const movie_element = document.createElement('div');
        movie_element.classList.add('movie');
        movie_element.innerHTML = `
        <div class = "movie-left">
            <img src="${movie.Poster}" class = "movie-image" alt="movie-img" data-movieid = "${movie.imdbID}">
            <div class="movie-info">
                <h4 data-movieid = "${movie.imdbID}" class = "movie-name">${movie.Title}</h4>
                <p>${movie.Year}</p>
            </div>
        </div>

        <div class = "favourite">
            <i class="fa-solid fa-heart" data-movieid = "${movie.imdbID}" ></i>
        </div>
        `;

        movie_element.id = movie.imdbID;
        MOVIE_LIST.appendChild(movie_element);
    
        
    });
}





//when any search result click this function will open movie info page
async function openMovieInfoPage(movieid){
    console.log("hi movie clicked");
    try{
       let movie = await getMoviebyId(movieid);
       //using session storage and passing data to movie page
       sessionStorage.setItem('movie-info',JSON.stringify(movie));
       window.location.href = "movie_page.html";
    }catch(error){
        console.log(`Error while opening movie info page  ${error}`)
    }

    
}
//get movie  by id. To get full data about one specific movie
async function getMoviebyId(movieid){
    try{
        const url = BASE_URL + '?i=' + movieid + '&apikey=' + API_KEY;
        const response = await fetch(url);
        const data = await response.json();
        return data;
    }catch(error){
        console.log(`Error while getting movie by id ${error}`)
    }    
}

//logic for adding favourite movies to favourite list
var fav_movies_id_list = JSON.parse(localStorage.getItem('movie-ids-list'));
//when heart button click
function addMovieIdToFavMovieList(movieId){
     try{
        console.log("movie id added  " + movieId);
        //if not already in favourite list then add
        if(!fav_movies_id_list.includes(movieId)){
            fav_movies_id_list.push(movieId);
        }
     }catch(error){
        console.log(`Error while adding movie id to favourite list ${error}`)
     }
}

//when watchlist button will click redirect to favourite movies list
async function redirectToFavMoviesPage(){
    try{
        
        localStorage.setItem('movie-ids-list',JSON.stringify(fav_movies_id_list));
    
        window.location.href = "fav_movies.html";
    }catch(error){
        console.log(`Error while redirecting to favourite movies page ${error}`)
    }
   
}


