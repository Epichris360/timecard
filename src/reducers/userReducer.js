import constants from '../constants'

const initialState = {
	role:'normal',
	id:''
}
export default (state = initialState, action) => {

	switch (action.type) {

		case constants.CURRENT_USER_RECEIVED:
			return action.data

		case constants.USER_CREATED:
			return action.data
		case constants.LOGOUT_USER:
			return initialState

		default:
			return state
	}
}