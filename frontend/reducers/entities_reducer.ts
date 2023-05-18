import { combineReducers } from "redux";
import annotationsReducer from "./annotations_reducer";
import commentsReducer from "./comments_reducer";
import indexTracksReducer from "./index_tracks_reducer";
import searchesReducer from "./searches_reducer";
import trackReducer from "./track_reducer";
import userReducer from "./user_reducer";
import accountsReducer from "./account_reducer";

const entitiesReducer = combineReducers({
    account: accountsReducer,
    annotations: annotationsReducer,
    comments: commentsReducer,
    indexTracks: indexTracksReducer,
    searches: searchesReducer,
    track: trackReducer,
    user: userReducer
});

export default entitiesReducer;
