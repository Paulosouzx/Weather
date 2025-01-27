document.querySelector("#search").addEventListener("submit", async (event) => {
  event.preventDefault();

  const cityName = document.querySelector("#city_name").value.trim();

  if (!cityName) {
    const weatherElement = document.querySelector("#weather");
    const footerElement = document.querySelector("#footer");

    if (weatherElement) weatherElement.classList.remove("show");
    if (footerElement) footerElement.classList.remove("show");

    showAlert("Você precisa digitar uma cidade...");
    return;
  }

  try {
    const response = await fetch(
      `/api/weather?city=${encodeURIComponent(cityName)}`
    );
    if (!response.ok) {
      throw new Error("Cidade não encontrada ou erro no servidor.");
    }

    const { weather, movies } = await response.json();

    showInfo({
      city: weather.name,
      country: weather.sys.country,
      temp: weather.main.temp,
      tempMax: weather.main.temp_max,
      tempMin: weather.main.temp_min,
      description: weather.weather[0].description,
      tempIcon: weather.weather[0].icon,
      windSpeed: weather.wind.speed,
      humidity: weather.main.humidity,
    });

    showMovieSuggestions(movies);

    const footerElement = document.querySelector("#footer");
    if (footerElement) footerElement.classList.add("show");
  } catch (error) {
    const weatherElement = document.querySelector("#weather");
    const footerElement = document.querySelector("#footer");

    if (weatherElement) weatherElement.classList.remove("show");
    if (footerElement) footerElement.classList.remove("show");

    showAlert(`
                Não foi possível localizar...
                <img style="width:60px" src="img/404.png"/>
            `);
    console.error("Erro:", error);
  }
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

function showMovieSuggestions(movies) {
  const movieSuggestionsContainer =
    document.querySelector("#movie_suggestions");
  movieSuggestionsContainer.innerHTML = "";

  if (movies && movies.length > 0) {
    movies.forEach((movie) => {
      const movieItem = document.createElement("div");
      movieItem.className = "movie-item";

      if (movie.poster) {
        // Adiciona o pôster do filme
        movieItem.innerHTML = `
            <img src="${movie.poster}" alt="${movie.title}" />
            <p>${movie.title}</p>
            <p><strong>Avaliação:</strong> ${movie.rating}/10</p>
          `;
      } else {
        movieItem.textContent = movie.title; // Para mensagens de erro ou sem pôster
      }

      movieSuggestionsContainer.appendChild(movieItem);
    });

    document.querySelector("#movie_section").classList.add("show");
  } else {
    movieSuggestionsContainer.innerHTML = "<p>Nenhuma sugestão disponível.</p>";
    document.querySelector("#movie_section").classList.add("show");
  }
}
