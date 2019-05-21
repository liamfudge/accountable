import React from 'react';

import { connect } from 'react-redux';

import FriendList from './FriendList';
import '../../SetTask/animationStyle.css';

var db = [];

class FriendSearch extends React.Component {
	constructor() {
		super()
		this.state ={
			show: false,
			searchFeild: '',
			database: [],
			searchClass: 'goalSearchClass1',
			whichFriend: '',
			anyRelationships: []
		}
	}
	componentWillMount = () => {
		this.checkRelationships();
		setTimeout(() => {
			this.getUsers();
		}, 100);
		
  	}
  	checkRelationships = () => {
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
					// console.log(data);
					for(let i = 0; i < data.length; i++){
						this.state.anyRelationships.push(data[i]);
					}
				})
		fetch('http://localhost:3000/myFriends', {
					method: 'post',
					headers: {'Content-Type': 'application/json'},
					body: JSON.stringify({
						email: this.props.registeredUser.email,
						status: 0
					})
				})
				.then(response => response.json())
				.then(data => {
					// console.log(data);
					for(let i = 0; i < data.length; i++){
						this.state.anyRelationships.push(data[i]);
					}
				})
  	}
  	getUsers = () => {
  		db = []
    	fetch('http://localhost:3000/userData')
			.then(response => response.json())
			.then(data => {

				for(let i = 0; i < data.length; i++){
					let conflict = false;
					for(let g = 0; g < this.state.anyRelationships.length; g++){
						if(this.state.anyRelationships[g].userone === data[i].email || this.state.anyRelationships[g].usertwo === data[i].email){
							conflict = true
						}

					}

					if(conflict === false){
						if(data[i].email === this.props.registeredUser.email) {

						} else {
							db.push(data[i]);
						}
					}
					
				}
				this.setState({database: db});
				// console.log(this.state.database);
			})
  	}
	friendInput = (e) => {
		this.setState({whichFriend: e.target.value})
	}
	friendClick = () => {
		this.showModal();
		this.setState({searchClass: 'goalSearchClass2'});
		this.setState({whichFriend: ''})
	}
	showModal = () => {
		this.setState({show: !this.state.show});
		if(this.state.searchClass === 'goalSearchClass2') {
			this.setState({searchClass: 'goalSearchClass1'});
		}
	}
	receiveFriend = (e) => {
		this.props.Friend && this.props.Friend(e);
		let userInfo = [];
		this.setState({whichFriend: String(e.firstname + ' ' + e.surname)})		
		for (let i = 0; i < this.state.database.length; i++){
			if(this.state.database[i].firstname === e.name) {
				userInfo = this.state.database[i];
				this.props.Friend && this.props.Friend(userInfo);
			}
		}
	}
	render() {
		const filterFriends = this.state.database.filter(friend => {
			return String(friend.firstname + friend.surname).toLowerCase().includes(this.state.whichFriend.toLowerCase());


			// TODO; explore fuse.js for fuzy search here
		})
		if(this.state.database.length > 0){
			return(
				<div>
						<input onClick={this.friendClick} 
						onChange={this.friendInput}
						placeholder={this.props.placeHolder}
						value={this.state.whichFriend}
						className={this.state.searchClass}
						>
						</input>
					
						<FriendList show={this.state.show}
							onClose={this.showModal}
							searchFeild={this.state.searchFeild}
							database={filterFriends}
							receiveFriend={this.receiveFriend}
						>
						</FriendList>	
					
				</div>
			)
		} else {
			return(
				<div>
						<input onClick={this.friendClick} 
						onChange={this.friendInput}
						placeholder={this.props.placeHolder}
						value={this.state.whichFriend}
						className={this.state.searchClass}
						>
						</input>
					
						<FriendList show={this.state.show}
							onClose={this.showModal}
							searchFeild={this.state.searchFeild}
							database={filterFriends}
							receiveFriend={this.receiveFriend}
						>
						</FriendList>					
				</div>
			)
		}
		
	}
}

const mapStateToProps = state => ({
  registeredUser: state.posts.registeredUser,
  usersFriends: state.posts.usersFriends
})

export default connect(mapStateToProps, {})(FriendSearch);





