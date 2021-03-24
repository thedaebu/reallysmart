import { combineReducers } from 'redux';
import annotationsReducer from './annotations_reducer';
import annotatorsReducer from './annotators_reducer';
import commentsReducer from './comments_reducer';
import tracksReducer from './tracks_reducer';
import usersReducer from './users_reducer';

const entitiesReducer = combineReducers({
    users: usersReducer,
    tracks: tracksReducer,
    annotations: annotationsReducer,
    annotators: annotatorsReducer,
    comments: commentsReducer

});

export default entitiesReducer;
