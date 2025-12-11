document.addEventListener("DOMContentLoaded", function () {
  const chatToggle = document.getElementById("chat-toggle");
  const chatContainer = document.getElementById("chat-container");
  const chatClose = document.getElementById("chat-close");
  const chatBox = document.getElementById("chat-box");
  const chatInput = document.getElementById("chat-input");
  const sendBtn = document.getElementById("send-btn");

  // Abrir chat
  chatToggle.addEventListener("click", () => {
    chatContainer.classList.toggle("hidden");
  });

  // Fechar chat
  chatClose.addEventListener("click", () => {
    chatContainer.classList.add("hidden");
  });

  // Enviar mensagem
  function enviarMensagem() {
    const pergunta = chatInput.value.trim();
    if (!pergunta) return;
    chatBox.innerHTML += `<div class="user-msg"><strong>Você:</strong> ${pergunta}</div>`;
    chatInput.value = "";
    chatBox.scrollTop = chatBox.scrollHeight;

    // Enviar para Flask
    fetch("/chatbot", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ pergunta }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.resposta) {
          chatBox.innerHTML += `<div class="bot-msg"><strong>Bot:</strong> ${data.resposta}</div>`;
        } else {
          chatBox.innerHTML += `<div class="bot-msg"><strong>Bot:</strong> Erro: ${data.erro}</div>`;
        }
        chatBox.scrollTop = chatBox.scrollHeight;
      });
  }

  sendBtn.addEventListener("click", enviarMensagem);
  chatInput.addEventListener("keypress", function (e) {
    if (e.key === "Enter") enviarMensagem();
  });
});
