import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Filters from "../../components/Filters";
import MovieCard from "../../components/MovieCard";
import {
  EMPTY_FILTERS,
  HAS_KEY,
  discoverMovies,
  getGenres,
  getRandomMovie,
  searchMovies,
} from "../../services/api";
import "./style.css";

function Home() {
  const navigate = useNavigate();

  const [filters, setFilters] = useState(EMPTY_FILTERS);
  const [debouncedQuery, setDebouncedQuery] = useState("");
  const [genres, setGenres] = useState([]);
  const [movies, setMovies] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(HAS_KEY);
  const [randomLoading, setRandomLoading] = useState(false);
  const [error, setError] = useState("");

  const { genre, year, minRating, sortBy } = filters;
  const searching = debouncedQuery.trim() !== "";

  // carrega a lista de gêneros uma única vez
  useEffect(() => {
    if (!HAS_KEY) return;
    getGenres()
      .then(setGenres)
      .catch(() => setGenres([]));
  }, []);

  // espera o usuário parar de digitar antes de buscar por título
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedQuery(filters.query);
      setPage(1);
    }, 500);
    return () => clearTimeout(timer);
  }, [filters.query]);

  // busca os filmes sempre que os filtros ou a página mudarem
  useEffect(() => {
    if (!HAS_KEY) return;

    let cancelled = false;
    const active = { genre, year, minRating, sortBy, query: debouncedQuery };
    const request =
      debouncedQuery.trim() !== ""
        ? searchMovies(active, page)
        : discoverMovies(active, page);

    setLoading(true);
    setError("");

    request
      .then((data) => {
        if (cancelled) return;
        setMovies((prev) => {
          if (page === 1) return data.results;
          // evita repetir filmes que a API devolva em duas páginas
          const ids = new Set(prev.map((m) => m.id));
          return [...prev, ...data.results.filter((m) => !ids.has(m.id))];
        });
        setTotalPages(data.totalPages);
      })
      .catch(() => {
        if (!cancelled) setError("Não foi possível carregar os filmes.");
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, [genre, year, minRating, sortBy, debouncedQuery, page]);

  function updateFilter(name, value) {
    setFilters((prev) => ({ ...prev, [name]: value }));
    if (name !== "query") setPage(1);
  }

  function clearFilters() {
    setFilters(EMPTY_FILTERS);
    setDebouncedQuery("");
    setPage(1);
  }

  async function handleRandom() {
    setRandomLoading(true);
    setError("");
    try {
      const movie = await getRandomMovie(filters);
      if (movie) {
        navigate(`/${movie.id}`);
      } else {
        setError("Nenhum filme encontrado com esses filtros. Tente outros.");
      }
    } catch (e) {
      setError("Não foi possível sortear um filme. Tente novamente.");
    } finally {
      setRandomLoading(false);
    }
  }

  const hasFilters =
    filters.query !== "" ||
    genre !== "" ||
    year !== "" ||
    minRating !== "" ||
    sortBy !== EMPTY_FILTERS.sortBy;

  if (!HAS_KEY) {
    return (
      <div className="home">
        <p className="message error">
          Chave da API não encontrada. Crie o arquivo <strong>.env</strong> na raiz
          do projeto com <strong>REACT_APP_KEY=sua_chave</strong> e reinicie o{" "}
          <strong>npm start</strong>.
        </p>
      </div>
    );
  }

  return (
    <div className="home">
      <h1 className="home-title">Encontre seu próximo filme</h1>

      <Filters
        filters={filters}
        genres={genres}
        searching={searching}
        hasFilters={hasFilters}
        randomLoading={randomLoading}
        onChange={updateFilter}
        onClear={clearFilters}
        onRandom={handleRandom}
      />

      {error && <p className="message error">{error}</p>}

      {!loading && !error && movies.length === 0 && (
        <p className="message">Nenhum filme encontrado com esses filtros.</p>
      )}

      <ul className="movie-list">
        {movies.map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </ul>

      {loading && <p className="message">Carregando...</p>}

      {!loading && page < totalPages && movies.length > 0 && (
        <div className="load-more">
          <button className="btn" onClick={() => setPage((p) => p + 1)}>
            Carregar mais
          </button>
        </div>
      )}
    </div>
  );
}

export default Home;
