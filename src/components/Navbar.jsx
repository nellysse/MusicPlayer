import { NavLink } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="navbar">
      <h1>🎵 Music Player</h1>
      <ul>
        <li><NavLink to="/" end>All Songs</NavLink></li>
        <li><NavLink to="/favorites">Favorites</NavLink></li>
        <li><NavLink to="/playlists">Playlists</NavLink></li>
      </ul>
    </nav>
  );
};

export default Navbar;
