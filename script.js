// var title = $('.title-input');
var searchBtn = document.querySelector('#search-button');
var firstName = document.querySelector('#actor-search-FN');
var lastName = document.querySelector('#actor-search-LN');
var previousActorArray = JSON.parse(localStorage.getItem('PreviousActors')) || [];
var movieArray =[];
var idArray=[];
var castArray=[];
var m = 0;
var c=0;
var nameid;


var actorChoice = function (event) {
  event.preventDefault();
  
  var actorChoice = encodeURIComponent(firstName.value + ' ' + lastName.value);
  
  console.log('this is my actor choice:', actorChoice);


  if (!previousActorArray.includes(actorChoice)) {
    previousActorArray.push(actorChoice);
    localStorage.setItem('Previous Searched Actors', JSON.stringify(previousActorArray));
  }

  fetchActorInfo(actorChoice);
  getactorid(actorChoice);
}

function fetchActorInfo(actor) {
  
  var actorFile = 'https://api.themoviedb.org/3/search/person?api_key=259f0ac86de32db902f004c2142dde73&language=en-US&query=' + actor + '&page=1&include_adult=false'; //, options)
	fetch(actorFile)
  .then(function (response) {
    return response.json();
    })

    .then(function(actorID) {

      console.log(actorID);
      
      var idNumber = actorID.results[0].id;
      
      console.log('this is the actor id #:', idNumber);

      var film = 'https://api.themoviedb.org/3/person/' + idNumber + '/combined_credits?api_key=259f0ac86de32db902f004c2142dde73&language=en-US'
      fetch(film)
      .then(function (response) {
        return response.json();
      })

      .then(function(filmList) {

        for (var i = 0; i < filmList.cast[i].original_title.length; i++) {
          movieArray.push(filmList.cast[i].original_title);
          console.log('the actor was in this film:', filmList.cast[i].original_title);
          getAPI();
          m++;
        }
        
      })
    }) 

     


     
     
}

searchBtn.addEventListener('click', actorChoice);


//We need to use watchmode to get the actor id then, search for movies using id, then get streaming services, then use movietmdb to get posters for movies

         

function getAPI(){
  var providerfile = 'https://api.watchmode.com/v1/search/?apiKey=kCnLHad9gCGe5xv6MiLSMGWDrNJfKFGF8oNK5Lru&search_field=name&search_value='+ movieArray[m]; //, options)
	fetch(providerfile)
  .then(function (response) {
    return response.json();
    })
    
    .then(function(providers) {
      for(var v=0; v<providers.title_results.length;v++){
        idArray.push(providers.title_results[v].id);
      console.log(providers.title_results[v].id);
      getCast();
      c++;
      }
    })}

    // function getCast(){
    //   var castfile ='https://api.watchmode.com/v1/title/'+idArray[c]+'/cast-crew/?apiKey=kCnLHad9gCGe5xv6MiLSMGWDrNJfKFGF8oNK5Lru'
    //   fetch(castfile)
    //   .then(function (response){
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
    }