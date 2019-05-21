import React from 'react';

import { Switch, Route } from 'react-router-dom';
import Header from './Header';
import LoginHeader from './LoginHeader';


const HeaderControl = () => (
	<main>
		<Switch>
			<Route exact path='/' component={LoginHeader} />
			<Route path='/user' component={Header} />
			<Route path='/friends' component={Header} />
			<Route path='/schedule' component={Header} />
		</Switch>
	</main>
)

export default HeaderControl;