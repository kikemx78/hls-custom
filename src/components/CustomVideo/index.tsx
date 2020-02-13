import * as React from 'react';
import BigPlay from './BigPlay';
import NoVideo from './NoVideo';
import Controls from './Controls';
import HLSSource from './HLSSource';
import VideoModal from './VideoModal';

class Video extends React.Component<any, any> {

  public video: any = null;
  public container: any = null;
  private streamInterval: any = null;

  constructor(props: any) {
    super(props);

    this.state = {
      isMuted: false,
      setLevel: null,
      hasModal: false,
      streamDuration: 0,
      hasCapLevel: true,
      showControls: true,
      streamInterval: null,
      isVideoPaused: false,
      isVideoPlaying: false,
      hasBigPlayButton: true,
      idleStreamCountdown: null,
      showQualityController: false,
      mockInteractionInterval: null,

      hideMobileControlsCounter: 5,
      hideMobileControlsInterval: null,
      idleStreamCounter: this.props.videoAfkPopUpEndSessionInterval / 1000
    };

    this.setLevel = this.setLevel.bind(this);
    this.playVideo = this.playVideo.bind(this);
    this.pauseVideo = this.pauseVideo.bind(this);
    this.toggleMute = this.toggleMute.bind(this);
    this.goFullScreen = this.goFullScreen.bind(this);
    this.handleBigPlay = this.handleBigPlay.bind(this);
    this.updateHlsObject = this.updateHlsObject.bind(this);
    this.closeFullscreen = this.closeFullscreen.bind(this);
    this.handleToggleModal = this.handleToggleModal.bind(this);
    this.handleShowControls = this.handleShowControls.bind(this);

    this.keepWatching = this.keepWatching.bind(this);
    this.userInteraction = this.userInteraction.bind(this);
    this.toggleQualityController = this.toggleQualityController.bind(this);
    this.startMockInteractionInterval = this.startMockInteractionInterval.bind(this);

    this.mobileShowControls = this.mobileShowControls.bind(this);
  }

  componentDidMount() {
    window.addEventListener('click', this.userInteraction);

    console.log(this.props.userAgent);
    if (this.props.userAgent && this.props.userAgent['android']) {
      this.setState({ showControls: false });
    }
  }

  componentWillUnmount() {

    if (this.state.streamInterval !== null) {
      console.log('stop interval::');
      clearInterval(this.state.streamInterval);
    }

    if (this.state.mockInteractionInterval) {
      console.log('stop mock interaction interval::');
      clearInterval(this.state.mockInteractionInterval);
    }

    if (this.state.idleStreamCountdown) {
      clearInterval(this.state.idleStreamCountdown);
    }

    if (this.state.hideMobileControlsInterval) {
      clearInterval(this.state.hideMobileControlsInterval);
    }

    window.removeEventListener('click', this.userInteraction);

  }

  updateHlsObject(hls_: any) {
    this.setState({ hls: hls_ });
    // console.log(this.state.hls);
  }

  playVideo() {
    if (!this.video) return;
    console.log('play video');
    this.video.play();
    this.setState({ isVideoPlaying: true });
    this.setState({ isVideoPaused: false });
    console.log('start interval');
    this.watchingStreamInterval();
  }

  pauseVideo() {
    if (!this.video) return;
    console.log('pause video');
    this.video.pause();
    this.setState({ isVideoPaused: true });
    this.setState({ isVideoPlaying: false });
    this.setState({ hasBigPlayButton: true });

    console.log('stop interval');
    clearInterval(this.state.streamInterval);
    clearInterval(this.state.mockInteractionInterval);
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

    let document_: any = document;

    if (document.exitFullscreen) {
      document.exitFullscreen();
    } else if (document_.mozCancelFullScreen) { /* Firefox */
      document_.mozCancelFullScreen();
    } else if (document_.webkitExitFullscreen) { /* Chrome, Safari and Opera */
      document_.webkitExitFullscreen();
    } else if (document_.msExitFullscreen) { /* IE/Edge */
      document_.msExitFullscreen();
    }
  }

  handleToggleModal() {
    this.setState({hasModal: !this.state.hasModal});
  }

  handleBigPlay() {
    console.log('handle big play');
    if (!this.video) return;
    console.log('handle big play');
    this.setState({ hasBigPlayButton: false });
    this.playVideo();
  }

  handleShowControls(val: boolean) {

    if (this.props.userAgent['android']) return;
    this.setState({showControls: val});
    this.setState({showQualityController: false});
  }

  toggleQualityController() {
    this.setState({ showQualityController: !this.state.showQualityController });
  }

  setLevel(index: any) {
    console.log('set to level index ', index);
    this.setState({ setLevel: index });
  }

  userInteraction() {

    // Reset streamDuration in idle counter
    this.setState({ streamDuration: 0 });

    // close modal if user clicks somewhere
    if (this.video && this.state.hasModal) {
      this.handleToggleModal();
      clearInterval(this.state.idleStreamCountdown);
    }
  }

  startMockInteractionInterval() {

    let that = this;
    console.log('start mock interaction interval');
    let mockInteractionInterval = setInterval(() => {
      let time = Date.now();
      // that.props.dispatch(lastInteraction(time));
    }, 45000);

    this.setState({ mockInteractionInterval });

  }

