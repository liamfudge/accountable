import React from 'react';

import { Switch, Route } from 'react-router-dom';
import Friends from './Friends';
import FriendsId from './FriendsId';

const FriendRoute = () => (
	<div>
		<Switch>
			<Route exact path='/friends' component={Friends} />
			{/*<Route path='/friends/:id' component={FriendsId} />*/}
		</Switch>
	</div>
)

export default FriendRoute;