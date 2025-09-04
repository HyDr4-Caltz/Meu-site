const express = require('express');
const cors = require('cors');

const app = express();
const port = 3001;

app.use(cors());

const curriculoData = {
    name: "Daniel Azanha",
    role: "Desenvolvedor de Softwere | Engenheiro de Dados",
    contato: {
        email: "danielazanhasarruf@gmail.com",
        linkedin: "https://www.linkedin.com/in/danielazanhasarruf/",
        github: "https://github.com/HyDr4-Caltz",
        numero: "+55(15)981028243"
    },
    sobre: "Me chamo Daniel, sou um jovem que estuda sobre a area da tecnologia a muito tempo, mesmo sem nem saber, sempre fui interessado pela area de programação, mesmo quando criança, para fins de diversão, fazendo modificaçãoes em jogos e criando texturas para esses, com o tempo passando e o mundo mudando eu aprendi que isso e uma area inteira a ser explorada e assim se iniciou minha jornada com varios altos e baixos no mundo da programação",
    experiencia:[
        {
            empresa: "337 Magnetic Marketing Digital",
            role: "Desenvolvedor junior",
            period: "Ago 2024 - Dez 2024",
            description: "Responsavel por fazer um sistema low-code utilizando a plataforma N8N para o disparo de publicações cordenadas em diferentes redes sociasis utilizando a API de redes sociais como Instagram, Whatsapp e outros para esta finalidade, e utilizando de Javascript para cordenar todos estes disparos."
    },
    {
        empresa: "Libere e Prospere",
        role: "Auxiliar de Desenvolvimento",
        period: "Fev 2025 - Jul 2025",
        description: "Responsavel pelo desenvolvimento de uma API REST com Python e FastAPI e desenvolvimento e aplicação de banco de dados usando PostgreSQL para um Chat-Bot com a finalidade de coleta de dados e refinamento de dados."
    }

],

    skills: [
        { name:'TypeScript' ,iconUrl:'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/typescript/typescript-original.svg', color: '#3178C6', description:'Um superset do JavaScript que adiciona tipagem estática. É usado para criar aplicações robustas e escaláveis, prevenindo erros e melhorando a organização do código.' },
        { name:'JavaScript' ,iconUrl:'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/javascript/javascript-original.svg', color: '#F7DF1E', description:'A linguagem fundamental da web. Essencial para criar interatividade e dinamismo em páginas, sendo a base para a maioria dos frameworks front-end modernos.'},
        { name:'Python' ,iconUrl:'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/python/python-original.svg', color:'#3776AB', description:'Linguagem versátil e de alto nível, amplamente utilizada em desenvolvimento web (back-end), automação de tarefas, ciência de dados e inteligência artificial.'},
        { name:'NodeJS' ,iconUrl:'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nodejs/nodejs-original-wordmark.svg', color: '#339933', description:'Um ambiente de execução que permite rodar JavaScript no lado do servidor. Ideal para construir APIs rápidas, escaláveis e aplicações em tempo real.'},
        { name:'React' ,iconUrl:'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/react/react-original.svg', color: '#61DAFB', description:'Uma biblioteca JavaScript para criar interfaces de usuário interativas e componentizadas. É a base para a construção de Single-Page Applications (SPAs) modernas.'},
        { name:'NextJS' ,iconUrl:'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nextjs/nextjs-original.svg', color: '#000000', description:'Um framework React que adiciona funcionalidades como renderização no servidor (SSR) e geração de sites estáticos (SSG), otimizando a performance e o SEO de aplicações web.'},
        { name:'PostgreSQL' ,iconUrl:'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/postgresql/postgresql-original.svg', color: '#4169E1', description:'Um poderoso sistema de banco de dados relacional de código aberto, conhecido por sua confiabilidade, robustez e conformidade com os padrões SQL.'},
        { name:'Docker' ,iconUrl:'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/docker/docker-original.svg', color: '#2496ED', description:'Plataforma de containerização que empacota aplicações e suas dependências em contêineres isolados, garantindo consistência entre os ambientes de desenvolvimento e produção.'},
        { name:'SQL' ,iconUrl:'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/azuresqldatabase/azuresqldatabase-original.svg', color: '#4479A1', description:'Linguagem padrão para gerenciar e consultar dados em bancos de dados relacionais. É uma habilidade crucial para qualquer aplicação que lida com armazenamento de dados.'},
        { name:'Selenium' ,iconUrl:'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/selenium/selenium-original.svg', color: '#ff2400', description:'Ferramenta de automação de navegadores. É amplamente utilizada para a criação de testes automatizados de aplicações web e para web scraping (extração de dados).'},
        { name:'SQLLite3' ,iconUrl:'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/sqlite/sqlite-original.svg', color: '#003B57', description:'Um banco de dados SQL embutido, contido em um único arquivo. É extremamente leve e ideal para aplicações mobile, desktop e pequenos projetos web.'},
        { name:'Pydantic' ,iconUrl:'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/python/python-original.svg', color: '#E92063', description:'Biblioteca para validação e parse de dados em Python. Garante que os dados de entrada (como em uma API) estejam no formato correto, prevenindo erros.'},
        { name:'Uvicorn' ,iconUrl:'https://media2.dev.to/dynamic/image/width=800%2Cheight=%2Cfit=scale-down%2Cgravity=auto%2Cformat=auto/https%3A%2F%2Fdev-to-uploads.s3.amazonaws.com%2Fuploads%2Farticles%2Fxxnbw0i7ew5h3aka4wyc.png', color: '#29A383', description:'Um servidor web ASGI (Asynchronous Server Gateway Interface) para Python. É o servidor padrão para frameworks modernos e assíncronos como FastAPI e Starlette.'},
        { name:'N8N' ,iconUrl:'http://imgs.search.brave.com/ByvJw6PRtv9fkTZ-La99CGYOV-ru_B0kNOYHqPUzvDA/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9jZG4u/ZnJlZWxvZ292ZWN0/b3JzLm5ldC9zdmcx/OC9uc25fbG9nby1m/cmVlbG9nb3ZlY3Rv/cnMubmV0LnN2Zw', color: '#1A0383', description:' Ferramenta de automação de fluxos de trabalho ("workflow automation"). Permite conectar diferentes APIs e serviços para criar automações complexas através de uma interface visual.'},
        { name:'Tkinter' ,iconUrl:'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/python/python-original.svg', color: '#3776AB', description:'A biblioteca de interface gráfica (GUI) padrão do Python. É uma forma simples e rápida de criar aplicações de desktop com janelas e widgets nativos.'},
        { name:'Dear PyGui' ,iconUrl:'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/python/python-original.svg', color: '#DDDDDD', description:'Uma biblioteca de interface gráfica (GUI) para Python que utiliza a GPU para renderização, resultando em interfaces rápidas e performáticas para ferramentas e dashboards.'},
        { name:'WordPress' ,iconUrl:'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/wordpress/wordpress-original.svg', color: '#21759B', description:'O sistema de gerenciamento de conteúdo (CMS) mais popular do mundo. Utilizado para criar desde blogs simples até complexos portais e lojas de e-commerce.'},
        { name:'Express' ,iconUrl:'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/express/express-original.svg', color: '#000000', description:'Framework minimalista e flexível para NodeJS. Simplifica a criação de APIs RESTful e aplicações web, sendo o padrão de mercado para o ecossistema Node.'},

],
    projetos: [
        {
            name: 'Bot de Coleta de Leeds',
            description: 'Um bot automatizado para whatsapp com funçoes de coleta de leeds, envio de mensagens automaticas e armazenamento de folhas de pagamento.',
            tecnologias: ['Phyton', 'Pydantic', 'Typescript', 'NextJS', 'Uvicorn', 'APIs', 'WebHooks'],
            link:"https://github.com/HyDr4-Caltz",
            img: "https://res.cloudinary.com/dniysr75c/image/upload/v1756349241/Gemini_Generated_Image_8mg41y8mg41y8mg4_z0kxqc.png"
        },
        {
            name: 'Jogo da forca',
            description: 'jogo interativo para testar conhecimentos',
            tecnologias: ['python', 'tkinter', 'sqllite3'],
            link: "https://github.com/HyDr4-Caltz",
            img: "https://res.cloudinary.com/dniysr75c/image/upload/v1756349242/Gemini_Generated_Image_aegvrnaegvrnaegv_sw3dns.png"
        },
        {
            name: 'Automação de posts',
            description:'Automação feita para 3 empresas diferentes que buscavam postar alinhadamente os conteudos em diversas plataformas fazendo o post apenas em 1, a solução foi usar um banco de dados interativo e um fluxo de automações',
            tecnologias: ['N8N', 'JavaScript', 'BaseROW', 'APIs', 'HebWooks'],
            link: "https://github.com/HyDr4-Caltz",
            imag: "https://res.cloudinary.com/dniysr75c/image/upload/v1756349247/Gemini_Generated_Image_tw0an9tw0an9tw0a_ex3kq5.png"
        },
        {
            name: 'Bot SaaS para atendimento',
            description: 'Bot criado a base do bot de coleta de leeds para fazer um SaaS, com novas funcionalidades, e uma interface melhorada e agradavel, utilizando IA para sugerir respostas, se adaptar a cada cliente, e fazer ofertas, tudo com o click de um botão',
            tecnologias: ['Python', 'Pydantic', 'SQLAlchemy', 'FastAPI', 'NextJS', 'TypeScript' , 'React', 'Uvicorn', 'APIs', 'WebHooks'],
            link: "https://github.com/HyDr4-Caltz",
            img: "https://res.cloudinary.com/dniysr75c/image/upload/v1756349250/Gemini_Generated_Image_6acmmv6acmmv6acm_onpcaf.png"
        }
    ]

/*["TypeScript", "JavaScript", "Python", "NodeJS", "Express", "SQL", "PostgreSQL", "React", "NextJS", "Docker", "WordPress", "Selenium", "Dear PyGui", "Tkinter", "SQLLite3","Pydantic","Uvicorn","N8N"]*/

};

app.get('/api/curriculum', (req, res) => {
    res.json(curriculoData);
});

app.listen(port, () => {
    console.log(`servidor ta rodando em http://localhost${port}`);
});