import React from 'react';

import { connect } from 'react-redux';
import { friendSelected } from '../../../../Actions/PostActions';
import { Link } from 'react-router-dom';

import './FriendList.css';

class FriendList extends React.Component {
	constructor() {
		super()
		this.state = {
			friendList: [],
			userData: [],
			recievedFriends: false,
			myFriends: []
		}
	}
	componentWillMount = () => {
		setTimeout(() => {
			this.setState({recievedFriends: true});
		}, 20);
		// setInterval(() => {
		// 	console.log(this.props.usersFriends)
		// 	// this.setState({myFriends: this.props.usersFriends})
		// }, 100);
	}
	nameClicked = (e) => {
		this.props.friendSelected(e);
		this.props.switchView && this.props.switchView(e);
	}
	render() {
		let friendItem = this.props.usersFriends.map((friend) => {
			return(
				<div key={friend.id}>		
					{/*<Link className='unLink' to={`/friends/${friend.id}`}>*/}
					<div className='friendNameDisplay' onClick={() => this.nameClicked(friend)}>
						<img src={require(`../../../ProfilePics/${friend.profilepic}.png`)} 
			   				className='ppTiny' alt=''></img>
						<div >{friend.firstname} {friend.surname}</div>
					</div>
					{/*</Link>*/}
				</div>
			)
		})
		if(this.state.recievedFriends === true) {
			return(
				<div className='friendTable'>
					<div className='friendListHeading'>Friends list....</div>
					<div className=''>
						{friendItem}
					</div>
					
				</div>
			)
		} else {
			return(
				<div className='friendTable'>
					<div className='friendListHeading'>Friends list....</div>
					<div className=''>
					</div>
					
				</div>
			)
		}
	}
}

const mapStateToProps = state => ({
	route: state.posts.route,
	registeredUser: state.posts.registeredUser,
	usersFriends: state.posts.usersFriends
})

export default connect(mapStateToProps, { friendSelected })(FriendList);