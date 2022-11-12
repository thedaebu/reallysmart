import { Dispatch } from "react";
import { AnyAction } from "redux";
import { IndexTrack, ReceivedSearches } from "../my_types";
import * as SearchAPIUtil from "./../util/api/search_api_util";

export const RECEIVE_SEARCHES: string = "RECEIVE_SEARCHES";
export const CLEAR_SEARCHES: string = "CLEAR_SEARCHES";

const receiveSearches: Function = ({ searches }: {searches: {[key: number]: IndexTrack}}) => ({
    searches,
    type: RECEIVE_SEARCHES
});
export const clearSearches: Function = () => ({
    type: CLEAR_SEARCHES
});

export const fetchSearches: Function = (search: string) => (dispatch: Dispatch<AnyAction>) => (
    SearchAPIUtil.fetchSearches(search)
        .then((receivedSearches: ReceivedSearches) => dispatch(receiveSearches(receivedSearches)))
);