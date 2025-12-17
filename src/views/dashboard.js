// public/dashboard.js

const API_URL = 'https://api-lojaespricio.onrender.com/produtos';

document.addEventListener('DOMContentLoaded', listarProdutos);

// --- 1. LISTAR (READ) ---
async function listarProdutos() {
    const tabela = document.getElementById('tabelaProdutos');
    try {
        const response = await fetch(API_URL);
        const produtos = await response.json();
        
        tabela.innerHTML = ''; // Limpa tabela

        produtos.forEach(p => {
            const preco = parseFloat(p.precoProduto).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
            const img = p.imagemProduto || 'https://via.placeholder.com/50';

            tabela.innerHTML += `
                <tr>
                    <td><img src="${img}" class="img-produto" style="width:50px; height:50px; object-fit:cover; border-radius:4px;"></td>
                    <td>${p.nomeProduto}</td>
                    <td style="color: green; font-weight: bold;">${preco}</td>
                    <td>
                        <button class="btn-editar" onclick="prepararEdicao('${p.idProduto}', '${p.nomeProduto}', '${p.precoProduto}', '${p.imagemProduto}')">
                            <i class="fas fa-edit"></i>
                        </button>
                        <button class="btn-deletar" onclick="deletarProduto('${p.idProduto}')">
                            <i class="fas fa-trash"></i>
                        </button>
                    </td>
                </tr>
            `;
        });
    } catch (error) {
        console.error("Erro ao listar:", error);
    }
}

// --- 2. SALVAR (CRIAR ou ATUALIZAR) ---
const form = document.getElementById('formProduto');

form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const id = document.getElementById('idProduto').value;
    const nome = document.getElementById('nomeProduto').value;
    const preco = document.getElementById('precoProduto').value;
    const imagem = document.getElementById('imagemProduto').value;

    const produto = { nomeProduto: nome, precoProduto: preco, imagemProduto: imagem };
    
    // Se tem ID, é Edição (PUT). Se não tem, é Criação (POST).
    const metodo = id ? 'PUT' : 'POST';
    const urlFinal = id ? `${API_URL}/${id}` : API_URL;

    try {
        const response = await fetch(urlFinal, {
            method: metodo,
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(produto)
        });

        if (response.ok) {
            alert("Salvo com sucesso!");
            fecharModal();
            listarProdutos(); // Recarrega a tabela
        } else {
            alert("Erro ao salvar.");
        }
    } catch (error) {
        console.error("Erro:", error);
    }
});

// --- 3. DELETAR (DELETE) ---
async function deletarProduto(id) {
    if (confirm("Tem certeza que deseja excluir este produto?")) {
        try {
            const response = await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
            if (response.ok) {
                listarProdutos(); // Atualiza a tabela
            } else {
                alert("Erro ao excluir.");
            }
        } catch (error) {
            console.error("Erro ao deletar:", error);
        }
    }
}

// --- FUNÇÕES DO MODAL ---
function abrirModal() {
    document.getElementById('modalProduto').style.display = 'flex';
    document.getElementById('formProduto').reset();
    document.getElementById('idProduto').value = ''; // Limpa ID para criar novo
    document.getElementById('tituloModal').innerText = 'Novo Produto';
}

function fecharModal() {
    document.getElementById('modalProduto').style.display = 'none';
}

function prepararEdicao(id, nome, preco, imagem) {
    document.getElementById('modalProduto').style.display = 'flex';
    document.getElementById('tituloModal').innerText = 'Editar Produto';
    
    // Preenche os campos com os dados existentes
    document.getElementById('idProduto').value = id;
    document.getElementById('nomeProduto').value = nome;
    document.getElementById('precoProduto').value = preco;
    
    // Verifica se a imagem é 'null' ou 'undefined' antes de preencher
    document.getElementById('imagemProduto').value = (imagem && imagem !== 'null') ? imagem : '';
}

function sair() {
    window.location.href = 'index.html';
}