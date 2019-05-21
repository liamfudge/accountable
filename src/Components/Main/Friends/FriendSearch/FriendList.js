import React from 'react';

import FriendRequestModal from './FriendRequestModal';

class FriendList extends React.Component {
	constructor() {
		super()
		this.state = {
			selectedFriend: '',
			showPopup: false
		}
	}
	componentWillMount() {
		setInterval(function() {
			this.assignClicks()
		}.bind(this), 100);
  	}
  	assignClicks = () => {
  		if(this.state.showPopup === false){
  			document.addEventListener('mousedown', this.handleClick, false);
  		} else {
  			document.removeEventListener('mouseDown', this.handleClick, false);
  		}
  	}
  	handleClick = (e) => {
  		if(this.state.showPopup === false){
	  		if(this.node) {
		      	if(this.node.contains(e.target)){
		      	} else {
		        	this.onClose(e);
		   		}
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
							{friend.name} {friend.lastName}
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
	}
	closePopup = () => {
		this.setState({showPopup: !this.state.showPopup})
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
					<FriendRequestModal friend={this.state.selectedFriend} 
									showPopup={this.state.showPopup} 
									closePopup={this.closePopup}
									/>
				</div>
			)
		}
	}
}

export default FriendList;