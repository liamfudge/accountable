import { FRIEND_SELECTED, REGISTER, REQUEST_NUMBER, USERS_FRIENDS, FORGOT_PASSWORD } from '../Actions/Types';

const initialState = {
	whichFriend: [],
	registeredUser: [],
	requestNumber: '',
	usersFriends: [],
	forgotPassword: false,
}

export default function(state = initialState, action) {
	switch(action.type) {
		case FRIEND_SELECTED:
			return {
				...state,
				whichFriend: action.payload
			}
		case REGISTER:
			return {
				...state,
				registeredUser: action.payload
			}
		case REQUEST_NUMBER:
			return {
				...state,
				requestNumber: action.payload
			}
		case USERS_FRIENDS:
			return {
				...state,
				usersFriends: action.payload
			}
		case FORGOT_PASSWORD:
			return {
				...state,
				forgotPassword: action.payload
			}
		default:
			return state;
	}
}