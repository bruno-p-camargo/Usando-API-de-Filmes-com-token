import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import {
  BACKDROP_URL,
  EMPTY_FILTERS,
  IMAGE_URL,
  getMovie,
  getRandomMovie,
} from "../../services/api";
import "./style.css";

function formatDate(date) {
  if (!date) return "—";
  return new Date(`${date}T00:00:00`).toLocaleDateString("pt-BR");
}

function Movie() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [randomLoading, setRandomLoading] = useState(false);

  // busca somente o filme escolhido, pelo id que está na URL
  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    setError(false);

    getMovie(id)
      .then((data) => {
        if (!cancelled) setMovie(data);
      })
      .catch(() => {
        if (!cancelled) setError(true);
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });

    window.scrollTo(0, 0);

    return () => {
      cancelled = true;
    };
  }, [id]);

  async function handleRandom() {
    setRandomLoading(true);
    try {
      const random = await getRandomMovie(EMPTY_FILTERS);
      if (random) navigate(`/${random.id}`);
    } catch (e) {
      // se falhar, o usuário continua na página atual
    } finally {
      setRandomLoading(false);
    }
  }

  if (loading) {
    return <p className="message">Carregando filme...</p>;
  }

  if (error || !movie) {
    return (
      <div className="movie-error">
        <p className="message error">Não foi possível carregar o filme.</p>
        <Link to="/" className="btn">
          Voltar
        </Link>
      </div>
    );
  }

  return (
    <article className="movie">
      {movie.backdrop_path && (
        <div
          className="movie-backdrop"
          style={{ backgroundImage: `url(${BACKDROP_URL}${movie.backdrop_path})` }}
        />
      )}

      <div className="movie-content">
        {movie.poster_path ? (
          <img
            className="movie-poster"
            src={`${IMAGE_URL}${movie.poster_path}`}
            alt={movie.title}
          />
        ) : (
          <div className="movie-poster movie-noposter">Sem imagem</div>
        )}

        <div className="movie-info">
          <h1>{movie.title}</h1>
          {movie.tagline && <p className="movie-tagline">“{movie.tagline}”</p>}

          <ul className="movie-genres">
            {(movie.genres || []).map((g) => (
              <li key={g.id}>{g.name}</li>
            ))}
          </ul>

          <p className="movie-meta">
            <span>📅 {formatDate(movie.release_date)}</span>
            <span>
              ⭐ {movie.vote_average ? movie.vote_average.toFixed(1) : "—"} / 10
            </span>
            {movie.runtime > 0 && <span>⏱ {movie.runtime} min</span>}
          </p>

          <h2>Sinopse</h2>
          <p className="movie-overview">
            {movie.overview || "Sinopse não disponível."}
          </p>

          <div className="movie-actions">
            <Link to="/" className="btn">
              Voltar
            </Link>
            <button
              type="button"
              className="btn btn-accent"
              onClick={handleRandom}
              disabled={randomLoading}
            >
              {randomLoading ? "Sorteando..." : "🎲 Sortear outro filme"}
            </button>
          </div>
        </div>
      </div>
    </article>
  );
}

export default Movie;
