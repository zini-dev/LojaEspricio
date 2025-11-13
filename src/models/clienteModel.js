const { sql, getConnection } = require("../config/db")

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
     * Insere um novo cliente no banco de dados.
     * 
     * @async
     * @function inserirCliente
     * @param {string} nomeCliente - Nome do cliente a ser cadastrado
     * @param {number} cpfCliente - CPF do cliente a ser cadastrado
     * @returns {Promise<void>} - Não retorna nada, apenas executa a inserção
     * @throws Mostra no console e propaga o erro caso a inserção falhe
     */
    inserirCliente: async (nomeCliente, cpfCliente) => {
        try {
            const pool = await getConnection();

            const querySQL = `
                INSERT INTO Clientes (nomeCliente, cpfCliente)
                VALUES (@nomeCliente, @cpfCliente)
        `

            await pool.request()
                .input("nomeCliente", sql.VarChar(100), nomeCliente)
                .input("cpfCliente", sql.Char(11), cpfCliente)
                .query(querySQL)

        } catch (error) {
            console.error("Erro ao criar cliente:", error)
            throw error;
        }

    },

    verificaCpf: async (cpfCliente) => {
        try {
            
            const pool = await getConnection();
    
            const querySQL = `
                SELECT * FROM Clientes
                WHERE cpfCliente=@cpfCliente
            `
    
            const result = await pool.request()
                .input("cpfCliente", sql.Char(11), cpfCliente)
                .query(querySQL);
    
            return result.recordset;
        } catch (error) {
            
        }
    }
};

module.exports = { clienteModel };