import React from 'react';

import { connect } from 'react-redux';

import Calendar from './Calendar/Calendar';
import CreateGroup from './Groups/CreateGroup';
import SetTask from './SetTask/SetTask';
import EventList from './EventList/EventList';
import Footer from './HomePage/Footer';

class Schedule extends React.Component {
	constructor() {
		super()
		this.state = {
			userFound: false,
			user: []
		}
	}
	componentWillMount = () => {
		fetch('http://localhost:3000/profile', {
			method: 'post',
			headers: {'Content-Type': 'application/json'},
			body: JSON.stringify({
				email: this.props.registeredUser.email
			})
		})
			.then(response => response.json())
			.then(data => {
				this.setState({user: data})
			})
		if (this.props.registeredUser.firstname) {
			this.setState({userFound: true})
		} else {
		}
	}
	render() {
		if(this.state.userFound === false) {
			return(
				<div>
			  		<h1>404 page not found</h1>
			  	</div>
			)
		} else {
			return(
				<div>
				  	<div className='spacer30'></div>
				   	<div className='heading'>Calendar</div>
				   	<div className='subHeading'>Here you can check when your upcoming tasks are scheduled!</div>
				   	<div className='spacer30'></div>
				   	<SetTask />
				  	<div className='spacer30'></div>
				  	<div className='spacer30'></div>
				  	<EventList />
				  	<div className='spacer30'></div>
			    	<div className='spacer30'></div>
			    	<Footer />
				</div>
			)
		}
		
	}
		
}

const mapStateToProps = state => ({
  	registeredUser: state.posts.registeredUser,
  	requestNumber: state.posts.requestNumber
})

export default connect(mapStateToProps, {})(Schedule);