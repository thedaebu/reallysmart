import { combineReducers } from "redux";
import annotationModalReducer from "./annotation_modal_reducer";
import searchbarModalReducer from "./searchbar_modal_reducer";

const modalReducer = combineReducers({
    searchbarModal: searchbarModalReducer,
    annotationModal: annotationModalReducer
});

export default modalReducer;