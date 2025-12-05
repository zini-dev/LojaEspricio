const bcrypt = require("bcrypt"); // Importação da biblioteca bcrypt

let senha = "Senha-123";

const saltRounds = 10;

const senhaCriptografada = bcrypt.hashSync(senha, saltRounds); // hashSync - Gera o hash

console.log("Senha original", senha);
console.log("Senha criptografada", senhaCriptografada);

const senhaValida = bcrypt.compareSync(senha, senhaCriptografada); // compareSync - Compara a senha com o hash

if(senhaValida) {
    console.log("Senha válida!");
} else {
    console.log("Senha inválida!");
}