import constants from '../constants'

const initialState = []

export default (state = initialState, action) => {
    let newState 
	switch (action.type) {

        case constants.GET_PROJECTS:
            return action.data
        
        case constants.NEW_PROJECT:
            newState = state
            newState.push(action.data)
            return newState
            
		default:
			return state
	}
}