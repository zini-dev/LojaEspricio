const {sql, getConnection} = require("../config/db") // IMPORTANDO -- Caminho para acessar o DB


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
            
            const pool = await getConnection(); // COLETANDO UMA CONEXÃO

            const querySQL = 'SELECT * FROM Produtos'; // Seleciona tudo da tabela PRODUTOS

            const result = await pool.request()
                .query(querySQL);

                return result.recordset; // recordset retoran apenas o que está na tabela seleciona ( PRODUTOS )

        } catch (error) {
            console.error("Erro ao buscar produtos:", error)
            throw error; //Reverberar o erro para a função que o chamar
        }
    }
};


module.exports = {produtoModel}; //EXPORTANDO