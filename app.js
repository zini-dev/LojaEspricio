const express = require("express");
const app = express();
const cors = require("cors"); //teste
require("dotenv").config(); // Faz a injeção de dependências

const path = require("path");
const axios = require("axios");

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '/src/views'));
app.use(express.static(path.join(__dirname, '/src/public')));

const { produtoRoutes } = require("./src/routes/produtoRoutes");
const { clienteRoutes } = require("./src/routes/clienteRoutes");

const PORT = process.env.PORT;
const cookieParser = require("cookie-parser");

app.use(express.json()); // Middleware
app.use(cookieParser());
app.use(cors());

app.get('/', (req, res) => {
    res.render('login');
});

app.get('/dashboard', async (req, res) => {
    try {
        const response = await axios.get('https://api-lojaespricio.onrender.com/produtos');

        const produtos = response.data;

        res.render('dashboard', { produtos });
    } catch {
        console.error(error);
        res.render('dashboard', { produtos: [] });
    }
});

app.use('/', clienteRoutes); //teste
app.use('/', produtoRoutes);
app.use('/', clienteRoutes);

app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`)
})