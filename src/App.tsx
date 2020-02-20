import * as React from 'react';
import Video from './components/CustomVideo';
import MockControls from './components/MockControls';

import {

  isIE,
  isEdge,
  isChrome,
  isBrowser,
  isSafari,
  isMobile,
  isAndroid,
  isTablet,
  isMobileSafari
} from 'react-device-detect';

import './App.css';
import './Video.css';

const config = {
  videoAfkPopUpInterval: 10000,
	videoAfkPopUpEndSessionInterval: 60000
};

const isModernBrowser = true;
const userAgent: any = {
  ie: isIE,
  edge: isEdge,
  mobile: isMobile,
  tablet: isTablet,
  safari: isSafari,
  chrome: isChrome,
  android: isAndroid,
  browser: isBrowser,
  mobile_safari: isMobileSafari
  
};
const balance = 100;

class App extends React.Component<any, any> {

  constructor(props: any) {
    super(props);
    this.state = {
      videoSrc: '',
      hasCapLevel: false
    };

    this.setVideoUrl = this.setVideoUrl.bind(this);
    this.hasCapLevel = this.hasCapLevel.bind(this);
    this.setUrlValue = this.setUrlValue.bind(this);
    this.resetVideoUrl = this.resetVideoUrl.bind(this);
    this.killSessionOnIdle = this.killSessionOnIdle.bind(this);
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

  resetVideoUrl() {
    console.log('reset..');
    // Not used on prod comp...
    this.setState({ videoSrc: '' });
    this.setState({ hasCapLevel: false });

  }

  setUrlValue(e: any) {

    // Not used on prod component ... 
    this.setState({ videoSrc: e.target.value });
  }

  hasCapLevel(e: any) {

    // Not used on prod component...
    console.log(e.target.value)
    this.setState({ hasCapLevel: e.target.value === 'yes' });
    console.log(this.state.hasCapLevel, 'hasCapLevl');
  }

  killSessionOnIdle() {
    console.log('should kill session on idle...');
  }

  render() {
    console.log(this.state);

    let ua = Object.keys(userAgent)
      .filter(b => userAgent[b]);
    console.log(ua);
    
    return (
      <div className="App" style={{maxWidth: '714px', margin: 'auto'}}>
        <div style={{margin: '50px'}}>User agent <br/> {JSON.stringify(ua.join(' '))}</div>
        <MockControls
          videoSrc={this.state.videoSrc}
          hasCapLevel={this.hasCapLevel}
          setUrlValue={this.setUrlValue}
          setVideoUrl={this.setVideoUrl}
          resetVideoUrl={this.resetVideoUrl} 
        />
        { this.state.videoSrc !== '' &&
          <Video 
            balance={balance}
            userAgent={userAgent}
            videoSrc={this.state.videoSrc}
            isModernBrowser={isModernBrowser}
            onIdleCounterFinished={this.killSessionOnIdle}
            videoAfkPopUpInterval={config.videoAfkPopUpInterval}
            videoAfkPopUpEndSessionInterval={config.videoAfkPopUpEndSessionInterval}
          />
        }
      </div>
    );
  }
}

export default App;
