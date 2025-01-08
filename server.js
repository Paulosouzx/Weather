const express = require("express");
const server = express();
const PORT = 3000;

server.use(express.static("public"));
server.use(express.json());

server.get("/", (req, res) => {
  res.json({ TEST: "Teste backend" });
});

server.listen(PORT, (req, res) => {
  console.log("Server ligado na porta http://localhost:3000");
});
