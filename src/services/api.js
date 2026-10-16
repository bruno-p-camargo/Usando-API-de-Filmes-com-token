// Todas as chamadas à API do TMDB ficam neste arquivo.
const API_URL = "https://api.themoviedb.org/3";
const KEY = process.env.REACT_APP_KEY;

export const HAS_KEY = Boolean(KEY);
export const IMAGE_URL = "https://image.tmdb.org/t/p/w500";
export const BACKDROP_URL = "https://image.tmdb.org/t/p/w1280";

export const EMPTY_FILTERS = {
  query: "",
  genre: "",
  year: "",
  minRating: "",
  sortBy: "popularity.desc",
};

export const SORT_OPTIONS = [
  { value: "popularity.desc", label: "Mais populares" },
  { value: "vote_average.desc", label: "Melhor avaliados" },
  { value: "primary_release_date.desc", label: "Mais recentes" },
  { value: "primary_release_date.asc", label: "Mais antigos" },
  { value: "revenue.desc", label: "Maior bilheteria" },
];

export const RATING_OPTIONS = [5, 6, 7, 8];

// monta a URL com a chave e o idioma já incluídos
function buildUrl(path, params = {}) {
  const query = new URLSearchParams({
    api_key: KEY,
    language: "pt-BR",
    include_adult: "false",
    ...params,
  });
  return `${API_URL}${path}?${query.toString()}`;
}

async function request(path, params) {
  const response = await fetch(buildUrl(path, params));
  if (!response.ok) throw new Error(`Erro ${response.status}`);
  return response.json();
}

// parâmetros do endpoint /discover/movie a partir dos filtros
function discoverParams(filters, page) {
  const params = {
    sort_by: filters.sortBy,
    // evita filmes com pouquíssimos votos aparecendo no topo
    "vote_count.gte": filters.sortBy.startsWith("vote_average") ? "300" : "50",
    page: String(page),
  };
  if (filters.genre) params.with_genres = filters.genre;
  if (filters.year) params.primary_release_year = filters.year;
  if (filters.minRating) params["vote_average.gte"] = filters.minRating;
  return params;
}

export function getGenres() {
  return request("/genre/movie/list").then((data) => data.genres || []);
}

// detalhes de UM filme, pelo id da URL
export function getMovie(id) {
  return request(`/movie/${id}`);
}

// lista filtrada (sem busca por título)
export async function discoverMovies(filters, page = 1) {
  const data = await request("/discover/movie", discoverParams(filters, page));
  return {
    results: data.results || [],
    totalPages: Math.min(data.total_pages || 1, 500), // limite da API
  };
}

// busca por título; a API não filtra gênero/nota aqui, então filtramos depois
export async function searchMovies(filters, page = 1) {
  const params = { query: filters.query.trim(), page: String(page) };
  if (filters.year) params.primary_release_year = filters.year;

  const data = await request("/search/movie", params);
  let results = data.results || [];

  if (filters.genre) {
    results = results.filter((m) => m.genre_ids.includes(Number(filters.genre)));
  }
  if (filters.minRating) {
    results = results.filter((m) => m.vote_average >= Number(filters.minRating));
  }

  return { results, totalPages: Math.min(data.total_pages || 1, 500) };
}

// sorteia um filme respeitando gênero, ano, nota e ordenação
// retorna null se nenhum filme atender aos filtros
export async function getRandomMovie(filters) {
  const first = await request("/discover/movie", discoverParams(filters, 1));
  if (!first.results || first.results.length === 0) return null;

  const totalPages = Math.min(first.total_pages || 1, 500);
  const randomPage = Math.floor(Math.random() * totalPages) + 1;

  const data =
    randomPage === 1
      ? first
      : await request("/discover/movie", discoverParams(filters, randomPage));

  const list = data.results || [];
  if (list.length === 0) return null;
  return list[Math.floor(Math.random() * list.length)];
}
