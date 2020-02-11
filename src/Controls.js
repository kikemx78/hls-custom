import React, { Component } from 'react';
import { 
  playIcon, 
  pauseIcon, 
  audioIcon, 
  muteIcon,
  settingIcon,
  exitFullScreen,
  goFullScreen } from './Base64Icons';
import QualityController from './QualityController';
import './Controls.css';

class Controls extends Component {
  
  constructor(props) {
    super(props);
    this.state = {
      showQualityController: false
    };

    this.videoCurrentTime = this.videoCurrentTime.bind(this);
    this.toggleQualityController = this.toggleQualityController.bind(this);
  }

  videoCurrentTime(d) {

    d = Number(d);
    const h = Math.floor(d / 3600);
    const m = Math.floor(d % 3600 / 60);
    const s = Math.floor(d % 3600 % 60);

    const hDisplay = h > 0 ? h <= 9 ? "0" + h + (":") : h + (":") : "00:";
    const mDisplay = m > 0 ? m <= 9 ? "0" + m + (":") : m + (":") : "00:";
    const sDisplay = s > 0 ? s <= 9 ? "0" + s + ("") : s + ("") :  "00";
    return hDisplay + mDisplay + sDisplay; 
  
  }

  toggleQualityController() {
    this.setState({ showQualityController: !this.state.showQualityController })
  }

  render() {

    const controlsLeft = [
      { 
        'type': !this.props.isVideoPlaying ? playIcon : pauseIcon, 
        'action': !this.props.isVideoPlaying ? this.props.handlePlay : this.props.handlePause 
      },
      { 'type': this.props.isMuted ? muteIcon : audioIcon, 
        'action': this.props.handleToggleMute 
      }
      
    ];

    const controlsRight = [
      {
        'string': this.props.resolution && `${this.props.resolution}p`, 'action': () => ''
      },
      { 'type': settingIcon, 
        'action': () => this.toggleQualityController()
      },
      { 'type': this.props.isFullScreen ? exitFullScreen : goFullScreen, 
        'action': this.props.isFullScreen ? this.props.handleExitFullScreen : this.props.handleFullScreen 
      }
    ];

    return(
      <div className="player-controls">
        <div className="player-controls-container">
          <div className="player-controls-left">
            <div className="tooltip-wrapper">
              { 
                controlsLeft.map((button, i) =>
                  <button 
                    key={i} 
                    className="button-control"
                    onClick={button.action}
                  >
                    <span className="button-icon">
                      <div className="icon">
                        <div className="icon-fill">
                          <div className="icon-fill-inner">
                            <div className="icon-fill-inner-spacer"></div>
                            <img alt="play" src={`data:image/svg+xml;base64, ${button.type} `} />
                          </div>
                        </div>
                      </div>
                    </span>
                  </button>
                )
              }
              <div className="duration" style={{color: 'white', padding: '8px', fontSize: '13px', fontWeight: 'bold', fontFamily: 'monospace'}}>{this.videoCurrentTime(this.props.currentTime)}</div>
            </div>
          </div>
          <div className="player-controls-right">
          
              { 
                controlsRight.map((button, i) =>
                <div  key={i} >
                  {
                    button.type === settingIcon && 
                    this.state.showQualityController &&
                      <QualityController
                        levels={this.props.levels}
                        setLevel={this.props.setLevel}
                        currentLevel={this.props.currentLevel}
                        toggleQualityController={this.toggleQualityController}
                      />
                  }
                  <div className="animate-wrapper" style={{cursor: 'pointer'}}>
                    <div className="tooltip-wrapper">
                        <button 
                          className="button-control"
                          onClick={button.action}
                        >
                          <span className="button-icon">
                            <div className="icon">
                              <div className="icon-fill">
                                <div className="icon-fill-inner">
                                  <div className="icon-fill-inner-spacer"></div>
                                  { button.type && <img alt="play" src={`data:image/svg+xml;base64, ${button.type} `} /> }
                                  { button.string && <div className="quality-text-container"><span>{button.string}</span></div> }
                                </div>
                              </div>
                            </div>
                          </span>
                        </button>
                      </div>
                    </div>
                  </div>
                )
              }
          </div>
        </div>
      </div>
    );
  }
}

export default Controls;