import React from 'react';
import {connect} from 'react-redux';
import {browserHistory} from 'react-router';
import validateInput from '../validations/signup_validation';
import TextFieldGroup from './text_field_group';
import { userSignup } from '../../actions/auth_actions';

class SignUpForm extends React.Component {
		constructor(props) {
		super(props);
		this.state = { 
			email : '',
			password : '',
			passwordConfirm : '',
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
			this.props.userSignup(this.state).then(
				(res) => browserHistory.push('/dashboard'),
				(err) => this.setState({errors: err.response.data.errors, isLoading: false})
				);
		}
	}
	render(){
		const {email, password, passwordConfirm, errors, isLoading} = this.state;

		return(
			<div className="signup-box">
              <div className="login-title">Sign Up for LikeVault</div>
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
              <div className="login-input">
                
                <TextFieldGroup
		                	field="passwordConfirm"
		                	label="Confirm Password"
		                	type="password"
		                	value={passwordConfirm}
		                	error={errors.passwordConfirm}
		                	onChange={this.onChange}
		                />
		                {errors.form && <div className=" alert-danger">{errors.form}</div>}
              </div>
              <div onClick={this.onSubmit} className="login-btn blue-purple-bg">Sign Up</div>
            </div>
			);
	}
}
export default connect((state) => {return {} }, { userSignup })(SignUpForm);;