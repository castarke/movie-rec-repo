// var title = $('.title-input');
var searchBtn = document.querySelector("#search-button");
var actorValue = document.querySelector("#actor-search");
var previousActorArray =
  JSON.parse(localStorage.getItem("Previous Searched Actors")) || [];
var movieArray = [];
var idArray = [];
var castArray = [];
var m = 0;
var c = 0;
var nameid;
var searchHistory = document.getElementById("search-history-item");
var streamingChoices = [];
//need to create a function push into streamingUser//
var streamingUser = [];
var movieIDList = [];
var searchResults = document.querySelector(".card-group");
var apiKey = "aQuZhRdpDVzGYCVwZOSivjjSGFx4brJ7X290vbXK";
var streamingPossibility = [203, 157, 26, 372, 387, 444, 389, 80];
var checkboxes = document.querySelectorAll(".checkbox");


//Page will load saved videos
$(document).ready(function () {
  var displayList = document.querySelector('#saved-list');
  var storedMovies = JSON.parse(localStorage.getItem('savedMovies')) || [];
  var savesMoviec=storedMovies.reverse();
  for(var k =0; k < 3; k++){
  var savedMovie = document.createElement('div');
  savedMovie.innerHTML ='<a href="'+savesMoviec[k].link +'" target="_blank" rel="noopener noreferrer"><img src="'+savesMoviec[k].poster +'"></a>';
  displayList.appendChild(savedMovie);}
  for(var b =3; b < savesMoviec.length; b++){
    var savedMovielink = document.createElement('li');
    savedMovielink.innerHTML ='<a href="'+savesMoviec[b].link +'" target="_blank" rel="noopener noreferrer"><img src="'+savesMoviec[b].title+'"></a>';
    displayList.appendChild(savedMovielink);
  }
})




var actorChoice = function (event) {
  event.preventDefault();
  streamingUser = [];
  for (var i = 0; i < checkboxes.length; i++) {
    if (checkboxes[i].checked) {
      streamingUser.push(parseInt(checkboxes[i].value));
    }
    console.log(streamingUser);
  }
  if (streamingUser.length === 0) {
    searchResults.innerHTML = "";
    var error = document.createElement("h2");
    error.textContent = "Please choose at least one streaming service";
    searchResults.appendChild(error);
    return;
  }
  var actorChoice = encodeURIComponent(actorValue.value);


  console.log("this is my actor choice:", actorChoice);


  // will not save to local storage is name is already entered
  if (!previousActorArray.includes(actorChoice)) {
    previousActorArray.push(actorChoice);
    localStorage.setItem(
      "Previous Searched Actors",
      JSON.stringify(previousActorArray)
    );
    // runs search history so the history doesn't only show up when page is reloaded
    $("#showingResults").text(
      "Showing Current Results for " + decodeURIComponent(actorChoice)
    ); //Need to fix this so it will fix displayed actors when switching back and to a different previously searched actor
    createSearchHistory();
  }


  fetchActorInfo(actorChoice);
};


// creating a search history that has clickable actor names
function createSearchHistory() {
  streamingUser=[];
  searchHistory.innerHTML = "";
  previousActorArray.forEach((actor) => {
    var newActor = document.createElement("button");
    newActor.classList.add("search-history-item", "btn-group");
    newActor.textContent = decodeURIComponent(actor);
    newActor.addEventListener("click", () => {
     
      streamingUser = [];
      for (var i = 0; i < checkboxes.length; i++) {
        if (checkboxes[i].checked) {
          streamingUser.push(parseInt(checkboxes[i].value));
        }
      }


      if (streamingUser.length === 0) {
        searchResults.innerHTML = "";
        var error = document.createElement("h2");
        error.textContent = "Please choose at least one streaming service";
        searchResults.appendChild(error);
        return;
      }
      fetchActorInfo(actor);
      $("#showingResults").text(
        "Showing Current Results for " + decodeURIComponent(actor)
      );
    });
   
    searchHistory.appendChild(newActor);
  });
}


createSearchHistory();


