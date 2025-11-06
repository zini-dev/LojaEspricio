const sql = require("mssql"); //Importação da biblioteca MSSQL

const config = { // const de CONFIGURAÇÃO para configuração de DB
    user: "sa",
    password: "123456789",
    server: "localhost",
    database: "LojaEspricio",
    options: { //Deixa mais fácil de conectar
        encrypt: true, //Conexão já esta segura
        trustServerCertificate: true, //Ignorar se tiver erro pois não precisa de certificado

    }
};


/**
 * Cria e retorna uma conexão com o banco de dados SQL Server
 * 
 * @async
 * @function getConnection
 * @returns {Promise<object>} Retorna o objeto de conexão (pool) com o banco de dados
 * 
 * @throws Mostra no console se ocorrer erro na conexão.
 */
async function getConnection() { // FUNÇÃO QUE CONECTA CONEXÕES COM O DB - FUNÇÃO ASSINCRONA (getConnection == Pegar uma conexão)
    try {

        const pool = await sql.connect(config) //AGUARDAR ELE REALIZAR UMA CONEXÃO
        return pool; //QUANDO REALIZA A CONEXÃO RETORNAMOS ELA

    } catch (error) {
        console.error(`Erro na conexão SQL Server`, error)
    }
};

// (async () => { //TESTANDO CONEXÃO

//     const pool = await getConnection(); //AGUARDAR UMA CONEXÃO

//     const result = await pool.request().query("SELECT * FROM Produtos"); // FAZ UMA CONSULTA NA TABELA "PRODUTOS"

//     console.log(result.recordset);

// })();

module.exports = { sql, getConnection }; //EXPORTANDO --  biblioteca sql e função getConnection
