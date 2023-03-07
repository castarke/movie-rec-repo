function getdata (lat, long) 
    var weatherQueryURL = "http://www.omdbapi.com/?i=" + "" +"apikey=&9a83a00b";
    
    fetch(weatherQueryURL)
      // Data is manipulated on the page after being fetched
      .then(res => {
        if (!res.ok) {
          throw res.json();
        }
        return res.json();
      })
      .then(data => {
        
        $('.current').append("<h3 class=location>");
        var locHeading = document.querySelector(".location");
        locHeading.textContent = data.name + " "+searchState;
        $('.current').append("<h5 class=date>");
        var locHeading = document.querySelector(".date");
        locHeading.textContent = date;
        $('.current').append("<h4 class=mainWeather>");
        var locHeading = document.querySelector(".mainWeather");
        locHeading.textContent = data.weather[0].main;
        $('.current').append("<img class=icon>");
        var locHeading = document.querySelector(".icon");
        var iconcode = data.weather[0].icon
        var iconurl = "http://openweathermap.org/img/w/" + iconcode + ".png"
        $('.icon').attr('src', iconurl)
        var currentTemp = $('<h5>')
        currentTemp.text("Temperature: " + ((data.main.temp - 273.15) * (9 / 5) + 32).toFixed(2) + "\u{00B0}F")
        $('.current').append(currentTemp)
        var wind = $('<h5>')
        wind.text("Wind Speed: " + (data.wind.speed * 2.237).toFixed(2) + "mph")
        $('.current').append(wind)
        var humidity = $('<h5>')
        humidity.text("Humidity: " + data.main.humidity + "%")
        $('.current').append(humidity)
      })
  
      
  
  }