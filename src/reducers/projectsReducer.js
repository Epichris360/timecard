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

        case constants.UPDATE_PROJECT:
        return state.map(
            p => project(p,action)
        )
            
		default:
			return state
	}
}

const project = ( state = {}, action ) =>{
    
        switch (action.type) {
            
            case constants.UPDATE_PROJECT:
                return (state.id == action.data.id) ?
                    action.data : state
                    
            default:
                return state
        }
    }