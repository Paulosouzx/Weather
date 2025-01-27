import axios from "axios";

// Chave de API e URL base do TMDb
const apiKeyTMDB = "1faf5bfaeee634f33cfefcd45fa3fb78"; // Sua chave de API
const apiUrlTMDB = "https://api.themoviedb.org/3/search/movie"; // URL base fixa

// Função para buscar filmes relacionados à descrição do clima
async function getMovieSuggestions(weatherDescription) {
  // Define uma busca genérica baseada na descrição do clima
  const query = encodeURIComponent(weatherDescription);

  // Constrói o URL da API com os parâmetros de consulta
  const url = `${apiUrlTMDB}?query=${query}&api_key=${apiKeyTMDB}&language=pt-BR`;

  try {
    const response = await axios.get(url);
    const data = response.data;

    if (data.results && data.results.length > 0) {
      // Mapeia os resultados para incluir apenas os dados necessários
      const movieDetails = data.results
        .filter((movie) => movie.poster_path && movie.vote_average) // Apenas filmes com pôster e avaliação
        .map((movie) => ({
          title: movie.title,
          releaseDate: movie.release_date,
          poster: `https://image.tmdb.org/t/p/w500${movie.poster_path}`,
          rating: movie.vote_average
        }));

      return movieDetails;
    } else {
      return [{title: "Nenhum filme encontrado para esta condição climática."}];
    }
  } catch (error) {
    console.error("Erro ao buscar filmes da API TMDb:", error.message);
    return [{title: "Erro ao buscar filmes. Tente novamente mais tarde."}];
  }
}

export default {getMovieSuggestions};
