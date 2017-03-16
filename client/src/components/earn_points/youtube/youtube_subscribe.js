import React from 'react';

class YoutubeSubscribe extends React.Component {
	render(){
		return(
			<div>
				<div className="earn-points-item">
                  <div className="earn-points-img" />
                  <div className="earn-points-title">Subscribe to  <span style={{color: '#469df5'}}>IlikeCats</span> on Youtube<br /><span style={{fontSize: '10pt', color: '#808080'}}>Points: <span style={{color: '#fff'}}>10</span></span></div>
                  <div className="earn-points-btn blue-purple-bg">Subscribe</div>
                </div>
                <div className="next-desc">
                  Complete the above item in order to move on to the next item. Or <span style={{color: '#469df5'}}>skip</span>
                </div>
          	</div>
			
			);
	}
}
export default YoutubeSubscribe;