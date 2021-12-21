import { combineReducers } from "redux";
import annotationModalReducer from "./annotation_modal_reducer";

const modalReducer = combineReducers({
    annotationModal: annotationModalReducer
});

export default modalReducer;