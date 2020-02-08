export function throttle(callback, limit) {
  let wait = false;
  return () => {
    if (!wait) {
      // eslint-disable-next-line prefer-rest-params
      callback(...arguments);
      wait = true;
      setTimeout(() => {
        wait = false;
      }, limit);
    }
  };
}

// Check if the element belongs to a video element
// only accept <source />, <track />,
// <MyComponent isVideoChild />
// elements
export function isVideoChild(c) {
  if (c.props && c.props.isVideoChild) {
    return true;
  }
  return c.type === 'source' || c.type === 'track';
}

export const mediaProperties = [
  'error',
  'src',
  'srcObject',
  'currentSrc',
  'crossOrigin',
  'networkState',
  'preload',
  'buffered',
  'readyState',
  'seeking',
  'currentTime',
  'duration',
  'paused',
  'defaultPlaybackRate',
  'playbackRate',
  'played',
  'seekable',
  'ended',
  'autoplay',
  'loop',
  'mediaGroup',
  'controller',
  'controls',
  'volume',
  'muted',
  'defaultMuted',
  'audioTracks',
  'videoTracks',
  'textTracks',
  'width',
  'height',
  'videoWidth',
  'videoHeight',
  'poster'
];