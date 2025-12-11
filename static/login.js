document.addEventListener("DOMContentLoaded", function () {
  const loginForm = document.getElementById("loginForm");
  const usernameInput = document.getElementById("username");
  const passwordInput = document.getElementById("password");
  const showPasswordBtn = document.getElementById("showPassword");
  const rememberCheckbox = document.getElementById("remember");
  const messageDiv = document.getElementById("message");

  // Carregar usuário salvo
  const savedUsername = localStorage.getItem("rememberedUsername");
  if (savedUsername) {
    usernameInput.value = savedUsername;
    rememberCheckbox.checked = true;
  }

  // Mostrar/ocultar senha
  showPasswordBtn.addEventListener("click", function () {
    const type = passwordInput.type === "password" ? "text" : "password";
    passwordInput.type = type;
    const icon = this.querySelector("i");
    icon.classList.toggle("fa-eye");
    icon.classList.toggle("fa-eye-slash");
  });

  // Validação do formulário
  loginForm.addEventListener("submit", function (e) {
    const username = usernameInput.value.trim();
    const password = passwordInput.value.trim();

    if (!username) {
      e.preventDefault();
      showMessage("Digite o usuário.", "error");
      return;
    }

    if (!password) {
      e.preventDefault();
      showMessage("Digite a senha.", "error");
      return;
    }

    if (password.length < 6) {
      e.preventDefault();
      showMessage("A senha deve ter pelo menos 6 caracteres.", "error");
      return;
    }

    // Lembrar usuário
    if (rememberCheckbox.checked) {
      localStorage.setItem("rememberedUsername", username);
    } else {
      localStorage.removeItem("rememberedUsername");
    }

    // O formulário agora envia para /login e o Flask processa
  });

  function showMessage(text, type) {
    messageDiv.textContent = text;
    messageDiv.className = `message ${type}`;
  }
});
