import * as React from 'react';

const VideoModal = ({ modalText, handleClick, buttonText}: any) => {

  return (
    <div
      onClick={handleClick}
      style={{ fontFamily: 'Ubuntu-Medium', cursor: 'pointer', position: 'absolute', width: '100%', height: '100%', top: '0px', background: 'rgba(0,0,0,0.5)', zIndex: 99999999999 }}>
      <div style={{ height: '100%', padding: '30px', transform: 'translate(0%, calc(50% - 60px))', textAlign: 'center'}}>
        <div style={{fontSize: '16px', position: 'relative' }}>{modalText}</div>
        <div style={{ marginTop: '20px',  position: 'relative'}}>
          <span style={{borderRadius: '5px', fontSize: '14px', padding: '10px', background: 'green' }}>{buttonText}</span>
        </div>
      </div>
    </div>
  );
};

export default VideoModal;
