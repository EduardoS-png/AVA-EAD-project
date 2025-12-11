document.addEventListener('DOMContentLoaded', function() {
    // Adicionar interatividade ao menu lateral
    const menuItems = document.querySelectorAll('.sidebar-nav li:not(.category-header)');
    menuItems.forEach(item => {
        item.addEventListener('click', function() {
            // Remover classe active de todos os itens
            menuItems.forEach(i => i.classList.remove('active'));
            // Adicionar classe active ao item clicado
            this.classList.add('active');
            
            // Simular ação de navegação
            const menuText = this.querySelector('span').textContent;
            if (menuText === "Página inicial") {
                // Já estamos na página inicial
                console.log("Navegando para: Página inicial");
            } else {
                window.location.href = `/semana/${week.id}`;
            }
        });
    });
    
    // Adicionar efeito de toggle ao submenu
    const systemsItem = document.querySelector('.sidebar-nav li:nth-child(2)');
    systemsItem.addEventListener('click', function(e) {
        // Impedir que o clique no item principal feche o submenu
        e.stopPropagation();
        
        // Alternar a exibição do submenu
        const submenu = this.querySelector('.submenu');
        if (submenu.style.display === 'block') {
            submenu.style.display = 'none';
        } else {
            submenu.style.display = 'block';
        }
    });
    
    // Fechar submenu ao clicar fora
    document.addEventListener('click', function() {
        const submenu = document.querySelector('.submenu');
        if (submenu) {
            submenu.style.display = 'none';
        }
    });
});