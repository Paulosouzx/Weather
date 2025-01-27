import weatherService from "../services/weatherService.js";
import movieService from "../services/movieService.js";

// Controlador para pegar o clima e os filmes relacionados
const getWeatherAndMovies = async (req, res) => {
  const cityName = req.query.city;

  if (!cityName) {
    return res
      .status(400)
      .json({ error: "Você precisa fornecer o nome de uma cidade." });
  }

  try {
    // Obter informações do clima
    const weatherData = await weatherService.getWeather(cityName);

    // Obter sugestões de filmes baseadas no nome da cidade
    const movieSuggestions = await movieService.getMovieSuggestions(cityName);

    // Retornar os dados do clima e filmes
    res.json({ weather: weatherData, movies: movieSuggestions });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export default { getWeatherAndMovies };
