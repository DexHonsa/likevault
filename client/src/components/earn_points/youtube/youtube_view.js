import React from 'react';

class YoutubeView extends React.Component {
	render(){
		return(
			<div>
				<div className="earn-points-item">
                  <div className="earn-points-img" />
                  <div className="earn-points-title">View <span style={{color: '#469df5'}}>IlikeCats</span> video on Youtube<br /><span style={{fontSize: '10pt', color: '#808080'}}>Points: <span style={{color: '#fff'}}>10</span></span></div>
                  <div className="earn-points-btn blue-purple-bg">Watch Now</div>
                </div>
                <div className="next-desc">
                  Complete the above item in order to move on to the next item. Or <span style={{color: '#469df5'}}>skip</span>
                </div>
          	</div>
			);
	}
}
export default YoutubeView;