import React, { MouseEvent, useEffect } from "react";
import { useSelector } from "react-redux";
import { useLocation } from "react-router";
import { State, Track } from "../../my_types";
import SearchIndexItem from "./search_index_item";

type Props = {
    clearSearchField: Function,
    searchField: string
}

function SearchIndex(props: Props) {
    const { clearSearchField, searchField } = props;

    const searches: Array<Track> = useSelector((state: State) => Object.values(state.entities.searches));

    const siteLocation: string = useLocation().pathname;

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
            searches.slice(0, 5).map((track: Track, idx: number) => {
                return ( 
                    <SearchIndexItem 
                        key={idx}
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