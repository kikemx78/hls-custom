import * as React from 'react';
import Slider from './Slider';
import LoadProgressBar from './LoadProgressBar';
import PlayProgressBar from './PlayProgressBar';
import MouseTimeDisplay from './MouseTimeDisplay';
import { formatTime } from './../helpers';

class SeekBar extends React.Component<any, any> {

  public slider: any = null;

  constructor(props: any) {
    super(props);

    this.getPercent = this.getPercent.bind(this);
    this.getNewTime = this.getNewTime.bind(this);
    this.stepForward = this.stepForward.bind(this);
    this.stepBack = this.stepBack.bind(this);

    this.handleMouseDown = this.handleMouseDown.bind(this);
    this.handleMouseMove = this.handleMouseMove.bind(this);
    this.handleMouseUp = this.handleMouseUp.bind(this);

  }


  handleMouseDown() {

  }

  getPercent() {
    const { currentTime, seekingTime, duration } = this.props.video;
    const time = seekingTime || currentTime;
    const percent = time / duration;
    return percent >= 1 ? 1 : percent;
  }

  getNewTime(event: any) {
    const {
      video: { duration }
    } = this.props;
    
    const distance = this.slider.calculateDistance(event);
    const newTime = distance * duration;
    
    // Don't let video end while scrubbing.
    return newTime === duration ? newTime - 0.1 : newTime;
  }

  handleMouseUp(event: any) {
  
    const newTime = this.getNewTime(event);
    // this.props.video.currentTime = newTime;
    // this.props.video.seek(newTime);
    // this.props.video.seekingTime = 0;
   
  }

  handleMouseMove(event: any) {
 
    const newTime = this.getNewTime(event);
    this.props.video.currentTime = newTime;
    // console.log('handleMouseMove');
    // console.log(newTime);
    // this.props.video.seekingTime = newTime;
 
  }

  stepForward() {
    console.log('stepForward')
  }

  stepBack() {
    console.log('stepBack');

  }

  render() {
    const {
      video: { currentTime, seekingTime, duration, buffered },
      mouseTime
    } = this.props;
    
    const time = seekingTime || currentTime;

    return(
      <>
        <Slider
          ref={input => {
            this.slider = input;
          }}
          label="video progress bar"
          className={'video-react-progress-holder'}
          valuenow={(this.getPercent() * 100).toFixed(2)}
          valuetext={formatTime(time, duration)}
          onMouseDown={this.handleMouseDown}
          onMouseMove={this.handleMouseMove}
          onMouseUp={this.handleMouseUp}
          getPercent={this.getPercent}
          stepForward={this.stepForward}
          stepBack={this.stepBack}
        >
          <LoadProgressBar
            buffered={buffered}
            currentTime={time}
            duration={duration}
          />
          <MouseTimeDisplay duration={duration} mouseTime={mouseTime} />
          <PlayProgressBar currentTime={time} duration={duration} />
       </Slider>
      </>
    );
  }
}

export default SeekBar;
