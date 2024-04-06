import React from 'react';
import ReactPlayer from 'react-player';
import './VideoPlayer.css';

const VideoPlayer = ({ url }) => {
  return (
    <div id="music-player">
    <h2>Video player</h2>
    <div className="video-player-wrapper">
    <center>
      <ReactPlayer
        url={url}
        className="react-player"
        width="320px"
        height="180px"
        controls
      />
      </center>
    </div>
    </div>
  );
};

export default VideoPlayer;
