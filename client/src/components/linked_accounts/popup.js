import React from 'react';
import youtubeImg from '../../../images/YouTube-icon-full_color.png';
import YTSearch from 'youtube-api-search';
const API_KEY = "AIzaSyBXkG_joIB9yjAP94-L6S-GLTWnj7hYmzs";
import {connect} from 'react-redux';
import axios from 'axios';


class Popup extends React.Component{
	constructor(props) {
		super(props);
		this.state = {
			url: "",
			videos : [],
			thumbnail: "",
			title: ""
		}
		
	}
	onChange(e){
		e.preventDefault();
		this.setState({
			url: e.target.value
		})
	}
	getVideos() {
		
		var url = this.state.url;
		var array = url.split('=');
		var vidId = array[1];
		var userId = this.props.auth.user.id;
		var title;
		var thumbnail;
		var that = this;
		
		YTSearch({key: API_KEY, term: vidId}, videos => {
			this.setState({videos});
			
			title = this.state.videos[0].snippet.title;

			thumbnail = this.state.videos[0].snippet.thumbnails.default.url;
			this.setState({
				title : title,
				thumbnail: thumbnail
			})
			var data = {"url" : this.state.url, "title" : this.state.title, "userId" : this.props.auth.user.id, "thumbnail" : this.state.thumbnail, "subscriberPoints" : 0, "likePoints" : 0, "viewPoints":0, "liked" : []}
			axios.post('/api/addyoutube', data).then(res => {
				that.props.hidePopup();
				
			})

		})
		
	}

	render() {

		return(
			<div className="popup animated fadeIn">
		        <div className="overlay">
		          <div className="link-account-modal animated fadeInUp">
		            <div className="modal-top"><img src={youtubeImg} alt />Link Youtube Video <i onClick={this.props.hidePopup} className="fa fa-close" /></div>
		            <div className="enter-url">
		              <div className="youtube-url-title">Enter in a Youtube Url</div>
		              <div className="youtube-url"><input onChange={this.onChange.bind(this)} type="text" /></div>
		              <div onClick={this.getVideos.bind(this)} className="link-video-btn blue-purple-bg">Link</div>
		              
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
export default connect(mapStateToProps)(Popup);