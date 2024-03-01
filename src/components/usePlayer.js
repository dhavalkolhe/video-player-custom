// hook to set and modify properties of the video player.
import { useState, useEffect } from "react";

export default function usePlayer(element) {
  const [player, setPlayer] = useState({
    isPlaying: false,
    autoplay: false,
    speed: 1,
    progress: 0,
    volume: 100, //!look into
    isMuted: false,
  });

  // Handling media not present error
  if (!element || !element.current) {
    throw new Error("Media element is not available.");
  }

  // Toggle playing status
  const togglePlaying = () => {
    setPlayer((prevPlayer) => ({
      ...prevPlayer,
      isPlaying: !prevPlayer.isPlaying,
    }));
  };

  // Toggle mute status
  const toggleMute = () => {
    setPlayer((prevPlayer) => ({
      ...prevPlayer,
      isMuted: !prevPlayer.isMuted,
    }));
  };

  // Set playback speed
  const handleSpeed = (e) => {
    const speed = Number(e.target.value);
    element.current.playbackRate = speed;
    setPlayer((prevPlayer) => ({ ...prevPlayer, speed }));
  };

  // Handle time update for progress
  const handleTimeUpdate = () => {
    const progress =
      100 * (element.current.currentTime() / element.current.duration());

    setPlayer((prevPlayer) => ({
      ...prevPlayer,
      progress,
    }));
  };

  // Set progress manually
  const handleManualProgress = (e) => {
    const change = Number(e.target.value);

    element.current.currentTime = (element.current.duration / 100) * change;
    setPlayer((prevPlayer) => ({
      ...prevPlayer,
      progress: change,
    }));
  };

  useEffect(() => {
    // Update player state based on mute status
    element.current.muted = player.isMuted;
  }, [player.isMuted, element]);

  useEffect(() => {
    // Toggle play/pause based on isPlaying state
    player.isPlaying ? element.current.play() : element.current.pause();
  }, [player.isPlaying, element]);

  return {
    player,
    togglePlaying,
    toggleMute,
    handleSpeed,
    handleTimeUpdate,
    handleManualProgress,
  };
}
