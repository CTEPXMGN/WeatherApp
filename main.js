let cityName = '';
const serverUrl = 'https://api.openweathermap.org/data/2.5/weather';
const apiKey = '1041b355b3b6422eb66d9f5e517f7b52';

const findBtn = document.querySelector('.find__btn');
const inputCity = document.querySelector('.input');
const outputCity = document.querySelector('.output__city');
const outputCityDetails = document.querySelector('.output__city__details');
const outputTemp = document.querySelector('.output__temperature');
const outputIcon = document.querySelector('.output__icon');
const addLike = document.querySelector('.like__btn');
const deleteButton = document.querySelectorAll('.delete__btn');
const findedCity = document.querySelectorAll('.finded__city');
const outDetailsCity = document.querySelector('.output__city__details');
const outDetailsTemp = document.querySelector('.output__details__temperature');
const outDetailsTemp2 = document.querySelector('.output__details__temperature2');
const outDetailsWeather = document.querySelector('.output__details__weather');
const outDetailsSunrise = document.querySelector('.output__details__sunrise');
const outDetailsSunset = document.querySelector('.output__details__sunset');

async function findCity() {
    if (inputCity.value !== "") {
        cityName = inputCity.value;
        const url = `${serverUrl}?q=${cityName}&appid=${apiKey}&units=metric`;
        
        let response = await fetch(url);
        if (response.ok) {
            let json = await response.json();
            // inputCity.value = '';
            outputCity.innerHTML = cityName;
            
            let temperature = Math.floor(json.main.temp);
            outputTemp.innerHTML = temperature + `°`;
            
            let srcUrl = `http://openweathermap.org/img/wn/${json.weather[0].icon}.png`;
            outputIcon.src = srcUrl;
        } else {
            alert('Введите корректное название');
            inputCity.value = '';
        }
    } else {
        alert("Введите название города");
    }
};

async function getWeather(){
    if (inputCity.value !== "") {
        cityName = inputCity.value;
        const url = `${serverUrl}?q=${cityName}&appid=${apiKey}&units=metric`;

        let response = await fetch(url);
        if (response.ok) {
            let json = await response.json();
            outDetailsCity.innerHTML = cityName;
            console.log(json);
            let temperature = Math.floor(json.main.temp);
            outDetailsTemp.innerHTML = 'Temperature: ' + temperature + `°`; 

            let temperature2 = Math.floor(json.main.feels_like);
            outDetailsTemp2.innerHTML = `Feels like: ` + temperature2 + `°`;

            let weather = json.weather[0].main;
            outDetailsWeather.innerHTML = `Weather: ` + weather;

            let sunrise = 

        }
    }
};

function addCity() {
    if (inputCity.value !== '') {
        document.getElementById('ul').insertAdjacentHTML('afterbegin', `
        <li><input type="button" class="finded__city" value="${inputCity.value}"><input type="button" class="delete__btn"></li>
        `);
        const elementID = document.getElementById('ul');
        const firstChild = elementID.firstElementChild;

        const btnDelete = firstChild.querySelector('.delete__btn');
        btnDelete.addEventListener('click', function() {
            this.parentElement.remove();
        })

        const btnFindFromAdded = firstChild.querySelector('.finded__city');
        btnFindFromAdded.addEventListener('click', function() {
            inputCity.value = btnFindFromAdded.value;
            findCity();
        });
    } else {
        alert("А что добавить-то?");
    }
    
}

findBtn.addEventListener('click', findCity);
findBtn.addEventListener('click', getWeather);
addLike.addEventListener('click', addCity);

deleteButton.forEach(function(item) {
    item.onclick = function () {
        item.parentElement.remove();
    }
});

findedCity.forEach(function(item) {
    item.onclick = function () {
        inputCity.value = item.value;
        findCity();
    }
});