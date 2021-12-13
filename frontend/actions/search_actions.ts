import { Dispatch } from "react";
import { AnyAction } from "redux";
import * as SearchApiUtil from "./../util/search_api_util";

export const RECEIVE_SEARCHES = "RECEIVE_SEARCHES";
export const CLEAR_SEARCHES = "CLEAR_SEARCHES";

type Searches = {
    [key: number]: Track
}
interface Track {
    annotation_ids: Array<number>,
    artist: string,
    artwork_path: string,
    comment_ids: Array<number>,
    id: number,
    lyrics: string,
    title: string
}

const receiveSearches = (searches: Searches) => {
    return ({
        type: RECEIVE_SEARCHES,
        searches
    });
};

export const clearSearches = () => {
    return ({
        type: CLEAR_SEARCHES
    });
};

export const fetchSearches = (search: string) => (dispatch: Dispatch<AnyAction>) => {
    return (
        SearchApiUtil.fetchSearches(search).then(searches => dispatch(receiveSearches(searches)))
    );
};