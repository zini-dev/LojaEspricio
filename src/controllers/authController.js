const bcrypt =  require("bcrypt");
const jwt = require("jsonwebtoken");
const {clienteModel} = require("../models/clienteModel");


//Responsavel por gerenciar a criação do TOKEN
const authController = {
    clienteLogin: async (req, res) => {
        try {
            const {emailCliente, cpfCliente, senhaCliente} = req.body;

            if((emailCliente == undefined && cpfCliente == undefined) || senhaCliente == undefined){
                return res.status(400).json({error: "E-Mail ou CPF e senha são obrigatórios!"})
            }

            
        } catch (error) {
            
        }
    }
};

module.exports = { authController };