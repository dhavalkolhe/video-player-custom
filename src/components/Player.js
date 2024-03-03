import React, { useRef, useEffect, useState } from "react";
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
  CornersOut,
  Gauge,
  Download,
  SpinnerGap,
  PictureInPicture,
} from "@phosphor-icons/react";
import axios from "axios";

export default function Player({ videoState, handlePlayNext }) {
  const [isHovering, setIsHovering] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);

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
    toggleFullScreen,
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
    ["space", "up", "down", "m", "right", "left", "a", "f", "t", "d"],
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
        case "a":
          toggleAutoPlay();
          break;
        case "f":
          toggleFullScreen();
          break;
        case "d":
          handleDownload();
          break;
        case "t":
          toggleTimer();
          break;
        // ctrl + p hits picture in picture by default
        default:
          break;
      }
    },
    { scopes: ["settings"] }
  );

  // Handling hovering on the player
  let hoverTimer;

  const handleMouseEnter = () => {
    setIsHovering(true);
    clearTimeout(hoverTimer);
  };

  const handleMouseLeave = () => {
    hoverTimer = setTimeout(() => {
      setIsHovering(false);
    }, 5000);
  };

  const handleMouseMove = () => {
    setIsHovering(true);
    clearTimeout(hoverTimer);
    hoverTimer = setTimeout(() => {
      setIsHovering(false);
    }, 5000);
  };

  // Download Handler
  const handleDownload = async () => {
    try {
      setIsDownloading(true);
      const response = await axios.get(videoState.source, {
        responseType: "blob",
      });
      const url = URL.createObjectURL(new Blob([response.data]));
      const a = document.createElement("a");
      a.href = url;
      a.download = `${videoState.title}.mp4`;
      a.style.display = "none";
      document.body.appendChild(a);
      a.click();
      URL.revokeObjectURL(url);
      document.body.removeChild(a);
      setIsDownloading(false);
    } catch (error) {
      console.error("Error downloading video:", error);
      alert("Download Failed");
    }
  };

  // Picture in Picture Functionality for all types of browsers
  const togglePip = async () => {
    if (!document.pictureInPictureEnabled) {
      console.error("Picture-in-Picture not supported.");
      return;
    }

    if (document.pictureInPictureElement) {
      try {
        await document.exitPictureInPicture();
      } catch (error) {
        console.error("Error exiting Picture-in-Picture mode:", error);
      }
    } else {
      try {
        await videoRef.current.requestPictureInPicture();
      } catch (error) {
        console.error("Error entering Picture-in-Picture mode:", error);
      }
    }
  };

  return (
    <div className="flex flex-col justify-center items-center">
      <div
        className="rounded-xl overflow-hidden relative"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onMouseMove={handleMouseMove}
      >
        <video
          src={videoState.source}
          ref={videoRef}
          onTimeUpdate={handleTimeUpdate}
          width={900}
          height={450}
          onClick={() => togglePlaying(!player.isPlaying)}
        />

        {/* Controls */}
        {(isHovering || !player.isPlaying) && (
          <div className="flex flex-col w-full items-center rounded-xl absolute bottom-0">
            {/* Progress Bar */}
            {/* TODO: NEEDS TO BE OPTIMISED */}
            <div className="w-[98%]">
              <input
                type="range"
                min="0"
                max="100"
                value={player.progress}
                onInput={(e) => handleProgress(e)}
                className="w-full"
              />
            </div>

            <div className="flex justify-between w-full p-2">
              <div className="flex items-center ml-2">
                {/* Play/Pause Button */}
                <button onClick={() => togglePlaying(!player.isPlaying)}>
                  {player.isPlaying ? (
                    <Pause size={25} weight="fill" />
                  ) : (
                    <Play size={25} weight="fill" />
                  )}
                </button>

                {/* Play Next Video */}
                <button onClick={handlePlayNext} className="ml-4">
                  <SkipForward size={25} weight="fill" />
                </button>

                {/* Speed Control */}
                <div className="relative ml-4">
                  <Gauge size={28} weight="fill" />
                  <select
                    value={player.speed}
                    onChange={(e) => handleSpeed(e)}
                    className="absolute top-0 left-0 w-full h-full opacity-0 cursor-pointer"
                  >
                    <option value="0.25">0.25x</option>
                    <option value="0.5">0.5x</option>
                    <option value="0.75">0.75x</option>
                    <option value="1">1.x</option>
                    <option value="1.25">1.25x</option>
                    <option value="1.5">1.5x</option>
                    <option value="1.75">1.75x</option>
                    <option value="2">2x</option>
                  </select>
                </div>

                {/* Toggle Mute */}
                <button onClick={toggleMute} className="ml-4">
                  {player.isMuted ? (
                    <SpeakerSlash size={25} weight="fill" />
                  ) : (
                    <SpeakerHigh size={25} weight="fill" />
                  )}
                </button>

                {/* Volume Slider and Mute */}
                {!player.isMuted && (
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={player.volume}
                    onInput={(e) => handleVolume(e)}
                  />
                )}
              </div>

              <div className="flex items-center mr-2">
                {/* Timer/Duration */}
                <button onClick={toggleTimer} className="font-medium mr-3">
                  {player.timerValue}
                </button>

                {isDownloading ? (
                  <SpinnerGap size={25} weight="bold" className="mr-3" />
                ) : (
                  <button onClick={handleDownload} className="mr-3">
                    <Download size={25} weight="fill" />
                  </button>
                )}

                {/* Auto Play */}
                <button onClick={toggleAutoPlay} className="mr-3">
                  {player.autoPlay ? (
                    <img
                      src={autoplayEnabled}
                      width={30}
                      alt="autoplayEnabled"
                    />
                  ) : (
                    <img
                      src={autoplayDisabled}
                      width={30}
                      alt="autoplayDisabled"
                    />
                  )}
                </button>

                {/* Picture in Picture */}
                <button onClick={togglePip}>
                  <PictureInPicture size={25} weight="fill" className="mr-3" />
                </button>

                {/* Full Screen */}
                <button
                  onClick={() => {
                    toggleFullScreen();
                  }}
                >
                  <CornersOut size={25} />
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
      <div className="w-full max-w-[900px] mt-4 px-3 py-2 rounded-lg bg-backGrey">
        <div className="text-xl font-bold">{videoState.title}</div>
        <div className="text-xs font-medium">{videoState.subtitle}</div>
        <div className="text-base font-light text-justify mt-2">
          {videoState.description}
        </div>
      </div>
    </div>
  );
}
