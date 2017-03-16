import React from 'react';
import {connect} from 'react-redux';
import {browserHistory} from 'react-router';
import validateInput from '../validations/signin_validation';
import TextFieldGroup from './text_field_group';
import { userLogin } from '../../actions/auth_actions';

class SignInForm extends React.Component {
	constructor(props) {
		super(props);
		this.state = { 
			email : '',
			password : '',
			errors : {}, 
			isLoading : ''
		}

		this.onSubmit = this.onSubmit.bind(this);
		this.onChange = this.onChange.bind(this);
	}

	isValid(){
		const { errors, isValid } = validateInput(this.state);
		if(!isValid){
			this.setState({
				errors : errors
			})
		}
		return isValid;
	}
	onChange(e){
		this.setState({
			[e.target.name] : e.target.value
		})
	}
	onSubmit(e){
		if(this.isValid()){
			var data = this.state;
			var that = this;
			
			e.preventDefault();
			this.setState({errors: {}, isLoading: true});
			this.props.userLogin(this.state).then(
				(res) => browserHistory.push('/dashboard'),
				(err) => this.setState({errors: err.response.data.errors, isLoading: false})
				);
		}
	}
	render(){
		const {email, password, errors, isLoading} = this.state;
		return(
			<div className="signin-box">
              <div className="login-title">Sign in to LikeVault</div>
              <div className="login-input">
                
                <TextFieldGroup
		                	field="email"
		                	label="email"
		                	type="text"
		                	value={email}
		                	error={errors.email}
		                	onChange={this.onChange}
		                />
              </div>
              <div className="login-input">
                
                <TextFieldGroup
		                	field="password"
		                	label="password"
		                	type="password"
		                	value={password}
		                	error={errors.password}
		                	onChange={this.onChange}
		                />
              </div>
              {errors.form && <div className=" alert-danger">{errors.form}</div>}
              <div className="forgot-password">forgot password?</div>
              <div onClick={this.onSubmit} className="login-btn blue-purple-bg">Sign In</div>
            </div>
			);
	}
}
export default connect((state) => {return {} }, { userLogin })(SignInForm);