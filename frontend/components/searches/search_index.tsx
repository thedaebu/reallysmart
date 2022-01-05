import React, { MouseEvent, useEffect } from "react";
import { Track } from "../../my_types";
import SearchbarItem from "./search_index_item";

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

    function searchbarResults() {
        if (searches.length > 0 && searchField !== "") {
            return (
                <div className="search-index">
                    <p className="search-index__results">SEARCH RESULTS</p>
                    <p className="search-index__songs">SONGS</p>
                    <ul className="search-index__items" onClick={clearSearch}>
                        {searchbarItems()}
                    </ul>
                </div>
            );
        } else if (searches.length === 0 && searchField !== "") {
            return (
                <div className="search-index">
                    <p className="search-index__results">SEARCH RESULTS</p>
                    <p className="search-index__no-results">No results</p>
                </div>
            );
        }
    }

    function searchbarItems() {
        if (searches.length > 0) {
            return (
                searches.slice(0, 5).map((track, key) => {
                    return ( 
                        <SearchbarItem 
                            key={key}
                            track={track} 
                        />
                    );
                })
            );
        } else {
            return (
                null
            );
        }
    }

    if (searchField !== "") {
        return (
            <div>
                {searchbarResults()}
            </div>
        );
    } else {
        return (
            null
        );
    }
}

export default SearchIndex;