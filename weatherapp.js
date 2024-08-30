

let apikey = "683f43a29d5242af8d141342242808"; // Corrected API Key
let input = document.querySelector("#input");
let btn = document.querySelector(".btn");
let city = document.querySelector(".city");
let condition = document.querySelector(".condition");
let temp = document.querySelector(".temp");
let feels = document.querySelector(".feels");
let humidity = document.querySelector(".humidity");
let wind = document.querySelector(".wind");
let tempImg = document.querySelector("#temp-img");
let secondContainer = document.querySelector(".second-container");
let spinner = document.querySelector(".spinner-container");

let loader = false;

async function weather(cityName) {
    let url = `https://api.weatherapi.com/v1/current.json?key=${apikey}&q=${cityName}`;
    loader = true;
    showSpinner();

    try {
        let response = await fetch(url);
        let data = await response.json();
        loader = false;
        hideSpinner();

        if (data.error) {
            alert("Please enter a valid city name");
            return;
        }

        tempImg.src = data.current.condition.icon;
        city.innerHTML = data.location.name;
        condition.innerHTML = data.current.condition.text;
        feels.innerHTML = "Feels like " + Math.round(data.current.feelslike_c) + "°C";
        temp.innerHTML = Math.round(data.current.temp_c) + "°C";
        humidity.innerHTML = data.current.humidity + "%";
        wind.innerHTML = data.current.wind_kph + " km/h";
    } catch (error) {
        console.log(error);
        loader = false;
        hideSpinner();
        alert("Failed to fetch weather data.");
    }
}

function showSpinner() {
    spinner.style.display = "flex";
    secondContainer.style.display = "none";
}

function hideSpinner() {
    spinner.style.display = "none"; // Fix: Hide the spinner properly
    secondContainer.style.display = "block";
}

btn.onclick = () => {
    weather(input.value);
};

document.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
        event.preventDefault();
        weather(input.value);
    }
});
