// hook to set and modify properties of the video player.
import { useState, useEffect } from "react";

export default function usePlayer(element) {
  const [player, setPlayer] = useState({
    isPlaying: false,
    speed: 1,
    progress: 0,
    volume: 100,
    isMuted: false,
    autoPlayNext: false,
    showTimer: false,
    timerValue: "",
  });

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

  // Toggle mute status
  const toggleAutoPlayNext = () => {
    setPlayer((prevPlayer) => ({
      ...prevPlayer,
      autoPlay: !prevPlayer.autoPlay,
    }));
  };

  // Adjust volume
  const handleVolume = (e) => {
    const value = Number(e.target.value);
    const newVolume = Math.max(0, Math.min(value, 100));
    const isMuted = newVolume === 0;

    setPlayer((prevPlayer) => ({
      ...prevPlayer,
      volume: newVolume,
      isMuted,
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
      100 * (element.current.currentTime / element.current.duration);

    setPlayer((prevPlayer) => ({
      ...prevPlayer,
      progress,
    }));
  };

  // Set progress manually
  const handleProgress = (e) => {
    const change = Number(e.target.value);

    element.current.currentTime = (element.current.duration / 100) * change;
    setPlayer((prevPlayer) => ({
      ...prevPlayer,
      progress: change,
    }));
  };

  // Handle Duration or Timer
  const toggleTimer = () => {
    setPlayer((prevPlayer) => ({
      ...prevPlayer,
      showTimer: !prevPlayer.showTimer,
    }));
  };

  const toggleFullScreen = () => {
    if (element.current) {
      if (!document.fullscreenElement) {
        element.current.requestFullscreen().catch((err) => {
          console.error(
            "Error attempting to enable full-screen mode:",
            err.message
          );
        });
      } else {
        document.exitFullscreen();
      }
    }
  };

  // Utility function
  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.round(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, "0")}`;
  };

  // Use Effects
  useEffect(() => {
    // Update player state based on mute status and volume
    element.current.muted = player.isMuted;
    element.current.volume = player.volume / 100;
  }, [player.isMuted, player.volume, element]);

  useEffect(() => {
    // Toggle play/pause based on isPlaying state
    player.isPlaying ? element.current.play() : element.current.pause();
  }, [player.isPlaying, element]);

  useEffect(() => {
    const duration = element.current.duration;
    const currentTime = element.current.currentTime;

    if (!isNaN(duration) && !isNaN(currentTime)) {
      const timerValue = player.showTimer ? duration - currentTime : duration;
      setPlayer((prevPlayer) => ({
        ...prevPlayer,
        timerValue: formatTime(timerValue),
      }));
    }
  }, [player.showTimer, player.progress, element]);

  return {
    player,
    togglePlaying,
    toggleMute,
    handleVolume,
    handleSpeed,
    handleTimeUpdate,
    handleProgress,
    toggleAutoPlayNext,
    toggleTimer,
    toggleFullScreen,
  };
}
