
document.addEventListener('DOMContentLoaded', () => {

    /* menu mobile e acessibilidade*/
    const hamburgerBtn = document.getElementById('hamburger-btn');
    const mainNav = document.getElementById('main-nav');
    
    if (hamburgerBtn && mainNav) {
        hamburgerBtn.addEventListener('click', () => {
            mainNav.classList.toggle('is-open');
            hamburgerBtn.classList.toggle('is-active');
        });
        document.querySelectorAll('.header__link').forEach(link => {
            link.addEventListener('click', () => {
                mainNav.classList.remove('is-open');
                hamburgerBtn.classList.remove('is-active');
            });
        });
    }

    let fontSize = 100;
    document.getElementById('btn-aumentar-fonte')?.addEventListener('click', () => { if(fontSize < 125) document.documentElement.style.fontSize = `${fontSize += 5}%`; });
    document.getElementById('btn-restaurar-fonte')?.addEventListener('click', () => { fontSize = 100; document.documentElement.style.fontSize = '100%'; });
    document.getElementById('btn-diminuir-fonte')?.addEventListener('click', () => { if(fontSize > 90) document.documentElement.style.fontSize = `${fontSize -= 5}%`; });

    const btnContraste = document.getElementById('btn-alto-contraste');
    if (btnContraste) {
        btnContraste.addEventListener('click', () => {
            document.body.classList.toggle('alto-contraste');
            localStorage.setItem('contraste', document.body.classList.contains('alto-contraste'));
        });
        if (localStorage.getItem('contraste') === 'true') document.body.classList.add('alto-contraste');
    }

    /* lightbox acervo galeria e projetos */
    const lightbox = document.getElementById('lightbox');
    const lightboxDisplay = document.getElementById('lightbox-display');
    const lightboxPrev = document.getElementById('lightbox-prev');
    const lightboxNext = document.getElementById('lightbox-next');
    
    let lightboxList = [];
    let lightboxIndex = 0;

    function abrirLightbox(lista, index) {
        lightboxList = lista;
        lightboxIndex = index;
        atualizarLightbox();
        lightbox.removeAttribute('hidden');
        document.body.style.overflow = 'hidden';
    }

    function fecharLightbox() {
        lightbox.setAttribute('hidden', '');
        document.body.style.overflow = '';
    }

    function atualizarLightbox() {
        if (lightboxList.length > 0) {
            const item = lightboxList[lightboxIndex];
            lightboxDisplay.innerHTML = `
                <img src="${item.img || item}" alt="Imagem Ampliada" style="max-width: 100%; max-height: 75vh; object-fit: contain; border-radius: 6px;">
                <span class="lightbox-caption-text">${item.titulo || ''} ${item.legenda ? '- ' + item.legenda : ''}</span>
            `;
        }
    }

    document.getElementById('lightbox-close')?.addEventListener('click', fecharLightbox);
    document.getElementById('lightbox-backdrop')?.addEventListener('click', fecharLightbox);
    
    lightboxPrev?.addEventListener('click', () => {
        lightboxIndex = (lightboxIndex - 1 + lightboxList.length) % lightboxList.length;
        atualizarLightbox();
    });
    
    lightboxNext?.addEventListener('click', () => {
        lightboxIndex = (lightboxIndex + 1) % lightboxList.length;
        atualizarLightbox();
    });

    document.querySelectorAll('.galeria__item').forEach((item, index) => {
        item.addEventListener('click', () => {
            const imgs = Array.from(document.querySelectorAll('.galeria__item img')).map(img => img.src);
            abrirLightbox(imgs, index);
        });
    });

    /*repositorio de fotos do acervo em lista (ordem que vai seguir dentro do modal) MUSEU, BIBLIOTECA, CURIOSIDADES E LIVRO*/
   const repositorioAcervo = {
        fotos_acervo: {
            titulo: "Fotos do Acervo Histórico",
            descricao: "Mobiliário, objetos científicos e galerias de diretores.",
            itens: [
                { titulo: "Museu do Acervo", img: "museu/a.museu.acer.jpg" },
                { titulo: "Sala de Acervo", img: "museu/a.sala.acer.jpg" },
                { titulo: "Mesa Antiga do Acervo", img: "museu/a.mesa.acervo.jpg" },
                { titulo: "Mesas Antigas (Cadeiras)", img: "museu/a.mesa.ant.acer.jpg" },
                { titulo: "Objetos Históricos", img: "museu/a.obj3.acer.jpg" },
                { titulo: "Animais Empalhados", img: "museu/a.emp.acerv.jpg" },
                { titulo: "Galeria de Diretores Antigos", img: "museu/a.diretores.ant.acer.jpg" },
                { titulo: "Galeria de Professores Antigos", img: "museu/a.prof.anti.acer.jpg" },
                { titulo: "Retratos Antigos", img: "museu/a.pessoas.acer.jpg" }
            ]
        },
        biblioteca_acervo: {
            titulo: "Biblioteca Histórica",
            descricao: "Obras clássicas, anuários e livros raros da instituição.",
            itens: [
                { titulo: "Coletânea Clássica", img: "biblioteca/l.coletanea.acer.jpg" },
                { titulo: "Acervo Jânio Quadros", img: "biblioteca/l.janio.quadros.bi.acer.jpg" },
                { titulo: "Livro Albert Einstein", img: "biblioteca/liv.eistein.acerv.jpg" },
                { titulo: "Anais de Medicina", img: "biblioteca/liv.med.acer.jpg" },
                { titulo: "Dicionários Antigos", img: "biblioteca/livro.gigante.acer.jpg" },
                { titulo: "Recenseamento do Brazil", img: "biblioteca/livro2.acer.jpg" },
                { titulo: "Os Lusíadas", img: "biblioteca/lusiadas.acer.jpg" },
                { titulo: "Bíblias Sagradas", img: "biblioteca/biblia.acer.jpg" },
                { titulo: "Coleção Buffon", img: "biblioteca/l.coleção.acer.jpg" },
                { titulo: "Dicionário Geographico", img: "biblioteca/l.dici.acer.jpg" },
                { titulo: "Livros Raros - Reserva", img: "biblioteca/liv.acer.jpg" },
                { titulo: "Livros de Fisiologia", img: "biblioteca/livro.biblioteca.jpg" },
                { titulo: "Obras Monteiro Lobato", img: "biblioteca/l.monteiro.l.acer.jpg" }
            ]
        },
        livro_digital: {
            titulo: "Livro 113 Anos",
            descricao: "Páginas do Livro Digital.",
            itens: [
                { titulo: "Capa", img: "livro/pg1.png" },
                { titulo: "Página 2", img: "livro/pg2.png" },
                { titulo: "Página 3", img: "livro/pg3.png" },
                { titulo: "Página 4", img: "livro/pg4.png" },
                { titulo: "Página 5", img: "livro/pg5.png" },
                { titulo: "Página 6", img: "livro/pg6.png" },
                { titulo: "Página 7", img: "livro/pg7.png" },
                { titulo: "Página 8", img: "livro/pg8.png" },
                { titulo: "Página 9", img: "livro/pg9.png" },
                { titulo: "Página 10", img: "livro/pg10.png" },
                { titulo: "Página 11", img: "livro/pg11.png" },
                { titulo: "Página 12", img: "livro/pg12.png" },
                { titulo: "Página 13", img: "livro/pg13.png" },
                { titulo: "Página 14", img: "livro/pg14.png" },
                { titulo: "Página 15", img: "livro/pg15.png" },
                { titulo: "Página 16", img: "livro/pg16.png" },
                { titulo: "Página 17", img: "livro/pg17.png" },
                { titulo: "Página 18", img: "livro/pg18.png" },
                { titulo: "Página 19", img: "livro/pg19.png" },
                { titulo: "Página 20", img: "livro/pg20.png" },
                { titulo: "Página 21", img: "livro/pg21.png" },
                { titulo: "Página 22", img: "livro/pg22.png" },
                { titulo: "Página 23", img: "livro/pg23.png" },
                { titulo: "Página 24", img: "livro/pg24.png" },
                { titulo: "Página 25", img: "livro/pg25.png" },
                { titulo: "Página 26", img: "livro/pg26.png" },
                { titulo: "Página 27", img: "livro/pg27.png" },
                { titulo: "Página 28", img: "livro/pg28.png" },
                { titulo: "Página 29", img: "livro/pg29.png" },
                { titulo: "Página 30", img: "livro/pg30.png" },
                { titulo: "Página 31", img: "livro/pg31.png" },
                { titulo: "Página 32", img: "livro/pg32.png" },
                { titulo: "Página 33", img: "livro/pg34.png" },
                { titulo: "Página 34", img: "livro/pg35.png" },
                { titulo: "Página 35", img: "livro/pg36.png" },
                { titulo: "Página 36", img: "livro/pg37.png" },
                { titulo: "Página 37", img: "livro/pg40.png" }
                
            ]
        },
        curiosidades: {
            titulo: "Curiosidades e Arquitetura",
            descricao: "Detalhes construtivos, homenagens e brasões históricos da escola.",
            itens:[
                { titulo: "Logo Madeira", img: "curiosidades/logo.mad.jpg" },
                { titulo: "Logo Principal Parede", img: "curiosidades/logo.princ.jpg" },
                { titulo: "Monumento Gramado (Longe)", img: "curiosidades/c.homenagem.longe.g.jpg" },
                { titulo: "Monumento Gramado (Perto)", img: "curiosidades/c.homenagem.grama.jpg" },
                { titulo: "Piso Antigo (Corredor)", img: "curiosidades/c.chao.corredor.jpg", legenda: "Azulejo hidráulico original" },
                { titulo: "Piso de Madeira (Sala)", img: "curiosidades/c.chão.sala.jpg" },
                { titulo: "Escada de Pedra", img: "curiosidades/c.escada.pedra.co.jpg" },
                { titulo: "Tijolo Exposto (Sala)", img: "curiosidades/c.tijol.sala.jpg" },
                { titulo: "Amostra de Tinta Antiga", img: "curiosidades/c.tinta.parede13.jpg" },
                { titulo: "Pintura Antiga Parede", img: "curiosidades/c.pint.antiga.jpg" },
                { titulo: "Teste de Tinta Histórica", img: "curiosidades/c.tin.antiga.jpg" },
                { titulo: "Parede Profunda", img: "curiosidades/c.pared.prof.jpg" },
                { titulo: "Tijolo Imperial", img: "curiosidades/c.tij.imperial.acer.jpg", legenda: "Tijolo com o Brasão do Império usado na construção" },
                { titulo: "Placa Jequitibá", img: "curiosidades/c.plac.jequi.acer.jpg" },
                { titulo: "Placas Homenagem Acervo", img: "curiosidades/c.placas.acer.jpg" },
                { titulo: "Mural de Placas Homenagem", img: "curiosidades/c.homenagem.corredor2.jpg" },
                { titulo: "Árvore Centenária", img: "curiosidades/c.arvore.100.jpg" },
                { titulo: "Fotos antigas", img: "curiosidades/c.corredor.direção.jpn" },
            ]
        }
    };

    const modalAcervo = document.getElementById('modal-acervo');
    const modalAcervoGrid = document.getElementById('modal-acervo-grid');
    const modalAcervoTitulo = document.getElementById('modal-acervo-titulo');
    const modalAcervoDesc = document.getElementById('modal-acervo-desc');

    document.querySelectorAll('.acervo__item').forEach(btn => {
        btn.addEventListener('click', () => {
            const cat = btn.getAttribute('data-category');
            const dados = repositorioAcervo[cat];
            
            modalAcervoTitulo.textContent = dados.titulo;
            modalAcervoDesc.textContent = dados.descricao;
            modalAcervoGrid.innerHTML = '';

            dados.itens.forEach((item, index) => {
                const div = document.createElement('div');
                div.className = 'modal-acervo__item';
                div.innerHTML = `
                    <img src="${item.img}" alt="${item.titulo}">
                    <span>${item.titulo}</span>
                `;
                div.addEventListener('click', () => abrirLightbox(dados.itens, index));
                modalAcervoGrid.appendChild(div);
            });

            modalAcervo.removeAttribute('hidden');
            document.body.style.overflow = 'hidden';
        });
    });

    document.getElementById('modal-acervo-close')?.addEventListener('click', () => { modalAcervo.setAttribute('hidden', ''); document.body.style.overflow = '';});
    document.getElementById('modal-acervo-backdrop')?.addEventListener('click', () => { modalAcervo.setAttribute('hidden', ''); document.body.style.overflow = '';});

    document.getElementById('btn-ler-livro')?.addEventListener('click', () => {
        abrirLightbox(repositorioAcervo.livro_digital.itens, 0);
    });
    });

    /*repositorio fotos dos professores */
    const repositorioProfessores = {
        linguagens: {
            titulo: "Professores de Linguagens",
            descricao: "Língua Portuguesa, Literatura, Inglês e Artes.",
            professores: [
                { nome: "Profª. Adriana", disciplina: "Educação Física", img: "professores/prof.adriana.jpeg" },
                { nome: "Profª. Alexandra", disciplina: "Língua Portuguesa", img: "professores/prof.alexandra.jpeg" },
                { nome: "Profª. Célia", disciplina: "Língua Portuguesa", img: "professores/prof.celia.jpeg" },
                { nome: "Prof. Matheus", disciplina: "Língua Portuguesa", img: "professores/prof.matheus.jpeg" },
                { nome: "Profª. M. Eduarda", disciplina: "Língua Portuguesa", img: "professores/prof.m.eduarda.jpeg" },
                { nome: "Profª. Patrícia", disciplina: "Artes", img: "professores/prof.patricia.jpeg" },
                { nome: "Profª. Sandra", disciplina: "Inglês", img: "professores/prof.sandra.jpeg" },
                { nome: "Prof. Victor", disciplina: "Língua Portuguesa", img: "professores/prof.victor.jpeg" }
            ]
        },
        exatas: {
            titulo: "Professores de Exatas",
            descricao: "Matemática e Raciocínio Lógico.",
            professores: [
                { nome: "Profª. Carina", disciplina: "Matemática", img: "professores/prof.carina.jpeg" },
                { nome: "Prof. Denilson", disciplina: "Física", img: "professores/prof.denilson.jpeg" },
                { nome: "Prof. Lucas", disciplina: "Matemática", img: "professores/prof.lucas.jpeg" },
                { nome: "Profª. Sônia", disciplina: "Matemática", img: "professores/prof.dourado.jpeg" }
            ]
        },
        humanas: {
            titulo: "Professores de Ciências Humanas",
            descricao: "História, Geografia, Filosofia e Sociologia.",
            professores: [
                { nome: "Prof. Guilherme", disciplina: "Sociologia", img: "professores/prof.guilherme.soci.jpeg" },
                { nome: "Profª. Paty", disciplina: "Geografia", img: "professores/prof.paty.jpeg" },
                { nome: "Profª. Paula", disciplina: "História", img: "professores/prof.paula.jpeg" }
            ]
        },
        natureza: {
            titulo: "Professores de Ciências da Natureza",
            descricao: "Física, Química e Biologia.",
            professores: [
                { nome: "Profª. Camila", disciplina: "Quimica", img: "professores/prof.camila.jpeg" },
                { nome: "Profª. Cláudia", disciplina: "Biologia", img: "professores/prof.claudia.jpeg" },
                { nome: "Prof. Flávio", disciplina: "Biologia", img: "professores/prof.flavio.jpeg" },
                { nome: "Prof. Guilherme", disciplina: "Química", img: "professores/prof.gulherme.quim.jpeg" },
                { nome: "Profª. Isabelle", disciplina: "Física", img: "professores/prof.isabelle.jpeg" }
            ]
        },
        tecnico: {
            titulo: "Professores do Técnico",
            descricao: "Desenvolvimento de Sistemas e Saúde/Ed. Física.",
            professores: [
                { nome: "Prof. Alex", disciplina: "Dev. Sistemas", img: "professores/prof.alex.tec.ds.jpeg" },
                { nome: "Prof. Aparecido", disciplina: "Dev. Sistemas", img: "professores/prof.aparecido.tec.ds.jpeg" },
                { nome: "Profª. Gláucia", disciplina: "Dev. Sistemas", img: "professores/prof.glaucia.tec.ds.jpeg" },
                { nome: "Profª. Fran", disciplina: "Enfermagem", img: "professores/prof.fran.ef.jpeg" },
                { nome: "Profª. Jacke", disciplina: "Enfermagem", img: "professores/prof.jacke.ef.jpeg" },
                { nome: "Profª. Lídia", disciplina: "Enfermagem", img: "professores/prof.fran.ef.jpeg" }
            ]
        },
        especial: {
            titulo: "Professores de Apoio",
            descricao: "Apoio",
            professores: [
                { nome: "Profª Mônica", disciplina: ".", img: "professores/prof.especial1.jpeg" },
                { nome: "Profª Cintia", disciplina: ".", img: "professores/prof.especial2.jpeg" },
               
            ]
        }
    };

    const modalProfessores = document.getElementById('modal-professores');
    const modalProfessoresGrid = document.getElementById('modal-professores-grid');
    const modalProfessoresTitulo = document.getElementById('modal-professores-titulo');
    const modalProfessoresDesc = document.getElementById('modal-professores-desc');

    document.querySelectorAll('.professores__pasta-card').forEach(btn => {
        btn.addEventListener('click', () => {
            const area = btn.getAttribute('data-area');
            const dados = repositorioProfessores[area];
            
            modalProfessoresTitulo.textContent = dados.titulo;
            modalProfessoresDesc.textContent = dados.descricao;
            modalProfessoresGrid.innerHTML = '';

            dados.professores.forEach(prof => {
                const div = document.createElement('div');
                div.className = 'modal-professores__item';
                div.innerHTML = `
                    <img src="${prof.img}" alt="Foto ${prof.nome}">
                    <strong>${prof.nome}</strong>
                    <small>${prof.disciplina}</small>
                `;
                modalProfessoresGrid.appendChild(div);
            });

            modalProfessores.removeAttribute('hidden');
            document.body.style.overflow = 'hidden';
        });
    });

    document.getElementById('modal-professores-close')?.addEventListener('click', () => { modalProfessores.setAttribute('hidden', ''); document.body.style.overflow = ''; });
    document.getElementById('modal-professores-backdrop')?.addEventListener('click', () => { modalProfessores.setAttribute('hidden', ''); document.body.style.overflow = ''; });


    /* repositorio fotos do sarau e slam*/
    const repositorioProjetos = {
        slam: {
            titulo: "Galeria do Slam",
            descricao: "Registros das nossas batalhas de poesia.",
            itens: [
                { titulo: "Apresentação Slam 1", img: "slam/slam.jpg" },
                { titulo: "Apresentação Slam 2", img: "slam/slam.jpg" },
                { titulo: "Apresentação Slam 3", img: "slam/slam.jpg" }
            ]
        },
        sarau: {
            titulo: "Galeria do Sarau",
            descricao: "Registros das apresentações artísticas e culturais.",
            itens: [
                { titulo: "Música no Sarau", img: "sarau/sarau.jpg" },
                { titulo: "Dança no Sarau", img: "sarau/sarau.jpg" }
            ]
        }
    };

    const modalProjetos = document.getElementById('modal-projetos');
    const modalProjetosGrid = document.getElementById('modal-projetos-grid');
    const modalProjetosTitulo = document.getElementById('modal-projetos-titulo');
    const modalProjetosDesc = document.getElementById('modal-projetos-desc');

    document.querySelectorAll('.btn-projeto-modal').forEach(btn => {
        btn.addEventListener('click', () => {
            const proj = btn.getAttribute('data-projeto');
            if(!repositorioProjetos[proj]) return;
            const dados = repositorioProjetos[proj];
            
            modalProjetosTitulo.textContent = dados.titulo;
            modalProjetosDesc.textContent= dados.descricao;
            modalProjetosGrid.textContent = '';

            dados.itens.forEach((item, index) => {
                const div = document.createElement('div');
                div.className = 'modal-acervo__item'; 
                div.innerHTML = `
                    <img src="${item.img}" alt="${item.titulo}">
                    <span>${item.titulo}</span>
                `;
                div.addEventListener('click', () => abrirLightbox(dados.itens, index));
                modalProjetosGrid.appendChild(div);
            });

            if (modalProjetos) {
                modalProjetos.removeAttribute('hidden');
                document.body.style.overflow = 'hidden';
            }
        });
    });

    document.getElementById('modal-projetos-close')?.addEventListener('click', () => { modalProjetos?.setAttribute('hidden', ''); document.body.style.overflow = ''; });
    document.getElementById('modal-projetos-backdrop')?.addEventListener('click', () => { modalProjetos?.setAttribute('hidden', ''); document.body.style.overflow = ''; });


    /* fecha os modais abertos e volta toda pagina ao normal caso seja apertada a tecla ESC */
    document.addEventListener('keydown', (e) => { /*o comando keydown fica "ouvindo o teclado" */
        if (e.key === 'Escape') { /*se a tecla ESC for apertada fecha tudo */
            fecharLightbox();
            modalAcervo?.setAttribute('hidden', '');
            modalProfessores?.setAttribute('hidden', '');
            modalProjetos?.setAttribute('hidden', ''); 
            document.body.style.overflow = '';
        }
    });

    /*chat bot */
    /*chat bot dinâmico */
