const { VarChar } = require("mssql");
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

            return result.recordset; // recordset retorna apenas o que está na tabela selecionada ( PRODUTOS )

        } catch (error) {
            console.error("Erro ao buscar produtos:", error)
            throw error; //Reverberar o erro para a função que o chamar
        }
    },

    /**
    * Busca apenas um produto no banco de dados.
    * 
    * @async
    * @function buscarUm
    * @param {string} idProduto - ID do produto em UUID(ID Universal) no banco de dados.
    * @returns {Promise<array>} - Retorna uma lista com um produto caso encontre no banco de dados.
    * @throws Mostra no console e propaga o erro caso a inserção falhe
    */
    buscarUm: async (idProduto) => {
        try {
            const pool = await getConnection();

            const querySQL = `
                SELECT * FROM Produtos
                WHERE idProduto=@idProduto
            `

            const result = await pool.request()
                .input("idProduto", sql.UniqueIdentifier, idProduto)
                .query(querySQL);

            return result.recordset;

        } catch (error) {

            console.error("Erro ao buscar produto", error);
            throw error;

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
    },


    /**
     * Atualiza um produto no banco de dados.
     * 
     * @async
     * @function atualizarProduto
     * @param {string} idProduto - ID do produto em UUID(ID Universal) no banco de dados.
     * @param {string} nomeProduto - Nome do produto a ser atualizado.
     * @param {number} precoProduto - Preço do produto a ser atualizado.
     * @returns {Promise<void>} - Não retorna nada, apens executa a atualização.
     * @throws Mostra no console e propaga o erro caso a atualização falhe
     */
    //idProduto para saber quem ta atualizando e itens que podem ser atualizados
    atualizarProduto: async (idProduto, nomeProduto, precoProduto) => {
        try {
            const pool = await getConnection();

            const querySQL = `
                UPDATE Produtos
                SET nomeProduto = @nomeProduto, 
                    precoProduto = @precoProduto
                WHERE idProduto = @idProduto
            `;
            // WHERE idProduto = @idProduto -- ALTERA APENAS O ID SELECIONADO -- UPDATE E DELETE NUNCA SE FAZ SEM WHERE
            // SET -- SETAR NOVO VALOR em nomeProduto recebe da variavel nomeProduto

            await pool.request()
                .input("idProduto", sql.UniqueIdentifier, idProduto)
                .input("nomeProduto", sql.VarChar(100), nomeProduto)
                .input("precoProduto", sql.Decimal(10, 2), precoProduto)
                .query(querySQL);

        } catch (error) {

            console.error("Erro ao atualizar produto:", error)
            throw error;

        }
    }
};


module.exports = { produtoModel }; //EXPORTANDO