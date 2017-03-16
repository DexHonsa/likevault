import React from 'react';
import {Line} from 'react-chartjs-2';
import PointCounter from './point_counter';
import BuyMorePoints from './buy_more_points';

class Dashboard extends React.Component {
  render(){
    var data = {
        labels: ["March 4", "March 5", "March 6", "March 7", "March 8", "Yesterday", "Today"],
        datasets: [{
          label: 'Views',
          data: [ 500, 300, 302, 100, 67, 43, 723],
          backgroundColor: 'rgba(46,109,255,0.10)',
          borderColor: 'rgba(47,155,255,1.00)',
          pointBorderWidth:1,
          pointRadius:3,
          pointBackgroundColor:'rgba(47,155,255,1.00)',
          borderWidth: 3,
          pointHoverRadius:7,
          pointHitRadius: 15
        }]
      };
    return(
      <div>
        <div className="container stage">
        <div className="top-panel">
        </div>
        <div className="graph-panel" style={{padding: '15px 0px'}}>
          <Line
            data={data}
            width={100}
            height={200}
            options={{
                maintainAspectRatio: false,
                legend: {
                  display: false
                }
            }}
           />
          
        </div>
        <div className="dashboard-container">
          <div className="left-stage ">
            <div className="activity-panel">
              <div className="panel" style={{padding: 0}}>
                <div className="main-title">Recent Activity</div>
                <div className="activity-item">
                  <div className="activity-item-img twitter" />
                  <div className="activity-item-name"><span style={{color: '#469df5'}}>IlikeCats</span> Liked your video on Twitter!</div>
                  <div className="activity-item-time">2m ago</div>
                </div>
                <div className="activity-item">
                  <div className="activity-item-img" />
                  <div className="activity-item-name"><span style={{color: '#469df5'}}>IlikeCats</span> Liked your video on Soundcloud!</div>
                  <div className="activity-item-time">2m ago</div>
                </div>
                <div className="activity-item">
                  <div className="activity-item-img twitter" />
                  <div className="activity-item-name"><span style={{color: '#469df5'}}>IlikeCats</span> Liked your video on Twitter!</div>
                  <div className="activity-item-time">2m ago</div>
                </div>
                <div className="activity-item">
                  <div className="activity-item-img twitter" />
                  <div className="activity-item-name"><span style={{color: '#469df5'}}>IlikeCats</span> Liked your video on Twitter!</div>
                  <div className="activity-item-time">2m ago</div>
                </div>
                <div className="activity-item">
                  <div className="activity-item-img" />
                  <div className="activity-item-name"><span style={{color: '#469df5'}}>IlikeCats</span> Liked your video on Soundcloud!</div>
                  <div className="activity-item-time">2m ago</div>
                </div>
                <div className="activity-item">
                  <div className="activity-item-img twitter" />
                  <div className="activity-item-name"><span style={{color: '#469df5'}}>IlikeCats</span> Liked your video on Twitter!</div>
                  <div className="activity-item-time">2m ago</div>
                </div>
                <div className="activity-item">
                  <div className="activity-item-img" />
                  <div className="activity-item-name"><span style={{color: '#469df5'}}>IlikeCats</span> Liked your video on Soundcloud!</div>
                  <div className="activity-item-time">2m ago</div>
                </div>
                <div className="activity-item">
                  <div className="activity-item-img twitter" />
                  <div className="activity-item-name"><span style={{color: '#469df5'}}>IlikeCats</span> Liked your video on Twitter!</div>
                  <div className="activity-item-time">2m ago</div>
                </div>
                <div className="activity-item">
                  <div className="activity-item-img" />
                  <div className="activity-item-name"><span style={{color: '#469df5'}}>IlikeCats</span> Liked your video on Soundcloud!</div>
                  <div className="activity-item-time">2m ago</div>
                </div>
                <div className="activity-item">
                  <div className="activity-item-img" />
                  <div className="activity-item-name"><span style={{color: '#469df5'}}>IlikeCats</span> Liked your video on Soundcloud!</div>
                  <div className="activity-item-time">2m ago</div>
                </div>
                <div className="activity-item">
                  <div className="activity-item-img" />
                  <div className="activity-item-name"><span style={{color: '#469df5'}}>IlikeCats</span> Liked your video on Soundcloud!</div>
                  <div className="activity-item-time">2m ago</div>
                </div>
                <div className="activity-item">
                  <div className="activity-item-img" />
                  <div className="activity-item-name"><span style={{color: '#469df5'}}>IlikeCats</span> Liked your video on Soundcloud!</div>
                  <div className="activity-item-time">2m ago</div>
                </div>
              </div>
            </div>
          </div>
          <div className="right-stage">
            <PointCounter />
            <BuyMorePoints />
          </div>
        </div>
      </div>

      </div>
      );
  }
}
export default Dashboard;