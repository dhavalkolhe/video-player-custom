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
      <div
        className="flex justify-start py-2 bg-backPlaying"
        onClick={() => handleVideoClick(0)}
        key={0}
      >
        <div className="flex items-center ml-2">
          <Play size={16} weight="fill" />
        </div>
        <div className="ml-3 w-[125px] h-[66px] rounded-lg overflow-hidden">
          <img
            src={videosData[0].thumb}
            alt="img"
            style={{ width: "100%", height: "100%" }}
          />
        </div>
        <div className="flex-1 flex flex-col justify-between ml-2 pr-1 pb-1">
          <p className="font-semibold">{videosData[0].title}</p>
          <p className="text-xs font-light">{videosData[0].subtitle}</p>
        </div>
      </div>
      <Draggable onPosChange={handleVideoChange}>
        {videosData.map((item, index) => {
          if (index === 0) return null;
          return (
            <div
              className="flex justify-start py-2 hover:bg-backHover hover:cursor-pointer"
              onClick={() => handleVideoClick(index)}
              key={index}
            >
              <div className="flex items-center ml-2">
                <List size={16} />
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
