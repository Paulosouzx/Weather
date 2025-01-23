import axios from "axios";

document.querySelector("#search").addEventListener("submit", async (event) => {
  event.preventDefault();

  const cityName = document.querySelector("#city_name").value;

  if (!cityName) {
    alert("Você precisa digitar uma cidade...");
    return;
  }

  try {
    const response = await fetch(`/api/?city=${cityName}`);
    const data = await response.json();

    if (data.error) {
      alert(data.error);
      return;
    }

    showInfo(data.weather);
    updateMovieSuggestions(data.movies);
  } catch (error) {
    console.error("Erro na requisição ao servidor", error);
    alert("Erro ao buscar informações do servidor.");
  }
});
