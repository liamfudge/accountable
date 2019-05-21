import React from 'react';

import { Switch, Route } from 'react-router-dom';

import HomePage from './HomePage/HomePage';
import Home from './Home/Home';
import FriendRoute from './Friends/FriendRoute';
import Schedule from './Schedule';
import SigninHome from './Signin/SigninHome';
import Register from './Register/Register';
import Register2 from './Register/Register2';
import Register3 from './Register/Register3';
import Register4 from './Register/Register4';

// const fakeAuth = {
// 	isAuthenticated: false,
// 	authenticate(cb) {
// 		this.isAuthenticated = true
// 		setTimeout(cb, 100) // fake async delay
// 	},
// 	signout(cb) {
// 		this.isAuthenticated = false
// 		setTimeout(cb, 100)
// 	}
// }

// const Public = () => <h3>Public</h3>
// const Protected = () => <h3>Protected</h3>

// class Login extends React.Component {
// 	render() {
// 		return(
// 			<div>Login</div>
// 		)
// 	}
// }

const Main = () => (
	<main>
		<Switch>
			<Route exact path='/' component={HomePage} />
			<Route path='/signin' component={SigninHome} />
			<Route path='/register' component={Register} />
			<Route path='/register2' component={Register2} />
			<Route path='/register3' component={Register3} />
			<Route path='/register4' component={Register4} />
			<Route path='/user' component={Home} />
			<Route path='/friends' component={FriendRoute} />
			<Route path='/schedule' component={Schedule} />
			<Route path='*' component={() => '404 NIT FOUND'} />
		</Switch>
	</main>
)

export default Main;