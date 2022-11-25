# imdbMiniClone
Tech Stack Html, Pure Css, Javasript
Mobile First Approach. All Page are Responsive

Total Page : 3

1.Home Page

-On this page you can search movies by title and all closest match will be fetch by using OMDB Api and will be shown on DOM
-On matched movies there is one heart btn which can be used to add particular movies to favourite list
-Clicking on matched movie image or movie title you will be redirected to Movie Info Page
-At bottom there is watchlist button which will redirect you to Favourite Movie Page

2.Movie Info Page
-When you will click on movie image or title movie id will be store in session storage and will be passed to Movie Info Page
-Using movie id we will fecth complete details of movie using OMDB api and details will be shown on DOM

3.Favourite Movie Page

-Clicking on heart button movie id will store in a  list and that list will be store using local storage to make data persistent so
 when browser is refresh or closed data will not be lost
-Using this ids, fetching movies and then show on Dom
-Clicking on delete button that particular movie id will be delete form the movie ids list and will update local storage and then reload page 
 to show updated list on DOM
