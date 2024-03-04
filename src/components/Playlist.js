import { List, Play } from "@phosphor-icons/react";
import React from "react";
import { Draggable } from "react-drag-reorder";

function Playlist({
  videoState,
  handleVideoChange,
  videosData,
  handleVideoClick,
}) {
  return (
    <div className="overflow-y-auto bg-backBlack">
      <Draggable onPosChange={handleVideoChange}>
        {videosData.map((item) => {
          return (
            <div
              className={`flex justify-start py-2 hover:bg-backHover hover:cursor-pointer ${
                videoState.id === item.id ? "bg-backPlaying" : ""
              }`}
              onClick={() => handleVideoClick(item.id)}
              key={item.id}
            >
              <div className="flex items-center ml-2">
                {videoState.id === item.id ? (
                  <Play size={16} weight="fill" />
                ) : (
                  <List size={16} />
                )}
              </div>
              <div className="ml-3 w-[125px] h-[66px] rounded-lg overflow-hidden">
                <img
                  src={item.thumb}
                  alt="img"
                  style={{ width: "100%", height: "100%" }}
                />
              </div>
              <div className="flex-1 flex flex-col justify-between ml-2 pr-1 pb-1">
                <p className="font-semibold">{item.title}</p>
                <p className="text-xs font-light">{item.subtitle}</p>
              </div>
            </div>
          );
        })}
      </Draggable>
    </div>
  );
}

export default Playlist;
