import * as React from 'react';

const Spinner = () => {
  const spinnerCircles = [...Array(12).keys()];

  return (
    <div
      style={{ fontFamily: 'Ubuntu-Medium', cursor: 'pointer', position: 'absolute', width: '100%', height: '100%', top: '0px', background: 'rgba(0,0,0,0.5)', zIndex: 1 }}
    >
      <div className="spinner-container">
        <div>
          <div className="sk-fading-circle">
            {
              spinnerCircles.map((item: any, i: any) =>
                <div key={i} className={`sk-circle${i + 1} sk-circle`}></div>
              )
            }
          </div>
        </div>
      </div>
    </div>
  );
};

export default Spinner;
