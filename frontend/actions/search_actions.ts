import { Dispatch } from "react";
import { IndexTrack, ReceivedSearches, SearchAction } from "../my_types";
import * as SearchAPIUtil from "./../util/api/search_api_util";

export const RECEIVE_SEARCHES: string = "RECEIVE_SEARCHES";

const receiveSearches: Function = ({ searches }: {searches: {[key: number]: IndexTrack}}) => ({
    searches,
    type: RECEIVE_SEARCHES
});

export const fetchSearches: Function = (search: string) => (dispatch: Dispatch<SearchAction>) => (
    SearchAPIUtil.fetchSearches(search)
        .then((receivedSearches: ReceivedSearches) => dispatch(receiveSearches(receivedSearches)))
);