import React from 'react';

import { Link } from 'react-router-dom';

import { connect } from 'react-redux';
import { registerUser } from '../../../Actions/PostActions';

class Register extends React.Component {
	constructor() {
		super()
		this.state = {
			firstName: '',
			lastName: '',
			email: '',
			password: '',
			warning: '',
			route: false,
			firstNameValid: false,
			lastNameValid: false,
			emailValid: false,
			passwordValid: false,
		}
	}
	firstName = (e) => {
		this.setState({firstName: e.target.value});
		this.runTest();

		setTimeout(() => {
			const string = this.state.firstName;
			var matches = string.match(/\d+/g);
			if(matches != null) {
				this.setState({firstNameValid: false});
			} else {
				this.setState({firstNameValid: true});
			}
			
			let attack = false;
			for(let i = 0; i < string.length; i++){
				if(string.charAt(i) === ';'){
					attack = true;
				}
			}
			if(attack === true){
				this.setState({firstNameValid: false});
			}
			attack = false;
		}, 20);
	}
	lastName = (e) => {
		this.setState({lastName: e.target.value});
		this.runTest();

		setTimeout(() => {
			const string = this.state.lastName;
			var matches = string.match(/\d+/g);
			if(matches != null) {
				this.setState({lastNameValid: false});
			} else {
				this.setState({lastNameValid: true});
			}

			let attack = false;
			for(let i = 0; i < string.length; i++){
				if(string.charAt(i) === ';'){
					attack = true;
				}
			}
			if(attack === true){
				console.log('')
				this.setState({lastNameValid: false});
			}
			attack = false;
		}, 20);
	}
	email = (e) => {
		this.setState({email: e.target.value});
		this.runTest();

		
		setTimeout(() => {
			const string = this.state.email;
			const substring = '@';
			if(string.includes(substring)) {
				this.setState({emailValid: true});
			} else {
				this.setState({emailValid: false});
			}

			let attack = false;
			for(let i = 0; i < string.length; i++){
				if(string.charAt(i) === ';'){
					attack = true;
				}
			}
			if(attack === true){
				this.setState({emailNameValid: false});
			}
			attack = false;
		}, 20);
	}
	password = (e) => {
		this.setState({password: e.target.value});
		this.runTest();
		setTimeout(() => {
			const string = this.state.email;

			let attack = false;
			for(let i = 0; i < string.length; i++){
				if(string.charAt(i) === ';'){
					attack = true;
				}
			}
			if(attack === true){
				this.setState({passwordValid: false});
			} else {
				this.setState({passwordValid: true});
			}
			attack = false;
		}, 20);
	}
	runTest = () => {
		setTimeout(() => {
			if(this.state.email === '' || this.state.password === '' || this.state.firstName === '' || this.state.lastName === '') {
				this.setState({route: false});
			} else {
				if(this.state.emailValid === true && this.state.firstNameValid === true && this.state.lastNameValid === true && this.state.passwordValid === true){
					this.setState({warning: ''});
					this.setState({route: true});
				} else{
					this.setState({route: false})
					// this.setState({warning: `Please enter valid information`});
				}
					
			}
			
		}, 10)
	}
	next = () => {
		if(this.state.email === '' || this.state.password === '' || this.state.firstName === '' || this.state.lastName === '') {
			this.setState({warning: 'Please fill in all fields'})			
		} else {
			if(this.state.emailValid === true && this.state.firstNameValid === true && this.state.lastNameValid === true && this.state.passwordValid === true){
				} else{
					this.setState({warning: `Please enter valid information`});
				}
		}
	}
	submitInfo = () => {
		this.props.registerUser({
			firstname: this.state.firstName,
			surname: this.state.lastName,
			email: this.state.email
		})
		fetch('http://localhost:3000/register', {
					method: 'post',
					headers: {'Content-Type': 'application/json'},
					body: JSON.stringify({
						firstName: this.state.firstName,
						lastName: this.state.lastName,
						email: this.state.email,
						password: this.state.password,
						// profilepic: 'pp1'
					})
				})
				.then(response => response.json())
				.then(data => {
					console.log(data)
				})
	}
	render() {
		if(this.state.route === false){
			return(
				<div className='centerPage'>
					<div className='signinBox'>
						<div className='heading2'>Register</div>
						<div className='spacer30'></div>
						<div>
							<div className='greyText'>First Name</div>
							<input onChange={this.firstName} className='inputBox'></input>
						</div>
						<div>
							<div className='greyText'>Last Name</div>
							<input onChange={this.lastName} className='inputBox'></input>
						</div>
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
							<button onClick={this.next} className='SigninButton buttonBlue'>next</button>
						</div>
						<div className='warning'>{this.state.warning}</div>
					</div>
				</div>
			)
		} else {
			return(
				<div className='centerPage'>
					<div className='signinBox'>
						<div className='heading2'>Register</div>
						<div className='spacer30'></div>
						<div>
							<div className='greyText'>First Name</div>
							<input onChange={this.firstName} className='inputBox'></input>
						</div>
						<div>
							<div className='greyText'>Last Name</div>
							<input onChange={this.lastName} className='inputBox'></input>
						</div>
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
							<Link to='/register2'>
								<button className='SigninButton buttonBlue' onClick={this.submitInfo}>next</button>
							</Link>
						</div>
						<div className='warning'>{this.state.warning}</div>
					</div>
				</div>
			)
		}
		
	}
}

const mapStateToProps = state => ({
  registeredUser: state.posts.registeredUser
})

export default connect(mapStateToProps, { registerUser })(Register);

// <Link to='/user'>
