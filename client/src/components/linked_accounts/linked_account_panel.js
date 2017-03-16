import React from 'react';
import soundcloudImg from '../../../images/soundcloudn-icon.png';
import twitterImg from '../../../images/twitter-icon2.png';
import youtubeImg from '../../../images/youtube-icon.png';

class LinkedAccountPanel extends React.Component{
	render() {
		var img;
		var name = this.props.account;
		var screenname = "No Accounts Linked";
		var linkBtn = <div onClick={() => this.props.showPopup(this.props.account)} className="link-account-btn blue-purple-bg">Link Account</div>;
		if(this.props.account == 'youtube'){
			img = youtubeImg;
			screenname = "No Videos Added";
			linkBtn = <div onClick={() => this.props.showPopup(this.props.account)} className="link-account-btn blue-purple-bg">Link Video</div>;
		}
		if(this.props.account == 'twitter'){
			img = twitterImg;
		}
		if(this.props.account == 'soundcloud'){
			img = soundcloudImg;
		}
		if(this.props.img){
			img = this.props.img;
		}
		if(this.props.name){
			name = this.props.name;
		}
		if(this.props.screenname){
			screenname = "@" + this.props.screenname;
		}
		if(this.props.isLinked){
			linkBtn = <div onClick={() => this.props.removeAccount(this.props.accountId)} className="link-account-btn blue-purple-bg">Remove Account</div>
		}
		return(
			<div className="linked-account">
                <div className="linked-account-img"><img style={{width: '100%'}} src={img} alt /></div>
                <div className="linked-account-title">{name}<br /><span style={{color: '#808080', fontSize: '10pt'}}>{screenname}</span></div>
                {linkBtn}
              </div>
			);
	}
}
export default LinkedAccountPanel;