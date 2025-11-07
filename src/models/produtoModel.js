const { sql, getConnection } = require("../config/db") // IMPORTANDO -- Caminho para acessar o DB




const produtoModel = {
    /**
 * Busca todos os produtos no banco de dados.
 * 
 * 
 * @async
 * @function buscarTodos
 * @returns {Promise<Array>} Retorna uma lista com todos os produtos.
 * @throws Mostra no console e propaga o erro caso a busca falhe.
 */
    buscarTodos: async () => {
        try {

            const pool = await getConnection(); // Estabelecendo conexão com o DB 

            const querySQL = 'SELECT * FROM Produtos'; // Seleciona tudo da tabela PRODUTOS

            const result = await pool.request()
                .query(querySQL);

            return result.recordset; // recordset retoran apenas o que está na tabela seleciona ( PRODUTOS )

        } catch (error) {
            console.error("Erro ao buscar produtos:", error)
            throw error; //Reverberar o erro para a função que o chamar
        }
    },




    /**
     * Insere um novo produto no banco de dados.
     * 
     * @async
     * @function inserirProduto
     * @param {string} nomeProduto - Nome do produto a ser cadastrado
     * @param {number} precoProduto - Preço do produto a ser cadastrado
     * @returns {Promise<void>} - Não retorna nada, apenas executa a inserção
     * @throws Mostra no console e propaga o erro caso a inserção falhe
     */
    inserirProduto: async (nomeProduto, precoProduto) => {
        try {

            const pool = await getConnection(); // Estabelecendo conexão com o DB 

            const querySQL = `
                INSERT INTO Produtos (nomeProduto, precoProduto)
                VALUES (@nomeProduto, @precoProduto)
            `

            await pool.request() // Operação que vai inserir dados dentro do SQL
                .input("nomeProduto", sql.VarChar(100), nomeProduto)
                .input("precoProduto", sql.Decimal(10, 2), precoProduto) //ADICIONA VALOR A VARIAVEL
                .query(querySQL);

        } catch (error) {
            console.error("Erro ao inserir produto:", error)
            throw error;
        }
    }
};


module.exports = { produtoModel }; //EXPORTANDO