import { createContext, useContext, useEffect, useState } from "react";

const MusicContext = createContext();

export const MusicProvider = ({ children }) => {
  const [allSongs, setAllSongs] = useState([]);
  const [currentTrack, setCurrentTrack] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);


  const [favorites, setFavorites] = useState([]);

  const [playlists, setPlaylists] = useState([]);

  const CLIENT_ID = "e47eb750"; 

  useEffect(() => {
    const fetchSongs = async () => {
      try {
        const res = await fetch(
          `https://api.jamendo.com/v3.0/tracks/?client_id=${CLIENT_ID}&format=json&limit=10&search=chill`
        );
        const data = await res.json();

        const tracks = data.results.map((track) => ({
          id: track.id,
          title: track.name,
          artist: track.artist_name,
          url: track.audio,
          duration: Math.floor(track.duration),
        }));

        setAllSongs(tracks);
        setCurrentTrack(tracks[0]);
      } catch (error) {
        console.error("Error:", error);
      }
    };

    fetchSongs();
  }, []);

  const play = () => setIsPlaying(true);
  const pause = () => setIsPlaying(false);
  const toggleFavorite = (song) => {
    setFavorites((prev) =>
      prev.find((s) => s.id === song.id)
        ? prev.filter((s) => s.id !== song.id)
        : [...prev, song]
    );
  };

  const createPlaylist = (name) => {
    if (!name.trim()) return;
    setPlaylists((prev) => [...prev, { name, songs: [] }]);
  };

  const addToPlaylist = (playlistName, song) => {
    setPlaylists((prev) =>
      prev.map((pl) =>
        pl.name === playlistName
          ? { ...pl, songs: [...pl.songs, song] }
          : pl
      )
    );
  };

  return (
    <MusicContext.Provider
      value={{
        allSongs,
        currentTrack,
        play,
        pause,
        isPlaying,
        setCurrentTrack,
        favorites,
        toggleFavorite,
        playlists,
        createPlaylist,
        addToPlaylist,
      }}
    >
      {children}
    </MusicContext.Provider>
  );
};

export const useMusic = () => useContext(MusicContext);
