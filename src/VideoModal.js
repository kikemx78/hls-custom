import React, { Component } from 'react';

class VideoModal extends Component {
  render() {
    
    const { handleToggleModal } = this.props;

    return (
      <div 
        onClick={handleToggleModal}
        style={{ cursor: 'pointer', position: 'absolute', width: '100%', height: '100%', top: '0px', background: 'rgba(255,255,255,0.33)', zIndex: '99999999999' }}>
        <div style={{transform: 'translate(0, calc(50% - 25px))', height: '100%'}}>
          <div style={{fontSize: '20px', position: 'relative', top: '-50px'}}>Are you still wathcing our stream ?</div>
          <div>
            <span style={{borderRadius: '5px', fontSize: '20px', padding: '25px', background: 'green', position: 'relative', transform: 'translate(0, 50%)'}}>Yes</span>
          </div>
          <div style={{fontSize: '20px', position: 'relative', top: '50px'}}>Otherwise your session will be terminated in x seconds</div>
        </div>
      </div>
    );
  }
}

export default VideoModal;
