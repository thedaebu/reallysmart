import { combineReducers } from "redux";
import annotationErrorsReducer from "./annotation_errors_reducer";
import sessionErrorsReducer from "./session_errors_reducer";

const errorsReducer = combineReducers({
    annotationErrors: annotationErrorsReducer,
    sessionErrors: sessionErrorsReducer
});

export default errorsReducer;

