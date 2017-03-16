import React from 'react';
import twitterImg from '../../../images/twitter-icon.png';


import {connect} from 'react-redux';
import axios from 'axios';


class TwitterPopup extends React.Component{
	constructor(props) {
		super(props);
		this.state = {
			screenname : ''
			
			
		}
		
	}
	onChange(e){
		this.setState({
			screenname: e.target.value
		})
	}
	getTwitter(){
		var twitterAccount;
		var that = this;
		axios.get('/api/twitter/' + this.state.screenname ).then(function(res){
			var tweets = res.data.tweets[0];
			twitterAccount = {"userId" : that.props.auth.user.id, "name" : tweets.name, "thumbnail" : tweets.profile_image_url, "screenname" : tweets.screen_name}
			axios.post('/api/twitter/', twitterAccount).then(function(res){
				that.props.hidePopup();
				console.log(res);
			})
		})

	}
	
	

	render() {

		return(
			<div className="popup animated fadeIn">
		        <div className="overlay">
		          <div className="link-account-modal animated fadeInUp">
		            <div className="modal-top"><img src={twitterImg} alt />Link Twitter Account <i onClick={this.props.hidePopup} className="fa fa-close" /></div>
		            <div className="enter-url">
		              <div className="youtube-url-title">Enter in a Twitter Screename</div>
		              <div className="youtube-url"><input onChange={this.onChange.bind(this)} type="text" /></div>
		              <div onClick={this.getTwitter.bind(this)} className="link-video-btn blue-purple-bg">Link</div>
		              
		            </div>
		          </div>
		        </div>
		      </div>


			);
	}
}

function mapStateToProps(state){
  return {
    auth: state.auth
  };
}
export default connect(mapStateToProps)(TwitterPopup);