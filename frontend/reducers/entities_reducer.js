import { combineReducers } from 'redux';
import annotationsReducer from './annotations_reducer';
import commentsReducer from './comments_reducer';
import tracksReducer from './tracks_reducer';
import usersReducer from './users_reducer';

const entitiesReducer = combineReducers({
    users: usersReducer,
    tracks: tracksReducer,
    annotations: annotationsReducer,

    comments: commentsReducer

});

export default entitiesReducer;
