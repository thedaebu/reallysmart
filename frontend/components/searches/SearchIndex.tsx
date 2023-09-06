import React from "react";
import { useSelector } from "react-redux";
import MemoizedSearchItem from "./SearchItem";
import { IndexTrack, State } from "../../my_types";

function SearchIndex({ clearSearchField }: { clearSearchField: Function; }) {
    const searches: { [key: number]: IndexTrack; } = useSelector((state: State) => state.entities.searches);
    const searchResults: Array<IndexTrack> = Object.values(searches);

    return (
        <div className="search-index" data-testid="search-index">
            <p className="search-index__results">SEARCH RESULTS</p>
            {searchResults.length ? (
                <>
                    <p className="search-index__songs">SONGS</p>
                    <ul className="search-items" onClick={() => clearSearchField()}>
                        {searchResults.slice(0, 5).map((track: IndexTrack) => (
                            <MemoizedSearchItem track={track} key={track.id} />
                        ))}
                    </ul>
                </>
            ) : (
                <p className="search-index__no-results">No results</p>
            )}
        </div>
    );
}

export default SearchIndex;