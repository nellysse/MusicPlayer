# 🎵 Music Player

A modern, responsive music player built with **React**.  
It features playlists, favorites, adaptive design, and a sleek UI with animated gradients.

---

## 🚀 Features

- **Play / Pause / Next / Previous** track controls  
- **Progress bar ("snake")** with draggable seek functionality  
- **Favorites** management (add/remove songs)  
- **Playlists** creation and song assignment  
- **Adaptive design** for desktop and mobile  
- **Beautiful UI** with gradient backgrounds and smooth animations  
- **Jamendo API integration** for free music streaming

---

## 📂 Project Structure

```
src/
 ├── components/
 │    ├── MusicPlayer.jsx   # Main player with controls & progress bar
 │    ├── AllSongs.jsx      # Song list with favorites
 │    ├── Playlists.jsx     # Playlist creation & management
 │
 ├── contexts/
 │    └── MusicProvider.jsx # Global state management with React Context
 │
 ├── index.css              # Global styles (animations, adaptive layout)
 └── App.jsx                # Root component
```

## 📱 Responsive Design

- On **desktop**: full layout with playlists, favorites, and player.  
- On **mobile**: compact buttons, adaptive playlist form, and centered controls.  
- Buttons automatically resize to avoid "oversized" look on small screens.

---

## 🛠️ Technologies

- **React 18+**
- **React Context API** for global state
- **CSS3** with gradients, animations, and adaptive layout
- **Jamendo API** for free music tracks
  ⚡ 
