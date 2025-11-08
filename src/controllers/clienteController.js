const { clienteModel } = require("../models/clienteModel")

const clienteController = {
    listarClientes: async (req, res) => {
        try {
            const clientes = await clienteModel.buscarTodos();

            res.status(200).json(clientes)
        } catch (error) {
            console.error('Erro ao listar clientes:', error);
            res.status(500).json({ error: `Erro ao buscar clientes.` })
        }
    },


    criarCliente: async (req, res) => {
        try {
            const {nomeCliente, cpfCliente} = req.body;

            if(nomeCliente == "" || nomeCliente == undefined || cpfCliente == "" || cpfCliente == undefined || isNaN(cpfCliente)){
                return res.status(400).json({erro: "Campos obrigatórios não preenchidos"})
            }
        } catch (error) {
             console.error('Erro ao cadastrar cliente:', error);
            res.status(500).json({ error: `Erro ao buscar cliente.` })
        }
    }
};

module.exports = {clienteController}