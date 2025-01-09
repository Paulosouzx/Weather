import express from "express";
import weatherController from "../controllers/weatherControllers.js";

const router = express.Router();

// Rota para buscar clima e sugestões de filmes
router.get("/", weatherController.getWeatherAndMovies);

export default router;
