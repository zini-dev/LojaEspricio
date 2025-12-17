// ARQUIVO: public/script.js (Lógica de Login)

const form = document.getElementById('loginForm');
const msgDiv = document.getElementById('mensagem');
const btn = document.getElementById('btnEntrar');

form.addEventListener('submit', async (e) => {
    e.preventDefault(); // Impede a página de recarregar
    
    btn.innerText = "Verificando...";
    btn.disabled = true;
    msgDiv.style.display = 'none';
    msgDiv.className = '';

    const emailDigitado = document.getElementById('emailCliente').value;
    const senhaDigitada = document.getElementById('senhaCliente').value;

    try {
        const dadosLogin = {
            emailCliente: emailDigitado, 
            senhaCliente: senhaDigitada
        };

        // Rota de LOGIN
        const response = await fetch('https://api-lojaespricio.onrender.com/clientes/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(dadosLogin)
        });

        const data = await response.json();
        const textoResposta = data.message || data.error || "Erro desconhecido";

        if (response.ok) {
            msgDiv.innerText = "✅ " + textoResposta;
            msgDiv.classList.add('sucesso');
            
            // Redireciona para o dashboard após 1 segundo
            setTimeout(() => {
                window.location.href = 'dashboard.html';
            }, 1000);
        } else {
            msgDiv.innerText = "❌ " + textoResposta;
            msgDiv.classList.add('erro');
        }

    } catch (error) {
        console.error("Erro:", error);
        msgDiv.innerText = "⚠️ Erro de conexão!";
        msgDiv.classList.add('erro');
    } finally {
        msgDiv.style.display = 'block';
        if (!msgDiv.classList.contains('sucesso')) {
             btn.innerText = "ENTRAR";
             btn.disabled = false;
        }
    }
});