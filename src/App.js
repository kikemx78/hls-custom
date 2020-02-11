import React from 'react';
import './App.css';
import Video from './Video';

function App() {
  return (
    <div className="App" style={{maxWidth: '714px', margin: 'auto'}}>
      <Video 
        videoSrc='https://bitdash-a.akamaihd.net/content/sintel/hls/playlist.m3u8'
      />
    </div>
  );
}

export default App;
