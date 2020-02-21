import * as React from 'react';
import * as Hls_ from 'hls.js';

let hls_: any = Hls_;
const Hls: any = require('hls.js');

class HLSSource extends React.Component<any, any> {

  public hls: any = '';

  constructor(props: any) {
    super(props);

    this.hls = new Hls({ capLevelToPlayerSize: false });
    this.state = {
      stalledInterval: null,
      updateDataIntervall: null
    };
  }

  initPlayer() {

    let that = this;
    const { src, video } = this.props;
    console.log('init player ...');
    if (Hls.isSupported()) {

      this.hls.loadSource(src);
      this.hls.attachMedia(video);

      this.hls.on(Hls.Events.MANIFEST_PARSED, () => {
        console.log('manifest parsed...');
        // Get best bitrate level according to containers width
        let bestLevels = this.hls.levels
          .map((levs: any) => levs.width)
          .filter((levs: any) => levs <= this.hls.capLevelController.mediaWidth);
        let indexOfMaxValue = bestLevels.indexOf(Math.max(...bestLevels));
        let bestLevel = this.hls.levels.filter((level: any) => level.width === bestLevels[indexOfMaxValue])[0];
        let bestLevelIdx = this.hls.levels.indexOf(bestLevel);

         // Change level in case current level is not best bitrate level
        if (this.hls.currentLevel !== bestLevelIdx) {
          if (this.hls.currentLevel !== - 1) {
            console.log('level has been set...');
            this.hls.currentLevel = bestLevelIdx;
          }
        }

        let updateDataIntervall = setInterval(() => {
          that.props.updateHlsObject(that.hls);
        }, 1000);

        that.setState({ updateDataIntervall });

        console.log('play on auto');
        this.props.playVideo();
      });

      this.hls.on(Hls.Events.ERROR, function (event: any, data: any) {
        console.log(data);
        if (data.fatal) {
          switch (data.type) {
          case Hls.ErrorTypes.NETWORK_ERROR:
            that.hls.startLoad();
            break;
          case Hls.ErrorTypes.MEDIA_ERROR:
            that.hls.recoverMediaError();
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
    }

  }

  componentDidMount() {
    this.initPlayer();
  }

  componentWillUnmount() {
    // destroy hls video source
    if (this.hls) {
      this.hls.destroy();
      clearInterval(this.state.updateDataIntervall);
    }
  }

  componentWillReceiveProps(newProps: any) {

    if (newProps.capLevelToPlayerSize !== this.props.capLevelToPlayerSize) {
      console.log('update cap level to', newProps.capLevelToPlayerSize);
      this.hls.capLevelToPlayerSize = newProps.capLevelToPlayerSize;
    }

    if (newProps.setLevel !== this.props.setLevel) {
      console.log('set new level on hls', newProps.setLevel);
      this.hls.currentLevel = newProps.setLevel;
    }
  }

  componentDidUpdate() {

    if (!this.hls || !this.hls.levels) return;

    let bestLevels = this.hls.levels
      .map((levs: any) => levs.width)
      .filter((levs: any) => levs <= this.hls.capLevelController.mediaWidth);
    let indexOfMaxValue = bestLevels.indexOf(Math.max(...bestLevels));
    let bestLevel = this.hls.levels.filter((level: any) => level.width === bestLevels[indexOfMaxValue])[0];
    let bestLevelIdx = this.hls.levels.indexOf(bestLevel);

    if (this.hls.currentLevel !== bestLevelIdx) {
      if (this.hls.currentLevel !== - 1) {
        console.log('level has been set...');
        this.hls.currentLevel = bestLevelIdx;
      }
    }
    console.log('update');
    console.log(this.hls);

  }

  render() {
    if (!this.props.video) return null;

    return (
      <source
        src={this.props.src}
        type={this.props.type || 'application/x-mpegURL'}
      />
    );
  }

}

export default HLSSource;
