import React, { MouseEvent, useEffect } from "react";
import { SearchItem } from "../../my_types";
import SearchbarItem from "./searchbar_item";

type Props = {
    clearSearchField: Function,
    searches: Array<SearchItem>,
    searchField: string,
    siteLocation: string
}

function SearchbarItems(props: Props) {
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
                <div className="searchbar-items-modal">
                    <p className="searchbar-search-results">SEARCH RESULTS</p>
                    <p className="searchbar-search-songs">SONGS</p>
                    <ul onClick={clearSearch}>
                        {searchbarItems()}
                    </ul>
                </div>
            );
        } else if (searches.length === 0 && searchField !== "") {
            return (
                <div className="searchbar-items-modal">
                    <p className="searchbar-search-results">SEARCH RESULTS</p>
                    <p className="searchbar-search-no-results">No results</p>
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

export default SearchbarItems;
