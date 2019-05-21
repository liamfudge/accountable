import React from 'react';

import { connect } from 'react-redux';
import { Popover } from 'reactstrap';

import DisplayPic from '../DisplayPic/DisplayPic';
import MessageBox from '../Messaging/MessageBox';

import './EventStyle.css';
import mailIcon0 from './mailIcon0.png';
import mailIcon1 from './mailIcon.png';
import mailIcon2 from './mailIcon2.png';

let DB = [];

class EventList extends React.Component {
	constructor() {
		super()
		this.state = {
			today: String((String(new Date())).substring(0, 15).substring(4)),
			events: DB,
			show: false,
			whichTask: '',
			name: '',
			taskid: '',
			messageModal: false,
			taskInfo: [],
			firstTaskId: '',
			newMonthId: '',
			notTodayId: '',
		}
	}
	componentWillMount = () => {
		setInterval(() => {
			this.getTasks();
		}, 100)
		
	}
	getTasks = () => {
		fetch('http://localhost:3000/getTasks', {
            method: 'post',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
            	name1: this.props.registeredUser.firstname,
            	name2: this.props.registeredUser.firstname
            })
        })
        .then(response => response.json())
        .then(data => {
            var sortedArray = data.sort(function(a, b){
				return new Date(a.taskdate) - new Date(b.taskdate);
			})

			let i = 0;

			while(i < sortedArray.length){
				if(sortedArray[i].taskdate < this.state.today){

				} else {
					if(sortedArray[i].taskdate === this.state.today){
						this.setState({firstTaskId: sortedArray[i].id});
						i = i + 100000;
					}
				}

				i++
			}

			let g = 0;

			while(g < sortedArray.length){
				if(sortedArray[g].taskdate < this.state.today){

				} else {
					if(sortedArray[g].taskmonth !== (String(this.state.today)).substring(0, 3)){
						this.setState({newMonthId: sortedArray[g].id});
						g = 100000;
					}
				}
				g++
			}

			let j = 0;

			while(j < sortedArray.length){
				if(sortedArray[j].taskdate < this.state.today){

				} else {
					if(sortedArray[j].taskdate > this.state.today){
						this.setState({notTodayId: sortedArray[j].id});
						j = 100000;
					}
				}
				j++
			}

			this.setState({events: sortedArray})
        })
	}

	pendingClicked = (e) => {
		this.setState({whichTask: e.task});
		this.setState({name: e.userone});
		this.setState({taskid: e.id});
		setTimeout(() => {
			this.setState({show: true});
		}, 10);
	}
	messageClicked = (e) => {
		this.setState({taskInfo: e});
		setTimeout(() => {
			this.setState({messageModal: true});
		},10);
		
		if(e.messagefromid != this.props.registeredUser.id && e.messages === 2){
			fetch('http://localhost:3000/updateTaskMessage', {
	            method: 'post',
	            headers: {'Content-Type': 'application/json'},
	            body: JSON.stringify({
	            	id: e.id,
	            	messageType: 1,
	            	messagefromid: this.props.registeredUser.id
	            })
	        })
	        .then(response => response.json())
	        .then(data => {

	        })
		}









	}
	closeModal = () => {
		this.setState({show: false});
	}
	closeMessageModal = () => {
		this.setState({messageModal: false});
	}

	pendingButton(e) {
			return(
				<div className={`item  ${e.status}Class`} 
	              		onClick={() => this.pendingClicked(e)}>
					{e.status}
				</div>
			)
	}

	messageButton(e) {
			return(
				<div className={`item ${e.status}Class2`}>
					{e.status}
				</div>
			)
	}
	todaysTask(e) {
		if(this.state.firstTaskId === e.id){
			return(
				<div className='eventRow'>
						<div className='itemColor description'></div>
						<div className='itemTask eventHeading2'>Today's Tasks</div>
						<div className='item itemDate description subHeading'>Due date</div>
						<div className='item itemPerson description subHeading'>User</div>
						<div className='item itemPerson description subHeading'>Buddy</div>
						<div className='item itemStatus description subHeading '>Status</div>
				</div>
			)
		} else {
			return null;
		}
	}
	laterMonths(e) {
		if(this.state.newMonthId === e.id){
			return(
				<div>
					<div className='eventRow'></div>
					<div className='eventRow'>
						<div className='itemColor description'></div>
						<div className='itemTask eventHeading2'>Next months tasks</div>
						<div className='item itemDate description subHeading'></div>
						<div className='item itemPerson description subHeading'></div>
						<div className='item itemPerson description subHeading'></div>
						<div className='item itemStatus description subHeading '></div>
					</div>
				</div>
			)
		} else {
			return null;
		}
	}
	notTodaySpace(e) {
		if(this.state.firstTaskId === ''){
			if(this.state.notTodayId === e.id){
				return(
					<div>	
						<div className='eventRow'></div>
						<div className='eventRow'>
							<div className='itemColor description'></div>
							<div className='itemTask eventHeading2'>This months tasks</div>
							<div className='item itemDate description subHeading'>Due date</div>
							<div className='item itemPerson description subHeading'>User</div>
							<div className='item itemPerson description subHeading'>Buddy</div>
							<div className='item itemStatus description subHeading '>Status</div>
						</div>
					</div>
				)
			} else {
				return null;
			}
		} else {
			if(this.state.notTodayId === e.id){
				return(
					<div>
						<div className='eventRow'></div>
						<div className='eventRow'>
							<div className='itemColor description'></div>
							<div className='itemTask eventHeading2'>This months tasks</div>
							<div className='item itemDate description subHeading'></div>
							<div className='item itemPerson description subHeading'></div>
							<div className='item itemPerson description subHeading'></div>
							<div className='item itemStatus description subHeading '></div>
						</div>
					</div>
				)
			} else {
				return null;
			}
		}
	}

	mailIcon = (e) => {
			if(e.messages === 2){
				if(e.messagefromid === this.props.registeredUser.id){
					return (
						<div className='taskSelectOtherspace'>
							<img src={mailIcon1} className='mailICon'/>
						</div>
					)
				} else {
					return (
						<div className='taskSelectOtherspace'>
							<img src={mailIcon2} className='mailICon'/>
						</div>
					)
				}
					
			} else if(e.messages === 1) {
				return (
					<div className='taskSelectOtherspace'>
						<img src={mailIcon1} className='mailICon'/>
					</div>
				)
			} else {
				return (
					<div className='taskSelectOtherspace'>
						<img src={mailIcon0} className='mailICon'/>
					</div>
				)
			}
				
		
	}
	infoDisplay = (e) => {
		if(e.taskdate < this.state.today){
			return null;
		}
		if(e.taskdate === this.state.today){
			if(e.userone === this.props.registeredUser.firstname) {
				return(
					<div>
						{this.todaysTask(e)}
						<div className='eventRow'>
							<div className='itemColor'></div>
							<div className='item itemTask' onClick={() => {this.messageClicked(e)}}>
								<div className='taskHolder'>
									<div className=' subHeading taskSelection'>{e.task}</div>
								</div>
								{this.mailIcon(e)}
							</div>
							<MessageModal show={this.state.messageModal}
								close={this.closeMessageModal}
								task={this.state.taskInfo}
								id={e.id}
								/>

							<div className='item itemDate subHeading'>{e.taskday} {e.taskmonth}</div>
							<div className='item itemPerson subHeading'><DisplayPic user={e.userone} class={'ppTiny2'}/></div>
							<div className='item itemPerson subHeading'><DisplayPic user={e.buddy} class={'ppTiny2'}/></div>
								{this.pendingButton(e)}
						</div>
					</div>
				)
			} else {
				return(
					<div>
						{this.todaysTask(e)}
						<div className='eventRow'>
							<div className='itemColor2'></div>
							<div className='item itemTask description' onClick={() => {this.messageClicked(e)}}>
								<div className='taskHolder'>
									<div className=' subHeading taskSelection '>{e.task}</div>
								</div>
								{this.mailIcon(e)}
							</div>
							<MessageModal show={this.state.messageModal}
								close={this.closeMessageModal}
								task={this.state.taskInfo}
								id={e.id}/>

							<div className='item itemDate subHeading description'>{e.taskday} {e.taskmonth}</div>
							<div className='item itemPerson subHeading description'><DisplayPic user={e.userone} class={'ppTiny2Grey'}/></div>
							<div className='item itemPerson subHeading description'><DisplayPic user={e.buddy} class={'ppTiny2Grey'}/></div>
								{this.messageButton(e)}
						</div>
					</div>
				)
			}
		} else if(e.taskmonth === (String(this.state.today)).substring(0, 3)){
			if(e.userone === this.props.registeredUser.firstname) {
				return(
					<div>
						{this.notTodaySpace(e)}
						<div className='eventRow'>
							<div className='itemColor'></div>
							<div className='item itemTask' onClick={() => {this.messageClicked(e)}}>
								<div className='taskHolder'>
									<div className=' subHeading taskSelection'>{e.task}</div>
								</div>
								{this.mailIcon(e)}
							</div>
							<MessageModal show={this.state.messageModal}
								close={this.closeMessageModal}
								task={this.state.taskInfo}
								id={e.id}/>

							<div className='item itemDate subHeading'>{e.taskday} {e.taskmonth}</div>
							<div className='item itemPerson subHeading'><DisplayPic user={e.userone} class={'ppTiny2'}/></div>
							<div className='item itemPerson subHeading'><DisplayPic user={e.buddy} class={'ppTiny2'}/></div>
								{this.pendingButton(e)}
						</div>
					</div>
				)
			} else {
				return(
					<div>
					{this.notTodaySpace(e)}
						<div className='eventRow'>
							<div className='itemColor2'></div>
							<div className='item itemTask description' onClick={() => {this.messageClicked(e)}}>
								<div className='taskHolder'>
									<div className=' subHeading taskSelection '>{e.task}</div>
								</div>
								{this.mailIcon(e)}
							</div>
							<MessageModal show={this.state.messageModal}
								close={this.closeMessageModal}
								task={this.state.taskInfo}
								id={e.id}/>

							<div className='item itemDate subHeading description'>{e.taskday} {e.taskmonth}</div>
							<div className='item itemPerson subHeading description'><DisplayPic user={e.userone} class={'ppTiny2Grey'}/></div>
							<div className='item itemPerson subHeading description'><DisplayPic user={e.buddy} class={'ppTiny2Grey'}/></div>
								{this.messageButton(e)}
						</div>
					</div>
				)
			}
		} else {
			if(e.userone === this.props.registeredUser.firstname) {
				return(
					<div>
						{this.laterMonths(e)}
						<div className='eventRow'>
							<div className='itemColor'></div>
							<div className='item itemTask' onClick={() => {this.messageClicked(e)}}>
								<div className='taskHolder'>
									<div className=' subHeading taskSelection'>{e.task}</div>
								</div>
								{this.mailIcon(e)}
							</div>
							<MessageModal show={this.state.messageModal}
								close={this.closeMessageModal}
								task={this.state.taskInfo}
								id={e.id}/>

							<div className='item itemDate subHeading'>{e.taskday} {e.taskmonth}</div>
							<div className='item itemPerson subHeading'><DisplayPic user={e.userone} class={'ppTiny2'}/></div>
							<div className='item itemPerson subHeading'><DisplayPic user={e.buddy} class={'ppTiny2'}/></div>
								{this.pendingButton(e)}
						</div>
					</div>
				)
			} else {
				return(
					<div>
						{this.laterMonths(e)}
						<div className='eventRow'>
							<div className='itemColor2'></div>
							<div className='item itemTask description' onClick={() => {this.messageClicked(e)}}>
								<div className='taskHolder'>
									<div className=' subHeading taskSelection '>{e.task}</div>
								</div>
								{this.mailIcon(e)}
							</div>
							<MessageModal show={this.state.messageModal}
								close={this.closeMessageModal}
								task={this.state.taskInfo}
								id={e.id}/>

							<div className='item itemDate subHeading description'>{e.taskday} {e.taskmonth}</div>
							<div className='item itemPerson subHeading description'><DisplayPic user={e.userone} class={'ppTiny2Grey'}/></div>
							<div className='item itemPerson subHeading description'><DisplayPic user={e.buddy} class={'ppTiny2Grey'}/></div>
								{this.messageButton(e)}
						</div>
					</div>
				)
			}
		}
		
		
	}

	render() {
		const EventTable = this.state.events.map(event => {
			if(!event) {
				return null;
			} else {
				return(
					<div key={event.id}>
						{this.infoDisplay(event)}

					</div>
				)
			}
		})
		return(
			<div>
				<div className='EventBox'>
					<div className=''>
						<div className='height45'></div>
						<div className='eventHeading'>Up-coming Tasks</div>
					</div>
					<div className='spacer30'></div>
					<div className='spacer30'></div>

						{/*<div className='eventRow'>
													<div className='itemColor description'></div>
													<div className='item itemTask description subHeading'>Task</div>
													<div className='item itemDate description subHeading'>Due date</div>
													<div className='item itemPerson description subHeading'>User</div>
													<div className='item itemPerson description subHeading'>Buddy</div>
													<div className='item itemStatus description subHeading '>Status</div>
												</div>*/}

					{EventTable}
					<div className='spacer30'></div>

					<ModalStatus show={this.state.show}
								close={this.closeModal}
								whatTask={this.state.whichTask}
								name={this.state.name}
								id={this.state.taskid} />
					
				</div>

			</div>
		)
	}
}

