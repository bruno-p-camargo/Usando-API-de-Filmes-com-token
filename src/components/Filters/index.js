import { RATING_OPTIONS, SORT_OPTIONS } from "../../services/api";
import "./style.css";

const currentYear = new Date().getFullYear();
const YEARS = [];
for (let y = currentYear; y >= 1950; y--) YEARS.push(y);

function Filters({
  filters,
  genres,
  searching,
  hasFilters,
  randomLoading,
  onChange,
  onClear,
  onRandom,
}) {
  return (
    <section className="filters">
      <div className="filters-grid">
        <label className="field">
          Buscar por título
          <input
            type="text"
            placeholder="Ex.: Matrix"
            value={filters.query}
            onChange={(e) => onChange("query", e.target.value)}
          />
        </label>

        <label className="field">
          Gênero
          <select
            value={filters.genre}
            onChange={(e) => onChange("genre", e.target.value)}
          >
            <option value="">Todos</option>
            {genres.map((g) => (
              <option key={g.id} value={g.id}>
                {g.name}
              </option>
            ))}
          </select>
        </label>

        <label className="field">
          Ano de lançamento
          <select
            value={filters.year}
            onChange={(e) => onChange("year", e.target.value)}
          >
            <option value="">Todos</option>
            {YEARS.map((y) => (
              <option key={y} value={y}>
                {y}
              </option>
            ))}
          </select>
        </label>

        <label className="field">
          Nota mínima
          <select
            value={filters.minRating}
            onChange={(e) => onChange("minRating", e.target.value)}
          >
            <option value="">Qualquer</option>
            {RATING_OPTIONS.map((r) => (
              <option key={r} value={r}>
                {r}+
              </option>
            ))}
          </select>
        </label>

        <label className="field">
          Ordenar por
          <select
            value={filters.sortBy}
            onChange={(e) => onChange("sortBy", e.target.value)}
            disabled={searching}
          >
            {SORT_OPTIONS.map((o) => (
              <option key={o.value} value={o.value}>
                {o.label}
              </option>
            ))}
          </select>
        </label>
      </div>

      <div className="filters-actions">
        <button
          type="button"
          className="btn btn-accent"
          onClick={onRandom}
          disabled={randomLoading}
        >
          {randomLoading ? "Sorteando..." : "🎲 Filme aleatório"}
        </button>
        <button
          type="button"
          className="btn btn-outline"
          onClick={onClear}
          disabled={!hasFilters}
        >
          Limpar filtros
        </button>
      </div>
    </section>
  );
}

export default Filters;
