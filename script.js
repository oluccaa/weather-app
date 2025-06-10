const apiKey = "31e2402aa1650d2ff6adfede47812413";
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";

const cityEl = document.querySelector(".city");
const tempEl = document.querySelector(".temp");
const humidityEl = document.querySelector(".humidity");
const windEl = document.querySelector(".wind");
const errorEl = document.querySelector(".error");
const weatherEl = document.querySelector(".weather");
const searchBox = document.querySelector(".search input");
const searchBtn = document.querySelector(".search button");
const weatherIcon = document.querySelector(".weather-icon")

async function checkWeather(city) {
    try {
        const response = await fetch(`${apiUrl}${city}&appid=${apiKey}&lang=pt_br`);
        if (response.status === 404) {
            errorEl.style.display = "block";
            weatherEl.style.display = "none";
        } else {
            const data = await response.json();
            cityEl.innerHTML = data.name;
            tempEl.innerHTML = Math.round(data.main.temp) + "°C";
            humidityEl.innerHTML = data.main.humidity + "%";
            windEl.innerHTML = data.wind.speed + " km/h";

            // Switch conforme sugerido
            atualizarIconeClima(data)
            console.log(data)
            weatherEl.style.display = "block";
            errorEl.style.display = "none";
        }
    } catch (error) {
        console.error("Erro ao buscar dados do clima:", error);
        errorEl.style.display = "block";
        weatherEl.style.display = "none";
    }
}

function atualizarIconeClima(data){
    switch (data.weather[0].main) {
        case "Clouds":
            weatherIcon.src = "assets/clouds.png";
            break;
        case "Clear":
            weatherIcon.src = "assets/clear.png";
            break;
        case "Rain":
            weatherIcon.src = "assets/rain.png";
            break;
        case "Drizzle":
            weatherIcon.src = "assets/drizzle.png";
            break;
        case "Mist":
            weatherIcon.src = "assets/mist.png";
            break;
        case "Snow":
            weatherIcon.src = "assets/snow.png";
            break;
        default:
            weatherIcon.src = "assets/default.png";
    }
}

searchBtn.addEventListener("click", () => {
    const city = searchBox.value.trim();
    if (city !== "") {
        checkWeather(city);
    }
});

searchBox.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
        searchBtn.click();
    }
});