function arrayIsEmpty(arr) {
  return !Array.isArray(arr) || arr.length === 0;
}
//
function fetchActorInfo(actor) {
  searchResults.innerHTML = "";
  var actorFile =
    "https://api.watchmode.com/v1/search/?apiKey=" +
    apiKey +
    "&search_field=name&search_value=" +
    actor; //, options)
  fetch(actorFile)
    .then(function (response) {
      return response.json();
    })


    .then(function (actorID) {
      console.log(actorID);


      var idNumber = actorID.people_results[0].tmdb_id;


      console.log("this is the actor id #:", idNumber);


      var film =
        "https://api.themoviedb.org/3/person/" +
        idNumber +
        "/movie_credits?api_key=259f0ac86de32db902f004c2142dde73&language=en-US";
      fetch(film)
        .then(function (response) {
          return response.json();
        })


        .then(function (filmList) {
          // if (streamingChoices.length >= 5) {
          //   return
          // }




       
          movieArray = [];


          console.log(filmList);


          for (var i = 0; i < 10 /*filmList.cast.length*/; i++) {
            // if (streamingChoices.length >= 5) {
            //   return;
            // }
            movieArray.push(filmList.cast[i].original_title);
            //console.log('the actor was in this film:', filmList.cast[i].original_title);
            movieIDList.push(filmList.cast[i].id);


            //console.log(movieIDList)


            var titleStreaming =
              "https://api.watchmode.com/v1/title/movie-" +
              filmList.cast[i].id +
              "/details/?apiKey=" +
              apiKey +
              "&append_to_response=sources";
            fetch(titleStreaming)
              .then(function (response) {
                return response.json();
              })
              .then(function (filminfo) {
                console.log(filminfo);
                for (var m = 0; m < filminfo.sources.length; m++) {
                  for (var k = 0; k < streamingUser.length; k++) {
                    if (filminfo.sources[m].source_id === streamingUser[k]) {
                      var sourceID = filminfo.sources[m].source_id;
                      streamingChoices.push({
                        title: filminfo.original_title,
                        source: filminfo.sources[m],
                        id: filminfo.id,
                        poster: filminfo.poster,
                      });
                      console.log(streamingChoices);
                      var movieResults = document.createElement("div");
                      var posterURL = filminfo.poster;
                      console.log(sourceID);
                      var movieTitle = document.createElement("h2");


                      searchResults.appendChild(movieResults);
                     
                      movieResults.classList.add("card");
                      movieResults.classList.add("col");
                      movieResults.classList.add("draggable");


                      $ (function(){
                        $('.draggable').draggable();
                       
             
                          $('#droppable').droppable({
                            classes: {
                            "ui-droppable-active": "ui-state-active",
                            "ui-droppable-hover": "ui-state-hover"},
                            drop: function(event){
                             
                             
                             
                            }
                            })
                          });
                          //test
                      var posterDisplay = document.createElement("h2");
                      posterDisplay.innerHTML =
                        '<a href="' +
                        filminfo.sources[m].web_url +
                        '" target="_blank" rel="noopener noreferrer"><img src="' +
                        posterURL +
                        '"></a>';
                      movieResults.append(posterDisplay);
                      posterDisplay.classList.add("card-img-top");


                      // Adding Title, Runtime, and (main) Genre
                      var originalTitle = filminfo.title;
                      var userRating = filminfo.user_rating;
                      var releaseDate = filminfo.year;
                      var filmLink =filminfo.sources[m].web_url


                      var titleSpan = document.createElement("span");
                      titleSpan.style.display = "block";
                      titleSpan.textContent = originalTitle + "\n"+ "(" +releaseDate+ ")";
                      movieResults.appendChild(titleSpan);
                      var ratingSpan = document.createElement("span");
                      ratingSpan.style.display = "block";
                      ratingSpan.textContent = "User Rating: " + userRating;
                      movieResults.appendChild(ratingSpan);
                      //
                      var sourceIcon = document.createElement("div");


                      movieResults.append(sourceIcon);


                      if (sourceID === 157) {
                        sourceIcon.innerHTML = '<img src="assets/hulu.png">';
                      }
                      if (sourceID === 26) {
                        sourceIcon.innerHTML =
                          '<img src="assets/prime_video.png">';
                      }
                      if (sourceID === 203) {
                        sourceIcon.innerHTML = '<img src="assets/netflix.png">';
                      }
                      if (sourceID === 372) {
                        sourceIcon.innerHTML =
                          '<img src="assets/disneyPlus.png">';
                      }
                      if (sourceID === 387) {
                        sourceIcon.innerHTML = '<img src="assets/hbomax.png">';
                      }
                      if (sourceID === 444) {
                        sourceIcon.innerHTML =
                          '<img src="assets/paramountPlus.png">';
                      }
                      if (sourceID === 389) {
                        sourceIcon.innerHTML =
                          '<img src="assets/peacockPremium.png">';
                      }
                      if (sourceID === 80) {
                        sourceIcon.innerHTML =
                          '<img src="assets/crunchyroll.png">';
                      }


                      // save movie choice to local storage
                      var saveBtn = document.createElement('button');
                      saveBtn.textContent = "Save";


                      movieResults.append(saveBtn);            
                                           
                      saveBtn.addEventListener('click', function () {
                        var savedMovArray = JSON.parse(localStorage.getItem('savedMovies')) || [];
                        var savedMoviesb =[]
                        for (var j =0; j < savedMovArray; j++){
                          savedMoviesb.push(savedMovArray[j].title)
                        }
                        if (savedMoviesb.includes(originalTitle)) {
                          return;
                        } else {
                          savedMovArray.push({ title: originalTitle, link: filmLink, poster:posterURL});
                        }
                        localStorage.setItem('savedMovies', JSON.stringify(savedMovArray));
                        console.log(savedMovArray);
                        createWatchList();
                      })
                    }
                    function createWatchList() {
                      var displayList = document.querySelector('#saved-list');
                      var storedMovies = JSON.parse(localStorage.getItem('savedMovies'));
                      displayList.innerHTML=""
                      var savesMoviec=storedMovies.reverse();
                      for(var k =0; k < 3; k++){
                      var savedMovie = document.createElement('div');
                      savedMovie.innerHTML ='<a href="'+savesMoviec[k].link +'" target="_blank" rel="noopener noreferrer"><img src="'+savesMoviec[k].poster +'"></a>';
                      displayList.appendChild(savedMovie);}
                      for(var b =3; b < savesMoviec.length; b++){
                      var savedMovielink = document.createElement('li');
                      savedMovielink.innerHTML ='<a href="'+savesMoviec[b].link +'" target="_blank" rel="noopener noreferrer"><img src="'+savesMoviec[b].title+'"></a>';
                      displayList.appendChild(savedMovielink);
                      }
                    }}                    
                  }
                }
    )}});
          })
        };
     
   /* .then(function () {
      if (arrayIsEmpty(streamingChoices)) {
        var noOptions = document.createElement("h2");
        noOptions.textContent = "No streaming options found";
        searchHistory.appendChild(noOptions);
      }
    });
}*/


searchBtn.addEventListener("click", actorChoice);


