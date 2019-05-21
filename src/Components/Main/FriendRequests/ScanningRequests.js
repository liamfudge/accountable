import React from 'react';

import { connect } from 'react-redux';
import { requestNumber} from '../../../Actions/PostActions';

class ScanningRequests extends React.Component {
	constructor() {
		super()
		this.state = {
			intervalId: ''
		}
	}
	componentWillMount() {
		let intervalId = setInterval(() => {
			this.checkingDatabase();
		}, 100);
		this.setState({ intervalId: intervalId });
	}
	componentWillUnmount() {
		this.props.requestNumber('');
		clearInterval(this.state.intervalId);
	}

	checkingDatabase = () => {
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
					this.props.requestNumber(data.length);
				})
	}
	render() {
		// if(this.state.requestnumber > 0){
		// 	return(
		// 		<div className='requestNumber'>{this.state.requestnumber}</div>
		// 	)
		// } else {
		// 	return null;
		// }
		return(
			<div></div>
		)
		
	}
}

const mapStateToProps = state => ({
	registeredUser: state.posts.registeredUser
})

export default connect(mapStateToProps, { requestNumber })(ScanningRequests);