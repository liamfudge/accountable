import React from 'react';

import { connect } from 'react-redux';
import { registerUser } from '../../../Actions/PostActions';

import { Link } from 'react-router-dom';

import './Register.css';

class Register3 extends React.Component {
	constructor() {
		super()
		this.state = {
			route: false,
			warning: '',
			goal1: '',
			goal2: ''
		}
	}
	goal1 = (e) => {
		this.setState({goal1: e.target.value});
		this.runTest();
	}
	goal2 = (e) => {
		this.setState({goal2: e.target.value});
		this.runTest();
	}
	runTest = () => {
		setTimeout(() => {
			if(this.state.goal1 === '' || this.state.goal2 === '') {
				this.setState({route: false});
			} else {
				this.setState({route: true});
				this.setState({warning: ''});
			}
		}, 10)
	}
	next = () => {
		this.setState({warning: 'please enter 2 goals'})
	}
	submitGoals = () => {
		// this.props.registerUser({
		// 	id: this.props.registeredUser.id,
		// 	name: this.props.registeredUser.name,
		// 	lastName: this.props.registeredUser.lastName,
		// 	email: this.props.registeredUser.email,
		// 	password: this.props.registeredUser.password,
		// 	picture: this.props.registeredUser.picture,
		// 	goal1: this.state.goal1,
		// 	goal2: this.state.goal2
		// })
	}
	render() {
		if(this.state.route === false){
			return(
				<div className='centerPage'>
					<div className='signinBox'>
						<div className='heading2'>Set 2 big goals!</div>
						<div className='spacer30'></div>
						<div>
							<div className='greyText'>Big Goal!</div>
							<input onChange={this.goal1} className='inputBox' placeholder='....1 month goal'></input>
						</div>
						<div className='spacer30'></div>
						<div>
							<div className='greyText'>Major Goal!</div>
							<input onChange={this.goal2} className='inputBox' placeholder='....12 month goal'></input>
						</div>

						<div className='spacer30'></div>
						
						<div>
							<button onClick={this.next} className='SigninButton buttonBlue'>Next</button>
						</div>

							
						<div className='warning'>{this.state.warning}</div>
					</div>
				</div>
			)
		} else {
			return(
				<div className='centerPage'>
					<div className='signinBox'>
						<div className='heading2'>Set 2 big goals!</div>
						<div className='spacer30'></div>
						<div>
							<div className='greyText'>Big Goal!</div>
							<input onChange={this.goal1} className='inputBox' placeholder='....6 month goal'></input>
						</div>
						<div className='spacer30'></div>
						<div>
							<div className='greyText'>Major Goal!</div>
							<input onChange={this.goal2} className='inputBox' placeholder='....12 month goal'></input>
						</div>

						<div className='spacer30'></div>
						
						<div>
							<Link to='/Register4'>
								<button onClick={this.submitGoals} className='SigninButton buttonBlue'>Next</button>
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
