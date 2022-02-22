import React, { MouseEvent, useEffect } from "react";
import { Track } from "../../my_types";
import SearchIndexItem from "./search_index_item";

type Props = {
    clearSearchField: Function,
    searches: Array<Track>,
    searchField: string,
    siteLocation: string
}

function SearchIndex(props: Props) {
    const { clearSearchField, searches, searchField, siteLocation } = props;

    useEffect(() => {
        clearSearchField();
    }, [siteLocation])

    function clearSearch(e: MouseEvent<HTMLUListElement>) {
        e.preventDefault();

        clearSearchField();
    }

    function searchResult() {
        if (searchField !== "" && searches.length > 0) {
            return (
                <div className="search-index">
                    <p className="search-index__results">SEARCH RESULTS</p>
                    <p className="search-index__songs">SONGS</p>
                    <ul className="search-index__items" onClick={clearSearch}>
                        {searchIndexItems()}
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

    function searchIndexItems() {
        return (
            searches.slice(0, 5).map((track: Track, key: number) => {
                return ( 
                    <SearchIndexItem 
                        key={key}
                        track={track} 
                    />
                );
            })
        );
    }

    return (
        <>
            {searchResult()}
        </>
    );
}

export default SearchIndex;