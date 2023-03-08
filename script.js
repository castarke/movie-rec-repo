var title = $('.title-input');
var searchBtn = document.getElementById('search-button');
        
         
         function getAPI(){
          var titlename = title.val();
         
         var watchmodeUrl = 'https://api.watchmode.com/v1/search/?apiKey=iFKylfiC00oJqw4wYLbiOn1fBNMNabxVwSBGNmaR&search_field=name&search_value=' +titlename;
         fetch(watchmodeUrl)
         
         .then(function (response) {
           return response.json();
         })
         .then(function (data) {
   console.log(data);
       })
      };

      searchBtn.addEventListener("click",function(){
        event.preventDefault();
        getAPI();
      });