
const form = document.getElementById('loginForm');
const msgDiv = document.getElementById('mensagem');
const btn = document.getElementById('btnEntrar');

form.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    // Feedback visual de carregamento
    btn.innerText = "Verificando...";
    btn.disabled = true;
    msgDiv.style.display = 'none';
    msgDiv.className = '';

    // Pega os valores dos inputs
    const emailDigitado = document.getElementById('emailCliente').value;
    const senhaDigitada = document.getElementById('senhaCliente').value;

    try {
        const dadosLogin = {
            emailCliente: emailDigitado, 
            senhaCliente: senhaDigitada
        };

        const response = await fetch('http://localhost:8081/clientes/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(dadosLogin)
        });

        const data = await response.json();
        
        console.log("Status:", response.status);
        console.log("Resposta:", data);

        const textoResposta = data.message || data.error || "Erro desconhecido";

        if (response.ok) {
            msgDiv.innerText = "✅ " + textoResposta;
            msgDiv.classList.add('sucesso');
        } else {
            msgDiv.innerText = "❌ " + textoResposta;
            msgDiv.classList.add('erro');
        }

    } catch (error) {
        console.error("Erro:", error);
        msgDiv.innerText = "⚠️ Erro de conexão! Verifique se o servidor está rodando.";
        msgDiv.classList.add('erro');
    } finally {
        msgDiv.style.display = 'block';
        btn.innerText = "ENTRAR";
        btn.disabled = false;
    }
});