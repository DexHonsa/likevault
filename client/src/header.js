import React from 'react';
import logo from '../images/LikeVault.png';
import {Link} from 'react-router';
import {connect} from 'react-redux';
import { logout } from './actions/auth_actions';

class Header extends React.Component {
	logout(e){
		e.preventDefault();
		this.props.logout();
	}
	render(){
		const { isAuthenticated } = this.props.auth;
		

		var loggedInDetails;
		if(isAuthenticated){
			loggedInDetails = <div className="container top-bar">
			          <div className="logo"><img src={logo} /></div>
			          <div className="navigation-tabs">
			            <Link to="/dashboard" className="nav-tab" activeClassName="active">
			                Dashboard
			              </Link>
			            <Link to="/earnpoints" className="nav-tab" activeClassName="active">
			                Earn Points
			              </Link>
			           <Link to="/linkedaccounts" className="nav-tab" activeClassName="active">
			                Linked Accounts
			              </Link>
			          </div>
			         
			          <div className="user">
			            <div className="user-img" />
			            <div className="user-name">{this.props.auth.user.email}</div>
			            <i className="fa fa-chevron-down" />
			          </div>
			          <div className="messages">
			            <span style={{color: '#49CB78'}}>Points:</span> <strong>0</strong>
			          </div>
			          <div className="messages">
			            <i className="fa fa-envelope" />
			          </div>
			          <div className="messages">
			            <div onClick={this.logout.bind(this)}>Logout</div>
			          </div>
			        </div>
		}else{
			loggedInDetails = null
		}
		return(
			<div>
				<header>
			        {loggedInDetails}
			      </header>

			</div>
			);
	}
}

function mapStateToProps(state){
  return {
    auth: state.auth
  };
}
export default connect(mapStateToProps, { logout })(Header);