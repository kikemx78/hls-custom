import React from 'react';
import './App.css';
import Video from './Video';

class App extends React.Component {

  constructor(props) {
    super(props) 
      this.state = {
        videoSrc: '',
        hasCapLevel: false
      };

    this.setVideoUrl = this.setVideoUrl.bind(this);
    this.setUrlValue = this.setUrlValue.bind(this);
    this.hasCapLevel = this.hasCapLevel.bind(this);
    this.resetVideoUrl = this.resetVideoUrl.bind(this);
  
  }

  setVideoUrl() {

    // Not used on prod component ...
    const { videoSrc } = this.state;

    const isInvalid = videoSrc.substring(0, 8) !== 'https://' && 
    videoSrc.substring(0, 7) !== 'http://' && 
    videoSrc.substring(0, 2) !== '//';

    if (isInvalid) {
      alert('set a vavlid url');
      return 
    }
    
    this.setState({ setVideo: true });
  }

  setUrlValue(e) {

    // Not used on prod component ... 
    this.setState({ videoSrc: e.target.value });
  }

  resetVideoUrl() {
    console.log('reset..');
    // Not used on prod comp...
    this.setState({ videoSrc: '' });
    this.setState({ isMuted: false });
    this.setState({ setVideo: false });
    this.setState({ hasCapLevel: false });
    this.setState({ isFullScreen: false });
    this.setState({ hasBigPlayButton: true});
    this.setState({ isVideoPlaying: false });
  
  }

  hasCapLevel(e) {

    // Not used on prod component...
    console.log(e.target.value)
    this.setState({ hasCapLevel: e.target.value === 'yes' });
    console.log(this.state.hasCapLevel, 'hasCapLevl');
  }
  render() {
    return (
      <div className="App" style={{maxWidth: '714px', margin: 'auto'}}>
          <div>
            <div style={{margin: '50px'}}>
              <label>Has capLevelToPlayerSize</label>
              <select onChange={this.hasCapLevel}>
                <option value="no"></option>
                <option value="yes">Yes</option>
                <option value="no">No</option>
              </select>
            </div>

            <div>
              <label>Type Video URL</label>
              <input type="text" onChange={this.setUrlValue} value={this.state.videoSrc} />
              <button disabled={this.state.videoSrc === ''} onClick={this.setVideoUrl}>Set video url</button>
              <button onClick={this.resetVideoUrl}>Reset video url</button>
            </div>

            <div>
              <p>Sample URL:</p>
              https://bitdash-a.akamaihd.net/content/sintel/hls/playlist.m3u8
            </div>
          </div>
          { this.state.videoSrc !== '' &&
            <Video
              videoSrc={this.state.videoSrc} 
              hasCapLevel={this.state.hasCapLevel}
            />
          }
      </div>
    );
  }
}

export default App;
