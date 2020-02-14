import * as React from 'react';
import * as Hls_ from 'hls.js';

let hls_: any = Hls_;
const Hls: any = require('hls.js');

class HLSSource extends React.Component<any, any> {

  public hls: any = '';

  constructor(props: any) {
    super(props);

    this.hls = new Hls(this.props.hlsOptions);
    this.state = {
      updateDataIntervall: null
    };
  }

  componentDidMount() {
    // `src` is the property get from this component
    // `video` is the property insert from `Video` component
    // `video` is the html5 video element
    let that = this;
    const { src, video } = this.props;
    // load hls video source base on hls.js
    if (Hls.isSupported()) {
      this.hls.loadSource(src);
      this.hls.attachMedia(video);

      this.hls.on(Hls.Events.MANIFEST_PARSED, () => {
        let updateDataIntervall = setInterval(() => {
          that.props.updateHlsObject(that.hls);
        }, 1000);

        that.setState({ updateDataIntervall });
        // video.play();
      });
    }

    this.hls.on(Hls.Events.ERROR, function (event: any, data: any) {

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
      // this.hls.nextLevelLoaded = newProps.setLevel;
      // this.hls.loadLevel = newProps.setLevel;
    }
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
