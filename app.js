const express = require("express");
const app = express();
const cors = require("cors");
require("dotenv").config(); // Carrega as variáveis de ambiente

const path = require("path");
const axios = require("axios");
const cookieParser = require("cookie-parser");
const jwt = require("jsonwebtoken"); // IMPORTANTE: Necessário para verificar a segurança

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '/src/views'));
app.use(express.static(path.join(__dirname, '/src/public')));

const { produtoRoutes } = require("./src/routes/produtoRoutes");
const { clienteRoutes } = require("./src/routes/clienteRoutes");

const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(cookieParser());
app.use(cors());

// --- 1. MIDDLEWARE DE SEGURANÇA (O GUARDA-COSTA) ---
// Essa função impede que quem não tem login entre no dashboard
function verificarAutenticacao(req, res, next) {
    const token = req.cookies.token;

    if (!token) {
        return res.redirect('/'); // Se não tem token, manda pro login
    }

    try {
        jwt.verify(token, process.env.JWT_SECRET);
        next(); // Token válido, pode entrar
    } catch (error) {
        console.log("Token inválido ou expirado");
        res.clearCookie('token'); // Limpa o token ruim
        return res.redirect('/');
    }
}

// --- 2. ROTA DE LOGIN (RAIZ) ---
app.get('/', (req, res) => {
    // Se o usuário JÁ tem um token válido, manda direto pro dashboard
    if(req.cookies.token) {
        try {
            jwt.verify(req.cookies.token, process.env.JWT_SECRET);
            return res.redirect('/dashboard');
        } catch(e) {
            // Se der erro na verificação, apenas ignora e mostra o login
            res.clearCookie('token');
        }
    }
    res.render('login');
});

// --- 3. ROTA DE CADASTRO ---
app.get('/cadastro', (req, res) => {
    // Se o usuário já está logado, não deixa cadastrar de novo, manda pro dashboard
    if(req.cookies.token) {
        try {
            jwt.verify(req.cookies.token, process.env.JWT_SECRET);
            return res.redirect('/dashboard');
        } catch(e) {
            res.clearCookie('token');
        }
    }
    res.render('cadastro');
});

// --- 4. ROTA DO DASHBOARD (PROTEGIDA) ---
// Note o 'verificarAutenticacao' aqui no meio
app.get('/dashboard', verificarAutenticacao, async (req, res) => {
    try {
        const response = await axios.get('https://api-lojaespricio.onrender.com/produtos');
        const produtos = response.data;
        res.render('dashboard', { produtos });
    } catch (error) {
        console.error(error);
        res.render('dashboard', { produtos: [] });
    }
});


app.get('/logout', (req, res) => {
    res.clearCookie('token'); // Apaga a "pulseira"
    res.redirect('/'); // Manda de volta pro login
});

// Rotas da API
app.use('/', produtoRoutes);
app.use('/', clienteRoutes);

app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`)
});