  watchingStreamInterval() {

    let that = this;
    that.startMockInteractionInterval();

    let streamInterval = setInterval(() => {

      that.setState({ streamDuration: that.state.streamDuration + 1});

      // Show AFK Pop Up
      if (that.state.streamDuration * 1000 >= this.props.videoAfkPopUpInterval && (that.video && !that.state.hasModal)) {
        console.log('send idle on stream');

        // show modal --->
        this.handleToggleModal();

        let idleStreamCountdown = setInterval(() => {
          that.setState({ idleStreamCounter: that.state.idleStreamCounter - 1 });
          console.log('idle stream cointer', that.state.idleStreamCounter);
          // Kill Session on AFK
          if (that.state.idleStreamCounter <= 0) {


            // that.props.wsm.socket.disconnect();
            // that.props.dispatch(killedSession(true));
            // that.props.dispatch(redirectToNotLoggedInPage());

            clearInterval(idleStreamCountdown);
          }
        }, 1000);
        that.setState({ idleStreamCountdown });

      }
      console.log(that.state.streamDuration, 'stream duration');
      console.log(this.props.videoAfkPopUpInterval, 'afkPopUpInterval');
    }, 1000);

    this.setState({  streamInterval  });
  }

  keepWatching() {
    console.log('keep watching');
    console.log('reset to', this.props.videoAfkPopUpEndSessionInterva);
    this.setState({idleStreamCounter: this.props.videoAfkPopUpEndSessionInterval / 1000});
    clearInterval(this.state.idleStreamCountdown);
  }

  mobileShowControls() {

    if (this.state.showControls && this.props.userAgent['android']) {
      this.setState({ hideMobileControlsCounter: 5 });
    }

    if (this.state.showControls || this.state.hasBigPlayButton || !this.props.userAgent['android']) return;

    this.setState({ showControls: true });

    let that = this;

    let hideMobileControlsInterval = setInterval(() => {
      console.log('mobile controls open...');
      if (that.state.showQualityController) {
        console.log('quality controls open...dont close');
        that.setState({ hideMobileControlsCounter: 5 });
      } else {
        that.setState({ hideMobileControlsCounter: that.state.hideMobileControlsCounter - 1});
        console.log('mobile will close in ', that.state.hideMobileControlsCounter);
      }

      if (that.state.hideMobileControlsCounter <= 0) {
        that.setState({ showControls: false});
        console.log('close mobile controlers');
        clearInterval(hideMobileControlsInterval);
        that.setState({ hideMobileControlsCounter: 5 });
      }

    }, 1000);

    // this.setState(hideMobileControlsInterval);

  }

  render() {

    const { balance, isModernBrowser } = this.props;
    console.log(this.props.userAgent, 'userAgent');
    if (!isModernBrowser || Number(balance) <= 0) {
      return (
        <NoVideo
					balance={Number(balance)}
					addBalanceText='AddBalance'
					videoLegacyText='Video Legacy Text'
          isModernBrowser={ isModernBrowser }
        />
      );
    }

    const controllersContainerClass = ['controllers-container'];

    if (this.state.showControls) {
      controllersContainerClass.push('active');
    }

    const hlsOptions = {
      capLevelToPlayerSize: this.props.hasCapLevel
    };

    const { videoSrc } = this.props;

    return (
      <>
        <div
          onMouseEnter={() => this.handleShowControls(true)}
          onMouseLeave={() => this.handleShowControls(false)}
          onClick={() => this.mobileShowControls()}
          ref={c => { this.container = c; }}
          className="containerVideo container-16-9">
          { (this.state.hasBigPlayButton && this.video) &&
            <BigPlay handleBigPlay={this.handleBigPlay}/>
          }
          {
            this.state.hasModal && this.video &&
            <VideoModal
              buttonText="Keep Watching"
              modalText={`Are You Still Watching Our Stream?\nOtherwise Your Session Will Expire in ${this.state.idleStreamCounter} seconds.`}
              handleClick={this.keepWatching}
            />
          }
           <video
            id={'video-id'}
            src={videoSrc}
            muted={this.state.isMuted}
            ref={c => { this.video = c; }}
          >
          { this.video && videoSrc &&
              <HLSSource
                src={videoSrc}
                video={this.video}
                hlsOptions={hlsOptions}
                setLevel={this.state.setLevel}
                updateHlsObject={this.updateHlsObject}
                capLevelToPlayerSize={this.state.hasCapLevel}
              />
          }
          </video>
          <div className={controllersContainerClass.join(' ')}>
            {
              (this.video && !this.state.hasBigPlayButton) &&
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
                toggleQualityController={this.toggleQualityController}
                showQualityController={this.state.showQualityController}
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

export default Video;

// export default connect(
//   (state: any) => {
//     return {
//       wsm: state.wsm,
//       userAgent: state.user && state.user.user_agent,
//       balance: state.user && state.user.balance_real,
//       hasNativeFullScreen: state.user.hasNativeFullScreen,
//       idleOnStream: state.user && state.user.isIdleOnStream,
//       hasVideoOnFullScreen: state.user.hasVideoOnFullScreen,
//       isModernBrowser: state.user && state.user.isModernBrowser
//     };
//   })(Video);
