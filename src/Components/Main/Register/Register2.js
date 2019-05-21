import React from 'react';

// profile pics import
	import pp1 from '../../ProfilePics/pp1.png';
	import pp2 from '../../ProfilePics/pp2.png';
	import pp3 from '../../ProfilePics/pp3.png';
	import pp4 from '../../ProfilePics/pp4.png';
	import pp5 from '../../ProfilePics/pp5.png';
	import pp6 from '../../ProfilePics/pp6.png';
	import pp7 from '../../ProfilePics/pp7.png';
	import pp8 from '../../ProfilePics/pp8.png';
	import pp9 from '../../ProfilePics/pp9.png';

import { Link } from 'react-router-dom';

import { connect } from 'react-redux';
import { registerUser } from '../../../Actions/PostActions';

import './Register.css';

class Register2 extends React.Component {
	constructor() {
		super()
		this.state = {
			route: false,
			warning: '',
			pic1Class: 'profilePic',
			pic2Class: 'profilePic',
			pic3Class: 'profilePic',
			pic4Class: 'profilePic',
			pic5Class: 'profilePic',
			pic6Class: 'profilePic',
			pic7Class: 'profilePic',
			pic8Class: 'profilePic',
			pic9Class: 'profilePic',
			picSelected: false,
			whichPic: ''
		}
	}
	// picture clicks
		pic1Clicked = () => {
			this.setState({pic1Class: 'profilePicSelected'});
			this.setState({picSelected: true});
			this.setState({whichPic: 'pp1'});

			this.setState({pic2Class: 'profilePicDull'});
			this.setState({pic3Class: 'profilePicDull'});
			this.setState({pic4Class: 'profilePicDull'});
			this.setState({pic5Class: 'profilePicDull'});
			this.setState({pic6Class: 'profilePicDull'});
			this.setState({pic7Class: 'profilePicDull'});
			this.setState({pic8Class: 'profilePicDull'});
			this.setState({pic9Class: 'profilePicDull'});
		}
		pic2Clicked = () => {
			this.setState({pic2Class: 'profilePicSelected'});
			this.setState({picSelected: true});
			this.setState({whichPic: 'pp3'});

			this.setState({pic1Class: 'profilePicDull'});
			this.setState({pic3Class: 'profilePicDull'});
			this.setState({pic4Class: 'profilePicDull'});
			this.setState({pic5Class: 'profilePicDull'});
			this.setState({pic6Class: 'profilePicDull'});
			this.setState({pic7Class: 'profilePicDull'});
			this.setState({pic8Class: 'profilePicDull'});
			this.setState({pic9Class: 'profilePicDull'});
		}
		pic3Clicked = () => {
			this.setState({pic3Class: 'profilePicSelected'});
			this.setState({picSelected: true});
			this.setState({whichPic: 'pp3'});

			this.setState({pic2Class: 'profilePicDull'});
			this.setState({pic1Class: 'profilePicDull'});
			this.setState({pic4Class: 'profilePicDull'});
			this.setState({pic5Class: 'profilePicDull'});
			this.setState({pic6Class: 'profilePicDull'});
			this.setState({pic7Class: 'profilePicDull'});
			this.setState({pic8Class: 'profilePicDull'});
			this.setState({pic9Class: 'profilePicDull'});
		}
		pic4Clicked = () => {
			this.setState({pic4Class: 'profilePicSelected'});
			this.setState({picSelected: true});
			this.setState({whichPic: 'pp4'});

			this.setState({pic2Class: 'profilePicDull'});
			this.setState({pic3Class: 'profilePicDull'});
			this.setState({pic1Class: 'profilePicDull'});
			this.setState({pic5Class: 'profilePicDull'});
			this.setState({pic6Class: 'profilePicDull'});
			this.setState({pic7Class: 'profilePicDull'});
			this.setState({pic8Class: 'profilePicDull'});
			this.setState({pic9Class: 'profilePicDull'});
		}
		pic5Clicked = () => {
			this.setState({pic5Class: 'profilePicSelected'});
			this.setState({picSelected: true});
			this.setState({whichPic: 'pp5'});

			this.setState({pic2Class: 'profilePicDull'});
			this.setState({pic3Class: 'profilePicDull'});
			this.setState({pic4Class: 'profilePicDull'});
			this.setState({pic1Class: 'profilePicDull'});
			this.setState({pic6Class: 'profilePicDull'});
			this.setState({pic7Class: 'profilePicDull'});
			this.setState({pic8Class: 'profilePicDull'});
			this.setState({pic9Class: 'profilePicDull'});
		}
		pic6Clicked = () => {
			this.setState({pic6Class: 'profilePicSelected'});
			this.setState({picSelected: true});
			this.setState({whichPic: 'pp6'});

			this.setState({pic2Class: 'profilePicDull'});
			this.setState({pic3Class: 'profilePicDull'});
			this.setState({pic4Class: 'profilePicDull'});
			this.setState({pic5Class: 'profilePicDull'});
			this.setState({pic1Class: 'profilePicDull'});
			this.setState({pic7Class: 'profilePicDull'});
			this.setState({pic8Class: 'profilePicDull'});
			this.setState({pic9Class: 'profilePicDull'});
		}
		pic7Clicked = () => {
			this.setState({pic7Class: 'profilePicSelected'});
			this.setState({picSelected: true});
			this.setState({whichPic: 'pp7'});

			this.setState({pic2Class: 'profilePicDull'});
			this.setState({pic3Class: 'profilePicDull'});
			this.setState({pic4Class: 'profilePicDull'});
			this.setState({pic5Class: 'profilePicDull'});
			this.setState({pic6Class: 'profilePicDull'});
			this.setState({pic1Class: 'profilePicDull'});
			this.setState({pic8Class: 'profilePicDull'});
			this.setState({pic9Class: 'profilePicDull'});
		}
		pic8Clicked = () => {
			this.setState({pic8Class: 'profilePicSelected'});
			this.setState({picSelected: true});
			this.setState({whichPic: 'pp8'});

			this.setState({pic2Class: 'profilePicDull'});
			this.setState({pic3Class: 'profilePicDull'});
			this.setState({pic4Class: 'profilePicDull'});
			this.setState({pic5Class: 'profilePicDull'});
			this.setState({pic6Class: 'profilePicDull'});
			this.setState({pic7Class: 'profilePicDull'});
			this.setState({pic1Class: 'profilePicDull'});
			this.setState({pic9Class: 'profilePicDull'});
		}
		pic9Clicked = () => {
			this.setState({pic9Class: 'profilePicSelected'});
			this.setState({picSelected: true});
			this.setState({whichPic: 'pp9'});

			this.setState({pic2Class: 'profilePicDull'});
			this.setState({pic3Class: 'profilePicDull'});
			this.setState({pic4Class: 'profilePicDull'});
			this.setState({pic5Class: 'profilePicDull'});
			this.setState({pic6Class: 'profilePicDull'});
			this.setState({pic7Class: 'profilePicDull'});
			this.setState({pic8Class: 'profilePicDull'});
			this.setState({pic1Class: 'profilePicDull'});
		}
	next = () => {
		this.setState({warning: 'please select a profile picture!'})
		console.log(this.props.registeredUser)
	}
	submitPicture = () => {
		console.log(this.state.whichPic);
		fetch('http://localhost:3000/registerPic', {
					method: 'post',
					headers: {'Content-Type': 'application/json'},
					body: JSON.stringify({
						email: this.props.registeredUser.email,
						profilepic: this.state.whichPic
					})
				})
				.then(response => response.json())
				.then(data => {
					console.log(data)
				})
		// this.props.registerUser({
		// 	firstname: this.props.registeredUser.firstname,
		// 	surname: this.props.registeredUser.surname,
		// 	email: this.props.registeredUser.email
		// })
	}
	render() {
		if(this.state.picSelected === false){
			return(
				<div className='centerPage'>
					<div className='signinBox'>
						<div className='heading2'>Choose A profile pic!</div>
						<div className='spacer30'></div>

						<div className='picGroupContainer'>
							<div className='picContainer'>
								<img src={pp1} className={this.state.pic1Class} onClick={this.pic1Clicked} alt='pic' />
							</div>
							<div className='picContainer'>
								<img src={pp2} className={this.state.pic2Class} onClick={this.pic2Clicked} alt='pic' />
							</div>
							<div className='picContainer'>
								<img src={pp3} className={this.state.pic3Class} onClick={this.pic3Clicked} alt='pic' />
							</div>
						</div>
						<div className='picGroupContainer'>
							<div className='picContainer'>
								<img src={pp4} className={this.state.pic4Class} onClick={this.pic4Clicked} alt='pic' />
							</div>
							<div className='picContainer'>
								<img src={pp5} className={this.state.pic5Class} onClick={this.pic5Clicked} alt='pic' />
							</div>
							<div className='picContainer'>
								<img src={pp6} className={this.state.pic6Class} onClick={this.pic6Clicked} alt='pic' />
							</div>
						</div>
						<div className='picGroupContainer'>
							<div className='picContainer'>
								<img src={pp7} className={this.state.pic7Class} onClick={this.pic7Clicked} alt='pic' />
							</div>
							<div className='picContainer'>
								<img src={pp8} className={this.state.pic8Class} onClick={this.pic8Clicked} alt='pic' />
							</div>
							<div className='picContainer'>
								<img src={pp9} className={this.state.pic9Class} onClick={this.pic9Clicked} alt='pic' />
							</div>
						</div>

						<div className='spacer30'></div>
						
						<div>
							<button onClick={this.next} className='SigninButton buttonBlue'>next</button>
						</div>

							
						<div className='warning'>{this.state.warning}</div>
					</div>
				</div>
			)
		} else {
			return(
				<div className='centerPage'>
					<div className='signinBox'>
						<div className='heading2'>Choose A profile pic!</div>
						<div className='spacer30'></div>

						<div className='picGroupContainer'>
							<div className='picContainer'>
								<img src={pp1} className={this.state.pic1Class} onClick={this.pic1Clicked} alt='pic' />
							</div>
							<div className='picContainer'>
								<img src={pp2} className={this.state.pic2Class} onClick={this.pic2Clicked} alt='pic' />
							</div>
							<div className='picContainer'>
								<img src={pp3} className={this.state.pic3Class} onClick={this.pic3Clicked} alt='pic' />
							</div>
						</div>
						<div className='picGroupContainer'>
							<div className='picContainer'>
								<img src={pp4} className={this.state.pic4Class} onClick={this.pic4Clicked} alt='pic' />
							</div>
							<div className='picContainer'>
								<img src={pp5} className={this.state.pic5Class} onClick={this.pic5Clicked} alt='pic' />
							</div>
							<div className='picContainer'>
								<img src={pp6} className={this.state.pic6Class} onClick={this.pic6Clicked} alt='pic' />
							</div>
						</div>
						<div className='picGroupContainer'>
							<div className='picContainer'>
								<img src={pp7} className={this.state.pic7Class} onClick={this.pic7Clicked} alt='pic' />
							</div>
							<div className='picContainer'>
								<img src={pp8} className={this.state.pic8Class} onClick={this.pic8Clicked} alt='pic' />
							</div>
							<div className='picContainer'>
								<img src={pp9} className={this.state.pic9Class} onClick={this.pic9Clicked} alt='pic' />
							</div>
						</div>

						<div className='spacer30'></div>
						
						<div>
							<Link to='/Register3'>
								<button onClick={this.submitPicture} className='SigninButton buttonBlue'>next</button>
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

export default connect(mapStateToProps, { registerUser })(Register2);

