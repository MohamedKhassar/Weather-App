const search_input = document.querySelector(".search-input");
const search_btn = document.querySelector("button");
const weather = document.querySelector(".weather");
const loading = document.querySelector(".loading");
const error = document.querySelector(".error");
const getWeatherCity = async (city = "new york") => {
  try {
    weather.style.display = "none";
    error.style.display = "none";
    loading.style.display = "flex";
    const res = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=35d780aaa33e0a4616eaf2dc1859e28e`
    );
    const data = await res.json();
    if (res.ok) {
      await fillData(data);
      loading.style.display = "none";
      weather.style.display = "block";
    } else {
      loading.style.display = "none";
      weather.style.display = "none";
      error.style.display = "flex";
    }
  } catch (error) {
    console.log(error);
  }
};

const fillData = async (data) => {
  document.querySelector(".temp").innerHTML = `${(
    data.main.temp - 273.15
  ).toFixed()}°c`;
  document.querySelector(".city").innerHTML = data.name;
  document.querySelector(".humidity").innerHTML = `${data.main.humidity} %`;
  document.querySelector(".wind").innerHTML = `${data.wind.speed} km/h`;
  document.querySelector(
    ".weather-icon"
  ).src = `/images/${data.weather[0].main}.png`;
};

const submitForm = async (e) => {
  e.preventDefault();
  if (search_input.value) {
    getWeatherCity(search_input.value);
  } else {
    getWeatherCity();
  }
};
search_btn.addEventListener("click", submitForm);
onload(getWeatherCity());
