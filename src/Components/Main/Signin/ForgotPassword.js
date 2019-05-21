import React from 'react';

class ForgotPassword extends React.Component{
	constructor(){
		super()
		this.state = {
			email: '',
			emailEntered: false,
		}
	}
	componentWillMount = () => {
		setInterval(() => {
			this.checkEmail();
		}, 10);
	}
	email = (e) => {
		this.setState({email: e.target.value});
	}
	checkEmail = () => {
		if(this.state.email === ''){
			this.setState({emailEntered: false});
		} else {
			this.setState({emailEntered: true});
		}
	}

	generatePassword = (length) => {
		var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
		var text = "";

		for (var i = 0; i < length; i++){
			text += possible.charAt(Math.floor(Math.random() * possible.length));
		}

		return text;
	}

	submit = () => {
		var newPassword = this.generatePassword(8);
		var params = {
			'email': this.state.email,
			'password': newPassword
		};
		this.updateDatabase(this.state.email, newPassword);

		var formBody = [];
		for(var property in params){
			var encodedKey = encodeURIComponent(property);
			var encodedValue = encodeURIComponent(params[property]);
			formBody.push(encodedKey + "=" + encodedValue);
		}
		formBody = formBody.join("&");

		fetch(`http://localhost:8080/email`, {
			method: 'post',
			headers: {'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'},
			body: formBody
		})

	}

	updateDatabase = (email, password) => {
		fetch('http://localhost:3000/updatePassword', {
					method: 'post',
					headers: {'Content-Type': 'application/json'},
					body: JSON.stringify({
						email: email,
						password: password
					})
				})
				.then(response => response.json())
				.then(data => {
					console.log(data);
				})
	}
	render(){
		if(this.state.emailEntered === false){
			return(
				<div className='centerPage'>
					<div className='signinBox'>
						<div className='heading2'>Forgot password?</div>
						<div className='spacer30'></div>
						<div>
							<div className='greyText'>Email Address</div>
							<input onChange={this.email} className='inputBox'></input>
						</div>

						<div>
							<button onClick={this.login} className='SigninButton buttonBlue' style={{width: '180px', opacity: '.2', cursor: 'default'}}>send new password</button>
						</div>
					</div>
				</div>
			)
		} else {
			return(
				<div className='centerPage'>
					<div className='signinBox'>
						<div className='heading2'>Forgot password?</div>
						<div className='spacer30'></div>
						<div>
							<div className='greyText'>Email Address</div>
							<input onChange={this.email} className='inputBox'></input>
						</div>

						<div>
							<button onClick={this.login} className='SigninButton buttonBlue' style={{width: '180px'}} onClick={this.submit}>send new password</button>
						</div>
					</div>
				</div>
			)
		}
		
	}
}

export default ForgotPassword;