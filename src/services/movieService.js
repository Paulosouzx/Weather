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
      // Filtra apenas os filmes com pôster e avaliação
      const filteredMovies = data.results.filter(
        (movie) => movie.poster_path && movie.vote_average
      );

      // Seleciona aleatoriamente até 3 filmes
      const randomMovies = shuffleArray(filteredMovies).slice(0, 1);

      // Mapeia os resultados para incluir apenas os dados necessários
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

// Função para embaralhar um array (Fisher-Yates Shuffle)
function shuffleArray(array) {
  const shuffled = array.slice(); // Cria uma cópia do array original
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

export default { getMovieSuggestions };
