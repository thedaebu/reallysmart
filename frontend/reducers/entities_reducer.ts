import { combineReducers } from "redux";
import annotationsReducer from "./annotations_reducer";
import commentsReducer from "./comments_reducer";
import searchesReducer from "./searches_reducer";
import tracksReducer from "./tracks_reducer";
import userReducer from "./user_reducer";
import votesReducer from "./votes_reducer";

const entitiesReducer = combineReducers({
    annotations: annotationsReducer,
    comments: commentsReducer,
    searches: searchesReducer,
    tracks: tracksReducer,
    user: userReducer,
    votes: votesReducer
});

export default entitiesReducer;
