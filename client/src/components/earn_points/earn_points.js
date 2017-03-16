import React from 'react';
import soundcloudImg from '../../../images/soundcloudn-icon.png';
import twitterImg from '../../../images/twitter-icon2.png';
import youtubeImg from '../../../images/youtube-icon.png';
import banner from '../../../images/earn_points_banner.png';
import PointCounter from '../dashboard/point_counter';
import BuyMorePoints from '../dashboard/buy_more_points';
import EarnPointsSelector from './earn_points_selector';

class EarnPoints extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      stage : ''
    }
  }
  selectType(type){
    if(type == "youtube"){
        this.setState({
          stage : 'youtube'
        })
        
    }
  }
	render(){
      var stage = <div id="tile-selector">
                <div className="main-title">Select a Site</div>
                <div className="site-tile-container">
                  <div onClick={() => this.selectType("twitter")} className="site-tile">
                    <div className="site-icon"><img src={twitterImg} alt /></div>
                    <div className="site-title">Twitter</div>
                  </div>
                  <div onClick={() => this.selectType("youtube")} className="site-tile">
                    <div className="site-icon"><img src={youtubeImg} alt /></div>
                    <div className="site-title">Youtube</div>
                  </div>
                  <div onClick={() => this.selectType("soundcloud")} id="soundcloud" className="site-tile">
                    <div className="site-icon"><img src={soundcloudImg} alt /></div>
                    <div className="site-title">Soundcloud</div>
                  </div>
                </div>
              </div>;

      if(this.state.stage == 'youtube'){
          stage =  <EarnPointsSelector />;
         
      }
		return(

      

			<div className="container stage ">
        <div className="top-panel" style={{backgroundImage: 'url('+banner+')'}}>
        </div>
        <div className="dashboard-container">
          <div className="left-stage ">
            <div className="panel" style={{padding: 0}}>
              {stage}
              
            </div>
          </div>
          <div className="right-stage">
            <PointCounter />
            <BuyMorePoints />
          </div>
        </div>
      </div>

			);
	}
}
export default EarnPoints;