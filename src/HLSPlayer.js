import React from 'react';
import Hls from 'hls.js';
import PropTypes from 'prop-types';

class HLSPlayer extends React.Component {
  
  constructor(props) {
    super(props);

    this.state = {
      hasCapLevel: false,
      urlValue: '',
      autoLevelCapping: -1,
      maxAutoLevel: -1,
      isHLSReady: false,
      setVideo: false,
      seekValue: 0
    };

    this.setUrlValue = this.setUrlValue.bind(this);
    this.hasCapLevel = this.hasCapLevel.bind(this);
    this.resetVideoUrl = this.resetVideoUrl.bind(this);
    this.setVideoUrl = this.setVideoUrl.bind(this);

    this.seek = this.seek.bind(this);
    this.playVideo = this.playVideo.bind(this);
    this.muteVideo = this.muteVideo.bind(this);
    this.timeupdate = this.timeupdate.bind(this);
    this.pauseVideo = this.pauseVideo.bind(this);
    this.goFullScreen = this.goFullScreen.bind(this);

  }

  componentDidMount() {


  }

  componentWillUnmount() {
    if (!this.hls) return;
    this.hls.destroy();
  }

  playVideo() {
    
    if (!this.hls || !this.video) return;

    console.log('play video');
    this.video.play();
    setTimeout(() => {
      console.log(this.hls.autoLevelCapping, 'autoLevelCapping');
      this.setState({ autoLevelCapping: this.hls.autoLevelCapping });
      this.setState({ maxAutoLevel: this.hls.maxAutoLevel });
      console.log(this.hls);
    }, 500);

  }

  pauseVideo() {
    if (!this.hls || !this.video) return;
    this.video.pause();
  }

  muteVideo() {
    if (!this.hls || !this.video) return;
    console.log('mutte video');
    this.video.muted = !this.video.muted;
    
  }

  goFullScreen() {
    if (!this.hls || !this.video) return;
    if (this.video.requestFullscreen) {
      this.video.requestFullscreen();
    } else if (this.video.mozRequestFullScreen) {
      this.video.mozRequestFullScreen(); // Firefox
    } else if (this.video.webkitRequestFullscreen) {
      this.video.webkitRequestFullscreen(); // Chrome and Safari
    }
  }

  seek() {
    if (!this.hls || !this.video) return;
    console.log(this.videoDuration);
    // const time = this.video.duration * (this.state.seekValue / 100);
    // this.video.currentTime = time;
  }

  timeupdate() {
    const value = (100 / this.video.duration) * this.video.currentTime;
    console.log(this.video.duration, 'duration');
    console.log(this.video.currentTime, 'currentTime');
    console.log(value, 'seekValue')
    this.setState({seekValue: value });
    console.log('video updates');
  }

  componentDidUpdate() {
    console.log('hey');
  }

  componentWillReceiveProps() {
    console.log('props');
  }

  setVideoUrl() {
    this.setState({ setVideo: true });
    if (Hls.isSupported()) {
      console.log(this.state.hasCapLevel, 'hasCapLevel');
      let options = this.state.hasCapLevel ? { capLevelToPlayerSize: true } : {};
      this.hls = new Hls(options);
      
      this.hls.loadSource(this.state.urlValue);
      // this.hls.attachMedia(this.video);
      this.hls.on(Hls.Events.MANIFEST_PARSED, () => {
        // this.video.addEventListener('timeupdate', this.timeupdate);
        this.hls.attachMedia(this.video);
        // this.video.play();

        // setInterval(() => {
        //   console.log('currentLevel');
        //   console.log(this.hls.currentLevel);
        //   console.log(this.hls.levels[this.hls.currentLevel].height);
        // }, 1000);
      });

      let that = this;

      this.hls.on(Hls.Events.ERROR, function (event, data) {
        if (!this.hls) {
          alert('please check video url...');
          that.resetVideoUrl();
          return;
        }
        console.log(event);
        console.log(data);
        if (data.fatal) {
          switch(data.type) {
          case Hls.ErrorTypes.NETWORK_ERROR:
            this.hls.startLoad();
            break;
          case Hls.ErrorTypes.MEDIA_ERROR:
            this.hls.recoverMediaError();
            break;
          case Hls.ErrorTypes.OTHER_ERROR:
            console.log('Other error');
            break;
          default:
            console.log('error');
            console.log(data.type);
            // this._initPlayer();
            break;
          }
        }
      });


      this.setState({isHLSReady: true});

      console.log('is supported..');
      console.log(this.hls);

      setInterval(() => {
        console.log(this.hls);
      }, 1000);
    } else if (this.video.canPlayType('application/vnd.apple.mpegurl')) {
      this.video.src = this.state.urlValue;
      this.video.addEventListener('loadedmetadata',function() {
        this.video.play();
      });
      
    } else {
      console.log('hls not supported');
    }
  }

