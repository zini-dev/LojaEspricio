const express = require("express"); // Importa o Express para usar a function Router()
const router = express.Router();
const {produtoController} = require("../controllers/produtoController");

router.get("/produtos", produtoController.listarProdutos);

router.post("/produtos", produtoController.criarProduto); // dentro do "produtoController" chamar a função criarProduto

module.exports = {produtoRoutes: router}; // Produtos routes vai receber as rotas