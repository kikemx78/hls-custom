import * as React from 'react';
import { formatTime } from './../helpers';

// Shows play progress
export default function PlayProgressBar({
  currentTime,
  duration,
  percentage
}: any) {
  return (
    <div
      data-current-time={formatTime(currentTime, duration)}
      className="play-progress-bar"
      style={{
        width: percentage
      }}
    >
      <span className="control-text">
        {`Progress: ${percentage}`}
      </span>
    </div>
  );
}
