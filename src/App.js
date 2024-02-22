import React, { useState } from 'react';
import ReactPlayer from 'react-player';

const VideoPlayer = () => {
  const [videos, setVideos] = useState([
    'https://www.youtube.com/watch?v=ezb55xSinoY',
    'https://www.youtube.com/watch?v=6JN0ZGJf5M8',
    'https://www.youtube.com/watch?v=9bZkp7q19f0',
    'https://www.youtube.com/watch?v=LbOve_UZZ54',
    'https://www.youtube.com/watch?v=0tSBxGHcaFA',
    'https://www.youtube.com/watch?v=4iHQev6oHEo'
  ]);

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
    <div style={{display: 'flex', flexDirection: 'column', height: '100vh'}}>
      <div style={{ marginBottom: '20px', flexGrow: 1 }}>
        <ReactPlayer url={videos[activeIndex]} playing={playing} controls={false} width="100%" height="100%" />
      </div>
      <div style={{height: '40px'}}>
          <button style={{height: '100%', marginRight: '20px'}} onClick={handleStop}>Стоп</button>
          <button style={{height: '100%'}} onClick={() => {
            setPlaying(true);
          }}>Играй</button>
      </div>
      <div style={{height: '150px'}}>
      <VideoThumbnail videos={videos} onVideoClick={handleVideoClick} />
      </div>
    </div>
  );
};

export default VideoPlayer;


const VideoThumbnail = ({ videos, onVideoClick }) => {
  return (
    <div style={{ display: 'flex', overflowX: 'auto', height: '100%' }}>
      {videos.map((video, index) => (
        <img
          key={index}
          src={`https://img.youtube.com/vi/${video.split('=')[1]}/0.jpg`}
          style={{ marginRight: '10px', cursor: 'pointer' }}
          onClick={() => onVideoClick(index)}
        />
      ))}
    </div>
  );
};
