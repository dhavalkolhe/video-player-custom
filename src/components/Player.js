import React, { useRef, useEffect } from "react";
import usePlayer from "../hooks/usePlayer.js";
import { useHotkeys } from "react-hotkeys-hook";
import autoplayDisabled from "../assets/autoplayDisabled.png";
import autoplayEnabled from "../assets/autoplayEnabled.png";
import {
  Play,
  Pause,
  SkipForward,
  SpeakerSlash,
  SpeakerHigh,
} from "@phosphor-icons/react";

export default function Player({ videoState, handlePlayNext }) {
  const videoRef = useRef(null);

  const {
    player,
    togglePlaying,
    toggleMute,
    handleVolume,
    handleSpeed,
    handleTimeUpdate,
    handleProgress,
    toggleAutoPlay,
    toggleTimer,
    // toggleFullScreen,
  } = usePlayer(videoRef);

  useEffect(() => {
    if (
      videoRef.current &&
      videoRef.current.duration &&
      videoRef.current.currentTime &&
      videoRef.current.duration === videoRef.current.currentTime &&
      player.autoPlay
    ) {
      console.log("Reached Here");
      handlePlayNext();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [videoRef.current?.currentTime]);

  useEffect(() => {
    if (player.autoPlay) {
      togglePlaying(true);
    } else {
      togglePlaying(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [videoState]);

  // Key board Shortcuts
  useHotkeys(
    ["space", "up", "down", "m", "right", "left"],
    (e, handler) => {
      e.preventDefault();
      const [key] = handler.keys;

      switch (key) {
        case "space":
          togglePlaying(!player.isPlaying);
          break;
        case "up":
          e.target.value = player.volume + 5;
          handleVolume(e);
          break;
        case "down":
          e.target.value = player.volume - 5;
          handleVolume(e);
          break;
        case "m":
          toggleMute();
          break;
        case "right":
          e.target.value = player.progress + 10;
          handleProgress(e);
          break;
        case "left":
          e.target.value = player.progress - 10;
          handleProgress(e);
          break;
        default:
          break;
      }
    },
    { scopes: ["settings"] }
  );

  return (
    <div className="App flex justify-center items-center">
      <div>
        <div>
          <video
            src={videoState.source}
            ref={videoRef}
            onTimeUpdate={handleTimeUpdate}
            width={400}
            height={400}
            onClick={() => togglePlaying(!player.isPlaying)}
          />
          {/* Controls */}
          <div>
            {/* Play/Pause Button */}
            <div>
              <button onClick={() => togglePlaying(!player.isPlaying)}>
                {player.isPlaying ? (
                  <Pause size={32} weight="fill" />
                ) : (
                  <Play size={32} weight="fill" />
                )}
              </button>
            </div>
            {/* Progress Bar */}
            {/* TODO: NEEDS TO BE OPTIMISED */}
            <input
              type="range"
              min="0"
              max="100"
              value={player.progress}
              onInput={(e) => handleProgress(e)}
            />
            {/* Speed Control */}
            <select value={player.speed} onChange={(e) => handleSpeed(e)}>
              <option value="0.25">0.25x</option>
              <option value="0.5">0.5x</option>
              <option value="0.75">0.75x</option>
              <option value="1">1.x</option>
              <option value="1.25">1.25x</option>
              <option value="1.5">1.5x</option>
              <option value="1.75">1.75x</option>
              <option value="2">2x</option>
            </select>
            {/* Volume Slider and Mute */}
            <input
              type="range"
              min="0"
              max="100"
              value={player.volume}
              onInput={(e) => handleVolume(e)}
            />
            <button onClick={toggleMute}>
              {player.isMuted ? (
                <SpeakerSlash size={32} weight="fill" />
              ) : (
                <SpeakerHigh size={32} weight="fill" />
              )}
            </button>

            {/* Auto Play */}
            <button onClick={toggleAutoPlay}>
              {player.autoPlay ? (
                <div>
                  <img src={autoplayEnabled} width={40} alt="autoplayEnabled" />
                </div>
              ) : (
                <img src={autoplayDisabled} width={40} alt="autoplayDisabled" />
              )}
            </button>

            {/* Timer/Duration */}
            <button onClick={toggleTimer}>{player.timerValue}</button>

            {/* Play Next Video */}
            <button onClick={handlePlayNext}>
              <SkipForward size={32} weight="fill" />
            </button>

            {/* Full Screen */}
            {/* <button
          onClick={() => {
            toggleFullScreen();
          }}
        >
          Enable Full Screen
        </button> */}
          </div>
        </div>
      </div>
    </div>
  );
}
