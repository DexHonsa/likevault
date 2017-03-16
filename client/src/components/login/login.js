import React from 'react';
import logo from '../../../images/big_logo.png';
import $ from 'jquery';
import {browserHistory} from 'react-router';
import TextFieldGroup from './text_field_group';
import axios from 'axios';

import {connect} from 'react-redux';
import { userLogin } from '../../actions/auth_actions';

import SignInForm from './signin_form';
import SignUpForm from './signup_form';

class Login extends React.Component {
		constructor(props) {
		super(props);
		this.state = { 
			username : '',
			password : '',
			errors : {}, 
			isLoading : ''
		}

		
	}
	componentDidMount() {
		if(this.props.auth.isAuthenticated){
			browserHistory.push('/dashboard')
		}else{

		}
	}
	
	render(){
		
		return(
			<div className="main-login">
        <div className="main-logo"><img src={logo} alt /></div>
        <div className="login-container">
          <div className="login-box">
            <SignInForm />
            <br />
            <SignUpForm />
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

export default connect(mapStateToProps, {userLogin})(Login);