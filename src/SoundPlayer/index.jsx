import React, { useState, useRef, useEffect } from "react";

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

export default SoundPlayer;
