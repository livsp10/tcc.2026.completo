
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
                { titulo: "Museu do Acervo", img: "museu/acervo1.jpg" },
                { titulo: "Sala de Acervo", img: "museu/acervo2.jpg" },
                { titulo: "Mesa Antiga do Acervo", img: "museu/acervo3.jpg" },
                { titulo: "Mesas Antigas", img: "museu/acervo4.jpg" },
                { titulo: "Objetos Históricos", img: "museu/acervo5.jpg" },
                { titulo: "Objetos Históricos", img: "museu/acervo6.jpg" },
                { titulo: "Objetos Históricos", img: "museu/acervo7.jpg" },
                { titulo: "Cadeiras Antigas", img: "museu/acervo8.jpg" },
                { titulo: "Cadeiras Antigas", img: "museu/acervo9.jpg" },
                { titulo: "Jequitibá", img: "museu/acervo10.jpg" },
                { titulo: "Homenagens", img: "museu/acervo11.jpg" },
                { titulo: "Parede de Troféus", img: "museu/acervo12.jpg" },
                { titulo: "Museu do Acervo", img: "museu/acervo13.jpg" },
                { titulo: "Telescópio", img: "museu/acervo14.jpg" },
                { titulo: "Telescópio", img: "museu/acervo15.jpg" },
                { titulo: "Objetos Históricos", img: "museu/acervo16.jpg" },
                { titulo: "Animais Empalhados", img: "museu/acervo17.jpg" },
                { titulo: "Animais Empalhados", img: "museu/acervo18.jpg" },
                { titulo: "Animais Empalhados", img: "museu/acervo19.jpg" },
                { titulo: "Animais Empalhados", img: "museu/acervo20.jpg" },
                { titulo: "Animais Empalhados", img: "museu/acervo21.jpg" },
                { titulo: "Animais Empalhados", img: "museu/acervo22.jpg" },
                { titulo: "Professores Antigos", img: "museu/acervo23.jpg" },
                { titulo: "Professores Antigos", img: "museu/acervo24.jpg" },
                { titulo: "Diretores Antigos", img: "museu/acervo25.jpg" },
                { titulo: "Objetos Históricos", img: "museu/acervo26.jpg" },
                { titulo: "Professores Conhecidos", img: "museu/acervo27.jpg" },
                { titulo: "Professores Conhecidos", img: "museu/acervo28.jpg" },
                { titulo: "Tijolo Imperial", img: "museu/acervo29.jpg" },
                { titulo: "Sala Acervo", img: "museu/acervo30.jpg" },
                { titulo: "Homenagens", img: "museu/acervo31.jpg" },
                { titulo: "Carteiras Antigas", img: "museu/acervo32.jpg" },
                { titulo: "Mesa Histórica", img: "museu/acervo33.jpg" },
                { titulo: "Retratos Antigos", img: "museu/acervo34.jpg" },
            ]
            
        },
            biblioteca_acervo: {
                titulo: "Biblioteca Histórica",
                descricao: "Obras clássicas, anuários e livros raros da instituição.",
                itens: [
                    { titulo: "Nossa Biblioteca ", img: "biblioteca/biblio.1.jpg" },
                    { titulo: "Caminhoá Botânica", img: "biblioteca/biblio.2.jpg" },
                    { titulo: "Geografia de Língua Escrava", img: "biblioteca/biblio.4.jpg" },
                    { titulo: "Recenseamento do Brazil", img: "biblioteca/biblio.5.jpg" },
                    { titulo: "Reserva Especial", img: "biblioteca/biblio.6.jpg" },
                    { titulo: "Coletânea de Livros", img: "biblioteca/biblio.7.jpg" },
                    { titulo: "Coletânea de Livros", img: "biblioteca/biblio.9.jpg" },
                    { titulo: "Livro Manuscrito", img: "biblioteca/biblio.10.jpg" },
                    { titulo: "Coletânea de Livros Manuscritos ", img: "biblioteca/biblio.11.jpg" },
                    { titulo: "Coletânea de Enciclopédia", img: "biblioteca/biblio.12.jpg" },
                    { titulo: "Coletânea de Livros", img: "biblioteca/biblio.13.jpg" },
                    { titulo: "Coletânea de Livros", img: "biblioteca/biblio.14.jpg" },
                    { titulo: "Coletânea de Livros", img: "biblioteca/biblio.15.jpg" },
                    { titulo: "Santos Drummond", img: "biblioteca/biblio.16.jpg" },
                    { titulo: "Santos Drummond", img: "biblioteca/biblio.17.jpg" },
                    { titulo: "Bíblias Sagradas", img: "biblioteca/biblio.18.jpg" },
                    { titulo: "Geografia do Brasil", img: "biblioteca/biblio.19.jpg" },
                    { titulo: "Personagens da nossa história ", img: "biblioteca/biblio.20.jpg" },
                    { titulo: "Livros Históricos", img: "biblioteca/biblio.21.jpg" },
                    { titulo: "Coleção Buffon", img: "biblioteca/biblio.22.jpg" },
                    { titulo: "Dicionário Geographico", img: "biblioteca/biblio.23.jpg" },
                    { titulo: "Dicionário Geographico", img: "biblioteca/biblio.24.jpg" },
                    { titulo: "Obras Monteiro Lobato", img: "biblioteca/biblio.25.jpg" },
                    { titulo: "Dicionário Geographico", img: "biblioteca/biblio.26.jpg" },
                    { titulo: "Livro Albert Einstein", img: "biblioteca/biblio.27.jpg" },
                    { titulo: "Anais de Medicina", img: "biblioteca/biblio.28.jpg" },
                    { titulo: "Coletânea de Fisiologia", img: "biblioteca/biblio.29.jpg" },
                    { titulo: "Dicionários Antigos", img: "biblioteca/biblio.30.jpg" },
                    { titulo: "Os Lusíadas", img: "biblioteca/biblio.32.jpg" },
                    { titulo: "Acervo Jânio Quadros", img: "biblioteca/biblio.33.jpg" }
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
                { titulo: "Árvore Centenária", img: "curiosidades/curiosidade1.jpg" },
                { titulo: "Piso Hidráulico Português", img: "curiosidades/curiosidade2.jpg" },
                { titulo: "Piso de Madeira ", img: "curiosidades/curiosidade3.jpg" },
                { titulo: "Fotos Antigas", img: "curiosidades/curiosidade4.jpg" },
                { titulo: "Escada de Pedra", img: "curiosidades/curiosidade5.jpg", legenda: "Azulejo hidráulico original" },
                { titulo: "Homenagens", img: "curiosidades/curiosidade6.jpg" },
                { titulo: "Monumento Gramado", img: "curiosidades/curiosidade8.jpg" },
                { titulo: "Monumento Gramado", img: "curiosidades/curiosidade9.jpg" },
                { titulo: "Parede Profunda", img: "curiosidades/curiosidade9.jpg" },
                { titulo: "Pintura Antiga", img: "curiosidades/curiosidade10.jpg" },
                { titulo: "Parede Histórica", img: "curiosidades/curiosidade11.jpg" },
                { titulo: "Tintas Antigas", img: "curiosidades/curiosidade12.jpg" },
                { titulo: "Teste de Tintas", img: "curiosidades/curiosidade13.jpg", legenda: "Tijolo com o Brasão do Império usado na construção" },
                { titulo: "Professores Homenagiados", img: "curiosidades/curiosidade14.jpg" },
                { titulo: "Professores Homenagiados", img: "curiosidades/curiosidade15.jpg" },
                { titulo: "Pia Antiga", img: "curiosidades/curiosidade16.jpg" },
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
            descricao: "Língua Portuguesa, Literatura, Inglês, Arte, Redação e Leitura, O.E .",
            professores: [
                { nome: "Profª. Adriana", disciplina: "Educação Física", img: "professores/prof.adriana.jpeg" },
                { nome: "Profª. Alexandra", disciplina: "Língua Portuguesa", img: "professores/prof.alexandra.jpeg" },
                { nome: "Profª. Célia", disciplina: "Língua Portuguesa", img: "professores/prof.celia.jpeg" },
                { nome: "Prof. Matheus", disciplina: "Língua Portuguesa", img: "professores/prof.matheus.jpeg" },
                { nome: "Profª. M. Eduarda", disciplina: "Língua Portuguesa", img: "professores/prof.m.eduarda.jpeg" },
                { nome: "Profª. Patrícia", disciplina: "Arte", img: "professores/prof.patricia.jpeg" },
                { nome: "Profª. Sandra", disciplina: "Inglês", img: "professores/prof.sandra.jpeg" },
                { nome: "Prof. Victor", disciplina: "Língua Portuguesa", img: "professores/prof.victor.jpeg" }
            ]
        },
        exatas: {
            titulo: "Professores de Exatas",
            descricao: "Matemática e O.E.",
            professores: [
                { nome: "Profª. Carina", disciplina: "Matemática", img: "professores/prof.carina.jpeg" },
                { nome: "Prof. Lucas", disciplina: "Matemática", img: "professores/prof.lucas.jpeg" },
                { nome: "Profª. Sônia", disciplina: "Matemática", img: "professores/prof.dourado.jpeg" }
            ]
        },
        humanas: {
            titulo: "Professores de Ciências Humanas",
            descricao: "História, Geografia, Filosofia e Sociologia.",
            professores: [
                { nome: "Prof. Guilherme", disciplina: "Filosofia/Sociologia", img: "professores/prof.guilherme.soci.jpeg" },
                { nome: "Profª. Paty", disciplina: "Geografia", img: "professores/prof.paty.jpeg" },
                { nome: "Profª. Paula", disciplina: "História", img: "professores/prof.paula.jpeg" }
            ]
        },
        natureza: {
            titulo: "Professores de Ciências da Natureza",
            descricao: "Física, Química, Biologia e Práticas Experimentais.",
            professores: [
                { nome: "Profª. Camila", disciplina: "Quimica", img: "professores/prof.camila.jpeg" },
                { nome: "Profª. Cláudia", disciplina: "Biologia", img: "professores/prof.claudia.jpeg" },
                { nome: "Prof. Flávio", disciplina: "Biologia", img: "professores/prof.flavio.jpeg" },
                { nome: "Prof. Guilherme", disciplina: "Química", img: "professores/prof.gulherme.quim.jpeg" },
                { nome: "Profª. Isabelle", disciplina: "Física", img: "professores/prof.isabelle.jpeg" },
                { nome: "Prof. Denilson", disciplina: "Física", img: "professores/prof.denilson.jpeg" },
            ]
        },
        tecnico: {
            titulo: "Professores do Técnico",
            descricao: "Desenvolvimento de Sistemas e Efermagem.",
            professores: [
                { nome: "Prof. Alex", disciplina: "Dev. Sistemas", img: "professores/prof.alex.tec.ds.jpeg" },
                { nome: "Prof. Aparecido", disciplina: "Dev. Sistemas", img: "professores/prof.aparecido.tec.ds.jpeg" },
                { nome: "Profª. Gláucia", disciplina: "Dev. Sistemas", img: "professores/prof.glaucia.tec.ds.jpeg" },
                { nome: "Profª. Fran", disciplina: "Enfermagem", img: "professores/prof.fran.ef.jpeg" },
                { nome: "Profª. Jacke", disciplina: "Enfermagem", img: "professores/prof.jacke.ef.jpeg" },
                { nome: "Profª. Lídia", disciplina: "Enfermagem", img: "professores/prof.lidia.ef.jpeg" }
            ]
        },
        especial: {
            titulo: "Professores de Apoio",
            descricao: "Apoio",
            professores: [
                { nome: "Profª Mônica", disciplina: "Educação Especial", img: "professores/prof.especial1.jpeg" },
                { nome: "Profª Cintia", disciplina: "Apoio ao Protagonismo", img: "professores/prof.especial1.jpeg" },
               
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

//respostas 
const bancoDeRespostas = {
    

    "titulo": "Não existem registros históricos de títulos esportivos de relevância nacional ou regional associados ao Colégio Culto à Ciência, mas, embora nem a Associação Atlética Ponte Preta (fundada em 1900) e nem o Guarani Futebol Clube (fundado em 1911) tenham nascido oficialmente dentro das salas de aula do Culto à Ciência, a escola foi o ponto de encontro crucial para os jovens que os criaram.",
    "titulos":"Não existem registros históricos de títulos esportivos de relevância nacional ou regional associados ao Colégio Culto à Ciência, mas, embora nem a Associação Atlética Ponte Preta (fundada em 1900) e nem o Guarani Futebol Clube (fundado em 1911) tenham nascido oficialmente dentro das salas de aula do Culto à Ciência, a escola foi o ponto de encontro crucial para os jovens que os criaram.",
    "historia": "A Escola Estadual Culto à Ciência foi fundada em 1873 pela Sociedade Culto à Ciência, inspirada nos ideais iluministas e positivistas. Nosso prédio principal é tombado pelo CONDEPHAAT! Também temos um Livro Digital disponível no nosso site caso você queira saber mais afundo sobre a História da Escola Culto À Ciência!",
    "escola": "A Escola Estadual Culto à Ciência foi fundada em 1873 pela Sociedade Culto à Ciência, inspirada nos ideais iluministas e positivistas. Nosso prédio principal é tombado pelo CONDEPHAAT! Também temos um Livro Digital disponível no nosso site caso você queira saber mais afundo sobre a História da Escola Culto À Ciência!",
    "diretor":"O diretor atual da Escola Estadual Culto à Ciência se chama Glauber Maldonado Ferreira",
    "vice diretor":"O atual vice-diretor da Escola Estadual Culto à Ciência se chama Andreia Alves Ferreira",
    "vice":"O atual vice-diretor da Escola Estadual Culto à Ciência se chama Andreia Alves Ferreira",
    "professores":"Saiba mais sobre os professores na aba 'PROFESSORES' no menu!",
    "fundador":"O Colégio Culto à Ciência não foi fundado por uma única pessoa, mas sim por um grupo de idealistas, fazendeiros, comerciantes e intelectuais, muitos deles ligados à maçonaria da Loja 'Independência', reunidos na associação civil sem fins lucrativos Sociedade Culto à Ciência. Também temos um Livro Digital disponível no nosso site caso você queira saber mais afundo sobre a História da Escola Culto À Ciência!",
    "fundada":"A Escola Estadual Culto à Ciência foi fundada no ano de 1873. Também temos um Livro Digital disponível no nosso site caso você queira saber mais afundo sobre a História da Escola Culto À Ciência!",
    "fundaçao":"A Escola Estadual Culto à Ciência foi fundada no ano de 1873. Também temos um Livro Digital disponível no nosso site caso você queira saber mais afundo sobre a História da Escola Culto À Ciência!",
    "anos":"Com base no ano de sua fundação em 1873, a Escola Estadual Culto à Ciência tem hoje 153 anos de história.",
    "pessoas":"O aluno mais famoso foi Alberto Santos Dumont, o Pai da Aviação, que estudou lá na década de 1880. Na televisão e no jornalismo, a escola teve alunos icônicos como o apresentador Fausto Silva (Faustão) e o jornalista Júlio de Mesquita, do jornal O Estado de S. Paulo.",
    "colégio": "A Escola Estadual Culto à Ciência foi fundada em 1873 pela Sociedade Culto à Ciência, inspirada nos ideais iluministas e positivistas. Nosso prédio principal é tombado pelo CONDEPHAAT!",
    "historia": "A Escola Estadual Culto à Ciência foi fundada em 1873 pela Sociedade Culto à Ciência, inspirada nos ideais iluministas e positivistas. Nosso prédio principal é tombado pelo CONDEPHAAT!","endereco": "Ficamos na R. Culto à Ciência, 422 - Botafogo, Campinas - SP, CEP 13020-060.",
    "localização": "Ficamos na R. Culto à Ciência, 422 - Botafogo, Campinas - SP, CEP 13020-060.",
    "telefone": "Você pode entrar em contato conosco pelo telefone (19) 3232-3511.",
    "contato": "Você pode falar conosco pelo telefone (19) 3232-3511 ou pelo formulário de contato abaixo.",
    "curso":"A escola oferece os Itinerários Formativos de Matemática e Ciências da Natureza, Linguagens e Ciências Humanas e Sociais, Téc. em Enfermagem e Téc. em Desenvolvimento de Sistemas",
    "cursos":"A escola oferece os Itinerários Formativos de Matemática e Ciências da Natureza, Linguagens e Ciências Humanas e Sociais, Téc. em Enfermagem e Téc. em Desenvolvimento de Sistemas",
    "horarios":"A secretaria da escola fica disponível das 9h-11h30, 13h-15h30",
    "secretaria":"A secretaria da escola fica disponível das 9h-11h30, 13h-15h30",
    "horario":"A secretaria da escola fica disponível das 9h-11h30, 13h-15h30",
    "funcionamento":"A secretaria da escola fica disponível das 9h-11h30, 13h-15h30",
    "aulas": "As aulas ocorrem de Segunda a Sexta, das 7h30-16h30",
    "aula":"As aulas ocorrem de Segunda a Sexta, das 7h30-16h30",
    "biblioteca": "Nossa biblioteca conta com um espaço incrível para pesquisas, leitura e jogos. Ela fica aberta durante os intervalos para estudos, jogos e empréstimos de livros.",
    "regras": "Sobre regras de convivência,você pode consultar o seu tutor.",
    "laboratorios": "Contamos com laboratórios equipados de Biologia, Química, Física, Informática e Enfermagem para apoiar as aulas práticas dos itinerários e dos cursos técnicos!",
    "laboratorio": "Contamos com laboratórios equipados de Biologia, Química, Física, Informática e Enfermagem para apoiar as aulas práticas dos itinerários e dos cursos técnicos!",
    "refeição": "Como somos uma escola de Tempo Integral (PEI), oferecemos café da manhã, almoço e lanche da tarde para todos os alunos nos intervalos das aulas!",
    "almoço": "Como somos uma escola de Tempo Integral (PEI), oferecemos café da manhã, almoço e lanche da tarde para todos os alunos nos intervalos das aulas!",
    "lanche": "Como somos uma escola de Tempo Integral (PEI), oferecemos café da manhã, almoço e lanche da tarde para todos os alunos nos intervalos das aulas!",
    "merenda": "Como somos uma escola de Tempo Integral (PEI), oferecemos café da manhã, almoço e lanche da tarde para todos os alunos nos intervalos das aulas!",
    "celular": "O uso de celulares é proibido nas escolas brasileiras (conforme a Lei Federal nº 15.100, sancionada em 13 de janeiro de 2025) para proteger a concentração, o aprendizado e a saúde mental de crianças e adolescentes da educação básica.",
    "celulares": "O uso de celulares é proibido nas escolas brasileiras (conforme a Lei Federal nº 15.100, sancionada em 13 de janeiro de 2025) para proteger a concentração, o aprendizado e a saúde mental de crianças e adolescentes da educação básica.",
    "vestimenta": "O uso do uniforme da escola é obrigatório para a segurança de todos. Caso tenha dúvidas sobre peças permitidas, consulte a coordenação!",
    "uniforme": "O uso do uniforme da escola é obrigatório para a segurança de todos. Caso tenha dúvidas sobre peças permitidas, consulte a coordenação!",
    "itinerario":"A escola oferece os Itinerários Formativos de Matemática e Ciências da Natureza, Linguagens e Ciências Humanas e Sociais, Téc. em Enfermagem e Téc. em Desenvolvimento de Sistemas",
    "itinerarios":"A escola oferece os Itinerários Formativos de Matemática e Ciências da Natureza, Linguagens e Ciências Humanas e Sociais, Téc. em Enfermagem e Téc. em Desenvolvimento de Sistemas",
    "tecnico": "Temos os cursos técnicos integrados de Desenvolvimento de Sistemas e Enfermagem, com foco prático para o mercado de trabalho.",
    "ajuda": "Eu posso te ajudar com informações sobre a HISTÓRIA da escola, nosso ENDEREÇO, TELEFONE, CURSOS e ITINERÁRIOS oferecidos, HORÁRIOS de funcionamento! O que quer saber?",
    "livro":"Temos um Livro Digital caso você queira saber mais afundo sobre a História da Escola Culto À Ciência",
    "oi": "Olá! Eu sou o Cultinho, assistente virtual da escola. Digite sua dúvida ou digite 'ajuda' para ver o que posso fazer!",
    "ola": "Olá! Eu sou o Cultinho, assistente virtual da escola. Digite sua dúvida ou digite 'ajuda' para ver o que posso fazer!",
    "valeu": "De nada! O Cultinho está sempre aqui para ajudar. Se precisar de mais alguma coisa, é só chamar! 😉",
    "obrigado": "De nada! O Cultinho está sempre aqui para ajudar. Se precisar de mais alguma coisa, é só chamar! 😉",
    "obrigada": "De nada! O Cultinho está sempre aqui para ajudar. Se precisar de mais alguma coisa, é só chamar! 😉",
    "ate logo": "Até logo! Tenha um ótimo dia de estudos no Culto! 🏫",
    "ate mais": "Até logo! Tenha um ótimo dia de estudos no Culto! 🏫",
    "ate tchau": "Até logo! Tenha um ótimo dia de estudos no Culto! 🏫",
    "adeus": "Até logo! Tenha um ótimo dia de estudos no Culto! 🏫",
    "default": "Desculpe, eu ainda estou aprendendo e não entendi muito bem. 😅 Você pode tentar usar palavras-chave mais simples ou digitar 'ajuda' para ver o que eu sei responder!",
};

chatbotForm?.addEventListener('submit', (e) => {
    e.preventDefault();
    const text = chatbotInput.value.trim();
    if(!text) return;

    // coloca a mensagem do usuário na tela
    chatbotMessages.innerHTML += `<div class="chatbot__message chatbot__message--user"><p>${text}</p></div>`;
    chatbotInput.value = '';
    chatbotMessages.scrollTop = chatbotMessages.scrollHeight;

    // remove acentos e deixa tudo em letras minúsculas para facilitar a busca
    const termoBusca = text.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
    
    // Resposta padrão caso o robô não entenda
    let respostaBot = "Desculpe, não entendi muito bem.               Eu posso te ajudar com informações sobre a HISTÓRIA da escola, nosso ENDEREÇO, SECRETARIA, TELEFONE, CURSOS e ITINERÁRIOS oferecidos, HORÁRIOS de funcionamento e das AULAS!                                                        Caso eu ainda não consiga responder a sua dúvida, procure a SECRETARIA da escola ou ligue no número disponivel.";

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
