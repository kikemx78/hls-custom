import React, { Component } from 'react';
import HLSSource from './HLSSource';
import Controls from './Controls';
import BigPlay from './BigPlay';
import VideoModal from './VideoModal';
import './Video.css';

export default class Video extends Component {
  
  constructor(props) {
    super(props);
    this.state = {
      hls: {},
      isMuted: false,
      setLevel: null,
      setVideo: true,
      hasModal: false,
      showControls: true,
      isFullScreen: false,
      isVideoPlaying: false,
      hasBigPlayButton: true
    };

    this.handleShowControls = this.handleShowControls.bind(this);

    this.setLevel = this.setLevel.bind(this);
    this.stopVideo = this.stopVideo.bind(this);
    this.playVideo = this.playVideo.bind(this);
    this.toggleMute = this.toggleMute.bind(this);
    this.pauseVideo = this.pauseVideo.bind(this);
    this.goFullScreen = this.goFullScreen.bind(this);
    this.handleBigPlay = this.handleBigPlay.bind(this);
    this.updateHlsObject = this.updateHlsObject.bind(this);
    this.closeFullscreen = this.closeFullscreen.bind(this);
    this.handleToggleModal = this.handleToggleModal.bind(this);
    
  }

  componentDidMount() {
    this.forceUpdate();
  }

  updateHlsObject(hls_) {
    this.setState({ hls: hls_ });
    // console.log(this.state.hls);
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
    this.setState({ hasBigPlayButton: true });
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

  handleBigPlay() {
    console.log('handle big play');
    if (!this.video) return;
    console.log('handle big play');
    this.setState({ hasBigPlayButton: false });
    this.playVideo();
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

  setLevel(index) {
    console.log('set to level index ', index);
    this.setState({ setLevel: index });
  }
  
  handleToggleModal() {
    this.setState({hasModal: !this.state.hasModal});
  }

  handleShowControls(val) {
    this.setState({showControls: val})
  }

  render() {

    const controllersContainerClass = ['controllers-container'];

    if (this.state.showControls) {
      controllersContainerClass.push('active');
    }

    // console.log(this.state.hasCapLevel, 'state cap level');
    const hlsOptions = {
      capLevelToPlayerSize: this.props.hasCapLevel
    };

    const { videoSrc } = this.props;

    return (
      <>
        <div 
          onMouseEnter={() => this.handleShowControls(true)}
          onMouseLeave={() => this.handleShowControls(false)}
          ref={c => { this.container = c; }} 
          className="container container-16-9">
          { (this.state.hasBigPlayButton && this.state.setVideo) &&
            <BigPlay handleBigPlay={this.handleBigPlay}/>
          }
          {
            this.state.hasModal && this.state.setVideo &&
            <VideoModal handleToggleModal={this.handleToggleModal} />
          }
          <video
            id={'video-id'}
            src={videoSrc}
            muted={this.state.isMuted}
            ref={c => { this.video = c; }}
          > 
          { this.video && this.state.setVideo &&
              <HLSSource
                video={this.video}
                hlsOptions={hlsOptions}
                src={videoSrc}
                setLevel={this.state.setLevel} 
                updateHlsObject={this.updateHlsObject}
                capLevelToPlayerSize={this.state.hasCapLevel} 
              />
          }
          </video>
          <div className={controllersContainerClass.join(' ')}>
            { 
              (this.video && this.state.setVideo && !this.state.hasBigPlayButton) &&
              <Controls
                setLevel={this.setLevel}
                handlePlay={this.playVideo}
                isMuted={this.state.isMuted}
                handlePause={this.pauseVideo}
                handleToggleMute={this.toggleMute}
                handleFullScreen={this.goFullScreen}
                currentTime={this.video.currentTime}
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
