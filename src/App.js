import React, { useState } from "react";
import ReactPlayer from "react-player";

const DATA = [
  {
    url: "https://www.youtube.com/watch?v=ezb55xSinoY",
    title: "Машинки бип бип",
  },
  {
    url: "https://www.youtube.com/watch?v=LbOve_UZZ54",
    title: "Синий трактор - По полям",
  },
  {
    url: "https://www.youtube.com/watch?v=0tSBxGHcaFA",
    title: "Акуленок ту-ру-ру-ру-ру",
  },
  {
    url: "https://www.youtube.com/watch?v=4iHQev6oHEo",
    title: "Тракторенок ту-ру-ру-ру-ру",
  },
  {
    url: "https://www.youtube.com/watch?v=1TYl3jhfEDA",
    title: "Маша и медведь - мультик про хрюшку",
  },

  {
    url: "https://www.youtube.com/watch?v=lr28F6E3H_o",
    title: "смешарики нюша на велосипеде",
  },
  {
    url: "https://www.youtube.com/watch?v=1WyUN66MMlc",
    title: "смешарики лосяш и бутерброд",
  },
  {
    url: "https://www.youtube.com/watch?v=XkOiBQfiqTU",
    title: "байки мэтра - про летающую тарелку",
  },
  {
    url: "https://www.youtube.com/watch?v=dA5wFDP1SkQ&list=PL8XzBNh9xhcz2XwhGg7etnDGZHXRvRhId&index=5",
    title: "Бибика про большие машины",
    img: "https://i.ytimg.com/vi/dA5wFDP1SkQ/hqdefault.jpg?sqp=-oaymwEbCKgBEF5IVfKriqkDDggBFQAAiEIYAXABwAEG&rs=AOn4CLCv1YfhbvIPaTA20c7qvufm4NYF3w",
  },
  {
    url: "https://www.youtube.com/watch?v=vLJahVX2nx0&t",
    title: "Бибика про погоду",
    img: "https://i.ytimg.com/vi/vLJahVX2nx0/hqdefault.jpg?sqp=-oaymwEbCKgBEF5IVfKriqkDDggBFQAAiEIYAXABwAEG&rs=AOn4CLD-u4P5CT2OM7wZwAkAmOy3kHPRow",
  },
];

const VideoPlayer = () => {
  const [playing, setPlaying] = useState(true);
  const [activeIndex, setActiveIndex] = useState(0);

  const handleVideoClick = (index) => {
    setActiveIndex(index);
    setPlaying(true);
  };

  const handleStop = () => {
    setPlaying(false);
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100vh" }}>
      <div style={{ marginBottom: "20px", flexGrow: 1 }}>
        <ReactPlayer
          url={DATA[activeIndex].url}
          playing={playing}
          controls={false}
          width="100%"
          height="100%"
        />
      </div>
      <div style={{ height: "40px", display: "none" }}>
        <button
          style={{ height: "100%", marginRight: "20px" }}
          onClick={handleStop}
        >
          Стоп
        </button>
        <button
          style={{ height: "100%" }}
          onClick={() => {
            setPlaying(true);
          }}
        >
          Играй
        </button>
      </div>
      <div style={{ height: "150px" }}>
        <VideoThumbnail videos={DATA} onVideoClick={handleVideoClick} />
      </div>
    </div>
  );
};

export default VideoPlayer;

const VideoThumbnail = ({ videos, onVideoClick }) => {
  return (
    <div style={{ display: "flex", overflowX: "auto", height: "100%" }}>
      {videos.map((video, index) => (
        <img
          key={index}
          src={
            video.img ||
            `https://img.youtube.com/vi/${video.url.split("=")[1]}/0.jpg`
          }
          style={{ marginRight: "10px", cursor: "pointer" }}
          onClick={() => onVideoClick(index)}
        />
      ))}
    </div>
  );
};
