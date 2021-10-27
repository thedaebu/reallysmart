import React, { useEffect } from "react";
import SearchbarItem from "./searchbar_item";

function SearchbarItems(props) {
    const { searches, searchField, clearSearchField } = props;
    const { siteLocation } = props.match.params;

    useEffect(() => {
        clearSearchField();
    }, [siteLocation])

    function searchbarResults() {
        if (searches.length > 0 && searchField !== "") {
            return (
                <div className="searchbar-items-modal">
                    <p className="searchbar-search-results">SEARCH RESULTS</p>
                    <p className="searchbar-search-songs">SONGS</p>
                    <ul onClick={clearSearchField}>
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
                searches.slice(0, 5).map((searchbarItem, key) => {
                    return ( 
                        <SearchbarItem searchbarItem={searchbarItem} key={key}/>
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
