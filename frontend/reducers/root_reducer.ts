import { combineReducers } from "redux";
import entitiesReducer from "./entities_reducer";
import modalReducer from "./modal_reducer";
import sessionReducer from "./session_reducer";

const rootReducer = combineReducers({
    entities: entitiesReducer,
    session: sessionReducer,
    modal: modalReducer
});

export default rootReducer;