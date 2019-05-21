import React from 'react';

import { connect } from 'react-redux';

class UpdatePassword extends React.Component{
	constructor(){
		super()
		this.state = {
			show: false
		}
	}

	showModal = () => {
		this.setState({show: true});
	}
	close = () => {
		this.setState({show: false});
	}
	render(){
		return(
			<div>
				<div className='text1' onClick={this.showModal}>Update password</div>
				<PasswordModal show={this.state.show}
					closePopup={this.close}
					email={this.props.registeredUser.email}/>
			</div>
		)
	}
}

const mapStateToProps = state => ({
  	registeredUser: state.posts.registeredUser
})

export default connect(mapStateToProps, {})(UpdatePassword);






class PasswordModal extends React.Component{
	constructor(){
		super()
		this.state = {
			newPassword: '',
			confirmPassword: '',
			warning: ''
		}
	}

	passwordNew = (e) => {
		this.setState({newPassword: e.target.value});
	}
	passwordConfirm = (e) => {
		this.setState({confirmPassword: e.target.value});
	}

	submitPassword = () => {
		if(this.state.newPassword === ''){
			this.setState({warning: 'You must fill in both fields'});
		} else {
			if(this.state.newPassword === this.state.confirmPassword){
				this.setState({warning: ''})
				// console.log('successfully updated new password');

				fetch('http://localhost:3000/updatePassword', {
					method: 'post',
					headers: {'Content-Type': 'application/json'},
					body: JSON.stringify({
						email: this.props.email,
						password: this.state.newPassword
					})
				})
				.then(response => response.json())
				.then(data => {
					console.log(data);
				})

				this.closePopup();
			} else {
				this.setState({warning: 'Passwords do not match'})
			}
		}
		
	}

	closePopup = (e) => {
    	this.props.closePopup && this.props.closePopup(e);
  	}
	render(){
		if(this.props.show === false){
			return null;
		} else {
			return(
				<div className='backdropStyleFriend'>
					<div className='modalStylePassword' ref={node => this.node = node}>
						<div className='boxSizeFriend'>
							<div className='center'>
								<div className='text1' >Update Password</div>
							</div>
							<div className='spacer30'></div>

							<div>
								<div className='greyText'>New Password</div>
								<input onChange={this.passwordNew} type='password' className='inputBox'></input>
							</div>
							<div>
								<div className='greyText'>Confirm Password</div>
								<input onChange={this.passwordConfirm} type='password' className='inputBox'></input>
							</div>

							<div className='warning'>{this.state.warning}</div>

							<div className='center'>
								<button onClick={this.submitPassword} className='buttonBlue'>Submit</button>
								<div className='spacer30'></div>
								<button onClick={this.closePopup} className=''>Cancel</button>
							</div>

						</div>
					</div>

				</div>
			)
		}
		
	}
}

