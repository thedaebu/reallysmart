import { combineReducers } from "redux";
import accountsReducer from "./account_reducer";
import annotationsReducer from "./annotations_reducer";
import commentsReducer from "./comments_reducer";
import flashMessageReducer from "./flash_message_reducer";
import indexTracksReducer from "./index_tracks_reducer";
import searchesReducer from "./searches_reducer";
import trackReducer from "./track_reducer";
import userReducer from "./user_reducer";

const entitiesReducer = combineReducers({
    account: accountsReducer,
    annotations: annotationsReducer,
    comments: commentsReducer,
    flashMessage: flashMessageReducer,
    indexTracks: indexTracksReducer,
    searches: searchesReducer,
    track: trackReducer,
    user: userReducer
});

export default entitiesReducer;
