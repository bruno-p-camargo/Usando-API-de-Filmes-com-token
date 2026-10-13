# Usando-API-de-Filmes-com-token

🎬 API Filme React – Página de Detalhes do Filme

Segundo projeto da disciplina. Esta etapa dá continuidade ao projeto anterior, em que já foi realizado o consumo de uma API de filmes utilizando TOKEN (chave de acesso).

🎯 Objetivo

Implementar a navegação entre a listagem de filmes e uma página de detalhes. Ao clicar no botão "LER" ou "SAIBA MAIS" de um filme, o usuário será direcionado a uma nova página que carrega e exibe as informações daquele filme específico.

✅ O que será realizado
Manter a listagem de filmes já existente (consumo da API com token).
Configurar o roteamento da aplicação com react-router-dom.
Criar a rota dinâmica /filme/:id para a página de detalhes.
Fazer o botão LER / SAIBA MAIS de cada card redirecionar para a rota do filme, passando o id.
Na página de detalhes:

Capturar o id da URL (useParams);
Fazer uma nova requisição à API buscando apenas aquele filme;
Exibir: pôster, título, sinopse, data de lançamento, nota e gêneros;
Mostrar um estado de carregando enquanto os dados chegam;
Tratar erros (ex.: filme não encontrado ou falha na requisição).
Adicionar um botão/link para voltar à lista de filmes.

🛠️ Tecnologias
React
React Router DOM
Axios ou fetch para as requisições
API de filmes (com chave de acesso)
CSS para estilização

🗂️ Estrutura prevista
src/
├── components/     # Componentes reutilizáveis (ex.: card do filme)
├── pages/
│   ├── Home/       # Lista de filmes
│   └── Filme/      # Detalhes do filme
├── services/
│   └── api.js      # Configuração da API
├── routes.js       # Definição das rotas
└── App.js
