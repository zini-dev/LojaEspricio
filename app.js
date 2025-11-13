const express = require("express");
const app = express();
const { produtoRoutes } = require("./src/routes/produtoRoutes");
const { clienteRoutes } = require("./src/routes/clienteRoutes");
const PORT = 8081;

app.use(express.json()); // Middleware

app.use('/', produtoRoutes);
app.use('/', clienteRoutes);

app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`)
})