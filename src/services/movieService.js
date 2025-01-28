import axios from "axios";

const apiKeyTMDB = "1faf5bfaeee634f33cfefcd45fa3fb78";
const apiUrlTMDB = "https://api.themoviedb.org/3/search/movie";

async function getMovieSuggestions(weatherDescription) {
  const query = encodeURIComponent(weatherDescription);

  const url = `${apiUrlTMDB}?query=${query}&api_key=${apiKeyTMDB}&language=pt-BR`;

  try {
    const response = await axios.get(url);
    const data = response.data;

    if (data.results && data.results.length > 0) {
      const filteredMovies = data.results.filter(
        (movie) => movie.poster_path && movie.vote_average
      );

      const randomMovies = shuffleArray(filteredMovies).slice(0, 1);

      return randomMovies.map((movie) => ({
        title: movie.title,
        releaseDate: movie.release_date,
        poster: `https://image.tmdb.org/t/p/w500${movie.poster_path}`,
        rating: movie.vote_average,
      }));
    } else {
      return [
        { title: "Nenhum filme encontrado para esta condição climática." },
      ];
    }
  } catch (error) {
    console.error("Erro ao buscar filmes da API TMDb:", error.message);
    return [{ title: "Erro ao buscar filmes. Tente novamente mais tarde." }];
  }
}

function shuffleArray(array) {
  const shuffled = array.slice(); // Cria uma cópia do array original
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

export default { getMovieSuggestions };
