const express = require("express");
const app = express();
const { produtoRoutes } = require("./src/routes/produtoRoutes");
const PORT = 8081;

app.use(express.json());

app.use('/', produtoRoutes);

app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`)
})