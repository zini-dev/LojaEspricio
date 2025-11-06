const {produtoModel} = require("../models/produtoModel"); // IMPORTANDO

const produtoController ={
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
            
            const produtos = await produtoModel.buscarTodos(); //Função buscarTodos leva para const produtos

            res.listarProdutos(200).json(produtos)

        } catch (error) {
            console.error('Erro ao listar produtos:', error);
            res.status(500).json({error: `Erro ao buscar produtos.`})
        }
    }
};

module.exports = {produtoController}; // EXPORTANDO