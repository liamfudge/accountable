import React from 'react';

import { connect } from 'react-redux';
import { usersFriends } from '../../../Actions/PostActions';

class FriendList extends React.Component {
	constructor() {
		super()
		this.state = {
			friendList: [],
			userData: [],
			recievedFriends: false,
			runInterval: true,
		}
	}
	componentWillMount = () => {
		this.getUsers();
		this.getFriends();
	}
	getUsers = () => {
		fetch('http://localhost:3000/userData')
			.then(response => response.json())
			.then(data => {
				for (let i = 0; i < data.length; i++){
					if(data[i].email === this.props.registeredUser.email) {

					} else {
						this.state.userData.push(data[i])
					}
				}
			});
	}
	getFriends = () => {
			if(this.state.runInterval === true){
				fetch('http://localhost:3000/myFriends', {
					method: 'post',
					headers: {'Content-Type': 'application/json'},
					body: JSON.stringify({
						email: this.props.registeredUser.email,
						status: 1
					})
				})
					.then(response => response.json())
					.then(data => {
						this.setState({friendList: []});
						for(let i = 0; i < data.length; i++){
							for(let g = 0; g < this.state.userData.length; g++) {
								if(data[i].userone === this.state.userData[g].email){
												this.state.friendList.push(this.state.userData[g]);
								} else if(data[i].usertwo === this.state.userData[g].email) {
												this.state.friendList.push(this.state.userData[g]);
								}
							}
						}
						this.props.usersFriends(this.state.friendList);
						this.setState({recievedFriends: true});
					})	
			} else {
				this.props.usersFriends([]);
				this.setState({recievedFriends: false});
			}

	}

	render() {
		return(
			<div></div>
		)
	}
}

const mapStateToProps = state => ({
	registeredUser: state.posts.registeredUser
})

export default connect(mapStateToProps, { usersFriends })(FriendList);