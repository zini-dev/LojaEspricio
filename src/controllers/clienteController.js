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
            const { nomeCliente, cpfCliente } = req.body;

            if (nomeCliente == "" || nomeCliente == undefined || cpfCliente.trim() == "" || cpfCliente == undefined) {
                return res.status(400).json({ erro: "Campos obrigatórios não preenchidos" })
            }

            const cliente = await clienteModel.verificaCpf(cpfCliente);

            if (cliente.length > 0) {
                return res.status(409).json({erro: "CPF já cadastrado!"});
            }

            await clienteModel.inserirCliente(nomeCliente, cpfCliente);

            res.status(201).json({ message: "Cliente cadastrado com sucesso!" });
        } catch (error) {
            console.error('Erro ao cadastrar cliente:', error);
            res.status(500).json({ error: `Erro ao cadastrar cliente.` })
        }
    }
};

module.exports = { clienteController };