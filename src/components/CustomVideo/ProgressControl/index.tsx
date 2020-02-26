import * as React from 'react';
import * as Dom from '../utils/dom';
import SeekBar from './SeekBar';

class ProgressControl extends React.Component<any, any> {

  public seekBar: any = null;
  public handleMouseMoveThrottle: any = null;

  constructor(props: any) {
    super(props);

    this.state = {
      mouseTime: {
        time: null,
        position: 0
      }
    };

    this.handleMouseMoveThrottle = this.handleMouseMove.bind(this);
  }

  handleMouseMove(event: any) {
    if (!event.pageX) {
      return;
    }
    const {
      video: { duration }
    } = this.props;
    const node = this.seekBar;
    const newTime = Dom.getPointerPosition(node, event).x * duration;
    const position = event.pageX - Dom.findElPosition(node).left;

    this.setState({
      mouseTime: {
        time: newTime,
        position
      }
    });
  }

  render() {
    const { className } = this.props;
    // console.log(this.state.mouseTime);
    return (
      <div
        onMouseMove={this.handleMouseMoveThrottle}
        className="progress-control video-react-control"
      >
        <SeekBar
          mouseTime={this.state.mouseTime}
          video={this.props.video}
          ref={c => {
            this.seekBar = c;
          }}
          {...this.props}
        />
      </div>
    );
  }
}

export default ProgressControl;
