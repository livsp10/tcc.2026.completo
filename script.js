/* ==========================================================================
   Escola Estadual Culto à Ciência — Campinas/SP
   Script Principal do MVP (script.js) - Refatorado com Dados Reais
   ========================================================================== */

   document.addEventListener('DOMContentLoaded', () => {

    /* ==========================================================================
       1. MENU MOBILE & ACESSIBILIDADE
       ========================================================================== */
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

    /* ==========================================================================
       2. LIGHTBOX GLOBAL (ACERVO E GALERIA)
       ========================================================================== */
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
        // ... aqui termina o código do chatbot que já existe ...
        setTimeout(() => {
            const respostaBot = obterRespostaBot(text);
            
            if (respostaBot !== null) {
                chatbotMessages.innerHTML += `<div class="chatbot__message chatbot__message--bot"><p>${respostaBot}</p></div>`;
                chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
            }
        }, 600);
    };

    /* ==========================================================================
       6. BOTÃO LER MAIS (GALERIA)
       ========================================================================== */
    const btnVerMaisGaleria = document.getElementById('btn-ver-mais-galeria');
    const fotosOcultas = document.querySelectorAll('.galeria__item--oculta');

    if (btnVerMaisGaleria) {
        btnVerMaisGaleria.addEventListener('click', () => {
            let fotosEstaoVisiveis = false;

            // Alterna a classe 'visivel' em cada foto oculta
            fotosOcultas.forEach(foto => {
                foto.classList.toggle('visivel');
                if (foto.classList.contains('visivel')) {
                    fotosEstaoVisiveis = true;
                }
            });

            // Atualiza o botão conforme o estado atual
            if (fotosEstaoVisiveis) {
                btnVerMaisGaleria.innerHTML = '<i class="fa-solid fa-minus" aria-hidden="true"></i> Ver menos fotos';
            } else {
                btnVerMaisGaleria.innerHTML = '<i class="fa-solid fa-plus" aria-hidden="true"></i> Ver mais fotos';
            }
        });
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

    /* ==========================================================================
       3. REPOSITÓRIO DE ACERVO (FOTOS, BIBLIOTECA, CURIOSIDADES)
       ========================================================================== */
    const repositorioAcervo = {
        fotos_acervo: {
            titulo: "Fotos do Acervo Histórico",
            descricao: "Mobiliário, objetos científicos e galerias de diretores.",
            itens: [
                { titulo: "Museu do Acervo", img: "a.museu.acer.jpg" },
                { titulo: "Sala de Acervo", img: "a.sala.acer.jpg" },
                { titulo: "Mesa Antiga do Acervo", img: "a.mesa.acervo.jpg" },
                { titulo: "Mesas Antigas (Cadeiras)", img: "a.mesa.ant.acer.jpg" },
                { titulo: "Objetos Históricos", img: "a.obj3.acer.jpg" },
                { titulo: "Animais Empalhados", img: "a.emp.acerv.jpg" },
                { titulo: "Galeria de Diretores Antigos", img: "a.diretores.ant.acer.jpg" },
                { titulo: "Galeria de Professores Antigos", img: "a.prof.anti.acer.jpg" },
                { titulo: "Retratos Antigos", img: "a.pessoas.acer.jpg" }
            ]
        },
        biblioteca_acervo: {
            titulo: "Biblioteca Histórica",
            descricao: "Obras clássicas, anuários e livros raros da instituição.",
            itens: [
                { titulo: "Coletânea Clássica", img: "l.coletanea.acer.jpg" },
                { titulo: "Acervo Jânio Quadros", img: "l.janio.quadros.bi.acer.jpg" },
                { titulo: "Livro Albert Einstein", img: "liv.eistein.acerv.jpg" },
                { titulo: "Anais de Medicina", img: "liv.med.acer.jpg" },
                { titulo: "Dicionários Antigos", img: "livro.gigante.acer.jpg" },
                { titulo: "Recenseamento do Brazil", img: "livro2.acer.jpg" },
                { titulo: "Os Lusíadas", img: "lusiadas.acer.jpg" },
                { titulo: "Bíblias Sagradas", img: "biblia.acer.jpg" },
                { titulo: "Coleção Buffon", img: "l.coleção.acer.jpg" },
                { titulo: "Dicionário Geographico", img: "l.dici.acer.jpg" },
                { titulo: "Livros Raros - Reserva", img: "liv.acer.jpg" },
                { titulo: "Livros de Fisiologia", img: "livro.biblioteca.jpg" },
                { titulo: "Obras Monteiro Lobato", img: "l.monteiro.l.acer.jpg" },
                { titulo: "Livro 113 Anos - Capa", img: "pg1.png" },
                { titulo: "Livro 113 Anos - Pg 2", img: "pg2.png" },
                { titulo: "Livro 113 Anos - Pg 3", img: "pg3.png" },
                { titulo: "Livro 113 Anos - Pg 4", img: "pg4.png" },
                { titulo: "Livro 113 Anos - Pg 5", img: "pg5.png" },
                { titulo: "Livro 113 Anos - Pg 6", img: "pg6.png" },
                { titulo: "Livro 113 Anos - Pg 7", img: "pg7.png" },
                { titulo: "Livro 113 Anos - Pg 8", img: "pg8.png" },
                { titulo: "Livro 113 Anos - Pg 9", img: "pg9.png" },
                { titulo: "Livro 113 Anos - Pg 10", img: "pg10.png" },
                { titulo: "Livro 113 Anos - Pg 11", img: "pg11.png" },
                { titulo: "Livro 113 Anos - Pg 12", img: "pg12.png" },
                { titulo: "Livro 113 Anos - Pg 13", img: "pg13.png" },
                { titulo: "Livro 113 Anos - Pg 14", img: "pg14.png" },
                { titulo: "Livro 113 Anos - Pg 15", img: "pg15.png" },
                { titulo: "Livro 113 Anos - Pg 16", img: "pg16.png" },
                { titulo: "Livro 113 Anos - Pg 17", img: "pg17.png" },
                { titulo: "Livro 113 Anos - Pg 18", img: "pg18.png" },
                { titulo: "Livro 113 Anos - Pg 19", img: "pg19.png" },
                { titulo: "Livro 113 Anos - Pg 20", img: "pg20.png" },
                { titulo: "Livro 113 Anos - Pg 21", img: "pg21.png" },
                { titulo: "Livro 113 Anos - Pg 22", img: "pg22.png" },
                { titulo: "Livro 113 Anos - Pg 23", img: "pg23.png" },
                { titulo: "Livro 113 Anos - Pg 24", img: "pg24.png" },
                { titulo: "Livro 113 Anos - Pg 25", img: "pg25.png" },
                { titulo: "Livro 113 Anos - Pg 26", img: "pg26.png" },
                { titulo: "Livro 113 Anos - Pg 27", img: "pg27.png" },
                { titulo: "Livro 113 Anos - Pg 28", img: "pg28.png" },
                { titulo: "Livro 113 Anos - Pg 29", img: "pg29.png" },
                { titulo: "Livro 113 Anos - Pg 30", img: "pg30.png" },
                { titulo: "Livro 113 Anos - Pg 31", img: "pg31.png" },
                { titulo: "Livro 113 Anos - Pg 32", img: "pg32.png" },
                { titulo: "Livro 113 Anos - Pg 33", img: "pg33.png" },
                { titulo: "Livro 113 Anos - Pg 34", img: "pg34.png" },
                { titulo: "Livro 113 Anos - Pg 35", img: "pg35.png" },
                { titulo: "Livro 113 Anos - Pg 36", img: "pg36.png" },
                { titulo: "Livro 113 Anos - Pg 37", img: "pg37.png" }
                
            ]
        },
        curiosidades: {
            titulo: "Curiosidades e Arquitetura",
            descricao: "Detalhes construtivos, homenagens e brasões históricos da escola.",
            itens:[
                { titulo: "Logo Madeira", img: "logo.mad.jpg" },
                { titulo: "Logo Principal Parede", img: "logo.princ.jpg" },
                { titulo: "Monumento Gramado (Longe)", img: "c.homenagem.longe.g.jpg" },
                { titulo: "Monumento Gramado (Perto)", img: "c.homenagem.grama.jpg" },
                { titulo: "Piso Antigo (Corredor)", img: "c.chao.corredor.jpg", legenda: "Azulejo hidráulico original" },
                { titulo: "Piso de Madeira (Sala)", img: "c.chão.sala.jpg" },
                { titulo: "Escada de Pedra", img: "c.escada.pedra.co.jpg" },
                { titulo: "Tijolo Exposto (Sala)", img: "c.tijol.sala.jpg" },
                { titulo: "Amostra de Tinta Antiga", img: "c.tinta.parede13.jpg" },
                { titulo: "Pintura Antiga Parede", img: "c.pint.antiga.jpg" },
                { titulo: "Teste de Tinta Histórica", img: "c.tin.antiga.jpg" },
                { titulo: "Parede Profunda", img: "c.pared.prof.jpg" },
                { titulo: "Tijolo Imperial", img: "c.tij.imperial.acer.jpg", legenda: "Tijolo com o Brasão do Império usado na construção" },
                { titulo: "Placa Jequitibá", img: "c.plac.jequi.acer.jpg" },
                { titulo: "Placas Homenagem Acervo", img: "c.placas.acer.jpg" },
                { titulo: "Mural de Placas Homenagem", img: "c.homenagem.corredor2.jpg" },
                { titulo: "Árvore Centenária", img: "c.arvore.100.jpg" },
                { titulo: "Fotos antigas", img: "c.corredor.direção.jpn" },
                { titulo: "Mural de Placas Homenagem", img: "c.homenagem.corredor2.jpg" },

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
        const idx = repositorioAcervo.biblioteca_acervo.itens.findIndex(i => i.img === 'pg1.png');
        if(idx !== -1) abrirLightbox(repositorioAcervo.biblioteca_acervo.itens, idx);
    });

    /* ==========================================================================
       4. REPOSITÓRIO DE PROFESSORES
       ========================================================================== */
    const repositorioProfessores = {
        linguagens: {
            titulo: "Professores de Linguagens",
            descricao: "Língua Portuguesa, Literatura, Inglês e Artes.",
            professores: [
                { nome: "Profª. Adriana", disciplina: "Educação Física", img: "prof.adriana.jpeg" },
                { nome: "Profª. Alexandra", disciplina: "Língua Portuguesa", img: "prof.alexandra.jpeg" },
                { nome: "Profª. Célia", disciplina: "Língua Portuguesa", img: "prof.celia.jpeg" },
                { nome: "Prof. Matheus", disciplina: "Língua Portuguesa", img: "prof.matheus.jpeg" },
                { nome: "Profª. M. Eduarda", disciplina: "Língua Portuguesa", img: "prof.m.eduarda.jpeg" },
                { nome: "Profª. Patrícia", disciplina: "Artes", img: "prof.patricia.jpeg" },
                { nome: "Profª. Sandra", disciplina: "Inglês", img: "prof.sandra.jpeg" },
                { nome: "Prof. Victor", disciplina: "Redação e Leitura", img: "prof.victor.jpeg" }
            ]
        },
        exatas: {
            titulo: "Professores de Exatas",
            descricao: "Matemática e Raciocínio Lógico.",
            professores: [
                { nome: "Profª. Carina", disciplina: "Matemática", img: "prof.carina.jpeg" },
                { nome: "Prof. Denilson", disciplina: "Física", img: "prof.denilson.jpeg" },
                { nome: "Prof. Flávio", disciplina: "Biologia", img: "prof.flavio.jpeg" },
                { nome: "Prof. Lucas", disciplina: "Matemática", img: "prof.lucas.jpeg" },
                { nome: "Profª. Sônia", disciplina: "Matemática", img: "prof.dourado.jpeg" },
               
            ]
        },
        humanas: {
            titulo: "Professores de Ciências Humanas",
            descricao: "História, Geografia, Filosofia e Sociologia.",
            professores: [
                { nome: "Prof. Guilherme", disciplina: "Sociologia", img: "prof.guilherme.soci.jpeg" },
                { nome: "Profª. Paty", disciplina: "Geografia", img: "prof.paty.jpeg" },
                { nome: "Profª. Paula", disciplina: "História", img: "prof.paula.jpeg" },
            ]
        },
        natureza: {
            titulo: "Professores de Ciências da Natureza",
            descricao: "Física, Química e Biologia.",
            professores: [
                { nome: "Profª. Camila", disciplina: "Quimica", img: "prof.camila.jpeg" },
                { nome: "Profª. Cláudia", disciplina: "Biologia", img: "prof.claudia.jpeg" },
                { nome: "Prof. Flávio", disciplina: "Biologia", img: "prof.flavio.jpeg" },
                { nome: "Prof. Guilherme", disciplina: "Química", img: "prof.gulherme.quim.jpeg" },
                { nome: "Profª. Isabelle", disciplina: "Física", img: "prof.isabelle.jpeg" }
                
            ]
        },
        tecnico: {
            titulo: "Professores do Técnico",
            descricao: "Desenvolvimento de Sistemas e Saúde/Ed. Física.",
            professores: [
                { nome: "Prof. Alex", disciplina: "Dev. Sistemas", img: "prof.alex.tec.ds.jpeg" },
                { nome: "Prof. Aparecido", disciplina: "Dev. Sistemas", img: "prof.aparecido.tec.ds.jpeg" },
                { nome: "Profª. Gláucia", disciplina: "Dev. Sistemas", img: "prof.glaucia.tec.ds.jpeg" },
                { nome: "Profª. Fran", disciplina: "Enfermagem", img: "prof.fran.ef.jpeg" },
                { nome: "Profª. Jacke", disciplina: "Enfermagem", img: "prof.jacke.ef.jpeg" },
                { nome: "Profª. Lídia", disciplina: "Enfermagem", img: "prof.fran.ef.jpeg" }
            
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

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            fecharLightbox();
            modalAcervo?.setAttribute('hidden', '');
            modalProfessores?.setAttribute('hidden', '');
            document.body.style.overflow = '';
        }
    });

    /* ==========================================================================
       5. CHATBOT FLUTUANTE (Com as novas regras importadas do Python)
       ========================================================================== */
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
   
       // Base de perguntas e respostas com letras minúsculas e sem acentos nas chaves
       const baseConhecimento = {
           "ajuda":"Eu sou um bot feito 100% em Python! (Adaptado para Web)",
           "localização": "Aqui está a localização da escola, R. Culto à Ciência, 422 - Botafogo, Campinas - SP, 13020-060",
           "endereço": "Aqui está o endereço da escola, R. Culto à Ciência, 422 - Botafogo, Campinas - SP, 13020-060",
           "onde": "Aqui está o endereço da escola, R. Culto à Ciência, 422 - Botafogo, Campinas - SP, 13020-060",
           "historia": "O Colégio Estadual Culto à Ciência, em Campinas (SP), fundado em 1874, é a escola mais antiga do Brasil a funcionar ininterruptamente no mesmo prédio. Criado por maçons da Loja Independência para promover o ensino laico e científico baseado no positivismo, o colégio é tombado como patrimônio histórico e é referência em educação, famoso por sua arquitetura clássica francesa e acervo centenário.",
           "patrimonio-historico": "O Colégio Estadual Culto à Ciência, em Campinas (SP), fundado em 1874, é a escola mais antiga do Brasil a funcionar ininterruptamente no mesmo prédio. Criado por maçons da Loja Independência para promover o ensino laico e científico baseado no positivismo, o colégio é tombado como patrimônio histórico e é referência em educação, famoso por sua arquitetura clássica francesa e acervo centenário.",
           "diretor": "O diretor atual da Escola Estadual Culto à Ciência se chama Glauber Maldonado Ferreira",
           "vice": "A atual vice-diretora da Escola Estadual Culto à Ciência se chama Andreia Alves Ferreira",
           "vice-diretor": "O atual vice-diretor da Escola Estadual Culto à Ciência se chama Andreia Alves Ferreira",
           "fundou": "O fundador da escola...",
           "fundador": " O fundador da escola...",
           "criador": "O fundador da escola...",
           "iniciou": "A Escola Estadual Culto à Ciência foi fundada no ano de....",
           "fundaram": " A Escola Estadual Culto à Ciência foi fundada no ano de....",
           "ano": "A Escola Estadual Culto à Ciência foi fundada no ano de....",
           "fundacao": " A Escola Estadual Culto à Ciência foi fundada no ano de....",
           "quais famosos": "Cláudia Raia",
           "aulas": "Seg: 7h00-16h30 | Ter: 7h00-16h30 | Qua: 7h00-16h30 | Qui: 7h00-16h30 | Sex: 7h00-16h30 | Sáb: fechado | Dom: 7h00-16h30",
           "horario": "Seg: 7h00-16h30 | Ter: 7h00-16h30 | Qua: 7h00-16h30 | Qui: 7h00-16h30 | Sex: 7h00-16h30 | Sáb: fechado | Dom: 7h00-16h30"
       };
   
       function obterRespostaBot(mensagemUsuario) {
           // Deixa minúsculo e remove acentos
           const msg = mensagemUsuario.toLowerCase()
                                      .normalize("NFD")
                                      .replace(/[\u0300-\u036f]/g, "");
   
           // Regra Especial 1: Sair / Tchau (Fecha a janela do chat)
           if (msg.includes("sair") || msg.includes("tchau")) {
               chatbotWindow.setAttribute('hidden', '');
               return null; 
           }
   
           // Regra Especial 2: Saudações (Oi, Olá, Bom dia, Boa tarde, Boa noite)
           if (msg.includes("ola") || msg.includes("oi") || msg.includes("bom dia") || msg.includes("boa tarde") || msg.includes("boa noite")) {
               return "Bot: Seja bem-vindo(a) ao Site Culto Web, muito bom ter você aqui! Em que eu posso te ajudar?";
           }
   
           // Regra Especial 3: Combinação de Palavras (Acolhimento AND Laranjinhas)
           if (msg.includes("acolhimento") && msg.includes("laranjinhas")) {
               return "Bot: O acolhimento ocorre no início das aulas, no começo do ano com a intenção de integrar e acolher os novos alunos da escola. Com a intenção de criar um ambiente confortável, seguro, harmonioso e agradável à comunidade escolar.";
           }
   
           // Busca no dicionário de perguntas e respostas geral
           for (let chave in baseConhecimento) {
               if (msg.includes(chave)) {
                   return baseConhecimento[chave];
               }
           }
   
           // Resposta padrão (Else)
           return "Bot: Ainda estou aprendendo a entender isso...";
       }
   
       chatbotForm?.addEventListener('submit', (e) => {
           e.preventDefault();
           const text = chatbotInput.value.trim();
           if(!text) return;
   
           // Renderiza mensagem do usuário
           chatbotMessages.innerHTML += `<div class="chatbot__message chatbot__message--user"><p>${text}</p></div>`;
           chatbotInput.value = '';
           chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
   
           // Processa e renderiza a resposta do Cultinho
           setTimeout(() => {
               const respostaBot = obterRespostaBot(text);
               
               // Se o bot retornou null (no caso do comando "sair"), não imprime nada na tela
               if (respostaBot !== null) {
                   chatbotMessages.innerHTML += `<div class="chatbot__message chatbot__message--bot"><p>${respostaBot}</p></div>`;
                   chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
               }
           }, 600);
       });
   
    });
   
