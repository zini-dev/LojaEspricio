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

            const result = await clienteModel.buscarEmailOrCpf(cpfCliente, emailCliente);

            if (result.length == 0){
                return res.status(401).json({error: "E-Mail ou CPF não encontrado"});
            }

            const cliente = result[0];

            const senhaValida = await bcrypt.compare(senhaCliente, cliente.senhaCliente);

            if(!senhaValida){
                return res.status(401).json({error: "Senha inválida!"})
            }

            //Payload - Dados que sistema precisa trabalhar / Id do cliente - nome dele e tipo de usuário
            const payload = {
                idCliente: cliente.idCliente,
                nomeCliente: cliente.nomeCliente,
                tipoUsuario: "cliente"
            };

            //Token
            const token = jwt.sign(payload, process.env.JWT_SECRET,{
                expiresIn: process.env.JWT_EXPIRES_IN
            });

            //Cookie
            res.cookie("token", token, {
                httpOnly: true,
                secure: false,
                sameSite: "strict", //Deixar restrito a aplicação 
                maxAge: Number(process.env.JWT_TIME_EXPIRES_IN)//Apagar token no site
            });


            res.status(200).json({message: "Login realizado com sucesso!", token})

        } catch (error) {
            console.error("Erro no login do cliente", error);
            return res.status(500).json({error: "Erro interno no servidor ao realizar o login do cliente"})
        }
    }
};

module.exports = { authController };