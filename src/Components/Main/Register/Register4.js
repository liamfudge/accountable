import React from 'react';

import { connect } from 'react-redux';
import { registerUser } from '../../../Actions/PostActions';

import { Link } from 'react-router-dom';

import FriendSearch from './FriendSearch/FriendSearch';
import RegisterReqModal from './RegisterRequestModal';

import './Register.css';

class Register3 extends React.Component {
	constructor() {
		super()
		this.state = {
			route: false,
			warning: '',
			friend: [],
			addClass: 'greenButton1',
			showPopup: false,
			friendsToDisplay: [],
			friendEmail: '',
		}
	}
	Friend = (e) => {
		console.log(e)
		setTimeout(() => {
			this.setState({friend: String(e.firstname + ' ' + e.surname)});
			this.setState({friendEmail: e.email});
		}, 10);
		
		// this.setState( {route: true});
		this.setState({warning: ''})
		setTimeout(() => {
			this.setState({addClass: 'greenButton2'})
		},10)
		setTimeout(() => {
			this.setState({addClass: 'greenButton3'})
		},200)
	}
	next = () => {
		this.setState({warning: 'Please ad a freind before finishing!'})
	}
	addClick = () => {
		this.setState({showPopup: true});
	}
	closePopup = () => {
		this.setState({showPopup: !this.state.showPopup})
		this.setState( {route: true});
		this.state.friendsToDisplay.push(this.state.friend);
	}

	finish = () => {
		fetch('http://localhost:3000/userData')
			.then(response => response.json())
			.then(data => {
				
				for(let i = 0; i < data.length; i++){
					if(data[i].email === this.props.registeredUser.email){
						this.props.registerUser(data[i])
					}
				}
			})
	}
	friendsAdded = () => {
		return this.state.friendsToDisplay.map(friend => {
			return(
				<div className='subHeading'>{friend}</div>
			)
		})
			
	}
	render() {
		if(this.state.route === false){
			return(
				<div className='centerPage'>
					<div className='signinBox'>
						<div className='heading2'>Search for friends!</div>
						<div className='spacer30'></div>
						<div>
							<div className='greyTextCenter'>See if any of your friends are using</div>
							<div className='greyTextCenter'>accountable and add them to hold you accountable</div>
							<div className='spacer20'></div>
							<div className='singleLine'>
								<FriendSearch Friend={this.Friend} blank={this.state.friend} 
										placeHolder={'Who will hold you accountable?'}
										input={this.state.friend}
										/>
								<button className={this.state.addClass} onClick={this.addClick}>add</button>
							</div>
						</div>
						<div className='spacer30'></div>
						
						<RegisterReqModal friend={this.state.friend} 
									showPopup={this.state.showPopup} 
									closePopup={this.closePopup}
									email={this.state.friendEmail}
									/>

						{this.friendsAdded()}
						<div className='spacer30'></div>
						
						<div>
							<button onClick={this.next} className='SigninButton buttonBlue'>finish!</button>
						</div>

							
						<div className='warning'>{this.state.warning}</div>
					</div>
				</div>
			)
		} else {
			return(
				<div className='centerPage'>
					<div className='signinBox'>
						<div className='heading2'>Search for friends!</div>
						<div className='spacer30'></div>
						<div>
							<div className='greyTextCenter'>See if any of your friends are using</div>
							<div className='greyTextCenter'>accountable and add them to hold you accountable</div>
							<div className='spacer20'></div>
							<div className='singleLine'>
								<FriendSearch Friend={this.Friend} blank={this.state.friend} 
											placeHolder={'Who will hold you accountable?'}
											input={this.state.friend}
											/>
								<button className={this.state.addClass} onClick={this.addClick}>add</button>
							</div>
						</div>
						<div className='spacer30'></div>
						
						<RegisterReqModal friend={this.state.friend} 
									showPopup={this.state.showPopup} 
									closePopup={this.closePopup}
									email={this.state.friendEmail}
									/>
						{this.friendsAdded()}
						<div className='spacer30'></div>
						
						<div>
							<Link to='/user'>
								<button onClick={this.finish} className='SigninButton buttonBlue'>finish!</button>
							</Link>
						</div>

							
						<div className='warning'>{this.state.warning}</div>
					</div>
				</div>
			)
		}
		
	}
}

const mapStateToProps = state => ({
  registeredUser: state.posts.registeredUser
})

export default connect(mapStateToProps, { registerUser })(Register3);
