import { Link } from "react-router-dom";
import "./style.css";

function Header() {
  return (
    <header className="header">
      <Link to="/" className="header-logo">
        🎬 Filmes
      </Link>
    </header>
  );
}

export default Header;
