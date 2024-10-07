        const apiKey = "082dde4c4a06078aea2a2f959faf084e";
        const apiUrl = "https://api.openweathermap.org/data/2.5/weather?&q=";
        let unit = "imperial";
        let unitSymbol= "F"

        const searchBox = document.querySelector(".search input");
        const searchBtn = document.querySelector(".search button");
        const weatherIcon = document.querySelector(".weather-icon");
        const selectedUnit = document.querySelector(".search select");

        async function checkWeather(city){
            const unit = selectedUnit.value;
            const unitSymbol = unit === "imperial" ? "°F" : "°C";
            console.log(city);
            console.log(unit);
            
            try
            {

                const response = await fetch(apiUrl + city + `&units=${selectedUnit.value}`+`&appid=${apiKey}`);
                if(!response.ok){
                    throw new Error("City not found. Please enter a valid city name.");
                }
            
                const data = await response.json();
                console.log(data);
                document.querySelector(".city").innerHTML = data.name;
                document.querySelector(".temp").innerHTML = Math.round(data.main.temp) + unitSymbol;
                document.querySelector(".humidity").innerHTML = data.main.humidity + "%";
                document.querySelector(".wind").innerHTML = data.wind.speed + " km/h";
                if(data.weather[0].main == "Clouds"){
                    weatherIcon.src = "images/clouds.png";
                }
                else if (data.weather[0].main == "Clear")
                {
                weatherIcon.src = "images/clear.png";
                 }
                  else if (data.weather[0].main == "Rain")
                 {
                weatherIcon.src = "images/rain.png";
                 }
                 else if (data.weather[0].main == "Drizzle")
                 {  
                weatherIcon.src = "images/drizzle.png";
                 }
                 else if (data.weather[0].main == "Mist")
                 {
                weatherIcon.src = "images/mist.png";
                 }
                
                 document.querySelector(".weather").style.display = "block" ;
                 document.querySelector(".error").style.display = "none" ;
        
            } catch(error){
                console.error(error);
                document.querySelector(".error").textContent = error.message;
                document.querySelector(".error").style.display = "block";
                document.querySelector(".weather").style.display = "none";
                  }
    }
            
            
     function search()
     {
         if(searchBox.value){
            checkWeather(searchBox.value);
         }
           
        else{
                document.querySelector(".error").style.display = "block";
                document.querySelector(".weather").style.display = "none";
            }

     }

    searchBtn.addEventListener("click", () => {
            checkWeather(searchBox.value);
     })
    selectedUnit.addEventListener("change",  () => {
            checkWeather(searchBox.value);
    })
        
        