import React, { MouseEvent, useEffect } from "react";
import { useSelector } from "react-redux";
import { useLocation } from "react-router";
import { IndexTrack, State } from "../../my_types";
import MemoizedSearchIndexItem from "./search_index_item";

function SearchIndex({ clearSearchField, searchField }: { clearSearchField: Function, searchField: string }) {
    const searches: Array<IndexTrack> = useSelector((state: State) => Object.values(state.entities.searches));

    const location: string = useLocation().pathname;

    useEffect(() => {
        clearSearchField();
    }, [location])

    function clearSearch(e: MouseEvent<HTMLUListElement>) {
        e.preventDefault();

        clearSearchField();
    }

    function searchResult() {
        if (searchField !== "" && searches.length > 0) {
            return (
                <div className="search-index" data-testid="search-index">
                    <p className="search-index__results">SEARCH RESULTS</p>
                    <p className="search-index__songs">SONGS</p>
                    <ul className="search-index__items" onClick={clearSearch}>
                        {searches.slice(0, 5).map((track: IndexTrack, idx: number) => {
                            return (
                                <MemoizedSearchIndexItem
                                    key={idx}
                                    track={track}
                                />
                            );
                        })}
                    </ul>
                </div>
            );
        } else if (searchField !== "" && searches.length === 0) {
            return (
                <div className="search-index">
                    <p className="search-index__results">SEARCH RESULTS</p>
                    <p className="search-index__no-results">No results</p>
                </div>
            );
        } else {
            return (
                null
            );
        }
    }

    return (
        <>
            {searchResult()}
        </>
    );
}

export default SearchIndex;