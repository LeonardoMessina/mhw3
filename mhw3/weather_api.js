function onSuccessWeather(text, divId){
    const dataWeather=JSON.parse(text);
    const description=document.createElement("h2");
    description.textContent="Meteo : " + dataWeather.data[0].weather.description;
    const divWeather=document.querySelector("#" + divId);
    divWeather.appendChild(description);
    const img=document.createElement("img");
    img.src='https://www.weatherbit.io/static/img/icons/' + dataWeather.data[0].weather.icon + '.png';
    divWeather.appendChild(img);
}

function onErrorWeather(error, divId) {
    const description=document.createElement("h2");
    description.textContent="Errore meteo: " + error;
    const divWeather=document.querySelector("#" + divId);
    divWeather.appendChild(description);
}

function showWeather(city, divId){
    fetch('https://api.weatherbit.io/v2.0/current?key=70d16d188ac74cbfa74101278771a2b3&lang=it&city=' + city).then(function(response){
        if(response.ok){
            response.text().then(function(text){
                onSuccessWeather(text,divId);
            });
        }else{
            onErrorWeather(response.statusText, divId);
            return null;
        }
    },function(error){    
        onErrorWeather(error, divId);
    });
}