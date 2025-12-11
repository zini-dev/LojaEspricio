const express = require("express");
const router = express.Router();
const { clienteController } = require("../controllers/clienteController");
const { authController } = require("../controllers/authController");

router.get("/clientes", clienteController.listarClientes);

router.post("/clientes", clienteController.criarCliente);

router.put("/clientes/:idCliente", clienteController.atualizarCliente);

router.delete("/clientes/:idCliente", clienteController.deletarCliente);

router.post("/clientes/login", authController.clienteLogin)

    module.exports = { clienteRoutes: router };