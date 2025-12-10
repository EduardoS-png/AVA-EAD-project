document.addEventListener('DOMContentLoaded', function() {
    // Elementos DOM
    const loginForm = document.getElementById('loginForm');
    const usernameInput = document.getElementById('username');
    const passwordInput = document.getElementById('password');
    const showPasswordBtn = document.getElementById('showPassword');
    const rememberCheckbox = document.getElementById('remember');
    const messageDiv = document.getElementById('message');
    
    // Carregar dados salvos (se "Lembrar-me" foi marcado anteriormente)
    const savedUsername = localStorage.getItem('rememberedUsername');
    if (savedUsername) {
        usernameInput.value = savedUsername;
        rememberCheckbox.checked = true;
    }
    
    // Mostrar/ocultar senha
    showPasswordBtn.addEventListener('click', function() {
        const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
        passwordInput.setAttribute('type', type);
        
        // Alterar ícone do botão
        const icon = this.querySelector('i');
        icon.classList.toggle('fa-eye');
        icon.classList.toggle('fa-eye-slash');
    });
    
    // Validação do formulário
    loginForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Limpar mensagens anteriores
        messageDiv.className = 'message';
        messageDiv.textContent = '';
        
        // Obter valores
        const username = usernameInput.value.trim();
        const password = passwordInput.value.trim();
        
        // Validações básicas
        if (!username) {
            showMessage('Por favor, digite seu usuário ou e-mail.', 'error');
            usernameInput.focus();
            return;
        }
        
        if (!password) {
            showMessage('Por favor, digite sua senha.', 'error');
            passwordInput.focus();
            return;
        }
        
        if (password.length < 6) {
            showMessage('A senha deve ter pelo menos 6 caracteres.', 'error');
            passwordInput.focus();
            return;
        }
        
        // Salvar dados se "Lembrar-me" estiver marcado
        if (rememberCheckbox.checked) {
            localStorage.setItem('rememberedUsername', username);
        } else {
            localStorage.removeItem('rememberedUsername');
        }
        
        // Simulação de login
        // Em uma aplicação real, aqui você faria uma requisição para um servidor
        simulateLogin(username, password);
    });
    
    // Simulação de login com credenciais de exemplo
    function simulateLogin(username, password) {
        // Mostrar mensagem de processamento
        showMessage('Autenticando... Aguarde.', 'success');
        
        // Simular atraso de rede
        setTimeout(() => {
            // Credenciais de exemplo (em uma aplicação real, isso viria de um servidor)
            const validCredentials = [
                { username: 'admin', password: 'admin123' },
                { username: 'usuario@exemplo.com', password: 'senha123' },
                { username: 'teste', password: 'teste123' }
            ];
            
            // Verificar credenciais
            const isValid = validCredentials.some(cred => 
                (cred.username === username || username.includes('@')) && 
                cred.password === password
            );
            
            if (isValid) {
                showMessage('Login realizado com sucesso! Redirecionando...', 'success');
                
                // Simular redirecionamento
                setTimeout(() => {
                    alert(`Bem-vindo, ${username}! Login realizado com sucesso.`);
                    // Em uma aplicação real: window.location.href = '/dashboard';
                }, 1500);
            } else {
                showMessage('Usuário ou senha incorretos. Tente novamente.', 'error');
            }
        }, 1500);
    }
    
    // Função para exibir mensagens
    function showMessage(text, type) {
        messageDiv.textContent = text;
        messageDiv.className = `message ${type}`;
        
        // Auto-ocultar mensagens de sucesso após 5 segundos
        if (type === 'success') {
            setTimeout(() => {
                messageDiv.style.opacity = '0';
                setTimeout(() => {
                    messageDiv.className = 'message';
                    messageDiv.style.opacity = '1';
                }, 500);
            }, 5000);
        }
    }
    
    // Botões de login social (apenas demonstração)
    document.querySelectorAll('.social-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            const provider = this.classList.contains('google') ? 'Google' : 'GitHub';
            showMessage(`Redirecionando para login com ${provider}...`, 'success');
            
            // Simular redirecionamento para OAuth
            setTimeout(() => {
                showMessage(`Login com ${provider} seria implementado aqui.`, 'success');
            }, 1000);
        });
    });
    
    // Link "Esqueceu a senha"
    document.querySelector('.forgot-link').addEventListener('click', function(e) {
        e.preventDefault();
        const email = prompt('Digite seu e-mail para redefinir a senha:');
        if (email) {
            showMessage(`Instruções de redefinição enviadas para ${email}`, 'success');
        }
    });
    
    // Link "Cadastre-se"
    document.querySelector('.register-link a').addEventListener('click', function(e) {
        e.preventDefault();
        showMessage('Redirecionando para página de cadastro...', 'success');
        setTimeout(() => {
            alert('Página de cadastro seria exibida aqui.');
        }, 1000);
    });
});