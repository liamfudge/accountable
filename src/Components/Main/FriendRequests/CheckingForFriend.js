import React from 'react';

import { connect } from 'react-redux';
import { usersFriends } from '../../../Actions/PostActions';

let lengthOfData = 0;

class CheckingForFriend extends React.Component {
	constructor() {
		super()
		this.state = {
			requestnumber: 0,
			friendRequests: [],
			userData: [],
			friendList: [],
			sentRequests: [],
		}
	}
	componentDidMount() {
		fetch('http://localhost:3000/userData')
			.then(response => response.json())
			.then(data => {
				this.setState({userData: data});
				lengthOfData = data.length
			})
		setTimeout(() => {
			setInterval(() => {
				this.checkingFriendReq();
				setTimeout(() => {
					this.checkingSentReq();
				}, 20);
				
			}, 10);
		}, 500);
	}

	checkingFriendReq = () => {
		fetch('http://localhost:3000/checkFriendRequest', {
					method: 'post',
					headers: {'Content-Type': 'application/json'},
					body: JSON.stringify({
						email2: this.props.registeredUser.email,
						status: 0
					})
				})
				.then(response => response.json())
				.then(data => {
					// console.log('looking for requests');
					this.setState({requestnumber: data.length});
					if(this.state.friendRequests.length === 0) {
						for(let i = 0; i < data.length; i++){
							for(let g = 0; g < lengthOfData; g ++){
								if(this.state.userData.length > 0){
									if(data[i].userone === this.state.userData[g].email){
										this.state.friendRequests.push(this.state.userData[g]);
									}
								}
								
							}
						}
					}	
				})
	}
	checkingSentReq = () => {
		fetch('http://localhost:3000/checkSentFriendRequest', {
					method: 'post',
					headers: {'Content-Type': 'application/json'},
					body: JSON.stringify({
						email: this.props.registeredUser.email,
						status: 0
					})
				})
				.then(response => response.json())
				.then(data => {
						for(let i = 0; i < data.length; i++){
							for(let g = 0; g < lengthOfData; g ++){
								if(data[i].usertwo === this.state.userData[g].email){
									let conflict = false;
									for (let x = 0; x < this.state.sentRequests.length; x++){
										if(this.state.userData.length > 0){
											if(this.state.sentRequests[x].email === this.state.userData[g].email){
												conflict = true
											}
										}
									}
									if(conflict === false) {
										this.state.sentRequests.push(this.state.userData[g]);
									}
									
								}
							}
						}
				})
	}

	addUser = (e) => {
		fetch('http://localhost:3000/acceptFriendRequest', {
			method: 'post',
			headers: {'Content-Type': 'application/json'},
			body: JSON.stringify({
				email1: e.email,
				email2: this.props.registeredUser.email
			})
		})
		.then(response => response.json())
		.then(data => {
			for(let i = 0; i < this.state.friendRequests.length; i++){
				if(e.email === this.state.friendRequests[i].email) {
					this.state.friendRequests.splice(i, 1);
				}
			}
		})
		setTimeout(() => {
			this.updateMyFriends();
		}, 500);
	}

	updateMyFriends = () => {
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
				// console.log('add data ????', data);
				this.setState({friendList: []});
				for(let i = 0; i < data.length; i++){
					for(let g = 0; g < this.state.userData.length; g++) {
						if(data[i].userone === this.state.userData[g].email){
							if(this.state.userData[g].email === this.props.registeredUser.email){
								
							} else {
								this.state.friendList.push(this.state.userData[g]);
							}
							
						} else if(data[i].usertwo === this.state.userData[g].email) {
							if(this.state.userData[g].email === this.props.registeredUser.email){

							} else {
								this.state.friendList.push(this.state.userData[g]);
							}
							
						}
					}
				}
				
				// console.log(this.state.friendList);
				this.props.usersFriends(this.state.friendList);
			})
	}
	render() {
		const friendRequest = this.state.friendRequests.map((friend) => {
			return(
				<div className='pendingRequest' key={friend.id}>
					<div className='friendNameDisplay'>
						<img src={require(`../../ProfilePics/${friend.profilepic}.png`)} 
			   				className='ppTiny ' alt=''></img>
						<div className=''>{friend.firstname} {friend.surname}</div>
					</div>
					<button onClick={() => this.addUser(friend)} className='addButton'>add</button>
				</div>
			)
		})
		const sentRequest = this.state.sentRequests.map((friend) => {
			return(
				<div className='pendingRequest' key={friend.id}>
					<div className='friendNameDisplay'>
						<img src={require(`../../ProfilePics/${friend.profilepic}.png`)} 
			   				className='ppGrey' alt=''></img>
						<div className='greyedText'>{friend.firstname} {friend.surname} pending</div>
					</div>
					<div className='width80'></div>
				</div>
			)
		})
		return(
			<div>
				<div className='subHeading'>People you have added:</div>
				{sentRequest}
				{/*<div>{this.state.requestnumber} new friend requests</div>*/}
				<div className='spacer30'></div>

				<div className='subHeading'>People who added you:</div>
				{friendRequest}
				<div className='spacer30'></div>
			</div>
		)
	}
}

const mapStateToProps = state => ({
	registeredUser: state.posts.registeredUser
})

export default connect(mapStateToProps, { usersFriends })(CheckingForFriend);