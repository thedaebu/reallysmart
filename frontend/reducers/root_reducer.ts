import { combineReducers } from "redux";
import entitiesReducer from "./entities_reducer";
import { Reducer } from "@reduxjs/toolkit";

const rootReducer: Reducer = combineReducers({
    entities: entitiesReducer
});

export default rootReducer;