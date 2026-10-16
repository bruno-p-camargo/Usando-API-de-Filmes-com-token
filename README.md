# 🎬 API Filme React – Detalhes, Filtros e Filme Aleatório

Segundo projeto da disciplina. Consome a [API do TMDB](https://developer.themoviedb.org/) usando uma chave de acesso (TOKEN) guardada em variável de ambiente.

## 🎯 Objetivo

Ao clicar em **"SAIBA MAIS"**, o usuário é direcionado a uma página que **carrega e exibe o filme escolhido**, buscando-o na API pelo `id` presente na URL (`/:id`).

## ✅ Funcionalidades

- Listagem de filmes (populares por padrão) com pôster, ano e nota.
- **Página de detalhes** com pôster, imagem de fundo, título, frase, gêneros, data de lançamento, nota, duração e sinopse.
- Estados de **carregando** e **erro** (filme não encontrado, falha de rede ou chave ausente).
- 🎲 **Filme aleatório**: sorteia um filme respeitando os filtros escolhidos e abre a página de detalhes. Também há "Sortear outro filme" dentro da página de detalhes.
- **Filtros**: busca por título, gênero, ano de lançamento, nota mínima e ordenação (populares, melhor avaliados, mais recentes, mais antigos, maior bilheteria).
- **Carregar mais** (paginação) e **Limpar filtros**.
- Layout responsivo (celular e computador).

> Ao buscar por título, a ordenação fica desativada e gênero/nota são aplicados sobre os resultados da busca. O sorteio ignora o campo de título.

## 🛠️ Tecnologias

- React 18
- React Router DOM 6
- CSS puro (um arquivo `.css` por página/componente)
- TMDB API

## 🗂️ Estrutura

```
public/
└── index.html
src/
├── index.js                 # Ponto de entrada (BrowserRouter)
├── App.js                   # Rotas: "/" e "/:id"
├── global.css               # Variáveis de cor, botões e mensagens
├── services/
│   └── api.js               # Todas as chamadas à API
├── components/
│   ├── Header/              # Cabeçalho
│   ├── Filters/             # Formulário de filtros + botões
│   └── MovieCard/           # Card de filme da listagem
└── pages/
    ├── home/                # Lista, filtros e sorteio
    └── movie/               # Detalhes do filme
```

## 🔐 Variáveis de ambiente

Crie um arquivo `.env` na raiz do projeto (ao lado do `package.json`):

```
REACT_APP_KEY=sua_chave_aqui
```

> ⚠️ **Não envie o `.env` para o GitHub.** Ele já está no `.gitignore`. O arquivo `.env.example` serve só de modelo.

## ▶️ Como executar

```bash
npm install
# crie o .env (veja acima)
npm start
```

A aplicação abre em `http://localhost:3000`. Sempre reinicie o `npm start` depois de alterar o `.env`.

Para gerar a versão de produção: `npm run build`.

## 📚 Referências

- Repositório base: https://github.com/profdiegocandido/api-filme-react
- Vídeo 1: https://www.youtube.com/watch?v=XqxUHVVO7-U
- Vídeo 2: https://www.youtube.com/watch?v=b6N29J_utw4

## 📅 Entrega

A atividade **não será aceita em atraso**.

## 👤 Autor

**Seu nome** – [@seu-usuario](https://github.com/seu-usuario)
