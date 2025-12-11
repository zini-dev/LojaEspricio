const express = require("express");
const app = express();
require("dotenv").config(); // Faz a injeção de dependências

const { produtoRoutes } = require("./src/routes/produtoRoutes");
const { clienteRoutes } = require("./src/routes/clienteRoutes");

const PORT = process.env.PORT;
const cookieParser = require("cookie-parser");

app.use(express.json()); // Middleware
app.use(cookieParser());

app.use('/', produtoRoutes);
app.use('/', clienteRoutes);

app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`)
})