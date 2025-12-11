//Porteiro - Antes da requisição

const jwt = require("jsonwebtoken");

//Objeto - Verificações
const verify = {
    cliente: async (req,res,next) => {
        try {
            const {token} = req.cookies;

            // Decodificar -- Verifica o token
            const decoded = jwt.verify(token, process.env.JWT_SECRET);

            if(!decoded.tipoUsuario || decoded.tipoUsuario !== "cliente"){
                return res.status(403).json({error: "Acesso permitido somente para clientes"})
            }

            next();
        } catch (error) {
            return res.status(401).json({error: "Token inválido ou expirado"})
        }
        
    }
};
module.exports = {verify};