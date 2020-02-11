import React, { Component } from 'react';

class QualityController extends Component {

  constructor(props) {
    super(props);
    this.state = {};

    this.triggerOnChange.bind(this);
  }

  triggerOnChange() {
    console.log('now');
  }

  render() {
    const { 
      levels, 
      setLevel, 
      currentLevel,
      toggleQualityController
  } = this.props;

    return(
      <div className="quality-controller-outer">
        <div className="quality-controller">
          <div className="quality-controller-container">
            <div className="quality-controller-content">
              <div className="quality-controller-content-box" style={{padding: '1rem', overflow: 'auto', fontFamily: 'monospace', textAlign: 'start'}}>

                <div>
                  <div className="quality-controller-content-box-title">
                    Video Quality <span onClick={() => toggleQualityController()}>[x]</span>
                  </div>
                  <div className="quality-controller-content-box-border"></div>
                  
                  {/* item container */}
                  {

                    levels &&
                    levels.map((level, i) => 
                      <div key={i} className="quality-controller-content-box-item-container" onClick={() => setLevel(i)}>
                        <div className="quality-controller-content-box-item">
                          <div className="quality-controller-content-box-item-inner">
                            <div className="quality-controller-content-box-item-inner-option">
                              <input type="radio" checked={currentLevel === i} onChange={() => ''}/>
                              <label className="quality-controller-content-box-item-inner-label">
                                <div>{level.height}</div>
                              </label>
                            </div>
                            
                          </div>
                        </div>
                      </div>
                    )
                  }
                  {/* item container */}

                </div>
                
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

}

export default QualityController;
