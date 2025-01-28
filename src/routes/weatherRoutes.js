import express from "express";
import weatherController from "../controllers/weatherControllers.js";

const router = express.Router();

router.get("/", weatherController.getWeatherAndMovies);

export default router;
