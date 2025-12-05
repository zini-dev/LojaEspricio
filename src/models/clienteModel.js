const { sql, getConnection } = require("../config/db")
const bcrypt = require("bcrypt");

const clienteModel = {

    /**
  * Busca todos os clientes no banco de dados.
  * 
  * 
  * @async
  * @function buscarTodos
  * @returns {Promise<Array>} Retorna uma lista com todos os clientes.
  * @throws Mostra no console e propaga o erro caso a busca falhe.
  */
    buscarTodos: async () => {
        try {
            const pool = await getConnection();

            const querySQL = 'SELECT * FROM Clientes';

            const result = await pool.request()
                .query(querySQL);

            return result.recordset;

        } catch (error) {
            console.error("Erro ao buscar clientes:", error)
            throw error;
        }

    },

    /**
    * Busca apenas um produto no banco de dados.
    * 
    * @async
    * @function buscarUm
    * @param {string} idCliente - ID do cliente em UUID(ID Universal) no banco de dados.
    * @returns {Promise<array>} - Retorna uma lista com um cliente caso encontre no banco de dados.
    * @throws Mostra no console e propaga o erro caso a inserção falhe
    */
    buscarUm: async (idCliente) => {
        try {
            const pool = await getConnection();

            const querySQL = `
                SELECT * FROM Clientes
                WHERE idCliente = @idCliente
            `

            const result = await pool.request()
                .input("idCliente", sql.UniqueIdentifier, idCliente)
                .query(querySQL);

            return result.recordset;

        } catch (error) {

            console.error("Erro ao buscar cliente", error);
            throw error;

        }
    },


    /**
     * Insere um novo cliente no banco de dados.
     * 
     * @async
     * @function inserirCliente
     * @param {string} nomeCliente - Nome do cliente a ser cadastrado
     * @param {number} cpfCliente - CPF do cliente a ser cadastrado
     * @returns {Promise<void>} - Não retorna nada, apenas executa a inserção
     * @throws Mostra no console e propaga o erro caso a inserção falhe
     */
    inserirCliente: async (nomeCliente, cpfCliente, emailCliente, senhaCliente) => {
        try {
            const pool = await getConnection();

            const querySQL = `
                INSERT INTO Clientes (nomeCliente, cpfCliente, emailCliente, senhaCliente)
                VALUES (@nomeCliente, @cpfCliente, @emailCliente, @senhaCliente)
        `

            await pool.request()
                .input("nomeCliente", sql.VarChar(100), nomeCliente)
                .input("cpfCliente", sql.Char(11), cpfCliente)
                .input("emailCliente", sql.VarChar(200), emailCliente)
                .input("senhaCliente", sql.VarChar(255), senhaCliente)
                .query(querySQL)

        } catch (error) {
            console.error("Erro ao criar cliente:", error)
            throw error;
        }

    },


    /**
     * Verifica se o CPF já está cadastrado.
     * 
     * @async
     * @function verificaCpf
     * @returns {Promise<array>} - Retorna uma lista com os clientes filtrados.
     * @throws Mostra no console e propaga o erro caso a inserção falhe
     */
    verificaCpfAndEmail: async (cpfCliente, emailCliente) => {
        try {

            const pool = await getConnection();

            const querySQL = `
                SELECT * FROM Clientes
                WHERE cpfCliente=@cpfCliente OR emailCliente = @emailCLiente
            `

            const result = await pool.request()
                .input("cpfCliente", sql.Char(11), cpfCliente)
                .input("emailCliente", sql.VarChar(200), emailCliente)
                .query(querySQL);

            return result.recordset;
        } catch (error) {
            console.error("Erro ao verificar se CPF já está cadastrado:", error)
            throw error;
        }
    },

    /**
     * Atualiza um cliente no banco de dados.
     * 
     * @async
     * @function atualizarCliente
     * @param {string} idCliente - ID do cliente em UUID(ID Universal) no banco de dados.
     * @param {string} nomeCliente - Nome do cliente a ser atualizado.
     * @param {number} cpfCliente - CPF do cliente a ser atualizado.
     * @returns {Promise<void>} - Não retorna nada, apens executa a atualização.
     * @throws Mostra no console e propaga o erro caso a atualização falhe
     */
    //idProduto para saber quem ta atualizando e itens que podem ser atualizados
    atualizarCliente: async (idCliente, nomeCliente, cpfCliente) => {
        try {
            const pool = await getConnection();

            const querySQL = `
                UPDATE Clientes
                SET nomeCliente = @nomeCliente,
                    cpfCliente = @cpfCliente
                WHERE idCliente = @idCliente
            `;

            await pool.request()
                .input("idCliente", sql.UniqueIdentifier, idCliente)
                .input("nomeCliente", sql.VarChar(100), nomeCliente)
                .input("cpfCliente", sql.Char(11), cpfCliente)
                .query(querySQL);

        } catch (error) {

            console.error("Erro ao atualizar cliente", error)
            throw error;

        }
    },

    /**
     * Deleta um cliente no banco de dados.
     * 
     * @async
     * @function deletarCliente
     * @param {string} idCliente - ID do cliente para selecionar e ser excluido
     * @returns {Promise<void>} - Não retorna nada, apens executa a exclusão.
     * @throws Mostra no console e propaga o erro caso a atualização falhe
     */
    deletarCliente: async (idCliente) => {
        try {

            const pool = await getConnection();

            const querySQL = `
                DELETE FROM Clientes
                WHERE idCliente = @idCliente
            `;

            await pool.request()
                .input("idCliente", sql.UniqueIdentifier, idCliente)
                .query(querySQL)

        } catch (error) {

            console.error("Erro ao deletar o cliente:", error);
            throw error;

        }
    }
};

module.exports = { clienteModel };