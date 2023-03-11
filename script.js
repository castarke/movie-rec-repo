// var title = $('.title-input');
var searchBtn = document.querySelector('#search-button');
var firstName = document.querySelector('#actor-search-FN');
var lastName = document.querySelector('#actor-search-LN');
var previousActorArray = JSON.parse(localStorage.getItem('Previous Searched Actors')) || [];
var movieArray =[];
var idArray=[];
var castArray=[];
var m = 0;
var c=0;
var nameid;
var searchHistory = document.getElementById("search-history-item")
var streamingChoices= []
var movieIDList= []
var searchResults = document.querySelector('#showingResults');

var actorChoice = function (event) {
  event.preventDefault();
  
  var actorChoice = encodeURIComponent(firstName.value + ' ' + lastName.value);
  
  console.log('this is my actor choice:', actorChoice);

// will not save to local storage is name is already entered
  if (!previousActorArray.includes(actorChoice)) {
    previousActorArray.push(actorChoice);
    localStorage.setItem('Previous Searched Actors', JSON.stringify(previousActorArray));
    // runs search history so the history doesn't only show up when page is reloaded
    $("#showingResults").text("Showing Current Results for " + decodeURIComponent(actorChoice)); //Need to fix this so it will fix displayed actors when switching back and to a different previously searched actor
    createSearchHistory();
  }
  fetchActorInfo(actorChoice);
  getactorid(actorChoice);
}

// creating a search history that has clickable actor names
function createSearchHistory() {
  searchHistory.innerHTML = "";
  previousActorArray.forEach(actor => {
    var newActor = document.createElement("button");
    newActor.classList.add("search-history-item", "btn-group");
    newActor.textContent = decodeURIComponent(actor);
    newActor.addEventListener("click", () => {
      fetchActorInfo(actor);
      getactorid(actor);
    });
    searchHistory.appendChild(newActor);
  });
}

createSearchHistory();

function fetchActorInfo(actor) {
  
  var actorFile = 'https://api.watchmode.com/v1/search/?apiKey=kCnLHad9gCGe5xv6MiLSMGWDrNJfKFGF8oNK5Lru&search_field=name&search_value='+ actor; //, options)
	fetch(actorFile)
  .then(function (response) {
    return response.json();
    })

    .then(function(actorID) {

      console.log(actorID);
      
      var idNumber = actorID.people_results[0].tmdb_id;
      
      console.log('this is the actor id #:', idNumber);

      var film = 'https://api.themoviedb.org/3/person/' + idNumber + '/movie_credits?api_key=259f0ac86de32db902f004c2142dde73&language=en-US'
      fetch(film)
      .then(function (response) {
        return response.json();
      })

      .then(function(filmList) {
        movieArray = []
        console.log(filmList)
        

        for (var i = 0; i < filmList.cast[i].original_title.length; i++) {
          
          movieArray.push(filmList.cast[i].original_title);
          console.log('the actor was in this film:', filmList.cast[i].original_title);
          movieIDList.push(filmList.cast[i].id);
          console.log(movieIDList)
    
          getStreaming();
          
          m++;
        }
        
      })
     
    }) 

     


     
     
}
function getStreaming(){
  for(var i=0; i< movieIDList.length; i++)
  var titleStreaming="https://api.watchmode.com/v1/title/movie-"+ movieIDList[i]+"/details/?apiKey=ujX1AEVczVkM6DqgFxXzt8pH4KDDxwlzuJB83DMq&append_to_response=sources"
  fetch(titleStreaming)
  .then(function (response) {
    return response.json();
  })
  .then(function(movieList) {
    console.log(movieList);
    for (var m =0; m <movieList.sources.length; m++){
    if (movieList.sources[m].type === "sub"){
      streamingChoices.push({title: movieList.original_title, source:movieList.sources[m], id: movieList.id, poster:movieList.poster})
      
      var movieResults = document.createElement('div');
      var posterURL = movieList.poster;
      var movieTitle = document.createElement('h2');
      var source = document.createElement('h3');

      var posterDisplay = document.createElement('h2');
      posterDisplay.innerHTML = '<img src="' + posterURL + '"' + '>'

      searchResults.append(movieResults);
      searchResults.appendChild(posterDisplay);
  
      console.log(posterURL);
    }}})
    console.log(streamingChoices)

    // for (var i = 0; i < streamingChoices.length; i++) {
    //     // img.setAttribute('src', streamingChoices[i].poster);
    //     // searchResults.append(div);
    //     // div.appendChild(img);
    //   }

}

searchBtn.addEventListener('click', actorChoice);


//We need to use watchmode to get the actor id then, search for movies using id, then get streaming services, then use movietmdb to get posters for movies

        

/*function getAPI(){
  var providerfile = 'https://api.watchmode.com/v1/search/?apiKey=kCnLHad9gCGe5xv6MiLSMGWDrNJfKFGF8oNK5Lru&search_field=name&search_value='+ movieArray[m]; //, options)
	fetch(providerfile)
  .then(function (response) {
    return response.json();
    })
    
    .then(function(providers) {
      console.log(providers)
      for(var v=0; v<providers.title_results.length;v++){
        idArray.push(providers.title_results[v].id);
      console.log(providers.title_results[v].id);
      checkCast();
      c++;
      }
    })}

    function checkCast(){
      var castfile ='https://api.watchmode.com/v1/title/'+idArray[c]+'/cast-crew/?apiKey=kCnLHad9gCGe5xv6MiLSMGWDrNJfKFGF8oNK5Lru'
       fetch(castfile)
       .then(function (response){
    //     return response.json();
    //   })

    //   .then(function(cast){
    //     for(var d=0; d<cast.length;d++){
    //       castArray.push(cast[d].person_id)
    //     if(castArray[d]===namieid)  {

    //     }
    //     }
        
    //     console.log(cast);
    //   })
    // }

      function getactorid(actorvalue){
      var actoridfile = 'https://api.watchmode.com/v1/search/?apiKey=kCnLHad9gCGe5xv6MiLSMGWDrNJfKFGF8oNK5Lru&search_field=name&search_value=' + actorvalue;
      fetch(actoridfile)
      .then(function (response){
        return response.json();
      })

      .then(function(actorid){
        nameid=actorid.people_results[0].id;
        console.log(actorid.people_results[0].id);
      })
    }*/