import React from 'react';

import FriendInfo from './FriendList/FriendInfo';
import FriendSearch from './FriendSearch/FriendSearch';

const FriendsId = () => (
	<div>
		<div className='spacer30'></div>
		<div className='heading'>Connections</div>
		<div className='subHeading'>Here are where you can see your connections and add new ones!</div>
		<div className='spacer30'></div>
		<FriendSearch />
		<div className='spacer30'></div>
		<FriendInfo />
	</div>
)

export default FriendsId;