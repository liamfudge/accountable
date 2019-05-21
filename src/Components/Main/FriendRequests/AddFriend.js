import React from 'react';

import FriendSearch from './SearchMenu/FriendSearch';

import { connect } from 'react-redux';

var count = 0;
class AddFriend extends React.Component {
	constructor() {
		super()
		this.state = {
			createGroup: false,
			friend: [],
			friendsInGroup: [],
			addClass: 'invisibleButton',
			friendList: [],
			userData: [],
		}
	}
	componentWillMount = () => {
		this.getUsers();
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
	Friend = (e) => {
		this.setState({friend: e});
		this.setState({addClass: 'greenButton1'})
		setTimeout(() => {
			this.setState({addClass: 'greenButton2'})
		},10)
		setTimeout(() => {
			this.setState({addClass: 'greenButton3'})
		},200)
	}
	addFriend = () => {
		fetch('http://localhost:3000/friendRequest', {
			method: 'post',
			headers: {'Content-Type': 'application/json'},
			body: JSON.stringify({
				email1: this.props.registeredUser.email,
				email2: this.state.friend.email
			})
		})
		if(this.state.friend === ''){

		} else {
			this.state.friendsInGroup.push({
				name: this.state.friend,
				id: count
			})
			count = count + 1;
			this.setState({friend: []});
			this.setState({addClass: 'invisibleButton'});
		}

	}

	handleClick = (e) => {
		for (let i = 0; i < (this.state.friendsInGroup.length); i++) {
			var array = [...this.state.friendsInGroup];
			var result = array.filter(name => {
				return name.id !== e.id;
			})
			this.setState({friendsInGroup: result});
		}
	}
	render() {
			return(
				<div>
					<div className='spacer30'></div>
					<div className='heading2'>Friends</div>
					<div className='flex1Line'>
						<FriendSearch Friend={this.Friend} blank={this.state.friend} 
									placeHolder={'Add Friends....'}
									input={this.state.friend} />
						<button className={this.state.addClass} onClick={this.addFriend}>add</button>
					</div>
					<div className='spacer30'></div>
				</div>
			)
	}
}

const mapStateToProps = state => ({
  registeredUser: state.posts.registeredUser
})

export default connect(mapStateToProps, {})(AddFriend);

