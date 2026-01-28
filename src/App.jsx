import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { MusicProvider } from "./contexts/MusicProvider";
import MusicPlayer from "./components/MusicPlayer";
import AllSongs from "./components/AllSongs";
import Favorites from "./components/Favorites";
import Playlists from "./components/Playlists";
import Navbar from "./components/Navbar"; 

function App() {
  return (
    <MusicProvider>
      <Router>
        <div className="app">
          <Navbar /> 

          <div className="app-main">
            <MusicPlayer />

            <Routes>
              <Route path="/" element={<AllSongs />} />
              <Route path="/favorites" element={<Favorites />} />
              <Route path="/playlists" element={<Playlists />} />
            </Routes>
          </div>
        </div>
      </Router>
    </MusicProvider>
  );
}

export default App;