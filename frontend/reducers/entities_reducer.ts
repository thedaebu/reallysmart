import { combineReducers } from "redux";
import accountReducer from "./account_reducer";
import annotationsReducer from "./annotations_reducer";
import commentsReducer from "./comments_reducer";
import flashMessageReducer from "./flash_message_reducer";
import indexTracksReducer from "./index_tracks_reducer";
import searchesReducer from "./searches_reducer";
import trackReducer from "./track_reducer";
import userReducer from "./user_reducer";
import { Reducer } from "@reduxjs/toolkit";

const entitiesReducer: Reducer = combineReducers({
    account: accountReducer,
    annotations: annotationsReducer,
    comments: commentsReducer,
    flashMessage: flashMessageReducer,
    indexTracks: indexTracksReducer,
    searches: searchesReducer,
    track: trackReducer,
    user: userReducer
});

export default entitiesReducer;