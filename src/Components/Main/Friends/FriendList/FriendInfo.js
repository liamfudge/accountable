import React from 'react';

import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import './FriendList.css';

class FriendInfo extends React.Component {

	backButton = () => {
		console.log(this.props.whichFriend);
	}
	switchView = (e) => {
		this.props.switchView && this.props.switchView(e);
	}
	render() {
		return(
			<div className='friendTable'>
				<div className='friendListHeading'>
					{/*<Link to={'/friends'} className='unLink'>Back</Link>*/}
					<div onClick={this.switchView} style={{cursor: 'pointer'}}>back</div>
				</div>
				<img src={require(`../../../ProfilePics/${this.props.whichFriend.profilepic}.png`)} 
			   				className='ppTiny' alt=''></img>
				<div className='friendNameInfo'>{this.props.whichFriend.firstname} {this.props.whichFriend.surname}</div>
				
			</div>
		)
	}
}

const mapStateToProps = state => ({
	whichFriend: state.posts.whichFriend
})

export default connect(mapStateToProps, {})(FriendInfo);