const mapStateToProps = state => ({
  registeredUser: state.posts.registeredUser
})

export default connect(mapStateToProps, {})(EventList);




class ModalStatus extends React.Component {
	componentWillMount() {
    	document.addEventListener('mousedown', this.handleClick, false);
  	}
  	componentWillUnmount() {
    	document.removeEventListener('mouseDown', this.handleClick, false);
  	}
  	handleClick = (e) => {
    	if(this.node) {
      		if(this.node.contains(e.target)){
      		} else {
        		this.onClose(e);
      		}
    	}
  	}
	onClose = (e) => {
		this.props.close && this.props.close(e);
	}
	completedButton = (e) => {
		this.onClose(e);
		fetch('http://localhost:3000/updateTask', {
            method: 'post',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
            	id: this.props.id,
            	status: 'complete'
            })
        })
        .then(response => response.json())
        .then(data => {
        	
        })
	}

	render() {
		if(this.props.show === true){
			return (
		      	<div className='backdropStylePending'>
		      		<div className='modalStylePending' ref={node => this.node = node}>
		      			<div className='eventRow'>
							<div className='itemColor'></div>
							<div className='item subHeading'>{this.props.name}</div>
							<div className='item itemTask subHeading haveComplete'>{this.props.whatTask}</div>
							<button onClick={() => this.completedButton()} className='item itemTask completeButton'>completed?</button>
							<button onClick={this.onClose} className='item itemTask noButton'>Not yet</button>
						</div>
		      			
		      		</div>

		      	</div>
		    );
		} else {
			return null;
		}
	    
	}
}


class MessageModal extends React.Component {
 	clickedOutsideBox = (e) => {
 		this.onClose(e);
 	}
	onClose = (e) => {
		this.props.close && this.props.close(e);
	}
	messageExists = (e) => {
		// console.log(e);
		this.props.messageExists && this.props.messageExists(e);
	}

	render() {
		if(this.props.show === true && this.props.task.id === this.props.id){
			return (
		      	<div className='messageBackdrop'>
		      		<div className='messageBox'>
			      		<MessageBox clickOutside={this.clickedOutsideBox}
			      				task={this.props.task}
			      				messageExists={this.messageExists}/>
		      		</div>
		      	</div>
		    );
		} else {
			return null;
		}
	    
	}
}


