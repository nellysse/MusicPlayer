import { useEffect, useRef, useState } from "react";
import { useMusic } from "../contexts/MusicProvider";

const MusicPlayer = () => {
  const { allSongs, currentTrack, isPlaying, play, pause, setCurrentTrack } = useMusic();
  const audioRef = useRef(null);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      audio.play().catch((err) => console.error("Play error:", err));
    } else {
      audio.pause();
    }
  }, [isPlaying]);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.load();
  }, [currentTrack]);

  const handlePrev = () => {
    if (!currentTrack || allSongs.length === 0) return;
    const currentIndex = allSongs.findIndex((s) => s.id === currentTrack.id);
    const prevIndex = (currentIndex - 1 + allSongs.length) % allSongs.length;
    setCurrentTrack(allSongs[prevIndex]);
    play();
  };

  const handleNext = () => {
    if (!currentTrack || allSongs.length === 0) return;
    const currentIndex = allSongs.findIndex((s) => s.id === currentTrack.id);
    const nextIndex = (currentIndex + 1) % allSongs.length;
    setCurrentTrack(allSongs[nextIndex]);
    play();
  };

  const formatTime = (time) => {
    if (!time || isNaN(time)) return "0:00";
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  };

  const handleTimeUpdate = () => {
    setCurrentTime(audioRef.current.currentTime);
    setDuration(audioRef.current.duration);
  };

  const handleSeek = (e) => {
    const newTime = e.target.value;
    audioRef.current.currentTime = newTime;
    setCurrentTime(newTime);
  };

  return (
    <div className="music-player">
      <div className="track-info" style={{ textAlign: "center" }}>
        <h3>{currentTrack?.title || "No track selected"}</h3>
        <p>{currentTrack?.artist || ""}</p>
      </div>

      <div className="progress-container">
        <span>{formatTime(currentTime)}</span>
        <input
          type="range"
          min="0"
          max={duration || 0}
          value={currentTime}
          onChange={handleSeek}
        />
        <span>{formatTime(duration)}</span>
      </div>

      <div className="controls" style={{ justifyContent: "center" }}>
        <button className="btn prev" onClick={handlePrev}>⏮</button>
        <button
          className={`btn play ${isPlaying ? "pause" : ""}`}
          onClick={isPlaying ? pause : play}
        >
          {isPlaying ? "⏸" : "▶"}
        </button>
        <button className="btn next" onClick={handleNext}>⏭</button>
      </div>

      <audio
        ref={audioRef}
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={handleTimeUpdate}
      >
        <source src={currentTrack?.url} type="audio/mpeg" />
      </audio>
    </div>
  );
};

export default MusicPlayer;