const chatbotToggleBtn = document.getElementById('chatbot-toggle-btn');
const chatbotWindow = document.getElementById('chatbot-window');

chatbotToggleBtn?.addEventListener('click', () => {
    const isHidden = chatbotWindow.hasAttribute('hidden');
    if(isHidden) chatbotWindow.removeAttribute('hidden');
    else chatbotWindow.setAttribute('hidden', '');
});

document.getElementById('chatbot-close-btn')?.addEventListener('click', () => chatbotWindow.setAttribute('hidden', ''));

const chatbotForm = document.getElementById('chatbot-form');
const chatbotInput = document.getElementById('chatbot-input');
const chatbotMessages = document.getElementById('chatbot-messages');

// 1. BASE DE CONHECIMENTO DO CULTINHO (Adicione mais perguntas e respostas aqui)
const bancoDeRespostas = {
    "historia": "A Escola Estadual Culto à Ciência foi fundada em 1873 pela Sociedade Culto à Ciência, inspirada nos ideais iluministas e positivistas. Nosso prédio principal é tombado pelo CONDEPHAAT!",
    "historico": "A Escola Estadual Culto à Ciência foi fundada em 1873 pela Sociedade Culto à Ciência, inspirada nos ideais iluministas e positivistas. Nosso prédio principal é tombado pelo CONDEPHAAT!",
    "endereco": "Ficamos na R. Culto à Ciência, 422 - Botafogo, Campinas - SP, CEP 13020-060.",
    "localização": "Ficamos na R. Culto à Ciência, 422 - Botafogo, Campinas - SP, CEP 13020-060.",
    "telefone": "Você pode entrar em contato conosco pelo telefone (19) 3232-3511.",
    "contato": "Você pode falar conosco pelo telefone (19) 3232-3511 ou pelo formulário de contato abaixo.",
    "cursos": "Oferecemos Ensino Médio Integral (PEI) e Itinerários Formativos em Linguagens, Exatas, além dos técnicos em Desenvolvimento de Sistemas e Enfermagem!",
    "tecnico": "Temos os cursos técnicos integrados de Desenvolvimento de Sistemas e Enfermagem, com foco prático para o mercado de trabalho.",
    "ajuda": "Eu posso te ajudar com informações sobre a 'historia' da escola, nosso 'endereço', 'telefone' ou sobre os 'cursos' oferecidos! O que quer saber?",
    "oi": "Olá! Eu sou o Cultinho, assistente virtual da escola. Digite sua dúvida ou digite 'ajuda' para ver o que posso fazer!",
    "ola": "Olá! Eu sou o Cultinho, assistente virtual da escola. Digite sua dúvida ou digite 'ajuda' para ver o que posso fazer!"
};

