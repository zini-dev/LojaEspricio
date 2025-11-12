const { produtoModel } = require("../models/produtoModel"); // IMPORTANDO




const produtoController = {
    /**
     * Controlador que lista todos os produtos do banco de dados
     * 
     * 
     * @async
     * @function listarProdutos
     * @param {object} req - Objeto da requisição (recebido do cliente HTTP)
     * @param {object} res - Objeto da resposta (enviado ao cliente HTTP)
     * 
     * @returns {Promise<void>} Retorna uma resposta JSON com a lista de produtos
     * 
     * @throws Mostra no console e retorna erro 500 se ocorrer falha ao buscar os produtos.
     */
    listarProdutos: async (req, res) => {
        try {

            const { idProduto } = req.query;

            if (idProduto) {
                if (idProduto.length != 36) {
                    return res.status(400).json({ erro: `Id do Produto é inválido` })
                }
                
                const produto = await produtoModel.buscarUm(idProduto);
                return res.status(200).json(produto);

            }

            const produtos = await produtoModel.buscarTodos(); //Função buscarTodos leva para const produtos

            res.status(200).json(produtos)

        } catch (error) {
            console.error('Erro ao listar produtos:', error);
            res.status(500).json({ error: `Erro interno no servidor ao buscar produtos.` })
        }
    },



    /**
     * Controlador que cria um novo produto no banco de dados
     * 
     * @async
     * @function criarProduto
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
     *  "nomeProduto": "Camiseta",
     *  "precoProduto": 49.90
     * }
     */
    criarProduto: async (req, res) => {
        try {

            const { nomeProduto, precoProduto } = req.body;

            if (nomeProduto == undefined || nomeProduto.trim() == "" || precoProduto == undefined || isNaN(precoProduto)) {
                return res.status(400).json({ erro: "Campos obrigatórios não preenchidos" })
            }

            await produtoModel.inserirProduto(nomeProduto, precoProduto); // Cadastro

            res.status(201).json({ message: "Produto cadastrado com sucesso!" });

        } catch (error) {
            console.error('Erro ao cadastrar produto:', error);
            res.status(500).json({ error: `Erro ao buscar produtos.` })
        }
    }
};

module.exports = { produtoController }; // EXPORTANDO