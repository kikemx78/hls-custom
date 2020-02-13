import * as React from 'react';
import {
  chromeIcon,
  fireFoxIcon,
  safariIcon
} from './Base64Icons';

let browsers = [
  {
    icon: chromeIcon,
    url: 'bit.ly/37R2zvx'
  },
  {
    icon: fireFoxIcon,
    url: 'mzl.la/35EDYbK'
  },
  {
    icon: safariIcon,
    url: 'apple.co/2R6fHWU'
  }
];

let addFundsStyle: any = {
  background: '#212121',
  padding: '35px',
  textAlign: 'center',
  color: '#fff'
};

let iconsStyle: any = {
  maxWidth: '25px'
};

const NoVideo = (props: any) => {

  const { addBalanceText, videoLegacyText, isModernBrowser }: any = props;
  // console.log(props);
  
  return (
    <div style={addFundsStyle}>
      { !isModernBrowser ? videoLegacyText : addBalanceText }
      <div style={{ position: 'relative', marginTop: '15px', display: 'flex' , justifyContent: 'space-evenly'}}>
        {
          !isModernBrowser &&
          browsers.map((browser: any, i: any) =>
            <a
              key={i}
              target="_blank"
              href={`https://${browser.url}`}
              rel="noopener noreferrer"
            >
              <img
                alt="browser-icon"
                style={iconsStyle}
                src={`data:image/svg+xml;utf8;base64,${browser.icon}`}
              />
            </a>
          )
        }
      </div>
    </div>
  );

};

export default NoVideo;
