import * as React from 'react';

class QualityController extends React.Component<any, any> {

  constructor(props: any) {
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
      handleSetLevel,  
      toggleQualityController
    } = this.props;

    return(
      <div className="quality-controller-outer">
        <div className="quality-controller">
          <div className="quality-controller-container">
            <div className="quality-controller-content">
              <div className="quality-controller-content-box" style={{padding: '1rem', overflow: 'auto', fontFamily: 'Roboto', textAlign: 'start'}}>

                <div>
                  <div className="quality-controller-content-box-title">
                    Video Quality <span onClick={() => toggleQualityController()}>[x]</span>
                  </div>
                  <div className="quality-controller-content-box-border"></div>
                  
                  <div className="quality-controller-content-box-item-container" onClick={() => handleSetLevel(null)}>
                    <div className="quality-controller-content-box-item">
                      <div className="quality-controller-content-box-item-inner">
                        <div className="quality-controller-content-box-item-inner-option">
                          <input type="radio" checked={setLevel === null} onChange={() => ''}/>
                          <label className="quality-controller-content-box-item-inner-label">
                            <div>AUTO</div>
                          </label>
                        </div>

                      </div>
                    </div>
                  </div>

                  {/* item container */}
                  {

                    levels &&
                    levels.map((level: any, i: any) =>
                      <div key={i} className="quality-controller-content-box-item-container" onClick={() =>  handleSetLevel(i)}>
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
