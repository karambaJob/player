import React, { useState, useRef, useEffect } from "react";
import ReactPlayer from "react-player";

const DATA = [
  {
    url: "https://www.youtube.com/watch?v=ezb55xSinoY",
    title: "Машинки бип бип",
    tags: [0],
  },
  {
    url: "https://www.youtube.com/watch?v=LbOve_UZZ54",
    title: "Синий трактор - По полям",
    tags: [1],
  },
  {
    url: "https://www.youtube.com/watch?v=0tSBxGHcaFA",
    title: "Песенка про акуленка",
  },
  {
    url: "https://www.youtube.com/watch?v=4iHQev6oHEo",
    title: "Песенка про тракторенка",
  },
  {
    url: "https://www.youtube.com/watch?v=1TYl3jhfEDA",
    title: "Маша и медведь мультик про хрюшку",
    tags: [3],
  },

  {
    url: "https://www.youtube.com/watch?v=lr28F6E3H_o",
    title: "смешарики нюша на велосипеде",
    tags: [4],
  },
  {
    url: "https://www.youtube.com/watch?v=1WyUN66MMlc",
    title: "смешарики лосяш и бутерброд",
    tags: [4],
  },
  {
    url: "https://www.youtube.com/watch?v=XkOiBQfiqTU",
    title: "байки мэтра про летающую тарелку",
    tags: [2],
  },
  {
    url: "https://www.youtube.com/watch?v=dA5wFDP1SkQ&list=PL8XzBNh9xhcz2XwhGg7etnDGZHXRvRhId&index=5",
    tags: [5],
    title: "Бибика про большие машины",
    img: "https://i.ytimg.com/vi/dA5wFDP1SkQ/hqdefault.jpg?sqp=-oaymwEbCKgBEF5IVfKriqkDDggBFQAAiEIYAXABwAEG&rs=AOn4CLCv1YfhbvIPaTA20c7qvufm4NYF3w",
  },
  {
    url: "https://www.youtube.com/watch?v=vLJahVX2nx0&t",
    tags: [5],
    title: "Бибика про погоду",
    img: "https://i.ytimg.com/vi/vLJahVX2nx0/hqdefault.jpg?sqp=-oaymwEbCKgBEF5IVfKriqkDDggBFQAAiEIYAXABwAEG&rs=AOn4CLD-u4P5CT2OM7wZwAkAmOy3kHPRow",
  },
];

const TOP_SCROLL = [
  {
    title: "теремок тв",
    img: "https://www.novochag.ru/upload/img_cache/479/479de871dbc335c7c125380b3411e472_ce_1899x1265x176x0_cropped_666x444.png",
  },
  {
    title: "синий трактор",
    img: "https://avatars.yandex.net/get-music-content/5412783/a09cf826.p.4355577/m1000x1000",
  },
  {
    title: "байки мэтра",
    img: "https://media.myshows.me/shows/760/a/97/a97c038b7c6ce14f96d8a0022a4b87b0.jpg",
  },
  {
    title: "маша и медведь",
    img: "https://cdnn21.img.ria.ru/images/152264/38/1522643869_0:0:1600:900_600x0_80_0_0_1643e97c321f8bc6d1442cf5a5954071.jpg",
  },
  {
    title: "смешарики",
    img: "https://www.karusel-tv.ru/media/suit/preview_full/media/image/2020/09/1599471598116137_1.png",
  },
  {
    title: "Бибика",
    img: "https://i.ytimg.com/vi/g8AVQXoYWs4/maxresdefault.jpg",
  },
];

function preventDefault(e) {
  e.preventDefault();
}

const VideoPlayer = () => {
  const [playing, setPlaying] = useState(true);
  const [hoverTag, setHover] = useState(0);
  const [activeTag, setActiveTag] = useState(0);
  const [lastTitle, setLastTitle] = useState("");
  const [activeVideoIndex, setActiveVideoIndex] = useState(0);
  const [hoverVideoIndex, sethoverVideoIndex] = useState(0);
  const CURRENT_DATA = DATA.filter((item) => {
    return activeTag === 0
      ? !item.tags || item.tags.includes(activeTag)
      : item.tags && item.tags.includes(activeTag);
  });

  const handleStop = () => {
    setPlaying(false);
  };

  useEffect(() => {
    document.body.addEventListener("touchmove", preventDefault, {
      passive: false,
    });
  }, []);

  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100vh" }}>
      {[...TOP_SCROLL, ...DATA].map((item) => (
        <SoundPlayer name={item.title} startPlay={item.title === lastTitle} />
      ))}
      <div style={{ height: "100px" }}>
        <ScrollList
          items={TOP_SCROLL}
          hoverIndex={hoverTag}
          onHover={(index) => {
            setHover(index);
            setLastTitle(TOP_SCROLL[index].title);
          }}
          onActive={(index) => {
            setActiveTag(index);
            setActiveVideoIndex(0);
          }}
        />
      </div>
      <div style={{ marginBottom: "20px", flexGrow: 1, position: "relative" }}>
        <ReactPlayer
          url={CURRENT_DATA[activeVideoIndex].url}
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
        <ScrollList
          items={CURRENT_DATA}
          hoverIndex={hoverVideoIndex}
          onHover={(index) => {
            sethoverVideoIndex(index);
            setLastTitle(CURRENT_DATA[index].title);
          }}
          onActive={(index) => {
            setActiveVideoIndex(index);
            setPlaying(true);
          }}
        />
      </div>
    </div>
  );
};

export default VideoPlayer;

const ScrollList = ({ items, onHover, onActive, hoverIndex }) => {
  return (
    <div style={{ display: "flex", overflowX: "auto", height: "100%" }}>
      {items.map((item, index) => (
        <>
          <img
            key={index}
            src={
              item.img ||
              `https://img.youtube.com/vi/${item.url.split("=")[1]}/0.jpg`
            }
            style={{
              cursor: "pointer",
              border:
                index === hoverIndex ? "10px solid green" : "10px solid black",
            }}
            onClick={() => {
              onHover(index);
              if (index === hoverIndex) {
                onActive(index);
              }
            }}
          />
        </>
      ))}
    </div>
  );
};

const SoundPlayer = ({ name, startPlay = false }) => {
  const audioRef = useRef(null);
  const [canPlay, setCanPlay] = useState(false);

  const loadSound = () => {
    audioRef.current.src = process.env.PUBLIC_URL + `/audio/${name}.mp3`;
  };

  useEffect(() => {
    loadSound();
  }, [name]);

  useEffect(() => {
    if (startPlay && canPlay) {
      audioRef.current.play();
    }
  }, [startPlay]);

  return (
    <div>
      <audio
        ref={audioRef}
        onCanPlay={() => {
          setCanPlay(true);
        }}
        controls
        style={{ display: "none" }}
      />
    </div>
  );
};
