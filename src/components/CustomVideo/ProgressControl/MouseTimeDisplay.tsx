import * as React from 'react';
import { formatTime } from './../helpers';

function MouseTimeDisplay({
  duration, mouseTime, className, text
}: any) {
  if (!mouseTime.time) {
    return null;
  }

  const time = text || formatTime(mouseTime.time, duration);

  return (
    <div
      className={'video-mouse-display'}
      style={{
        left: `${mouseTime.position}px`
      }}
      data-current-time={time}
    />
  );
}

export default MouseTimeDisplay;
