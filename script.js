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