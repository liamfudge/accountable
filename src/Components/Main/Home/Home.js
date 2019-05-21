import React from 'react';

import { Link } from 'react-router-dom';

import { connect } from 'react-redux';

import SetTask from '../SetTask/SetTask';
import Calendar from '../Calendar/Calendar';
import CreateGroup from '../Groups/CreateGroup';
import Footer from '../HomePage/Footer';
import EventList from '../EventList/EventList';


class Home extends React.Component {
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
			    	<div className='heading'>Welcome {this.state.user.firstname}</div>
			    	<div className='subHeading'>Have a look at you and your friends upcoming tasks!</div>
			    	<div className='spacer30'></div>
			    	<EventList />
			    	<div className='spacer30'></div>

			    	<Link to='/schedule'>
						<button onClick={this.submit} className='SigninButton buttonBlue'>Add a task</button>
					</Link>

			    	{/*<CreateGroup />*/}
			    	<div className='spacer30'></div>
			    	{/*<Calendar />*/}

			    	<Link to='/friends'>
						<button onClick={this.submit} className='SigninButton buttonBlue'>Search friends</button>
					</Link>
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

export default connect(mapStateToProps, {})(Home);