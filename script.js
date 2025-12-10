document.addEventListener('DOMContentLoaded', function() {
    // Lista de cursos (apenas Nivelamento ativo)
    const courses = [
        { id: 1, name: "Nivelamento", active: true },
        { id: 2, name: "Administração", active: false },
        { id: 3, name: "Desenvolvimento de Sistemas", active: false },
        { id: 4, name: "Recursos Humanos", active: false },
        { id: 5, name: "Técnico em Multimídia", active: false },
        { id: 6, name: "Design de Interiores", active: false },
        { id: 7, name: "Técnico em Logística", active: false },
        { id: 8, name: "Design Gráfico", active: false },
        { id: 9, name: "Técnico em Biblioteconomia", active: false }
    ];

    const coursesContainer = document.getElementById('courses-container');
    
    // Gerar os cards de cursos
    courses.forEach(course => {
        const courseCard = document.createElement('div');
        courseCard.className = `course-card ${course.active ? 'active' : 'inactive'}`;
        
        courseCard.innerHTML = `
            <div class="course-header">
                <h3 class="course-title">${course.name}</h3>
            </div>
            <div class="course-status">
                <div class="status-indicator">
                    <div class="status-dot ${course.active ? 'active' : 'inactive'}"></div>
                    <span class="status-text ${course.active ? 'active' : 'inactive'}">
                        ${course.active ? 'Ativo' : 'Inativo'}
                    </span>
                </div>
                <button class="access-btn" ${course.active ? '' : 'disabled'}>
                    ${course.active ? 'Acessar' : 'Indisponível'}
                </button>
            </div>
        `;
        
        // Adicionar evento de clique apenas para cursos ativos
        if (course.active) {
            const accessBtn = courseCard.querySelector('.access-btn');
            accessBtn.addEventListener('click', function() {
                alert(`Acessando o curso: ${course.name}`);
            });
        }
        
        coursesContainer.appendChild(courseCard);
    });
    
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
                alert(`Navegando para: ${menuText}`);
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