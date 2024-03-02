import React from "react";
import { Draggable } from "react-drag-reorder";

function Playlist({
  videoState,
  handleVideoChange,
  videosData,
  handleVideoClick,
}) {
  return (
    <div>
      <div>
        <div
          className="border-2 border-red-600 w-[250px] m-2"
          onClick={() => handleVideoClick(0)}
          key={0}
        >
          {videosData[0].title}
          {videosData[0].subtitle}
          <img src={videosData[0].thumb} alt="img" width={200} height={200} />
        </div>
        <Draggable onPosChange={handleVideoChange}>
          {videosData.map((item, index) => {
            if (index === 0) return null;
            return (
              <div
                className="border-2 border-red-600 w-[250px] m-2"
                onClick={() => handleVideoClick(index)}
                key={index}
              >
                {item.title}
                {item.subtitle}
                <img src={item.thumb} alt="img" width={200} height={200} />
              </div>
            );
          })}
        </Draggable>
      </div>
    </div>
  );
}

export default Playlist;
