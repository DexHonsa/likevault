import React from 'react';
import oxiloImg from '../../../images/oxilo.jpg';
import banner from '../../../images/linked_accounts_banner.png';
import soundcloudImg from '../../../images/soundcloudn-icon.png';
import twitterImg from '../../../images/twitter-icon2.png';
import youtubeImg from '../../../images/youtube-icon.png';
import PointCounter from '../dashboard/point_counter';
import BuyMorePoints from '../dashboard/buy_more_points';
import {connect} from 'react-redux';
import axios from 'axios';
import Popup from './popup';
import TwitterPopup from './twitter_popup';
import LinkedAccountItem from './linked_account_item';
import LinkedAccountPanel from './linked_account_panel';

class LinkedAccounts extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      twitterPopup:false,
      soundcloudPopup: false,
      youtubePopup: false,
      youtubeVideos : [],
      twitterAccount: []
    }
  }
  componentDidMount() {
    this.getVideos();
    this.getTwitterAccount();
  }

  getVideos(){
    var that = this;
    axios.get('/api/getyoutube/' + this.props.auth.user.id ).then(function(res){
      
      that.setState({youtubeVideos: res.data.YoutubeVideo});
      
    })
  }
  getTwitterAccount(){
    var that = this;
    axios.get('/api/gettwitter/' + this.props.auth.user.id ).then(function(res){
      that.setState({twitterAccount: res.data.TwitterAccount});
      console.log(that.state.twitterAccount);
    })
  }
  removeAccount(accountId){
    var that = this;
    axios.delete('/api/deleteaccount/' + accountId ).then(function(res){
      that.getTwitterAccount();
    })
  }
  deleteVideo(vidId){
    var that = this;
    axios.delete('/api/getyoutube/' + vidId ).then(function(res){
      that.getVideos();
    })
  }
  showPopup(account){
    var newAccount = account + 'Popup';
    var showPopup = {};
    showPopup[newAccount] = true;
    console.log(showPopup);
    this.setState(showPopup)
  }
 
  hidePopup(){
    this.setState({youtubePopup: false,twitterPopup:false,soundcloudPopup:false})
    this.getVideos();
    this.getTwitterAccount();
  }
	render(){
    var popup;
    var twitterAccountPanel;
    var youtubeAccountPanel = <LinkedAccountPanel showPopup={this.showPopup.bind(this)} account="youtube"  />
    var soundcloudAccountPanel = <LinkedAccountPanel showPopup={this.showPopup.bind(this)} account="soundcloud"  />

    if(this.state.youtubePopup){
      popup = <Popup hidePopup={this.hidePopup.bind(this)} />
    }
    
    if(this.state.twitterPopup){
      popup = <TwitterPopup hidePopup={this.hidePopup.bind(this)} />
    }
    if(this.state.twitterAccount.length > 0){
      twitterAccountPanel = <LinkedAccountPanel isLinked={true} accountId={this.state.twitterAccount[0].id} showPopup={this.showPopup.bind(this)} removeAccount={this.removeAccount.bind(this)} account="twitter" name={this.state.twitterAccount[0].name} img={this.state.twitterAccount[0].thumbnail} screenname={this.state.twitterAccount[0].screenname}  />
    }else{
      twitterAccountPanel = <LinkedAccountPanel showPopup={this.showPopup.bind(this)} account="twitter"  />
    }
		return(
			<div className="container stage ">
      {popup}
        <div className="top-panel" style={{backgroundImage: 'url('+banner+')'}}>
        </div>
        <div className="dashboard-container">
          <div className="left-stage animated fadeIn">
            <div id="all-accounts" className="panel" style={{padding: 0}}>
              <div className="main-title">Your Linked Accounts</div>
              {soundcloudAccountPanel}
              {youtubeAccountPanel}
              {twitterAccountPanel}
            </div>
            <div className="panel" style={{padding: 0}}>
              <div className="main-title"><img style={{width: 40, marginRight: 10}} src={youtubeImg} alt />Youtube Videos</div>
              {/*<div class="nothing-linked">No Linked Soundcloud Songs<br><div class="add-account-item-btn"><i class="fa fa-plus"></i> Add Song</div></div>*/}
              {this.state.youtubeVideos.map(function(data, i){
                return <LinkedAccountItem zIndex={100 - i} key={data.id} title={data.title} url={data.url} thumbnail={data.thumbnail} vidId={data.id} deleteVideo={this.deleteVideo.bind(this)}  />
              },this)}
              
            </div>
          </div>
          <div className="right-stage">
            <PointCounter />
            <BuyMorePoints/>
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
export default connect(mapStateToProps)(LinkedAccounts);