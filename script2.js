var title = document.querySelector(".search-input").val;
var star = document.querySelector('.star-input').val;
var genre = document.querySelector("#genre").children("option:selected").val();
var decade =doc.querySelector("#decade").children("option:selected").val();



function getdata () 
    var movierQueryURL = "http://www.omdbapi.com/?i=" + "" +"apikey=&9a83a00b";
    
    fetch(movieQueryURL)
      
      .then(res => {
        if (!res.ok) {
          throw res.json();
        }
        return res.json();
      })
      .then(data => {   
  
  })



// interactivity
// 2 API's
// use modals - no alerts
// local storage

var search = function (event) { // add an event listener to the search
  event.preventDefault();

  var searchChoice = searchInput.value;

  localStorage.setItem *searchInput*

  fetchWatchModeMovie(searchChoice);
  whyThisMovie(searchChoice);

}

async function fetchWatchModeMovie(movie) {
  var apikey = '123456789'
  var watchmodelink = 'abcdefghijk'
  var response = await fetch(watchmodelink)
  var data = await.response.json()
  console.log(data)

}

function whyThisMovie() {
  *generate modal w/ check boxes*
  var genre, actors, director

  if (genre == true) {
    genre = 1
  } else {
    genre = 0
  }

  if (actors == true) {
    actors = 1
  } else {
    actors = 0
  }

  if (director == true) {
    director = 1
  } else {
    director = 0
  }

  chosenArray = [genre, actors, director]

}

// function streamingServices() {
//   add h element - "what streaming services do you have?"
//   add check boxes
//   **similar to whyThisMovie function
// }

// create a function that translates the user's search into a variable that can be put through the next function (watchmode API)
// save information to local storage and generate a button
// What do you like about this movie? - Check boxes - genre, actors, plot, director
// what streaming services do you have? 
        // each check box is recorded as true - should return results that match at least 50% of the user's criteria
              // pull movies from OMDB that match said results (5)
              // user makes a choice, then data is pull from watchmode to give the user information on streaming sources
              // local storage - previous search and saved movie choice


// movie title
// check what you like about the movie
// 