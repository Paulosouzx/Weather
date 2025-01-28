import weatherService from "../services/weatherService.js";
import movieService from "../services/movieService.js";

const getWeatherAndMovies = async (req, res) => {
  const cityName = req.query.city;

  if (!cityName) {
    return res
      .status(400)
      .json({ error: "Você precisa fornecer o nome de uma cidade." });
  }
  try {
    const weatherData = await weatherService.getWeather(cityName);

    const movieSuggestions = await movieService.getMovieSuggestions(cityName);

    res.json({ weather: weatherData, movies: movieSuggestions });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export default { getWeatherAndMovies };
