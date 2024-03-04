import React, { useState } from "react";
import data from "./assets/data.js";

import Player from "./components/Player.js";
import Playlist from "./components/Playlist.js";

import { reorderArray } from "./utils/utils.js";

import { HotkeysProvider } from "react-hotkeys-hook";
import { GithubLogo, Link } from "@phosphor-icons/react";
import rigiLogo from "./assets/rigiLogo.png";

function App() {
  const [videosData, setVideosData] = useState(data);
  const [videoState, setVideoState] = useState(videosData[0]);
  const [searchTerm, setSearchTerm] = useState("");

  const handleVideoChange = (currentPos, newPos) => {
    setVideosData((prevData) => {
      const reorderedData = reorderArray(prevData, currentPos, newPos);

      const updatedData = reorderedData.map((video, index) => ({
        ...video,
        order: index,
      }));

      return updatedData;
    });
  };

  const handleVideoClick = (videoId) => {
    // Find the clicked video
    const clickedVideo = videosData.find((video) => video.id === videoId);

    // Set the updated video state and data
    setVideoState(clickedVideo);
  };

  const handlePlayNext = () => {
    // Finding new order of current video
    const { order } = videosData.find((video) => video.id === videoState.id);

    // Finding next video according to new Order
    const nextVideo = videosData.find((video) => video.id === order + 1);

    if (nextVideo) {
      // set next video playing with id
      setVideoState(nextVideo);
    }
  };

  const handlePlayPrevious = () => {
    // Finding new order of current video
    const { order } = videosData.find((video) => video.id === videoState.id);

    // Finding next video according to new Order
    const nextVideo = videosData.find((video) => video.id === order - 1);

    if (nextVideo) {
      // set next video playing with id
      setVideoState(nextVideo);
    }
  };

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
    const filteredVideos = data.filter((video) =>
      video.title
        .toLowerCase()
        .includes(event.target.value.trim().toLowerCase())
    );
    setVideosData(filteredVideos);
  };

  return (
    <HotkeysProvider initiallyActiveScopes={["settings"]}>
      <div className="flex h-screen bg-backBlack font-roboto text-offWhite overflow-y-auto">
        <div className="w-2/3 mt-6">
          <Player
            videoState={videoState}
            handlePlayNext={handlePlayNext}
            handlePlayPrevious={handlePlayPrevious}
          />
        </div>
        <div className="flex flex-col w-[30%] justify-start h-full pl-4">
          <div className="flex justify-start">
            <img src={rigiLogo} width={100} alt="rigiLogo" />
          </div>
          <div className="flex flex-col h-fit max-h-[80%] -mt-[5px] pt-2 rounded-lg border-2 border-gray-800 bg-backGrey">
            <div className="flex justify-between items-center">
              <div className="text-2xl font-bold tracking-wider mb-2 ml-2">
                Playlist
              </div>
              <input
                type="text"
                value={searchTerm}
                onChange={handleSearch}
                placeholder="Search by Title"
                className="bg-backBlack text-base p-2 border-2 rounded-lg border-backGrey mb-2 mr-4"
              />
            </div>
            <Playlist
              key={videoState.id + videosData.length}
              videoState={videoState}
              handleVideoChange={handleVideoChange}
              videosData={videosData}
              handleVideoClick={handleVideoClick}
            />
          </div>
          <div className="flex items-center justify-center gap-4 mt-auto mb-2">
            <a
              href="https://github.com/dhavalkolhe/video-player-custom"
              target="_blank"
              rel="noreferrer"
            >
              <GithubLogo
                size={25}
                color="#e7e7e7"
                weight="fill"
                alt="GithubLogo"
              />
            </a>
            <a
              href="https://portfolio-dhavalkolhe.vercel.app/"
              target="_blank"
              rel="noreferrer"
            >
              <Link size={25} color="#e7e7e7" weight="bold" alt="LinkLogo" />
            </a>
          </div>
        </div>
      </div>
    </HotkeysProvider>
  );
}

export default App;
