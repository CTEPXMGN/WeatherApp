let cityName = '';
const serverUrl = 'https://api.openweathermap.org/data/2.5/weather';
const apiKey = 'f660a2fb1e4bad108d6160b7f58c555f';

const findBtn = document.querySelector('.find__btn');
const inputCity = document.querySelector('.input');
const outputCity = document.querySelector('.output__city');
const outputTemp = document.querySelector('.output__temperature');
const outputIcon = document.querySelector('.output__icon');

async function findCity() {
    if (inputCity.value !== "") {
        cityName = inputCity.value;
        const url = `${serverUrl}?q=${cityName}&appid=${apiKey}`;
        let response = await fetch(url);
        if (response.ok) {
            let json = await response.json();
            inputCity.value = '';
            outputCity.innerHTML = cityName;
            let temperature = Math.floor(json.main.temp - 273.15);
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

findBtn.addEventListener('click', findCity);