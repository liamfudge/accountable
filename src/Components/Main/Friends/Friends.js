import React from 'react';

import { connect } from 'react-redux';

import FriendList from './FriendList/FriendList';
import FriendInfo from './FriendList/FriendInfo';
import FriendSearch from './FriendSearch/FriendSearch';
import AddFriend from '../FriendRequests/AddFriend';
import CheckingForFriend from '../FriendRequests/CheckingForFriend';
import MyFriends from '../FriendRequests/MyFriends';
import Footer from '../HomePage/Footer';

class Friends extends React.Component {
	constructor() {
		super()
		this.state = {
			userFound: false,
			user: [],
			switchView: false
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
	switchView = () => {
		if(this.state.switchView === false){
			this.setState({switchView: true});
		} else {
			this.setState({switchView: false});
		}
		
	}
	friendListOption = () => {
		if(this.state.switchView === false){
			return(
				<FriendList switchView={this.switchView}/>
			)
		} else {
			return(
				<FriendInfo switchView={this.switchView}/>
			)
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
					<div className='heading'>Connections</div>
					<div className='subHeading'>Here are where you can see your connections and make new ones!</div>
					<div className='spacer30'></div>
					<AddFriend />
					<CheckingForFriend />
					<div className='spacer30'></div>
					{this.friendListOption()}
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

export default connect(mapStateToProps, {})(Friends);