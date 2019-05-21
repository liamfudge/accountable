import React from 'react';

import DisplayPic from '../../DisplayPic/DisplayPic';

class FriendList extends React.Component {
	constructor() {
		super()
		this.state = {
			selectedFriend: ''
		}
	}
	componentWillMount() {
		document.addEventListener('mousedown', this.handleClick, false);
  	}
  	componentWillUnmount() {
  		document.removeEventListener('mouseDown', this.handleClick, false);
  	}
  	handleClick = (e) => {
  		if(this.node) {
			if(this.node.contains(e.target)){
			} else {
				this.onClose(e);
			}
		}
  	}
	onClose = (e) => {
    	this.props.onClose && this.props.onClose(e);
  	}
	getFriendsForRender() {
		var friendMatches = this.props.database;
		var friendAmount = 0;
		return friendMatches.map((friend) => {
			if(friendAmount < 5) {
				friendAmount = friendAmount + 1;
				return(
					<div className='dropDownItem' key={friend.id} onClick={() => this.handleFriendClick(friend)}>
							<DisplayPic user={friend.firstname} class={'ppTiny2'} />
							<div className='spacer20'></div>
							{friend.firstname} {friend.surname}
					</div>
				)
			}
		})
	}
	handleFriendClick = (e) => {
		this.setState({showPopup: true})
		this.setState({selectedFriend: {
			name: e.name,
			id: e.id
		}})
		this.props.receiveFriend && this.props.receiveFriend(e);
		this.onClose();
	}
	
	render() {
		if(!this.props.show){
			return null;
		} else {
			return(
				<div className='backdropDropDown'>
					<div className='dropDownBox' ref={node => this.node = node}>
						{this.getFriendsForRender()}
					</div>
				</div>
			)
		}
	}
}

export default FriendList;