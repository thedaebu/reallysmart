import { Dispatch } from "react";
import * as SearchAPIUtil from "./../util/api/search_api_util";
import { IndexTrack, ReceivedSearches, SearchAction } from "../my_types";

export const RECEIVE_SEARCHES: string = "RECEIVE_SEARCHES";

const receiveSearches: Function = ({ searches }: { searches: {[key: number]: IndexTrack}; }) => ({
    searches,
    type: RECEIVE_SEARCHES
});

export const fetchSearches: Function = (search: string) => (dispatch: Dispatch<SearchAction>) => (
    SearchAPIUtil.fetchSearches(search)
        .then((searches: ReceivedSearches) => dispatch(receiveSearches(searches)))
);