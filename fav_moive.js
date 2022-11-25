console.log("Hi in favourite movie page");


const Base_URL = "https://www.omdbapi.com/";
const Api_Key = "cb18c2cb";



var moviesIdsList = JSON.parse(localStorage.getItem('movie-ids-list'));


async function createMovieListByMovieIds() {
    var FAV_MOVIE_LIST = document.getElementById('movies-list');
    FAV_MOVIE_LIST.innerHTML = '';
    var movieList = [];
    try {
        await moviesIdsList.forEach(async id => {
            let movie = await getFavMoviebyId(id);
            console.log(movie);
            showMovieOnDOM(movie);
        });
    } catch (error) {
        console.log(`Error while filling movie list by id ${error}`)
    }

}
createMovieListByMovieIds();

//get movie  by id. To get full data about one specific movie
async function getFavMoviebyId(movieid) {
    try {
        console.log(movieid);
        const url = `https://www.omdbapi.com/?i=${movieid}&apikey=cb18c2cb`;
        const response = await fetch(url);
        const data = await response.json();
        return data;
    } catch (error) {
        console.log(`Error while getting movie by id ${error}`)
    }
}
//get movie list html element
function showMovieOnDOM(movie) {
    var FAV_MOVIE_LIST = document.getElementById('movies-list');
    try {

        console.log("inside  dom");
        let movie_element = document.createElement('div');
        movie_element.classList.add('movie');
        movie_element.innerHTML = `
                    <div class="movie-image">
                        <img src="${movie.Poster}" alt="">
                    </div>
                    <div class="movie-info">
                       <div class = "title-delete-flex">
                           <h2>${movie.Title}</h2>
                          <div class="delete">
                              <i class="fa-solid fa-trash" data-movieid = "${movie.imdbID}"></i>
                          </div>
                       </div>
                        <p>${movie.Year}</p>
    
    
                        <div class="rating">
                            <i class="fa-solid fa-star"></i>
                            <p>${movie.imdbRating} / 10</p>
                        </div>
                        <p>${movie.imdbVotes}</p>
                        <div class="generic">
                            <h4>Genre:</h4>
                            <p>${movie.Genre}</p>
                        </div>
                        <div class="generic">
                            <h4>Director:</h4>
                            <p>${movie.Director}</p>
                        </div>
                        <div class="generic">
                            <h4>Writer:</h4>
                            <p>${movie.Writer}</p>
                        </div>
                        <div class="generic">
                            <h4>Actors : </h4>
                            <p>${movie.Actors}</p>
                        </div>
    
                    </div>
                    `;

        
        FAV_MOVIE_LIST.appendChild(movie_element);
        
    }
    catch (error) {
        console.log("error while show fav movie list to dom ", error)
    }
}


document.addEventListener('click',(e)=>{
    let movieId = e.target.dataset.movieid;
    //delete button click
    if(e.target.classList.contains("fa-trash")){
        deleteMovieIdFromMovieIdList(movieId);
    }
});

function deleteMovieIdFromMovieIdList(id){
    console.log("Hi in delete " + id);
    let idx = moviesIdsList.indexOf(id);
    console.log(idx);
    moviesIdsList.splice(idx,1);
    localStorage.setItem('movie-ids-list',JSON.stringify(moviesIdsList));
    location.reload();
}








/*------------WHYYYYYYY I am not able to store movie in movie List array. it is showing it's length is zero


async function showFavMoviesOnDom(movieList) {
    var FAV_MOVIE_LIST = document.getElementById('movies-list');
    FAV_MOVIE_LIST.innerHTML = '';

    try {
        console.log(movieList);
        console.log(movieList.length);
        movieList.forEach(function (movie) {
            console.log("inside for each to add into dom");
            let movie_element = document.createElement('div');
            movie_element.classList.add('movie');
            movie_element.innerHTML = `
                    <div class="movie-image">
                        <img src="image/mountainClimbing.jpg" alt="">
                    </div>
                    <div class="movie-info">
                        <h2>${movie.Title}</h2>
                        <p>${movie.Year}</p>
    
    
                        <div class="rating">
                            <i class="fa-solid fa-star"></i>
                            <p>${movie.imdbRating} / 10</p>
                        </div>
                        <p>${movie.imdbVotes}</p>
                        <div class="generic">
                            <h4>Genre:</h4>
                            <p>${movie.Genre}</p>
                        </div>
                        <div class="generic">
                            <h4>Director:</h4>
                            <p>${movie.Director}</p>
                        </div>
                        <div class="generic">
                            <h4>Writer:</h4>
                            <p>${movie.Writer}</p>
                        </div>
                        <div class="generic">
                            <h4>Actors : </h4>
                            <p>${movie.Actors}</p>
                        </div>
    
                        <div class="delete">
                            <i class="fa-solid fa-trash"></i>
                        </div>
                    </div>
                    `;

            movie_element.id = movie.imdbId;
            FAV_MOVIE_LIST.appendChild(movie_element);
            console.log("append me")
            console.log(movie_element);
        });

    } catch (error) {
        console.log("error while show fav movie list to dom ", error)
    }

}
*/