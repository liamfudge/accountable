import React from 'react';

import { connect } from 'react-redux';

import { css } from 'glamor';
import ScrollToBottom from 'react-scroll-to-bottom';

import ScrollArea from 'react-scrollbar';
import DisplayPic from '../DisplayPic/DisplayPic';

const ROOT_CSS = css({
	height: 160,
	width: 220
});

class MessageDisplay extends React.Component{
	constructor(){
		super()
		this.state = {
			messages: [],
		}
	}
	componentWillMount = () => {
		setInterval(() => {
			this.getMessages();
		}, 30);
	}
	getMessages = () => {
		fetch('http://localhost:3000/recieveMessage', {
			method: 'post',
			headers: {'Content-Type': 'application/json'},
			body: JSON.stringify({
				taskid: this.props.task.id
			})
		})
		.then(response => response.json())
		.then(data => {
			this.setState({messages: data});
			if(data.length > 0){
				this.messageExists(data[0].taskid);
			}
		})
	}
	messageControl = (message) => {
		if(message.fromemail === this.props.registeredUser.email){
			return(
				<div className='messageHolderRight'>
					<div className='userMessage'>
						{message.message}
					</div>
				</div>
			)
		} else {
			return(
				<div className='messageHolderLeft'>
					<div className='friendMessage'>
						{message.message}
					</div>
				</div>
			)
		}

	}

	messageExists = (e) => {
		this.props.messageExists && this.props.messageExists(e);
	}

	render(){
		const messages = this.state.messages.map((message) => {
			return(
				<div>
					{this.messageControl(message)}
				</div>
			)
		})

		return(
			<div className=''>

				<ScrollToBottom className={ROOT_CSS}>
					{messages}
				</ScrollToBottom>
			</div>
		)
	}
}

const mapStateToProps = state => ({
  registeredUser: state.posts.registeredUser
})

export default connect(mapStateToProps, {})(MessageDisplay);