const express = require("express");
const app = express();
const cors = require("cors"); //teste
require("dotenv").config(); // Faz a injeção de dependências

const { produtoRoutes } = require("./src/routes/produtoRoutes");
const { clienteRoutes } = require("./src/routes/clienteRoutes");

const PORT = process.env.PORT;
const cookieParser = require("cookie-parser");

app.use(express.json()); // Middleware
app.use(cookieParser());
app.use(cors());

app.use('/', clienteRoutes); //teste
app.use('/', produtoRoutes);
app.use('/', clienteRoutes);

app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`)
})