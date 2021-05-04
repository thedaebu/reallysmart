import * as SearchApiUtil from "./../util/search_api_util";

export const RECEIVE_SEARCHES = "RECEIVE_SEARCHES";

const receiveSearches = (searches) => {
    return ({
        type: RECEIVE_SEARCHES,
        searches
    });
};

export const fetchSearches = search => dispatch => {
    return (
        SearchApiUtil.fetchSearches(search).then(searches => dispatch(receiveSearches(searches)))
    );
};