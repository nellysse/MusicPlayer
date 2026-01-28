import { useMusic } from "../contexts/MusicProvider";

const AllSongs = () => {
  const { allSongs, currentTrack, play, pause, isPlaying, setCurrentTrack, toggleFavorite, favorites } = useMusic();

  const handlePlayPause = (song) => {
    if (currentTrack?.id === song.id && isPlaying) {
      pause();
    } else {
      setCurrentTrack(song);
      play();
    }
  };

  const isFavorite = (song) => favorites.some((s) => s.id === song.id);

  return (
    <div className="all-songs">
      <h2>🎵 All songs</h2>
      {allSongs.length === 0 ? (
        <p style={{ textAlign: 'center', color: 'rgba(255, 255, 255, 0.6)', padding: '2rem' }}>
          Loading songs... 🎵
        </p>
      ) : (
        <ul>
          {allSongs.map((song) => (
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
                  className={`favorite ${isFavorite(song) ? 'active' : ''}`}
                  onClick={() => toggleFavorite(song)}
                >
                  {isFavorite(song) ? "❤️" : "🤍"}
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default AllSongs;