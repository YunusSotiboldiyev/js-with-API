const container = document.querySelector(".container");
const search = document.querySelector(".search-box button");
const weatherBox = document.querySelector(".weather-box");
const weatherDetal = document.querySelector(".weather-detaile");
const error404 = document.querySelector(".not-found");

search.addEventListener('click', () =>{
     const APIKey = '99812e694d4adc260232061b311da07c';
     const city = document.querySelector(".search-box input").value;
     if(city == '') return;
     fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&
          units=metric&appid=${APIKey}`).then(response => response.json()).then(json => {
               if (json.cod =="404") {
                    container.computedStyleMap.height = '400px';
                    weatherBox.classList.remove('active');
                    weatherDetal.classList.remove('active');
                    error404.classList.add('active');
                    return;
               }
               container.computedStyleMap.height = '555px';
               weatherBox.classList.add('active');
               weatherDetal.classList.add('active');
               error404.classList.remove('active');

               const image = document.querySelector(".weather-box img");
               const temperature = document.querySelector(".weather-box .temperature");
               const description = document.querySelector(".weather-title");
               const humidity = document.querySelector(".weather-detaile .humidity span");
               const wind = document.querySelector(".weather-detaile .wind span");

               switch (json.weather[0].main) {
                    case 'Clear':
                         image.src = 'img/clear.png';
                         break;
                    case 'Rain':
                         image.src = 'img/rain.jfif';
                         break;
                    case 'Snow':
                         image.src = 'img/snow.jfif';
                         break;
                    case 'Clouds':
                         image.src = 'img/my-cloud.jfif';
                         break;
                    case 'Mist':
                         image.src = 'img/mist.jfif'
                         break;
                    case 'Haze':
                         image.src = 'img/mist.jfif'
                         break;
               default:
                        image.src = 'images/cloud.jfif';
                         break;
               }

               temperature.innerHTML = `${parseInt(json.main.temp)-273}<span>°C</span>`;
               description.innerHTML = `${json.weather[0].description}`;
               humidity.innerHTML = `${json.main.humidity}%`;
               wind.innerHTML = `${parseInt(json.wind.speed)}km/h`;
          });
});