import { combineReducers } from "redux";
import annotationErrorsReducer from "./annotation_errors_reducer";
import commentErrorsReducer from "./comment_errors_reducer";
import sessionErrorsReducer from "./session_errors_reducer";

const errorsReducer = combineReducers({
    annotationErrors: annotationErrorsReducer,
    commentErrors: commentErrorsReducer,
    sessionErrors: sessionErrorsReducer
});

export default errorsReducer;