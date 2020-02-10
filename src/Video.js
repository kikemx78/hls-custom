import React, { Component } from 'react';
import HLSSource from './HLSSource';
import Controls from './Controls';

export default class Video extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hls: {},
      isMuted: false,
      videoSrc: 'https://bitdash-a.akamaihd.net/content/sintel/hls/playlist.m3u8',
      setLevel: null,
      setVideo: false,
      hasCapLevel: false,
      isFullScreen: false,
      isVideoPlaying: false
    };

    this.setLevel = this.setLevel.bind(this);
    this.stopVideo = this.stopVideo.bind(this);
    this.playVideo = this.playVideo.bind(this);
    this.toggleMute = this.toggleMute.bind(this);
    this.pauseVideo = this.pauseVideo.bind(this);
    this.setVideoUrl = this.setVideoUrl.bind(this);
    this.setUrlValue = this.setUrlValue.bind(this);
    this.hasCapLevel = this.hasCapLevel.bind(this);
    this.goFullScreen = this.goFullScreen.bind(this);
    this.resetVideoUrl = this.resetVideoUrl.bind(this);
    this.updateHlsObject = this.updateHlsObject.bind(this);
    this.closeFullscreen = this.closeFullscreen.bind(this);
    
  }

  componentDidMount() {
    this.forceUpdate();
  }

  updateHlsObject(hls_) {
    this.setState({ hls: hls_ });
    // console.log(this.state.hls);
  }

  setUrlValue(e) {
    this.setState({ videoSrc: e.target.value });
  }
  
  setVideoUrl() {

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

  hasCapLevel(e) {
    console.log(e.target.value)
    this.setState({ hasCapLevel: e.target.value === 'yes' });
    console.log(this.state.hasCapLevel, 'hasCapLevl');
  }

  playVideo() {
    if (!this.video) return;
    console.log('play video');
    this.video.play();
    this.setState({ isVideoPlaying: true });
  }

  pauseVideo() {
    if (!this.video) return;
    console.log('pause video');
    this.video.pause();
    this.setState({ isVideoPlaying: false });
  }

  stopVideo() {
    if (!this.video) return;
    console.log('stop video');
    // this.video.stop();
    // this.setState({ isVideoPlaying: false });
  }

  toggleMute() {
    if (!this.video) return;
    this.setState({ isMuted: !this.state.isMuted });
  }

  goFullScreen() {
    if (!this.video) return;
    console.log('full');
    this.setState({ hasCapLevel: false });
    this.setState({ isFullScreen: true });
    if (this.container.requestFullscreen) {
      this.container.requestFullscreen();
    } else if (this.container.mozRequestFullScreen) {
      this.container.mozRequestFullScreen(); // Firefox
    } else if (this.container.webkitRequestFullscreen) {
      this.container.webkitRequestFullscreen(); // Chrome and Safari
    }
    
  }

  closeFullscreen() {
    
    if (!this.video) return;
    
    this.setState({ isFullScreen: false });

    if (document.exitFullscreen) {
      document.exitFullscreen();
    } else if (document.mozCancelFullScreen) { /* Firefox */
      document.mozCancelFullScreen();
    } else if (document.webkitExitFullscreen) { /* Chrome, Safari and Opera */
      document.webkitExitFullscreen();
    } else if (document.msExitFullscreen) { /* IE/Edge */
      document.msExitFullscreen();
    }
  }

  resetVideoUrl() {

    this.setState({ videoSrc: '' });
    this.setState({ isMuted: false });
    this.setState({ setVideo: false });
    this.setState({ hasCapLevel: false });
    this.setState({ isFullScreen: false });
    this.setState({ isVideoPlaying: false });
  
  }

  setLevel(index) {
    console.log('set to level index ', index);
    this.setState({ setLevel: index });
  } 

  componentDidUpdate() {
    // console.log('update video component');
  }

  render() {

    // console.log(this.state.hasCapLevel, 'state cap level');
    const hlsOptions = {
      capLevelToPlayerSize: this.state.hasCapLevel
    };
    
    return (
      <>
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

        <div ref={c => { this.container = c; }} className="container container-16-9">
          <video
            id={'video-id'}
            src={this.state.videoSrc}
            muted={this.state.isMuted}
            ref={c => { this.video = c; }}
          > 
          { this.video && this.state.setVideo &&
              <HLSSource
                video={this.video}
                hlsOptions={hlsOptions}
                src={this.state.videoSrc}
                setLevel={this.state.setLevel} 
                updateHlsObject={this.updateHlsObject}
                capLevelToPlayerSize={this.state.hasCapLevel} 
              />
          }
          </video>
          <div className="controllers-container">
            { 
              this.video && this.state.setVideo &&
              <Controls
                setLevel={this.setLevel}
                handlePlay={this.playVideo}
                isMuted={this.state.isMuted}
                handlePause={this.pauseVideo}
                handleToggleMute={this.toggleMute}
                handleFullScreen={this.goFullScreen}
                isFullScreen={this.state.isFullScreen}
                isVideoPlaying={this.state.isVideoPlaying}
                handleExitFullScreen={this.closeFullscreen}
                levels={this.state.hls && this.state.hls.levels}
                currentLevel={this.state.hls && this.state.hls.currentLevel}
                resolution={this.state.hls && this.state.hls.levels && this.state.hls.levels[this.state.hls.currentLevel] && this.state.hls.levels[this.state.hls.currentLevel].height }
              />
            }
          </div>
        </div>
      </>
    );
  }
}
