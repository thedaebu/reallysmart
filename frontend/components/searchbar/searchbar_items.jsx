import React from "react";
import SearchbarItem from "./searchbar_item";

class SearchbarItems extends React.Component {
    constructor(props) {
        super(props)
    }

    randomNum() {
        return Math.floor(Math.random() * 1000);
    }

    render() {
        const { searches, searchField, clearSearchField } = this.props;
        
        let searchbarItems;
        if (searches.length > 0 && searchField !== "") {
            searchbarItems = searches.slice(0, 5).map((searchbarItem, key) => {
                return (
                    <SearchbarItem searchbarItem={searchbarItem} key={key}/>
                )
            })
            return (
                <div className='searchbar-items-modal'>
                    <p className='searchbar-search-results-p'>SEARCH RESULTS</p>
                    <p className='searchbar-search-songs-p'>SONGS</p>
                    <ul className='searchbar-items-list' onClick={clearSearchField}>
                        {searchbarItems}
                    </ul>
                </div>
            );
        } else if (searches.length === 0 && this.props.searchField !== "") {
            return (
                <div className='searchbar-items-modal'>
                    <p className='searchbar-search-results-p'>SEARCH RESULTS</p>
                    <p className='searchbar-search-no-results-p'>No results</p>
                </div>
            );
        } else {
            return (
                null
            );
        }
    }
};

export default SearchbarItems;
