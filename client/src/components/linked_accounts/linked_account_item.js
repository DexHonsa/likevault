import React from 'react';
import Select from 'react-select';
import axios from 'axios';

import 'react-select/dist/react-select.css';

class LinkedAccountItem extends React.Component {
      constructor(props) {
            super(props);
            this.state = {
                  subscriberPoints : 0,
                  likePoints : 0,
                  viewPoints : 0,
                  changed : false
                  
            }
            
      }
      setYoutubePoints(vidId){
            var points = {id : vidId, subscriberPoints : this.state.subscriberPoints, likePoints : this.state.likePoints, viewPoints : this.state.viewPoints};
            //console.log(points);
            var that = this;
            axios.put('/api/getyoutube/', points).then(function(res){
                  console.log(res);
                  that.setState({
                        changed : false
                  })
            })
      }
      componentDidMount() {
            var that = this;
            axios.get('/api/getyoutubevideo/' + that.props.vidId).then(function(res){
                  console.log(res);
                  that.setState({
                        subscriberPoints : res.data.YoutubeVideo[0].subscriberPoints,
                        likePoints : res.data.YoutubeVideo[0].likePoints,
                        viewPoints : res.data.YoutubeVideo[0].viewPoints,

                  })
            })
      }
      subscriberChange(val) {
          this.setState({
            subscriberPoints : val.value,
            changed : true
          })
      }
      likeChange(val) {
          this.setState({
            likePoints : val.value,
            changed : true
          })
      }
      viewChange(val) {
          this.setState({
            viewPoints : val.value,
            changed : true
          })
      }

      

	render(){
            var options = [
                { value: 2, label: '2 Points' },
                { value: 3, label: '3 Points' },
                { value: 4, label: '4 Points' },
                { value: 5, label: '5 Points' },
                { value: 6, label: '6 Points' },
                { value: 7, label: '7 Points' },
                { value: 8, label: '8 Points' },
                { value: 9, label: '9 Points' }
            ];
            var saveBtn;

            if(this.state.changed){
                  saveBtn = <div onClick={() => this.setYoutubePoints(this.props.vidId)} className="linked-item-remove-btn blue-purple-bg">OK</div>
            }else{

            }
		return(
			<div className="linked-item animated fadeIn" style={{zIndex: this.props.zIndex}}>
                <div className="linked-item-top">
                  <div className="linked-item-img" style={{backgroundImage : 'url('+this.props.thumbnail+')'}} />
                  <div className="linked-item-title">{this.props.title}</div>
                  <div style={{marginLeft: 'auto'}}>
                  {saveBtn}
                  <div onClick={() => this.props.deleteVideo(this.props.vidId)} className="linked-item-remove-btn">remove</div>
                  </div>
                </div>
                <div className="linked-item-weight-container">
                  <div className="linked-weight"><i className="fa fa-user-circle-o" /><br />Subscribers<br />
                  <Select
                      className="my-selector"
                      name="Subscribers"
                      value={this.state.subscriberPoints}
                      options={options}
                      clearable={false}
                      onChange={this.subscriberChange.bind(this)}
                  />
                  </div>
                  <div className="linked-weight"><i className="fa fa-thumbs-o-up" /><br />Likes<br />
                  <Select
                      className="my-selector"
                      name="Subscribers"
                      value={this.state.likePoints}
                      options={options}
                      clearable={false}
                      onChange={this.likeChange.bind(this)}
                  /></div>
                  <div className="linked-weight"><i className="fa fa-eye" /><br />Views<br />
                  <Select
                      className="my-selector"
                      name="Subscribers"
                      value={this.state.viewPoints}
                      options={options}
                      clearable={false}
                      onChange={this.viewChange.bind(this)}
                  /></div>
                  {/*<div className="linked-weight"><i className="fa fa-retweet" /><br />Reposts<br /><select>
                  <Select
                      className="my-selector"
                      name="Subscribers"
                      value={this.state.selectValue}
                      options={options}
                      clearable={false}
                      onChange={this.logChange.bind(this)}
                  /></div>*/}
                </div>
              </div>
			);
	}
}
export default LinkedAccountItem;