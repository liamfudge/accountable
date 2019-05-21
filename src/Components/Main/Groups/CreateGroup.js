import React from 'react';

import FriendSearch from '../SetTask/AccountableFriend/FriendSearch';

var count = 0;
class CreateGroup extends React.Component {
	constructor() {
		super()
		this.state = {
			createGroup: false,
			friend: '',
			friendsInGroup: [],
			addClass: 'invisibleButton'
		}
	}
	createGroup = () => {
		this.setState({createGroup: !this.state.createGroup})
	}
	Friend = (e) => {
		// console.log(e)
		this.setState({friend: String(e.firstname + ' ' + e.surname)});
		this.setState({addClass: 'greenButton1'})
		setTimeout(() => {
			this.setState({addClass: 'greenButton2'})
		},10)
		setTimeout(() => {
			this.setState({addClass: 'greenButton3'})
		},200)
	}
	addFriend = () => {
		if(this.state.friend === ''){

		} else {
			this.state.friendsInGroup.push({
				name: this.state.friend,
				id: count
			})
			count = count + 1;
			this.setState({friend: ''});
		}
	}
	createGroupButton  = () => {
		if(this.state.friendsInGroup[0]) {
			return(
				<div>
					<button className='buttonBlue' onClick={this.submitGroup}>Create Group</button>
				</div>
			)
		}
	}

	submitGroup = () => {

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
		const addedFriends = this.state.friendsInGroup.map(friend => {
			return(
				<div key={friend.id} className='flex1Line'>
					{friend.name}
					<button onClick={()=>{this.handleClick(friend)}} className='deleteButton'>delete</button>
				</div>
			)
		})
		if(this.state.createGroup === false){
			return(
				<div>
					<div className='subHeading'>Create a group to help each other get tasks done!</div>
					<div className='spacer30'></div>
					<button className='buttonBlue jumbo' onClick={this.createGroup}>Create group</button>
				</div>
			)
		} else {
			return(
				<div>
					<div className='subHeading'>Create a group to help each other get tasks done!</div>
					<div className='spacer30'></div>
					<button className='buttonBlue jumbo' onClick={this.createGroup}>Create group</button>
					<div className='spacer30'></div>
					<div>
						<input placeholder='Group Name....' className='inputBox'></input>
					</div>
					{addedFriends}
					<div className='flex1Line'>
						<FriendSearch Friend={this.Friend} blank={this.state.friend} 
									placeHolder={'Add Friends to your group....'}
									input={this.state.friend} />
						<button className={this.state.addClass} onClick={this.addFriend}>add</button>
					</div>
					{this.createGroupButton()}
				</div>
			)
		}
		
	}
}

export default CreateGroup;