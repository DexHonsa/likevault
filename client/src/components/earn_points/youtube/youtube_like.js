import React from 'react';
import axios from 'axios';
import {connect} from 'react-redux'

class YoutubeLike extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      img : '',
      title : '',
      id: '',
      points: '',
      url: ''
    }
  }
  componentDidMount() {
    this.getVideo();
    }
    getVideo(){
      var that = this;
      axios.get('/api/getrandomvideo/' + this.props.auth.user.id).then(function(res){
        that.setState({
          img : res.data.YoutubeVideo[0].thumbnail,
          title : res.data.YoutubeVideo[0].title,
          id: res.data.YoutubeVideo[0].id,
          points: res.data.YoutubeVideo[0].likePoints,
          url : res.data.YoutubeVideo[0].url
        })
      })
    }
    likeVideo(){
      var that = this;
      var newUrl = this.state.url.split('=');

      var new_window = window.open("http://localhost:3000/youtubeIframe/" + newUrl[1]);
      new_window.onbeforeunload = function(){
        var data = {"vidId" : this.state.id, "userId" : this.props.auth.user.id};

      axios.put('/api/addUserLikedVideo/', data).then(function(res){
        console.log(res);
        that.getVideo();
      })
      }
      
      
    }
	render(){

    

		return(
			<div>
				<div className="earn-points-item">
                  <div className="earn-points-img" style={{backgroundImage: 'url('+this.state.img+')'}} />
                  <div className="earn-points-title">Like <span style={{color: '#469df5'}}>{this.state.title}</span> on Youtube<br /><span style={{fontSize: '10pt', color: '#808080'}}>Points: <span style={{color: '#fff'}}>{this.state.points}</span></span></div>
                  <div onClick={this.likeVideo.bind(this)} className="earn-points-btn blue-purple-bg">Like Now</div>
                </div>
                <div className="next-desc">
                  Complete the above item in order to move on to the next item. Or <span style={{color: '#469df5'}}>skip</span>
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
export default connect(mapStateToProps)(YoutubeLike);