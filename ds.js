const linksMenu = document.querySelectorAll("nav a");
 
linksMenu.forEach(function(link) {
    link.addEventListener("click", function() {
        linksMenu.forEach(function(item) {
            item.classList.remove("selecionado");
        });
 
        link.classList.add("selecionado");
    });
});
 document.addEventListener('DOMContentLoaded', () => {
    // ---- CONFIGURAÇÃO DE TAMANHO DA FONTE ----
    let fontSize = 100;
    
    document.getElementById('btn-aumentar-fonte')?.addEventListener('click', () => { 
        if (fontSize < 125) {
            document.documentElement.style.fontSize = `${fontSize += 5}%`; 
        }
    });
    
    document.getElementById('btn-restaurar-fonte')?.addEventListener('click', () => { 
        fontSize = 100; 
        document.documentElement.style.fontSize = '100%'; 
    });
    
    document.getElementById('btn-diminuir-fonte')?.addEventListener('click', () => { 
        if (fontSize > 90) {
            document.documentElement.style.fontSize = `${fontSize -= 5}%`; 
        }
    });

    
});
