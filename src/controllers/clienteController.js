const { clienteModel } = require("../models/clienteModel")

const clienteController = {


    /**
    * Controlador que lista todos os produtos do banco de dados
    * 
    * 
    * @async
    * @function listarClientes
    * @param {object} req - Objeto da requisição (recebido do cliente HTTP)
    * @param {object} res - Objeto da resposta (enviado ao cliente HTTP)
    * 
    * @returns {Promise<void>} Retorna uma resposta JSON com a lista de clientes
    * 
    * @throws Mostra no console e retorna erro 500 se ocorrer falha ao buscar os produtos.
    */
    listarClientes: async (req, res) => {
        try {

            const { idCliente } = req.query;

            if (idCliente) {
                if (idCliente.length != 36) {
                    return res.status(400).json({ erro: `Id do Produto é inválido` })
                }

                const cliente = await clienteModel.buscarUm(idCliente);
                return res.status(200).json(cliente);

            }

            const clientes = await clienteModel.buscarTodos();

            res.status(200).json(clientes)
        } catch (error) {
            console.error('Erro ao listar clientes:', error);
            res.status(500).json({ error: `Erro ao buscar clientes.` })
        }
    },



    /**
 * Controlador que cria um novo produto no banco de dados
 * 
 * @async
 * @function criarCliente
 * @param {object} req - Objeto da requisição (recebido do cliente HTTP)
 * @param {object} res - Objeto da resposta (enviado ao cliente HTTP)
 * @returns {Promise<void>} Retorna uma mensagem de sucesso ou erro em formato JSON
 * @throws {400} Se algum campo obrigatório não for preenchido corretamente.
 * @throws {500} Se ocorrer qualquer erro interno no servidor.
 * 
 * @example
 * POST /produtos
 * BODY
 * {
 *  "nomeCliente": "Guilherme Zini",
 *  "cpfCliente": "52756445827"
 * }
 */
    criarCliente: async (req, res) => {
        try {
            const { nomeCliente, cpfCliente } = req.body;

            if (nomeCliente == "" || nomeCliente == undefined || cpfCliente.trim() == "" || cpfCliente == undefined) {
                return res.status(400).json({ erro: "Campos obrigatórios não preenchidos" })
            }

            const cliente = await clienteModel.verificaCpf(cpfCliente);

            if (cliente.length > 0) {
                return res.status(409).json({ erro: "CPF já cadastrado!" });
            }

            await clienteModel.inserirCliente(nomeCliente, cpfCliente);

            res.status(201).json({ message: "Cliente cadastrado com sucesso!" });
        } catch (error) {
            console.error('Erro ao cadastrar cliente:', error);
            res.status(500).json({ error: `Erro ao cadastrar cliente.` })
        }
    },

    atualizarCliente: async (req, res) => {
        try {
            const { idCliente } = req.params;
            const { nomeCliente, cpfCliente } = req.body;

            //Validação do ID DO CLIENTE
            if (idCliente.length != 36) {
                return res.status(400).json({ erro: "Id do cliente é inválido" });
            }

            //VALIDAR SE CLIENTE EXISTE
            const cliente = await clienteModel.buscarUm(idCliente);

            // VALIDAR SE TEM CLIENTE -- !cliente == se for false entra dentro do IF -- Ele inverte
            if (!cliente || cliente.length !== 1) {
                return res.status(404).json({ erro: "Cliente não encontrado" });
            }

            // SE NÃO COLOCAR OS DADOS ELES CONTINUAM COM OS DADOS ATUAIS DO BANCO DE DADOS
            const clienteAtual = cliente[0];

            // OPERADOR TERNÁRIO -- ou é nulo ou é indefinido -- Se for isso continua com os dados atuais do DB
            const nomeAtualizado = nomeCliente ?? clienteAtual.nomeCliente;
            const cpfAtualizado = cpfCliente ?? clienteAtual.cpfCliente;

            await clienteModel.atualizarCliente(idCliente, nomeCliente, cpfCliente);

            res.status(200).json({ message: "Cliente atualizado com sucesso" });

        } catch (error) {
            console.error('Erro ao atualizar cliente:', error);
            res.status(500).json({ error: `Erro ao atualizar cliente.` });
        }
    }
};

module.exports = { clienteController };