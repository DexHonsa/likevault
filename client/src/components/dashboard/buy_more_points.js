import React from 'react';

class BuyMorePoints extends React.Component {
	render(){
		return(
			<div className style={{padding: 2, margin: 15}}>
              <div className="panel buy-points-ad">
                <div>
                  <div className="buy-points-title">Need More Points?<br /><span style={{fontSize: '10pt', display: 'inline-block', lineHeight: '12pt', fontWeight: 400}}>Buying points makes you gain followers, likes, and views, quicker.</span></div>
                  <div className="buy-points-btn blue-purple-bg">Buy Points</div>
                </div>
              </div>
            </div>
			);
	}
}
export default BuyMorePoints;