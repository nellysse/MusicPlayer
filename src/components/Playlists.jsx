import { useMusic } from "../contexts/MusicProvider";
import { useState } from "react";

const Playlists = () => {
  const { playlists = [], createPlaylist, addToPlaylist, allSongs = [] } = useMusic();
  const [newPlaylist, setNewPlaylist] = useState("");

  return (
    <div className="playlists">
      <h2>📂 Playlists</h2>

      <div className="create-playlist">
        <input
          type="text"
          placeholder="New playlist name"
          value={newPlaylist}
          onChange={(e) => setNewPlaylist(e.target.value)}
        />
        <button
          onClick={() => {
            if (newPlaylist.trim()) {
              createPlaylist(newPlaylist);
              setNewPlaylist("");
            }
          }}
        >
          ➕ Create
        </button>
      </div>

      {Array.isArray(playlists) && playlists.length === 0 ? (
        <p>No playlists 😢</p>
      ) : (
        playlists.map((pl) => (
          <div key={pl.name} className="playlist">
            <h3>{pl.name}</h3>
            <ul>
              {pl.songs.map((song) => (
                <li key={song.id}>{song.title} — {song.artist}</li>
              ))}
            </ul>
            <select
              onChange={(e) => {
                const song = allSongs.find((s) => s.id === parseInt(e.target.value));
                if (song) addToPlaylist(pl.name, song);
              }}
            >
              <option value="">Add song...</option>
              {allSongs.map((song) => (
                <option key={song.id} value={song.id}>
                  {song.title}
                </option>
              ))}
            </select>
          </div>
        ))
      )}
    </div>
  );
};

export default Playlists;
