import React from 'react';

import './Style.css';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import ProfilePicDisplay from '../Main/ProfilePicDisplay/ProfilePicDisplay';
import ScanningRequests from '../Main/FriendRequests/ScanningRequests';
import MyFriends from '../Main/FriendRequests/MyFriends';


class Header extends React.Component {
	constructor() {
		super()
		this.state = {
			userFound: false,
			connectionClass: 'navItem',
			number: '',
			navSelection: 'home'
		}
	}
	componentWillMount = () => {
		if (this.props.registeredUser.firstname) {
			this.setState({userFound: true})
		}
		setInterval (() => {
			if(this.props.requestNumber > 0) {
				this.setState({connectionClass: 'navItem redPulse'});
				this.setState({number: `:${this.props.requestNumber}`});
			} else {
				this.setState({connectionClass: 'navItem'});
			}
		}, 100)
		
	}
	homeClick = () => {
		this.setState({navSelection: 'home'});
	}
	connectionsClick = () => {
		this.setState({navSelection: 'connections'});
	}
	scheduleClick = () => {
		this.setState({navSelection: 'schedule'});
	}
	home = () => {
		if(this.state.navSelection === 'home'){
			return(
				<Link to='/user' className='navItemSelected' onClick={this.homeClick}>Home</Link>
			)
		} else {
			return(
				<Link to='/user' className='navItem' onClick={this.homeClick}>Home</Link>
			)
		}
		
	}
	connections = () => {
		if(this.state.navSelection === 'connections'){
			return(
				<Link to='/friends' className='navItemSelected' onClick={this.connectionsClick}>Connections</Link>
			)
		} else {
			return(
				<Link to='/friends' className={this.state.connectionClass} onClick={this.connectionsClick}>Connections</Link>
			)
		}
			
	}
	schedule = () => {
		if(this.state.navSelection === 'schedule'){
			return(
				<Link to='/schedule' className='navItemSelected' onClick={this.scheduleClick}>Schedule</Link>
			)
		} else {
			return(
				<Link to='/schedule' className='navItem' onClick={this.scheduleClick}>Schedule</Link>
			)
		}
			
	}

	render() {
		if (this.state.userFound === false){
			return null;
		} else {
			return(
				<div className='navBar'>
					<div className='rightNav'></div>
					<div className='centerNav'>
						{this.home()}
						{this.connections()}
						{this.schedule()}
					</div>
					<div className='rightNav'>
						<ProfilePicDisplay />
					</div>
					<ScanningRequests />
					<MyFriends />
				</div>
			)
		}
			
	}
}

const mapStateToProps = state => ({
  registeredUser: state.posts.registeredUser,
  requestNumber: state.posts.requestNumber
})

export default connect(mapStateToProps, {})(Header);