  resetVideoUrl() {
    this.setState({ autoLevelCapping: -1 });
    this.setState({ maxAutoLevel: -1} );
    this.setState({ setVideo: false });
    this.setState({ hasCapLevel: false });
    this.setState({ urlValue: '' });
    if (!this.hls) return;
    this.hls.destroy();
  }

  hasCapLevel(e) {
    console.log(e.target.value)
    this.setState({ hasCapLevel: e.target.value === 'yes' });
    console.log(this.state.hasCapLevel, 'hasCapLevl');
  }

  setUrlValue(e) {
    this.setState({ urlValue: e.target.value });
  }

  render() {
    console.log(this.state);
    if (!this.state.setVideo) {
      return (
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
            <input type="text" onChange={this.setUrlValue} value={this.state.urlValue} />
            <button disabled={this.state.urlValue === ''} onClick={this.setVideoUrl}>Set video url</button>
          </div>

          <div>
            <p>Sample URL:</p>
            https://bitdash-a.akamaihd.net/content/sintel/hls/playlist.m3u8
          </div>

        </div>
      );
    }
    console.log(this.hls && this.hls.levels && this.hls.levels[this.state.maxAutoLevel]);
    return(
      <div 
        style={{maxWidth: '714px', margin: 'auto' }}
        onMouseEnter={this.playVideo}
      >
        <video
          preload="auto"
          tabIndex="-1" 
          width={'400px'}
          height={'200px'}
          id={`react-hls-`}
          className="video-react-video hls-player"
          ref={(video) => { this.video = video; }}
        >
          <source
            src={this.props.src}
            type={this.props.type || 'application/x-mpegURL'}
          />
        </video>
       
        <div id="video-controls">
          <button type="button" onClick={this.playVideo}>Play</button>
          <button type="button" onClick={this.pauseVideo}>Pause</button>
          {/* <input type="range" onChange={this.seek} id="seek-bar" value={this.state.seekValue} />
          <button type="button" onClick={this.muteVideo}>Mute</button> */}
          {/* <input type="range" onChange={this.seek} id="volume-bar" min="0" max="1" step="0.1" value="1" /> */}
          <button type="button" onClick={this.goFullScreen}>Full-Screen</button>
        </div>
        <div>Has Cap Level: {this.state.hasCapLevel ? 'YES' : 'NO'}</div>
        <div>Auto Level Capping: {this.state.autoLevelCapping}</div>
        <div>Max Auto Level: {this.state.maxAutoLevel}</div>
        <div>Resolution: {this.hls && this.hls.levels && this.hls.levels[this.state.maxAutoLevel] ? JSON.stringify(this.hls.levels[this.state.maxAutoLevel].attrs.RESOLUTION) : ''}</div>
        <div>
          <label></label>
          <button onClick={this.resetVideoUrl}>Reset video url</button>
        </div>
        
      </div>
    );
  }
};

HLSPlayer.defaultProps = {
  src: "https://d2zihajmogu5jn.cloudfront.net/bipbop-advanced/bipbop_16x9_variant.m3u8"
}

export default HLSPlayer;
