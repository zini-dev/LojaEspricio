const { clienteModel } = require("../models/clienteModel");
const bcrypt = require("bcrypt");
const { z, ZodError } = require("zod");

const clienteZod = z.object({
    body: z.object({
        nomeCliente: z.string(),
        cpfCliente: z.string().min(11, "CPF não tem 11 caracteres"),
        emailCliente: z.email("Email Inválido!"),
        senhaCliente: z.string()
            .min(8, "A senha deve ter pelo menos 8 caracteres")
            .regex(/[A-Z]/, "A senha deve ter pelo menos uma letra maiúscula")
    })
});


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
 *  "cpfCliente": "52756444357"
 * }
 */
    criarCliente: async (req, res) => {
        try {

            dados = clienteZod.parse({ body: req.body });

            const { nomeCliente, cpfCliente, emailCliente, senhaCliente } = dados.body;


            // if (nomeCliente == "" || nomeCliente == undefined || cpfCliente.trim() == "" || cpfCliente == undefined || emailCliente.trim() == "" || emailCliente == undefined || !emailCliente.includes("@") || senhaCliente == "" || senhaCliente == undefined || senhaCliente.length > 8 || !isUpperCase(senhaCliente)) {
            //     console.log(isUpperCase(senhaCliente));
            //     return res.status(400).json({ erro: "Campos obrigatórios não preenchidos" })
            // }

            const saltRounds = 10;
            const senhaCriptografada = bcrypt.hashSync(senhaCliente, saltRounds);

            const cliente = await clienteModel.verificaCpfAndEmail(cpfCliente, emailCliente);

            if (cliente.length > 0) {
                return res.status(409).json({ erro: "CPF ou E-Mail já cadastrado!" });
            };

            await clienteModel.inserirCliente(nomeCliente, cpfCliente, emailCliente, senhaCriptografada);

            res.status(201).json({ message: "Cliente cadastrado com sucesso!" });

        } catch (error) {

            if (error instanceof ZodError) {


                return res.status(400).json(error.format().body);
            }


            console.error('Erro ao cadastrar cliente:', error);
            res.status(500).json({ erro: `Erro ao cadastrar cliente.` })

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

            await clienteModel.atualizarCliente(idCliente, nomeAtualizado, cpfAtualizado);

            res.status(200).json({ message: "Cliente atualizado com sucesso" });

        } catch (error) {
            console.error('Erro ao atualizar cliente:', error);
            res.status(500).json({ error: `Erro ao atualizar cliente.` });
        }
    },

    deletarCliente: async (req, res) => {
        try {
            const { idCliente } = req.params;

            // Verifica se o ID é válido
            if (idCliente.length != 36) {
                return res.status(400).json({ erro: "Id do cliente é inválido" })
            }

            // Verificado se o cliente existe
            const cliente = await clienteModel.buscarUm(idCliente);

            if (!cliente || cliente.length !== 1) {
                return res.status(404).json({ erro: "Cliente não encontrado" });
            }

            await clienteModel.deletarCliente(idCliente);

            res.status(200).json({ message: "Cliente deletado com sucesso" })

        } catch (error) {
            console.error('Erro ao deletar cliente:', error);
            res.status(500).json({ error: `Erro ao deletar cliente.` });
        }
    }
};

module.exports = { clienteController };