chatbotForm?.addEventListener('submit', (e) => {
    e.preventDefault();
    const text = chatbotInput.value.trim();
    if(!text) return;

    // Adiciona a mensagem do usuário na tela
    chatbotMessages.innerHTML += `<div class="chatbot__message chatbot__message--user"><p>${text}</p></div>`;
    chatbotInput.value = '';
    chatbotMessages.scrollTop = chatbotMessages.scrollHeight;

    // 2. LÓGICA DE BUSCA DA RESPOSTA
    // Remove acentos e deixa tudo em letras minúsculas para facilitar a busca
    const termoBusca = text.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
    
    // Resposta padrão caso o robô não entenda
    let respostaBot = "Desculpe, não entendi muito bem. Você pode tentar palavras-chave como 'história', 'cursos', 'endereço' ou 'telefone'. Para assuntos oficiais, use nosso formulário!";

    // Verifica se a palavra digitada existe na nossa base de conhecimento
    if (bancoDeRespostas[termoBusca]) {
        respostaBot = bancoDeRespostas[termoBusca];
    } else {
        // Busca secundária: verifica se a palavra-chave está contida dentro de uma frase maior digitada
        for (let chave in bancoDeRespostas) {
            if (termoBusca.includes(chave)) {
                respostaBot = bancoDeRespostas[chave];
                break;
            }
        }
    }

    // Simula o tempo de resposta do robô
    setTimeout(() => {
        chatbotMessages.innerHTML += `<div class="chatbot__message chatbot__message--bot"><p>${respostaBot}</p></div>`;
        chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
    }, 600);
});

