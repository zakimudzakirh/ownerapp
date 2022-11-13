import { CLEAR_MASTER, SET_MASTER } from "@store/actions/master"

const initialState = {
    firstName: null,
    lastName: null
}

export default (state = initialState, action) => {
    switch(action.type) {
        case SET_MASTER: {
            return {
                ...state,
                firstName: action.master.firstName,
                lastName: action.master.lastName,
            }
        }
        case CLEAR_MASTER: {
            return initialState;
        }
        default: {
            return state;
        }
    }
}