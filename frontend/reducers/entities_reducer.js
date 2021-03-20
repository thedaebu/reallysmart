import { combineReducers } from 'redux';
import annotationReducer from './annotation_reducer';
import tracksReducer from './tracks_reducer';
import usersReducer from './users_reducer';

const entitiesReducer = combineReducers({
    users: usersReducer,
    tracks: tracksReducer,
    annotations: annotationReducer,

});

export default entitiesReducer;
