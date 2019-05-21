import React from 'react';

import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { registerUser, forgotPassword } from '../../../Actions/PostActions';

import './signinStyle.css';

class Signin extends React.Component {
	constructor() {
		super()
		this.state = {
			email: '',
			password: '',
			warning: '',
			route: false
		}
	}
	componentWillMount = () => {
		this.setState({email: ''});
		this.setState({password: ''});
		this.setState({warning: ''});
		this.setState({route: false});
	}
	email = (e) => {
		this.setState({email: e.target.value});
		this.runTest();
	}
	password = (e) => {
		this.setState({password: e.target.value});
		this.runTest();
	}
	runTest = () => {

		setTimeout(() => {
			fetch('http://localhost:3000/signin', {
					method: 'post',
					headers: {'Content-Type': 'application/json'},
					body: JSON.stringify({
						email: this.state.email,
						password: this.state.password
					})
				})
				.then(response => response.json())
				.then(data => {
					if(data.email === this.state.email) {
						this.setState({route: true});
						this.props.registerUser(data);
					} else {
						this.setState({route: false});
					}
				})
		}, 1)
			
	}
	login = () => {
		if(this.state.email === '' || this.state.password === '') {
			this.setState({warning: 'Please fill in both fields'})
		} else {
			fetch('http://localhost:3000/signin', {
				method: 'post',
				headers: {'Content-Type': 'application/json'},
				body: JSON.stringify({
					email: this.state.email,
					password: this.state.password
				})
			})
			.then(response => response.json())
			.then(data => {
				if(data === "success") {
					this.setState({route: true});
					this.setState({warning: ''})
					this.props.registerUser(data);
				} else {
					this.setState({warning: 'These are the wrong credentials'})
				}
			})
		}
	}


	forgotPassword = () => {
		this.props.forgotPassword(true);
	}
	render() {
		if(this.state.route === false){
			return(
				<div className='centerPage'>
					<div className='signinBox'>
						<div className='heading2'>Sign-in</div>
						<div className='spacer30'></div>
						<div>
							<div className='greyText'>Email Address</div>
							<input onChange={this.email} className='inputBox'></input>
						</div>
						<div>
							<div className='greyText'>Password</div>
							<input onChange={this.password} type='password' className='inputBox'></input>
						</div>
						<div className='spacer30'></div>
						<div>
							<button onClick={this.login} className='SigninButton buttonBlue'>sign in</button>
						</div>
						<div className='warning'>{this.state.warning}</div>
						<div className='greyText' style={{fontSize: '12px', cursor: 'pointer'}} onClick={this.forgotPassword}>Forgot your password?</div>
					</div>
				</div>
			)
		} else {
			return(
				<div className='centerPage'>
					<div className='signinBox'>
						<div className='heading2'>Sign-in</div>
						<div className='spacer30'></div>
						<div>
							<div className='greyText'>Email Address</div>
							<input onChange={this.email} className='inputBox'></input>
						</div>
						<div>
							<div className='greyText'>Password</div>
							<input onChange={this.password} type='password' className='inputBox'></input>
						</div>
						<div className='spacer30'></div>
						<div>
							<Link to='/user'>
								<button onClick={this.submit} className='SigninButton buttonBlue'>sign in</button>
							</Link>
						</div>
						<div className='warning'>{this.state.warning}</div>
						<div className='greyText' style={{fontSize: '12px', cursor: 'pointer'}} onClick={this.forgotPassword}>Forgot your password?</div>
					</div>
				</div>
			)
		}
		
	}
}
export default connect(null, { registerUser, forgotPassword })(Signin);


