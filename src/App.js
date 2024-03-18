import React, { useState, useRef, useEffect } from "react";
import { act } from "react-dom/test-utils";
import ReactPlayer from "react-player";

import "./App.css";

function preventDefault(e) {
  // e.preventDefault();
}

let tId = null;

const VideoPlayer = () => {
  const [onlySound, setOnlySound] = useState(false);
  const [volume, setVolume] = useState(1);
  const [isUserActive, setUserActive] = useState(false);
  const [playing, setPlaying] = useState(true);
  const [hoverTag, setHover] = useState(0);
  const [activeTag, setActiveTag] = useState(-1);
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
    document.body.addEventListener("touchstart", () => {
      clearTimeout(tId);
      setUserActive(true);
      tId = setTimeout(() => {
        setUserActive(false);
      }, 5000);
    });

    document.body.addEventListener("touchmove", preventDefault, {
      passive: false,
    });
  }, []);

  const JOINED_DATA = [...CURRENT_DATA, ...TOP_SCROLL];

  return (
    <div className={"main " + (isUserActive ? "" : "userUnactive")}>
      {[...TOP_SCROLL, ...DATA].map((item) => (
        <SoundPlayer
          name={item.title}
          startPlay={item.title === lastTitle}
          onStop={() => {
            setVolume(1);
          }}
          onStart={() => {
            setVolume(0.2);
          }}
        />
      ))}
      <div style={{ flexGrow: 1, position: "relative" }}>
        <ReactPlayer
          url={
            CURRENT_DATA.length > 0
              ? CURRENT_DATA[activeVideoIndex].url
              : DATA[0].url
          }
          playing={playing}
          controls={false}
          volume={volume}
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
            background: onlySound ? "rgba(1, 1, 1, 1)" : "rgba(0, 0 ,0, 0)",
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
              className={"play " + (playing ? "" : "paused")}
              onClick={() => {
                setPlaying(!playing);
              }}
            ></button>
            <div className="soundBut" onClick={() => setOnlySound(!onlySound)}>
              <SoundSvg />
            </div>
          </div>
        </div>
      </div>

      <div className="controls">
        {activeTag > -1 ? (
          <>
            <button
              style={{
                width: "250px",
                display: "none",
                flexShrink: 0,
                backgroundSize: "cover",
                backgroundImage: `url("https://png.pngtree.com/png-clipart/20190517/original/pngtree-vector-back-icon-png-image_4267356.jpg")`,
              }}
              onClick={() => {
                setOnlySound(!onlySound);
                // setActiveTag(-1);
              }}
            ></button>
            <ScrollList
              items={JOINED_DATA}
              key={activeTag}
              hoverIndex={hoverVideoIndex}
              activeVideoIndex={activeVideoIndex}
              onHover={(index) => {
                sethoverVideoIndex(index);
                setLastTitle(JOINED_DATA[index].title);
              }}
              onActive={(index) => {
                const data = JOINED_DATA[index];
                if (!data.isTag) {
                  setActiveVideoIndex(index);
                  setPlaying(true);
                } else {
                  setActiveTag(index - CURRENT_DATA.length);
                  setActiveVideoIndex(0);
                  sethoverVideoIndex(0);
                }
              }}
            />
          </>
        ) : (
          <>
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
                sethoverVideoIndex(0);
              }}
            />
          </>
        )}
      </div>
    </div>
  );
};

export default VideoPlayer;

const ScrollList = ({
  items,
  onHover,
  onActive,
  hoverIndex,
  activeVideoIndex,
}) => {
  return (
    <div
      style={{
        display: "flex",
        overflowX: "auto",
        height: "100%",
      }}
    >
      {items.map((item, index) => {
        let className = "preview";

        if (index === activeVideoIndex) {
          className += " selected";
        } else if (index === hoverIndex) {
          className += " active";
        }
        return (
          <img
            key={index}
            src={
              item.img ||
              `https://img.youtube.com/vi/${item.url.split("=")[1]}/0.jpg`
            }
            className={className}
            onTouchEnd={() => {
              console.log("click");
              onHover(index);
              if (index === hoverIndex) {
                onActive(index);
              }
            }}
          />
        );
      })}
    </div>
  );
};

