import React from "react";
import { useSelector } from "react-redux";
import { IndexTrack, State } from "../../my_types";
import MemoizedSearchIndexItem from "./search_index_item";

function SearchIndex({ clearSearchField }: { clearSearchField: Function }) {
    const searches: {[key: number]: IndexTrack} = useSelector((state: State) => state.entities.searches);

    function searchResultDisplay() {
        const searchResults: Array<IndexTrack> = Object.values(searches);
        if (searchResults.length) {
            return (
                <div className="search-index" data-testid="search-index">
                    <p className="search-index__results">SEARCH RESULTS</p>
                    <p className="search-index__songs">SONGS</p>
                    <ul className="search-index__items" onClick={() => clearSearchField()}>
                        {searchResults.slice(0, 5).map((track: IndexTrack, idx: number) => (
                            <MemoizedSearchIndexItem track={track} key={idx} />
                        ))}
                    </ul>
                </div>
            );
        } else {
            return (
                <div className="search-index">
                    <p className="search-index__results">SEARCH RESULTS</p>
                    <p className="search-index__no-results">No results</p>
                </div>
            );
        }
    }

    return (
        <>
            {searchResultDisplay()}
        </>
    );
}

export default SearchIndex;