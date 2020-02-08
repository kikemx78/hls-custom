import React, { Component } from 'react';

class QualityController extends Component {

  constructor(props) {
    super(props);
    this.state = {};
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
              <div className="quality-controller-content-box" style={{padding: '1rem', overflow: 'auto'}}>

                <div>
                  <div className="quality-controller-content-box-title">
                    Video Quality <span onClick={() => toggleQualityController()}>[x]</span>
                  </div>
                  <div className="quality-controller-content-box-border"></div>
                  
                  {/* item container */}
                  {

                    levels &&
                    levels.map((level, i) => 
                      <div key={i} className="quality-controller-content-box-item-container">
                        <div className="quality-controller-content-box-item">
                          <div className="quality-controller-content-box-item-inner">
                            <div className="quality-controller-content-box-item-inner-option">
                              <input type="radio" checked onChange={() => ''}/>
                              <label className="quality-controller-content-box-item-inner-label">
                                <div style={{cursor: 'pointer', padding: '10px', border: currentLevel !== i ? '0.5px solid #fff' : '', background: currentLevel === i ? 'green' : '', maxWidth: '50px', margin: 'auto', borderRadius: '3px'}} onClick={() => setLevel(i)}>{level.height}</div>
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
