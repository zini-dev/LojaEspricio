const express = require("express");
const app = express();
const cors = require("cors");
require("dotenv").config();
const path = require("path");
const axios = require("axios");
const cookieParser = require("cookie-parser");
// ADICIONE ISTO: Precisamos do jwt aqui para verificar a "pulseira"
const jwt = require("jsonwebtoken"); 

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '/src/views'));
app.use(express.static(path.join(__dirname, '/src/public')));

const { produtoRoutes } = require("./src/routes/produtoRoutes");
const { clienteRoutes } = require("./src/routes/clienteRoutes");

const PORT = process.env.PORT || 3000; // Boa prática: fallback para porta 3000

app.use(express.json());
app.use(cookieParser());
app.use(cors());

// --- 1. MIDDLEWARE DE SEGURANÇA (O GUARDA-COSTA) ---
function verificarAutenticacao(req, res, next) {
    // Tenta pegar o cookie chamado 'token'
    const token = req.cookies.token;

    // Se não tiver token, manda pro login
    if (!token) {
        return res.redirect('/');
    }

    try {
        // Verifica se o token é válido usando sua senha secreta
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        
        // (Opcional) Salva os dados do usuário para usar depois se quiser
        req.usuario = decoded; 

        next(); // Pode passar!
    } catch (error) {
        // Se o token for falso ou expirado
        console.log("Token inválido");
        res.clearCookie('token'); // Limpa o cookie ruim
        return res.redirect('/');
    }
}

// Rota de Login (Pública)
app.get('/', (req, res) => {
    // Se o cara já tem cookie válido, joga direto pro dashboard
    if(req.cookies.token) {
        try {
            jwt.verify(req.cookies.token, process.env.JWT_SECRET);
            return res.redirect('/dashboard');
        } catch(e) { /* Token inválido, deixa renderizar o login */ }
    }
    res.render('login');
});

// --- 2. ROTA PROTEGIDA ---
// Adicionei 'verificarAutenticacao' aqui no meio
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

// --- 3. ROTA DE LOGOUT (SAIR) ---
app.get('/logout', (req, res) => {
    res.clearCookie('token'); // Destrói o cookie
    res.redirect('/'); // Volta pro login
});

app.use('/', clienteRoutes);
app.use('/', produtoRoutes);
// app.use('/', clienteRoutes); // Você tinha repetido essa linha, removi uma

app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`)
});