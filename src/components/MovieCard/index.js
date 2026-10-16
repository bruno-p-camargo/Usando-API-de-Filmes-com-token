import { Link } from "react-router-dom";
import { IMAGE_URL } from "../../services/api";
import "./style.css";

function MovieCard({ movie }) {
  const year = movie.release_date ? movie.release_date.slice(0, 4) : "—";
  const rating = movie.vote_average ? movie.vote_average.toFixed(1) : "—";

  return (
    <li className="movie-card">
      {movie.poster_path ? (
        <img src={`${IMAGE_URL}${movie.poster_path}`} alt={movie.title} />
      ) : (
        <div className="movie-card-noposter">Sem imagem</div>
      )}

      <span className="movie-card-title">{movie.title}</span>
      <small className="movie-card-info">
        {year} · ⭐ {rating}
      </small>

      <Link to={`/${movie.id}`} className="btn">
        Saiba mais
      </Link>
    </li>
  );
}

export default MovieCard;
