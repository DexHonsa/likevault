import React from 'react';

class PointCounter extends React.Component {
	render(){
		return(
			<div className="color-border blue-purple-bg">
              <div className="panel" style={{padding: 0}}>
                <div className="point-board">
                  <div className="point-item">
                    <div className="point-title">Points Earned Today</div>
                    <div className="point-value">12,000</div>
                  </div>
                  <div className="point-item">
                    <div className="point-title">Points Earned This Week</div>
                    <div className="point-value">12,000</div>
                  </div>
                  <div className="point-item">
                    <div className="point-title">Total Points Earned</div>
                    <div className="point-value">122,000</div>
                  </div>
                </div>
              </div>
            </div>
			);
	}
}
export default PointCounter;