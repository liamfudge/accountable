import { FRIEND_SELECTED, REGISTER, REQUEST_NUMBER, USERS_FRIENDS, FORGOT_PASSWORD } from './Types';

export const friendSelected = (data) => dispatch => {
	dispatch({
		type: FRIEND_SELECTED,
		payload: data
	})
}
export const registerUser = (data) => dispatch => {
	dispatch({
		type: REGISTER,
		payload: data
	})
}
export const requestNumber = (data) => dispatch => {
	dispatch({
		type: REQUEST_NUMBER,
		payload: data
	})
}
export const usersFriends = (data) => dispatch => {
	dispatch({
		type: USERS_FRIENDS,
		payload: data
	})
}
export const forgotPassword = (data) => dispatch => {
	dispatch({
		type: FORGOT_PASSWORD,
		payload: data
	})
}
