import React from 'react';

import { Switch, Route } from 'react-router-dom';
import Player from './Player';
import FullRoster from './FullRoster';

const Roster = () => (
	<div>
		<h2>this is the roster page</h2>
		<Switch>
			<Route exact path='/roster' component={FullRoster} />
			<Route path='/roster/:number' component={Player} />
		</Switch>
	</div>
)

export default Roster;