import { useMusic } from "../contexts/MusicProvider";

const Favorites = () => {
  const { favorites, currentTrack, play, pause, isPlaying, setCurrentTrack, toggleFavorite } = useMusic();

  const handlePlayPause = (song) => {
    if (currentTrack?.id === song.id && isPlaying) {
      pause();
    } else {
      setCurrentTrack(song);
      play();
    }
  };

  return (
    <div className="all-songs">
      <h2>❤️ Favorites</h2>
      {favorites.length === 0 ? (
        <p style={{ textAlign: 'center', color: 'rgba(255, 255, 255, 0.6)', padding: '2rem' }}>
          No favorite songs 🎵<br/>
          Add songs to favorites by clicking ❤️
        </p>
      ) : (
        <ul>
          {favorites.map((song) => (
            <li 
              key={song.id}
              className={currentTrack?.id === song.id ? 'active' : ''}
            >
              <div className="song-info">
                <strong>{song.title}</strong>
                <small>{song.artist}</small>
              </div>
              <div className="song-actions">
                <button onClick={() => handlePlayPause(song)}>
                  {currentTrack?.id === song.id && isPlaying ? "⏸ Pause" : "▶ Play"}
                </button>
                <button 
                  className="favorite active"
                  onClick={() => toggleFavorite(song)}
                >
                  ❤️
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Favorites;