import React, { useRef } from "react";
import videos from "./assets/data.js";
import usePlayer from "./components/usePlayer.js";

function App() {
  const videoRef = useRef(null);

  const {
    player,
    togglePlaying,
    toggleMute,
    handleVolume,
    handleSpeed,
    handleTimeUpdate,
    handleProgress,
    // toggleAutoPlayNext,
    toggleTimer,
    // toggleFullScreen,
  } = usePlayer(videoRef);

  return (
    <div className="App flex justify-center items-center">
      <div>
        <div>
          <video
            src={videos[2].source}
            ref={videoRef}
            onTimeUpdate={handleTimeUpdate}
            width={400}
            height={400}
          />
          {/* Controls */}
          <div>
            {/* Play/Pause Button */}
            <div>
              <button onClick={togglePlaying}>
                {player.isPlaying ? <div>Pause</div> : <div>Play</div>}
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
              {player.isMuted ? <div>Unmute</div> : <div>Mute</div>}
            </button>
            {/* Auto Play */}
            {/* <button onClick={toggleAutoPlayNext}>
              {player.autoPlay ? (
                <div>Disable AutoPlay</div>
              ) : (
                <div>Enable AutoPlay</div>
              )}
            </button> */}

            {/* Timer/Duration */}
            <button onClick={toggleTimer}>{player.timerValue}</button>

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

export default App;
