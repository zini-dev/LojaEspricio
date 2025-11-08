const express = require("express");
const router = express.Router();
const {clienteController} = require("../controllers/clienteController");

router.get("/clientes", clienteController.listarClientes)

module.exports = {clienteRoutes: router}