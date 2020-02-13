import * as React from 'react';
import { playIcon } from './Base64Icons';

const BigPlay = (props: any) => {

  const { handleBigPlay } = props;

  return (
    <div
      onClick={handleBigPlay}
      style={{ cursor: 'pointer', textAlign: 'center', position: 'absolute', width: '100%', height: '100%', top: '0px', background: 'rgba(255,255,255,0.33)', zIndex: 99999999999 }}>
      <img
        alt="play"
        style={{width: '20%', textAlign: 'center', transform: 'translate(0, 80%)' }}
        src={`data:image/svg+xml;base64, ${playIcon} `} />
    </div>
  );
};

export default BigPlay;
