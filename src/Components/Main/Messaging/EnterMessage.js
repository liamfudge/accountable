import React from 'react';

import { connect } from 'react-redux';

import MessageDisplay from './MessageDisplay';

import image from './sendButton.png';

class EnterMessage extends React.Component{
	constructor(){
		super()
		this.state = {
			inputValue: '',
		}
	}
	textField = (e) => {
		this.setState({inputValue: e.target.value});
	}
	handleKeyDown = (e) => {
		if(e.key === 'Enter'){
			if(this.state.inputValue === ''){
			} else {
				this.sendMessage();
				this.setState({inputValue: ''});
			}
			
		}
	}
	sendClicked = () => {
		this.sendMessage();
		this.setState({inputValue: ''})
	}

	sendMessage = () => {
		fetch('http://localhost:3000/sendMessage', {
			method: 'post',
			headers: {'Content-Type': 'application/json'},
			body: JSON.stringify({
				taskid: this.props.task.id,
				message: this.state.inputValue,
				fromemail: this.props.registeredUser.email
			})
		})
		.then(response => response.json())
		.then(data => {
			// console.log(data);
		})

		fetch('http://localhost:3000/updateTaskMessage', {
			method: 'post',
			headers: {'Content-Type': 'application/json'},
			body: JSON.stringify({
				id: this.props.task.id,
				messageType: 2,
				messagefromid: this.props.registeredUser.id
			})
		})
		.then(response => response.json())
		.then(data => {
			// console.log(data);
		})
	}

	messageExists = (e) => {
		this.props.messageExists && this.props.messageExists(e);
	}

	render(){
		return(
			<div>
				<MessageDisplay task={this.props.task}
								messageExists={this.messageExists}/>


				<div className='enterTextBorder'>
					<input className='userMessageInput' onChange={this.textField} onKeyDown={this.handleKeyDown} value={this.state.inputValue}></input>
					
					<div className='userMessageSend'><img src={image} className='sendIcon' onClick={this.sendClicked}/></div>
				</div>
			</div>
		)
	}
}

const mapStateToProps = state => ({
  registeredUser: state.posts.registeredUser
})

export default connect(mapStateToProps, {})(EnterMessage);





