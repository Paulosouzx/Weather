import "dotenv/config";
import express from "express";
import helmet from "helmet";
import fetch from "node-fetch";
import path from "path";
import { fileURLToPath } from "url";
import movieService from "./src/services/movieService.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const server = express();
const PORT = 5000;
const API_KEY = "8a60b2de14f7a17c7a11706b2cfcd87c";

server.use(express.static("public"));
server.use(express.json());
server.use(helmet());

// Rota para o arquivo supabase.js
server.get("/src/data/supabase.js", (req, res) => {
  res.sendFile(path.join(__dirname, "src", "data", "supabase.js"));
});

// Rota para buscar clima e sugestões de filmes
server.get("/api/weather", async (req, res) => {
  const { city } = req.query;
  if (!city) {
    return res.status(400).json({ error: "Cidade não especificada." });
  }

  try {
    // Faz a chamada para a API de clima
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`;
    const response = await fetch(apiUrl);
    const weatherData = await response.json();

    if (!weatherData || weatherData.cod !== 200) {
      return res.status(400).json({ error: "Cidade não encontrada." });
    }

    // Busca filmes com base no nome da cidade
    const movies = await movieService.getMovieSuggestions(city);

    res.json({
      weather: weatherData,
      movies,
    });
  } catch (error) {
    console.error("Erro ao buscar dados da API:", error);
    res.status(500).json({ error: "Erro ao buscar dados da API" });
  }
});

// Inicialização do servidor
server.listen(PORT, () => {
  console.log(`Server ligado na porta http://localhost:${PORT}`);
});
