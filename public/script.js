document.querySelector("#search").addEventListener("submit", async (event) => {
  event.preventDefault();

  const cityName = document.querySelector("#city_name").value;

  if (!cityName) {
    document.querySelector("#weather").classList.remove("show");
    document.querySelector("#footer").classList.remove("show");
    showAlert("Você precisa digitar uma cidade...");
    return;
  }

  const apiKey = "8a60b2de14f7a17c7a11706b2cfcd87c";
  const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURI(
    cityName
  )}&appid=${apiKey}&units=metric&lang=pt_br`;

  const results = await fetch(apiUrl);
  const json = await results.json();

  if (!json.cod === 200) {
    document.querySelector("#weather").classList.remove("show");
    document.querySelector("#footer").classList.remove("show");
    showAlert(`
              Não foi possível localizar...
              <img style="width:60px" src="img/404.png"/>
          `);
    return;
  }

  showInfo({
    city: json.name,
    country: json.sys.country,
    temp: json.main.temp,
    tempMax: json.main.temp_max,
    tempMin: json.main.temp_min,
    description: json.weather[0].description,
    tempIcon: json.weather[0].icon,
    windSpeed: json.wind.speed,
    humidity: json.main.humidity,
  });

  showMovieSuggestions(json.weather[0].description);

  document.querySelector("#footer").classList.add("show");
});

function toggleHiddenOnFocus() {
  const cityNameInput = document.getElementById("city_name");
  const submitButton = document.getElementById("submit_city");

  cityNameInput.addEventListener("focus", () => {
    submitButton.hidden = true;
  });

  cityNameInput.addEventListener("blur", () => {
    submitButton.hidden = false;
  });
}

function showInfo(json) {
  let tempElement = document.getElementById("temp");

  switch (true) {
    case json.temp <= 0:
      tempElement.style.backgroundColor = "#0ea5e9";
      break;
    case json.temp > 0 && json.temp <= 15:
      tempElement.style.backgroundColor = "#0284c7";
      break;
    case json.temp > 15 && json.temp <= 30:
      tempElement.style.backgroundColor = "#fbbf24";
      break;
    case json.temp > 30:
      tempElement.style.backgroundColor = "red";
      break;
  }

  document.getElementById("weather").classList.add("show");

  document.getElementById("title").innerHTML = `${json.city}, ${json.country}`;

  document.getElementById("temp_value").innerHTML = `${json.temp.toFixed(
    0
  )} <sup>C°</sup>`;

  document.getElementById("temp_description").innerHTML = `${json.description}`;

  document
    .getElementById("temp_img")
    .setAttribute(
      "src",
      `https://openweathermap.org/img/wn/${json.tempIcon}@2x.png`
    );

  document.getElementById("temp_max").innerHTML = `${json.tempMax.toFixed(
    0
  )} <sup>C°</sup>`;
  document.getElementById("temp_min").innerHTML = `${
    json.tempMin.toFixed(0) - 14
  } <sup>C°</sup>`;
  document.getElementById("humidity").innerHTML = `${json.humidity}%`;
  document.getElementById("wind").innerHTML = `${json.windSpeed.toFixed(
    0
  )}km/h`;
}

function showMovieSuggestions(weatherDescription) {
  const movieSuggestionsContainer =
    document.querySelector("#movie_suggestions");
  movieSuggestionsContainer.innerHTML = "";

  const movieSuggestions = {
    chuva: ["Cantando na Chuva", "O Segredo das Águas", "Chuva Negra"],
    "céu limpo": ["Sob o Sol da Toscana", "Mad Max: Estrada da Fúria"],
    nublado: ["O Nevoeiro", "Silent Hill"],
    neve: ["Frozen", "O Regresso", "Deixe-me Entrar"],
  };

  const suggestions = movieSuggestions[
    Object.keys(movieSuggestions).find((key) =>
      weatherDescription.toLowerCase().includes(key)
    )
  ] || ["Filme não encontrado. Aproveite o clima!"];

  suggestions.forEach((movie) => {
    const movieItem = document.createElement("div");
    movieItem.className = "movie-item";
    movieItem.textContent = movie;
    movieSuggestionsContainer.appendChild(movieItem);

    movieItem.style.backgroundImage = `url('https://via.placeholder.com/80?text=${movie
      .charAt(0)
      .toUpperCase()}')`;
    movieItem.style.backgroundSize = "cover";
    movieItem.style.backgroundPosition = "center";
  });

  document.querySelector("#movie_section").classList.add("show");
}
