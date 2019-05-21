import React from 'react';
import { Popover, PopoverBody } from 'reactstrap';

import { connect } from 'react-redux';

import GoalCalendar from './GoalCalendar';
import FriendSearch from './AccountableFriend/FriendSearch';
import'./animationStyle.css';

class TaskSetting extends React.Component {
	constructor() {
		super()
		this.state = {
			inputValue: '',
			date: '',
			array: [],
			popoverOpen: false,
			show: false,
			dateButton: '',
			submittedDate: '',
			friend: '',
			day: '',
			month: '',
			year: ''
		}
	}
	componentWillMount = () => {
		let todaysDate = String(String(new Date())).substring(0, 15);
		this.setState({dateButton: todaysDate});
	}
	inputChange = (e) => {
		this.setState({inputValue: e.target.value})
	}
	addGoal = () => {

		if(this.state.inputValue === '' || this.state.submittedDate === '' || this.state.friend === '') {

		} else {
			// write to the database here

			fetch('http://localhost:3000/setTask', {
					method: 'post',
					headers: {'Content-Type': 'application/json'},
					body: JSON.stringify({
						user: this.props.registeredUser.firstname,
						task: this.state.inputValue,
						date: this.state.date,
						day: this.state.day,
						month: this.state.month,
						year: this.state.year,
						buddy: this.state.friend
					})
				})
				.then(response => response.json())
				.then(data => {

				})

			this.setState({inputValue: ''})
			this.setState({submittedDate: ''});
			let todaysDate = String(String(new Date())).substring(0, 15);
			this.setState({dateButton: todaysDate});
			this.setState({friend: ''});
			this.setState({date: ''});
		}
	}
	toggle = () => {
		if (this.state.inputValue === '' || this.state.submittedDate === '' || this.state.friend === '') {
			this.setState({popoverOpen: !this.state.popoverOpen});
			setTimeout(() => {
				this.setState({popoverOpen: !this.state.popoverOpen});
			}, 1000);
		}

		// this.setState({inputValue: ''});
	}
	show = () => {
		this.setState({show: !this.state.show});
	}
	receiveDate = (e) => {

		this.setState({dateButton: e});
		this.setState({submittedDate: e});
		this.dateBreakDown(e);
	}
	dateBreakDown = (e) => {
		// console.log('this is e', e);
		this.setState({date: e});
		// get month
		let stringMonth = (String(String(e)).substring(3, -6));

		this.setState({month: stringMonth});
		
			// convert month to number
				// if(stringMonth === 'Jan'){
				// 	this.setState({month: 1})
				// } else if (stringMonth === 'Feb') {
				// 	this.setState({month: 2})
				// } else if (stringMonth === 'Mar') {
				// 	this.setState({month: 3})
				// } else if (stringMonth === 'Apr') {
				// 	this.setState({month: 4})
				// } else if (stringMonth === 'May') {
				// 	this.setState({month: 5})
				// } else if (stringMonth === 'Jun') {
				// 	this.setState({month: 6})
				// } else if (stringMonth === 'Jul') {
				// 	this.setState({month: 7})
				// } else if (stringMonth === 'Aug') {
				// 	this.setState({month: 8})
				// } else if (stringMonth === 'Sep') {
				// 	this.setState({month: 9})
				// } else if (stringMonth === 'Oct') {
				// 	this.setState({month: 10})
				// } else if (stringMonth === 'Nov') {
				// 	this.setState({month: 11})
				// } else {
				// 	this.setState({month: 12})
				// }

		// get day
		let stringDay = (String(String(e)).substring(6, -6)).substring(4);
		this.setState({day: Number(stringDay)});
		
		// get year
		let stringYear = (String(String(e)).substring(7));
		this.setState({year: Number(stringYear)});
		// console.log(this.state.day, this.state.month, this.state.year);

	}
	Friend = (e) => {
		this.setState({friend: e.firstname});
	}
	render() {
		if(this.state.inputValue === '' || this.state.submittedDate === '' || this.state.friend === ''){
			return(
				<div>
					<div>
						<div>
							<input className='inputBox' placeholder='name of task....' onChange={this.inputChange}
							value={this.state.inputValue}></input>
							<button onClick={this.show} className='goalButton'>{this.state.dateButton}</button>
							<GoalCalendar show={this.state.show} onClose={this.show} receiveDate={this.receiveDate} />
							<div className='spacer20'></div>
							<div>
								<FriendSearch Friend={this.Friend} blank={this.state.friend} 
											placeHolder={'Who will hold you accountable?'}
											input={this.state.friend} />
							</div>
							<div className='spacer20'></div>
							<button onClick={this.toggle} id='setGoalPopover' className='goalButton buttonBlue'>
								add task
							</button>
							<Popover placement="right" isOpen={this.state.popoverOpen} 
									target="setGoalPopover" toggle={this.toggle}>
								<PopoverBody>All feilds must be filled in!</PopoverBody>
							</Popover>
						</div>
					</div>
					
				</div>
			)
		} else {
			return(
				<div>
					<div>
						<div>
							<input className='inputBox' placeholder='set a task....' onChange={this.inputChange}
							value={this.state.inputValue}></input>
							<button onClick={this.show} className='goalButton'>{this.state.dateButton}</button>
							<GoalCalendar show={this.state.show} onClose={this.show} receiveDate={this.receiveDate} />
							<div className='spacer20'></div>
							<div>
								<FriendSearch Friend={this.Friend} blank={this.state.friend}
											placeHolder={'Who will hold you accountable?'}
											input={this.state.friend} />
							</div>
							<button onClick={this.addGoal} id='setGoalPopover' className='goalButton buttonBlue'>
								add task
							</button>
							
						</div>
					</div>
					
				</div>
			)
		}
		
	}
}

const mapStateToProps = state => ({
  registeredUser: state.posts.registeredUser
})

export default connect(mapStateToProps, {})(TaskSetting);
