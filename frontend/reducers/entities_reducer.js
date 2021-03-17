import { combineReducers } from 'redux';
import tracksReducer from './tracks_reducer';

import usersReducer from './users_reducer';

const entitiesReducer = combineReducers({
    users: usersReducer,
    tracks: tracksReducer,
    
});

export default entitiesReducer;