const SoundPlayer = ({ name, startPlay = false, onStart, onStop }) => {
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
      console.log("start");
      audioRef.current.play();
      onStart();
    }
  }, [startPlay]);

  return (
    <div>
      <audio
        ref={audioRef}
        onEnded={() => {
          onStop();
        }}
        onCanPlay={() => {
          setCanPlay(true);
        }}
        controls
        style={{ display: "none" }}
      />
    </div>
  );
};

const DATA = [
  {
    url: "https://www.youtube.com/watch?v=ezb55xSinoY",
    title: "Машинки бип бип",
    tags: [0],
  },
  {
    url: "https://www.youtube.com/watch?v=LbOve_UZZ54",
    title: "Синий трактор По полям",
    tags: [1],
  },
  {
    url: "https://www.youtube.com/watch?v=q4x5u0Xn0oA",
    title: "Насекомые",
    tags: [1],
  },
  {
    url: "https://www.youtube.com/watch?v=nb3Er4FFxDE",
    title: "Бабайка",
    tags: [1],
  },
  {
    url: "https://www.youtube.com/watch?v=wxASnLPMYow",
    title: "Ягодки",
    tags: [1],
  },
  {
    url: "https://www.youtube.com/watch?v=LqjEFouRNMc",
    title: "Микробы",
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
    url: "https://www.youtube.com/watch?v=KYniUCGPGLs",
    title: "Маша и каша",
    tags: [3],
  },
  {
    url: "https://www.youtube.com/watch?v=CU5o1wGnHsY&t=33s",
    title: "Маша и дед мороз",
    img: process.env.PUBLIC_URL + `/images/маша и дед мороз.png`,
    tags: [3],
  },
  {
    url: "https://www.youtube.com/watch?v=lMKqlFRCiu8",
    title: "Маша про японию",
    tags: [3],
  },
  {
    url: "https://www.youtube.com/watch?v=wnapUUjPGJw",
    title: "Маша и китайский новый год",
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
    url: "https://www.youtube.com/watch?v=qpw-7O72DP8",
    title: "смешарики ля",
    tags: [4],
  },
  {
    url: "https://www.youtube.com/watch?v=ACKYp0lfP3o",
    title: "смешарики лосяш и привязанность",
    tags: [4],
  },
  {
    url: "https://www.youtube.com/watch?v=wC-mrwnfQZ0",
    title: "смешарики про финтики",
    tags: [4],
  },
  {
    url: "https://www.youtube.com/watch?v=XkOiBQfiqTU",
    title: "байки мэтра про летающую тарелку",
    tags: [2],
  },
  {
    url: "https://www.youtube.com/watch?v=aWMYyL8XQP4",
    title: "мэтр великий рестлер",
    tags: [2],
  },
  {
    url: "https://www.youtube.com/watch?v=nH64-U0HQXo",
    title: "мэтр и быки",
    tags: [2],
  },
  {
    url: "https://www.youtube.com/watch?v=gfIsgxIVzbU",
    title: "мэтр детектив",
    tags: [2],
  },
  {
    url: "https://www.youtube.com/watch?v=SeMRk4IgRIw",
    title: "байки на луне",
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
  {
    url: "https://www.youtube.com/watch?v=MVGEY3HOy2E",
    tags: [5],
    title: "Бибика животные африки",
  },
  {
    url: "https://www.youtube.com/watch?v=WyeTqzcD8yo&t=81s",
    tags: [5],
    title: "Бибика про овощи",
    img: "https://mult4mam.ru/social-thumb.php?vid=2562d3959",
  },
  {
    url: "https://www.youtube.com/watch?v=8oJ0ldbIA3I",
    tags: [5],
    title: "Бибика домашние животные",
  },
];

const TOP_SCROLL = [
  {
    title: "теремок тв",
    isTag: true,
    img: "https://www.novochag.ru/upload/img_cache/479/479de871dbc335c7c125380b3411e472_ce_1899x1265x176x0_cropped_666x444.png",
  },
  {
    title: "синий трактор",
    isTag: true,
    img: "https://avatars.yandex.net/get-music-content/5412783/a09cf826.p.4355577/m1000x1000",
  },
  {
    isTag: true,
    title: "байки мэтра",
    img: "https://media.myshows.me/shows/760/a/97/a97c038b7c6ce14f96d8a0022a4b87b0.jpg",
  },
  {
    isTag: true,
    title: "маша и медведь",
    img: "https://cdnn21.img.ria.ru/images/152264/38/1522643869_0:0:1600:900_600x0_80_0_0_1643e97c321f8bc6d1442cf5a5954071.jpg",
  },
  {
    isTag: true,
    title: "смешарики",
    img: "https://www.karusel-tv.ru/media/suit/preview_full/media/image/2020/09/1599471598116137_1.png",
  },
  {
    isTag: true,
    title: "Бибика",
    img: "https://i.ytimg.com/vi/g8AVQXoYWs4/maxresdefault.jpg",
  },
];

const SoundSvg = () => {
  return (
    <svg
      fill="white"
      version="1.1"
      id="Capa_1"
      width="30px"
      height="30px"
      viewBox="0 0 522.234 522.234"
    >
      <g>
        <g>
          <g>
            <path
              d="M346.35,41.163c-10.855-10.367-25.076-16.078-40.045-16.078c-10.832,0-21.445,3.063-30.689,8.857l-159.161,99.761H58.354
				c-31.9,0-57.854,25.952-57.854,57.853v138.918c0,31.9,25.953,57.854,57.854,57.854h57.773l159.487,99.965
				c9.244,5.795,19.857,8.857,30.691,8.857c14.969,0,29.189-5.71,40.047-16.078c5.543-5.293,9.908-11.525,12.979-18.523
				c3.227-7.353,4.861-15.184,4.861-23.275V261.22v-0.205V82.963c0-8.094-1.635-15.925-4.861-23.278
				C356.26,52.689,351.893,46.457,346.35,41.163z M321.354,261.015v0.205v178.052c0,8.803-7.227,15.037-15.049,15.037
				c-2.664,0-5.398-0.724-7.939-2.316L137.222,350.989c-5.736-3.595-12.368-5.502-19.138-5.502h-59.73
				c-8.292,0-15.014-6.722-15.014-15.014V191.556c0-8.291,6.722-15.013,15.014-15.013h60.059c6.77,0,13.4-1.907,19.137-5.502
				L298.365,70.242c2.541-1.593,5.273-2.316,7.939-2.316c7.822,0,15.049,6.236,15.049,15.038V261.015z"
            />
            <path
              d="M306.305,497.649c-10.929,0-21.634-3.089-30.957-8.934l-159.365-99.889H58.354C26.177,388.827,0,362.649,0,330.474
				V191.556c0-32.176,26.177-58.353,58.354-58.353h57.958L275.35,33.519c9.325-5.844,20.029-8.934,30.955-8.934
				c15.096,0,29.44,5.759,40.391,16.216c5.591,5.34,9.995,11.625,13.093,18.683c3.254,7.415,4.903,15.314,4.903,23.479v356.309
				c0,8.163-1.649,16.062-4.903,23.477c-3.099,7.062-7.503,13.348-13.091,18.684C335.746,491.891,321.401,497.649,306.305,497.649z
				 M58.354,134.203C26.729,134.203,1,159.931,1,191.556v138.918c0,31.625,25.729,57.354,57.354,57.354h57.917l0.122,0.076
				l159.487,99.965c9.164,5.745,19.685,8.781,30.426,8.781c14.838,0,28.938-5.661,39.701-15.939
				c5.493-5.245,9.821-11.423,12.866-18.363c3.198-7.287,4.819-15.05,4.819-23.074V82.963c0-8.025-1.621-15.79-4.819-23.077
				c-3.044-6.937-7.373-13.114-12.868-18.362c-10.763-10.279-24.861-15.939-39.699-15.939c-10.738,0-21.259,3.037-30.424,8.781
				l-159.283,99.837H58.354z M306.305,454.809c-2.87,0-5.708-0.827-8.205-2.393L136.956,351.413
				c-5.664-3.55-12.189-5.426-18.872-5.426h-59.73c-8.554,0-15.514-6.959-15.514-15.514V191.556c0-8.554,6.959-15.513,15.514-15.513
				h60.059c6.682,0,13.207-1.876,18.871-5.426L298.1,69.818c2.497-1.565,5.335-2.393,8.205-2.393c8.573,0,15.549,6.97,15.549,15.538
				v356.308C321.854,447.839,314.878,454.809,306.305,454.809z M58.354,177.043c-8.003,0-14.514,6.51-14.514,14.513v138.918
				c0,8.003,6.511,14.514,14.514,14.514h59.73c6.871,0,13.58,1.929,19.403,5.578l161.144,101.003c2.338,1.466,4.991,2.24,7.674,2.24
				c8.022,0,14.549-6.521,14.549-14.537V82.963c0-8.016-6.526-14.538-14.549-14.538c-2.683,0-5.336,0.774-7.674,2.24
				L137.814,171.465c-5.824,3.649-12.533,5.578-19.402,5.578H58.354z"
            />
          </g>
          <g>
            <path
              d="M424.273,156.536c-5.266-10.594-18.125-14.911-28.715-9.646c-10.594,5.266-14.912,18.123-9.646,28.716
				c12.426,24.995,18.992,54.604,18.992,85.626c0,31.506-6.754,61.487-19.533,86.705c-5.348,10.553-1.129,23.442,9.424,28.79
				c3.104,1.572,6.408,2.317,9.664,2.317c7.816,0,15.35-4.294,19.125-11.742c15.807-31.191,24.16-67.869,24.16-106.07
				C447.746,223.628,439.629,187.424,424.273,156.536z"
            />
            <path
              d="M404.459,379.545c-3.456,0-6.784-0.798-9.89-2.371c-10.782-5.464-15.108-18.681-9.645-29.462
				c12.744-25.147,19.479-55.052,19.479-86.479c0-30.948-6.549-60.48-18.939-85.404c-2.606-5.243-3.016-11.188-1.15-16.738
				c1.864-5.55,5.778-10.042,11.021-12.648c3.064-1.523,6.341-2.296,9.739-2.296c8.388,0,15.916,4.662,19.646,12.167
				c15.391,30.959,23.524,67.239,23.522,104.919c0,38.28-8.373,75.037-24.214,106.296
				C420.273,374.94,412.773,379.545,404.459,379.545z M405.075,145.146c-3.242,0-6.369,0.737-9.294,2.191
				c-5.004,2.487-8.74,6.774-10.52,12.071c-1.779,5.297-1.39,10.97,1.098,15.974c12.459,25.062,19.045,54.748,19.045,85.849
				c0,31.584-6.773,61.645-19.587,86.931c-5.215,10.29-1.086,22.904,9.203,28.118c2.965,1.502,6.141,2.264,9.438,2.264
				c7.936,0,15.094-4.395,18.679-11.468c15.771-31.12,24.106-67.721,24.106-105.845c0.002-37.526-8.096-73.652-23.418-104.474
				C420.266,149.596,413.081,145.146,405.075,145.146z"
            />
          </g>
          <g>
            <path
              d="M456.547,88.245c-10.594,5.266-14.912,18.122-9.646,28.716c20.932,42.105,31.994,91.864,31.994,143.897
				c0,52.847-11.381,103.237-32.912,145.727c-5.348,10.552-1.129,23.441,9.424,28.788c3.104,1.573,6.408,2.318,9.666,2.318
				c7.814,0,15.35-4.294,19.123-11.743c24.559-48.462,37.539-105.549,37.539-165.09c0-58.615-12.611-114.968-36.473-162.968
				C479.996,87.297,467.141,82.977,456.547,88.245z"
            />
            <path
              d="M465.072,438.19c-3.458,0-6.787-0.798-9.893-2.372c-5.223-2.646-9.102-7.168-10.923-12.732s-1.367-11.506,1.279-16.728
				c21.496-42.42,32.858-92.733,32.858-145.501c0-51.958-11.045-101.64-31.941-143.674c-5.381-10.824-0.952-24.006,9.871-29.386
				c3.065-1.524,6.343-2.297,9.742-2.297c8.386,0,15.912,4.663,19.643,12.167c23.896,48.067,36.525,104.498,36.525,163.19
				c0,59.619-12.999,116.785-37.593,165.315C480.887,433.586,473.388,438.19,465.072,438.19z M466.066,86.5
				c-3.243,0-6.371,0.738-9.297,2.193c-5.004,2.487-8.74,6.774-10.52,12.071s-1.389,10.97,1.098,15.974
				c20.966,42.172,32.047,92.008,32.047,144.12c0,52.924-11.399,103.394-32.966,145.952c-2.526,4.984-2.96,10.654-1.222,15.965
				s5.44,9.626,10.425,12.151c2.965,1.503,6.141,2.265,9.44,2.265c7.937,0,15.094-4.395,18.677-11.469
				c24.523-48.392,37.485-105.401,37.485-164.864c0-58.54-12.594-114.816-36.42-162.745C481.253,90.949,474.069,86.5,466.066,86.5z"
            />
          </g>
        </g>
      </g>
    </svg>
  );
};
