// var title = $('.title-input');
var searchBtn = document.querySelector('#search-button');
var firstName = document.querySelector('#actor-search-FN');
var lastName = document.querySelector('#actor-search-LN');
var previousActorArray = JSON.parse(localStorage.getItem('Previous Searched Actors')) || [];
var movieArray = [];
var idArray = [];
var castArray = [];
var m = 0;
var c = 0;
var nameid;
var searchHistory = document.getElementById("search-history-item")
var streamingChoices = []
//need to create a function push into streamingUser//
var streamingUser = [203, 157, 26]
var movieIDList = []
var searchResults = document.querySelector('.card-group');
var apiKey = "mUl3e8Y4nVeM2c1pVCyeUQl4BIGpyU62ag1qLpuh"
var streamingPossibility = [203, 157, 26, 387, 372, 444, 389]
var checkboxes = document.querySelectorAll(".checkbox")


//lillian apikey  fwp3LzoxBHaRgFysl9BBw1r1h4GvfliYReDolIou (doesn't seem to be verified?)
//candlers API keys CfSeK9DplZ3luNpOAf3Y8EJqweIEU19zkNuiTEQH


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

  for (var i = 0 ; i < checkboxes.length; i++) {
      if(checkboxes[i].checked){
      streamingUser.push(checkboxes[i].value)}}
    
  console.log(streamingUser);
  fetchActorInfo(actorChoice);
  getactorid(actorChoice);
}


// creating a search history that has clickable actor names
function createSearchHistory() {
 
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
  searchResults.innerHTML = "";
  var actorFile = 'https://api.watchmode.com/v1/search/?apiKey=' + apiKey + '&search_field=name&search_value=' + actor; //, options)
  fetch(actorFile)
    .then(function (response) {
      return response.json();
    })


    .then(function (actorID) {


      console.log(actorID);


      var idNumber = actorID.people_results[0].tmdb_id;


      console.log('this is the actor id #:', idNumber);


      var film = 'https://api.themoviedb.org/3/person/' + idNumber + '/movie_credits?api_key=259f0ac86de32db902f004c2142dde73&language=en-US'
      fetch(film)
        .then(function (response) {
          return response.json();
        })


        .then(function (filmList) {
          if (streamingChoices.length >= 5) {
            return
          }
          movieArray = []
          console.log(filmList)




          for (var i = 0; i < 10/*filmList.cast.length*/; i++) {
           
            if (streamingChoices.length >= 5) {
              return
            }
            movieArray.push(filmList.cast[i].original_title);
            //console.log('the actor was in this film:', filmList.cast[i].original_title);
            movieIDList.push(filmList.cast[i].id);


            //console.log(movieIDList)


            var titleStreaming = "https://api.watchmode.com/v1/title/movie-" + filmList.cast[i].id + "/details/?apiKey=" + apiKey + "&append_to_response=sources"
            fetch(titleStreaming)
              .then(function (response) {
                return response.json();
              })
              .then(function (filminfo) {
                console.log(filminfo)
                for (var m = 0; m < filminfo.sources.length; m++) {
                  for (var k = 0; k < streamingUser.length; k++) {
                    if (filminfo.sources[m].source_id === streamingUser[k]) {
                     
                      var sourceID = filminfo.sources[m].source_id
                      streamingChoices.push({ title: filminfo.original_title, source: filminfo.sources[m], id: filminfo.id, poster: filminfo.poster })
                      console.log(streamingChoices)
                      var movieResults = document.createElement('div');
                      var posterURL = filminfo.poster;
                      console.log(sourceID)
                      var movieTitle = document.createElement('h2');
                     
                      searchResults.appendChild(movieResults);
                      movieResults.classList.add("card");

                      var posterDisplay = document.createElement('h2');
                      posterDisplay.innerHTML = '<a href="' + filminfo.sources[m].web_url + '"><img src="' + posterURL + '"></a>'
                      movieResults.append(posterDisplay);
                      posterDisplay.classList.add("card-img-top")
                      
                      var sourceIcon = document.createElement('div');

                      movieResults.append(sourceIcon);
                      
                      if (sourceID===157) {
                        sourceIcon.innerHTML= '<img src="assets/hulu.png">'
                      }
                      if (sourceID===26) {
                        sourceIcon.innerHTML= '<img src="assets/prime_video.png">'
                      }
                      if (sourceID===203) {
                        sourceIcon.innerHTML= '<img src="assets/netflix.png">'
                      }
                      if (sourceID===387) {
                        sourceIcon.innerHTML= '<img src="assets/disneyPlus.png">'
                      }
                      if (sourceID===371) {
                        sourceIcon.innerHTML= '<img src="assets/hbomax.png">'
                      }
                      if (sourceID===444) {
                        sourceIcon.innerHTML= '<img src="assets/paramountPlus.png">'          
                      }
                      if (sourceID===389) {
                        sourceIcon.innerHTML= '<img src="assets/peacockPremium.png">'  
                      }
                      if (sourceID===480) {
                        sourceIcon.innerHTML= '<img src="assets/crunchyroll.png">'
                      }
                  
                     
                     


                     
                     
                     
                    }


                  }
                }




               




             
                        })
    }
          if (streamingChoices.length >= 5) {
    return
  }


})
    }


    )
}
searchBtn.addEventListener('click', actorChoice);