const btnAbrirCultinho = document.getElementById('btn-abrir-cultinho');
btnAbrirCultinho?.addEventListener('click', () => {
    if(chatbotWindow) {
        chatbotWindow.removeAttribute('hidden');
    }
});


    /* ler mais da galeria */
    const btnTopo = document.getElementById('back-to-top-btn');
    window.addEventListener('scroll', () => {
        if(btnTopo) {
            if(window.scrollY > 300) btnTopo.classList.add('is-visible');
            else btnTopo.classList.remove('is-visible');
        }
    });
    btnTopo?.addEventListener('click', () => window.scrollTo({top: 0, behavior: 'smooth'}));

    document.getElementById('lightbox-close')?.addEventListener('click', fecharLightbox);
    document.getElementById('lightbox-backdrop')?.addEventListener('click', fecharLightbox);
    
    lightboxPrev?.addEventListener('click', () => {
        lightboxIndex = (lightboxIndex - 1 + lightboxList.length) % lightboxList.length;
        atualizarLightbox();
    });
    
    lightboxNext?.addEventListener('click', () => {
        lightboxIndex = (lightboxIndex + 1) % lightboxList.length;
        atualizarLightbox();
    });

    document.querySelectorAll('.galeria__item').forEach((item, index) => {
        item.addEventListener('click', () => {
            const imgs = Array.from(document.querySelectorAll('.galeria__item img')).map(img => img.src);
            abrirLightbox(imgs, index);
        });
    });
