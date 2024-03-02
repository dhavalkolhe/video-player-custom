import React, { useState } from "react";
import data from "./assets/data.js";

import Player from "./components/Player.js";
import Playlist from "./components/Playlist.js";

import { reorderArray } from "./utils/utils.js";

import { HotkeysProvider } from "react-hotkeys-hook";

function App() {
  const [videosData, setVideosData] = useState(data);
  const [videoState, setVideoState] = useState(videosData[0]);

  const handleVideoChange = (currentPos, newPos) => {
    setVideosData((prevData) => {
      const reorderedData = reorderArray(prevData, currentPos, newPos);

      const updatedData = reorderedData.map((video, index) => ({
        ...video,
        id: index,
      }));

      return updatedData;
    });
  };

  const handleVideoClick = (index) => {
    // Find the clicked video
    const clickedVideo = videosData.find((video) => video.id === index);

    // Remove the currently playing video
    const filteredData = videosData.filter(
      (video) => video.id !== videoState.id && video.id !== index
    );

    // Place the clicked video at the top with index 0
    const updatedData = [clickedVideo, ...filteredData];

    // Update the ids
    const updatedDataWithIds = updatedData.map((video, index) => ({
      ...video,
      id: index,
    }));

    // Set the updated video state and data
    setVideoState(() => ({
      ...clickedVideo,
      id: 0,
    }));
    setVideosData(updatedDataWithIds);
  };

  const handlePlayNext = () => {
    const nextVideo = videosData.find(
      (video) => video.id === videoState.id + 1
    );

    // Remove the currently playing video and next video
    const filteredData = videosData.filter(
      (video) => video.id !== 0 && video.id !== 1
    );

    if (nextVideo) {
      // put next video at top
      const updatedData = [nextVideo, ...filteredData];
      const updatedDataWithIds = updatedData.map((video, index) => ({
        ...video,
        id: index,
      }));

      // set next video playing with id as 0
      setVideoState(() => ({
        ...nextVideo,
        id: 0,
      }));
      setVideosData(updatedDataWithIds);
    }
  };

  return (
    <HotkeysProvider initiallyActiveScopes={["settings"]}>
      <div>
        <Player videoState={videoState} handlePlayNext={handlePlayNext} />
        <Playlist
          key={videosData.length}
          videoState={videoState}
          handleVideoChange={handleVideoChange}
          videosData={videosData}
          handleVideoClick={handleVideoClick}
        />
      </div>
    </HotkeysProvider>
  );
}

export default App;
