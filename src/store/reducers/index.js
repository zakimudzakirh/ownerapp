import { combineReducers } from 'redux';

import masterReducer from './master';

const rootReducer = combineReducers({
    master: masterReducer
})

export default rootReducer;