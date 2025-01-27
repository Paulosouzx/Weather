import "dotenv/config";
import express from "express";
import helmet from "helmet";
import fetch from "node-fetch";
import path from "path";
import {fileURLToPath} from "url";

const __filename = fileURLToPath(import.meta.url); // Resolve o caminho do arquivo atual
const __dirname = path.dirname(__filename); // Resolve o diretório atual

const server = express();
const PORT = 5000;
const API_KEY = "8a60b2de14f7a17c7a11706b2cfcd87c";

server.use(express.static("public"));
server.use(express.json());
server.use(helmet());

// Adiciona o roteamento para o arquivo dataAcess.js
server.get("/src/data/supabase.js", (req, res) => {
  res.sendFile(path.join(__dirname, "src", "data", "supabase.js"));
});

server.get("/api/weather", async (req, res) => {
  const {city} = req.query;
  if (!city) {
    return res.status(400).json({error: "Cidade não especificada."});
  }

  try {
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`;
    const response = await fetch(apiUrl);
    const weatherData = await response.json();

    if (!weatherData || weatherData.cod !== 200) {
      return res.status(400).json({error: "Cidade não encontrada."});
    }

    res.json({
      weather: weatherData,
      movies: suggestMovies(weatherData.weather[0].main)
    });
  } catch (error) {
    res.status(500).json({error: "Erro ao buscar dados da API"});
  }
});

function suggestMovies(weatherCondition) {
  const movieSuggestions = {
    Rain: ["Blade Runner 2049", "O Nevoeiro"],
    Clear: ["Mad Max", "Interestelar"],
    Clouds: ["O Dia Depois de Amanhã", "Silent Hill"],
    Snow: ["O Regresso", "Frozen"],
    Thunderstorm: ["Tempestade", "Twister"]
  };
  return (
    movieSuggestions[weatherCondition] || ["Sem sugestões para este clima"]
  );
}

server.listen(PORT, () => {
  console.log(`Server ligado na porta http://localhost:${PORT}`);
});
