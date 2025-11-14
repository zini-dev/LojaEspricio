const { produtoModel } = require("../models/produtoModel"); // IMPORTANDO



//Objeto
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
    },

    atualizarProduto: async (req, res) => {
        try {
            const { idProduto } = req.params; // Obrigatório ter idProduto por isso ser .params
            const { nomeProduto, precoProduto } = req.body;

            // VALIDAR SE ID EXISTE
            if (idProduto.length != 36) {
                return res.status(400).json({ erro: "Id do produto inválido!" })
            }

            // VALIDAR SE PRODUTO EXISTE
            const produto = await produtoModel.buscarUm(idProduto);

            // VALIDAR SE TEM PRODUTO -- !produto == se for false entra dentro do IF -- Ele inverte
            if (!produto || produto.length !== 1) {
                return res.status(404).json({ erro: "Produto não encontrado" })
            }

            // SE NÃO COLOCAR OS DADOS ELES CONTINUAM COM OS DADOS ATUAIS DO BANCO DE DADOS
            const produtoAtual = produto[0];

            // OPERADOR TERNÁRIO -- ou é nulo ou é indefinido -- Se for isso continua com os dados atuais do DB
            const nomeAtualizado = nomeProduto ?? produtoAtual.nomeProduto;
            const precoAtualizado = precoProduto ?? produtoAtual.precoProduto;

            await produtoModel.atualizarProduto(idProduto, nomeAtualizado, precoAtualizado);

            res.status(200).json({ message: "Produto atualizado com sucesso" });

        } catch (error) {
            console.error('Erro ao atualizar produto:', error);
            res.status(500).json({ error: `Erro ao atualizar produtos.` });
        }
    },

    deletarProduto: async (req, res) => {
        try {

            const {idProduto} = req.params;


            // VALIDAR SE ID EXISTE
            if (idProduto.length != 36) {
                return res.status(400).json({ erro: `Id do produto inválido` });
            }

            // VALIDAR SE PRODUTO EXISTE
            const produto = await produtoModel.buscarUm(idProduto);

            // VALIDAR SE TEM PRODUTO -- !produto == se for false entra dentro do IF -- Ele inverte
            if (!produto || produto.length !== 1) {
                return res.status(404).json({ erro: "Produto não encontrado" });
            }

            await produtoModel.deletarProduto(idProduto);

            res.status(200).json({ message: "Produto deletado com sucesso" });

        } catch (error) {
            console.error('Erro ao deletar produto:', error);
            res.status(500).json({ error: `Erro ao deletar produto.` });
        }
    }
};

module.exports = { produtoController }; // EXPORTANDO