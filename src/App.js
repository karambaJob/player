import React, { useState, useRef, useEffect } from "react";
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
    title: "Песенка про акуленка",
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
      <div style={{ marginBottom: "20px", flexGrow: 1, position: "relative" }}>
        <ReactPlayer
          url={DATA[activeIndex].url}
          playing={playing}
          controls={false}
          width="100%"
          height="100%"
        />
        <div
          style={{
            position: "absolute",
            top: 0,
            bottom: 0,
            left: 0,
            right: 0,
            background: "rgba(0, 0 ,0, 0)",
            zIndex: 111,
            display: "flex",
            alignItems: "flex-end",
            justifyContent: "center",
          }}
        >
          <div
            style={{
              background: playing ? "rgba(0, 0 ,0, 0)" : "green",
              width: "100%",
              height: "20%",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <button
              style={{ height: "50px", width: "150px" }}
              onClick={() => {
                setPlaying(true);
              }}
            >
              Играй
            </button>
            <button
              style={{ height: "50px", marginLeft: "20px", width: "150px" }}
              onClick={handleStop}
            >
              Стоп
            </button>
          </div>
        </div>
      </div>

      <div style={{ height: "150px" }}>
        <VideoThumbnail videos={DATA} onVideoClick={handleVideoClick} />
      </div>
    </div>
  );
};

export default VideoPlayer;

const VideoThumbnail = ({ videos, onVideoClick }) => {
  const [selectedIndex, setSelected] = useState(0);
  return (
    <div style={{ display: "flex", overflowX: "auto", height: "100%" }}>
      {videos.map((video, index) => (
        <>
          <img
            key={index}
            src={
              video.img ||
              `https://img.youtube.com/vi/${video.url.split("=")[1]}/0.jpg`
            }
            style={{
              marginRight: "10px",
              cursor: "pointer",
              border: index === selectedIndex ? "10px solid green" : "",
            }}
            onClick={() => {
              setSelected(index);
              if (index === selectedIndex) {
                onVideoClick(index);
              }
            }}
          />
        </>
      ))}
      {<SoundPlayer name={videos[selectedIndex].title} />}
    </div>
  );
};

const SoundPlayer = ({ name }) => {
  console.log("name: ", name);
  const audioRef = useRef(null);

  const loadSound = () => {
    audioRef.current.src = process.env.PUBLIC_URL + `/audio/${name}.mp3`;
  };

  useEffect(() => {
    loadSound();
  }, [name]);

  return (
    <div>
      <audio
        ref={audioRef}
        onCanPlay={() => {
          audioRef.current.play();
        }}
        controls
        style={{ display: "none" }}
      />
    </div>
  );
};
