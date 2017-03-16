import React from 'react';
import soundcloudImg from '../../../images/soundcloudn-icon.png';
import twitterImg from '../../../images/twitter-icon2.png';
import youtubeImg from '../../../images/youtube-icon.png';
import YoutubeSubscribe from './youtube/youtube_subscribe';
import YoutubeLike from './youtube/youtube_like';
import YoutubeView from './youtube/youtube_view';

class EarnPointsSelector extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			type : ''
		}
	}
setType(type){
	if(type == "subscribe"){
		this.setState({
			type: 'subscribe'
		})
	}
	if(type == "like"){
		this.setState({
			type: 'like'
		})
	}
	if(type == "view"){
		this.setState({
			type: 'view'
		})
	}
}

	render() {
		var typeSelector = <div className="select-option-container">
                  <div onClick={() => this.setType("subscribe")} id="soundcloud-followers" className="select-type-option">
                    <i className="fa fa-user-o" /><br />Subscribe
                  </div>
                  <div onClick={() => this.setType("like")} className="select-type-option">
                    <i className="fa fa-thumbs-o-up" /><br />Like
                  </div>
                  <div onClick={() => this.setType("view")} className="select-type-option">
                    <i className="fa fa-eye" /><br />View
                  </div>
                  {/*<div className="select-type-option">
                    <i className="fa fa-retweet" /><br />Reposts
                  </div>*/}
                </div>;

		if(this.state.type == 'subscribe'){
				typeSelector = <YoutubeSubscribe />;
		}
		if(this.state.type == 'like'){
				typeSelector = <YoutubeLike />;
		}
		if(this.state.type == 'view'){
				typeSelector = <YoutubeView />;
		}
		return(
			
			<div id="type-selector" className="select-type" >
                <div className="main-title"><img style={{width: 50, marginRight: 10}} src={youtubeImg} alt />Youtube</div>
                {typeSelector}
                </div>
			);
	}
}
export default EarnPointsSelector;