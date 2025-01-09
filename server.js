import "dotenv/config";
import express from "express";
import helmet from "helmet";
import weatherRoutes from "./src/routes/weatherRoutes.js";

const server = express();
const PORT = 3000;

server.use(express.static("public"));
server.use(express.json());
server.use(helmet());

server.use("/api", weatherRoutes);

server.listen(PORT, (req, res) => {
  console.log("Server ligado na porta http://localhost:3000");
});
