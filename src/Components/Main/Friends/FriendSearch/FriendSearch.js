import React from 'react';

import FriendList from './FriendList';
import './FriendSearch.css';

var DB = [];

class FriendSearch extends React.Component {
	constructor() {
		super()
		this.state ={
			show: false,
			searchFeild: '',
			database: DB,
			searchClass: 'searchClass1'
		}
	}
	componentWillMount = () => {
    	fetch('http://localhost:3000/friendList')
			.then(response => response.json())
			.then(data => {
				for(let i = 0; i < data.length; i++){
					DB.push(data[i]);
				}
			})
  	}
  	componentWillUnmount() {
    	DB = [];
  	}
	friendInput = (e) => {
		this.setState({searchFeild: e.target.value})
	}
	friendClick = () => {
		this.showModal();
		this.setState({searchClass: 'searchClass2'});
	}
	showModal = () => {
		this.setState({show: !this.state.show});
		if(this.state.searchClass === 'searchClass2') {
			this.setState({searchClass: 'searchClass1'});
		}
	}
	render() {
		const filterFriends = this.state.database.filter(friend => {
			return String(friend.name + friend.lastName).toLowerCase().includes(this.state.searchFeild.toLowerCase());

			// TODO; explore fuse.js for fuzy search here
		})
		return(
			<div>
				
					<input onClick={this.friendClick} 
					onChange={this.friendInput}
					placeholder='search people you may know....'
					className={this.state.searchClass}
					>
					</input>
				
					<FriendList show={this.state.show}
						onClose={this.showModal}
						searchFeild={this.state.searchFeild}
						database={filterFriends}
					>
					</FriendList>	
				
			</div>
		)
	}
}

export default FriendSearch;





