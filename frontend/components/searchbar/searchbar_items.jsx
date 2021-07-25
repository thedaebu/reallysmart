import React from "react";
import SearchbarItem from "./searchbar_item";

class SearchbarItems extends React.Component {
    constructor(props) {
        super(props);

        this.searchbarItems = this.searchbarItems.bind(this);
    }

    componentDidUpdate(prevProps) {
        if (this.props.siteLocation !== prevProps.siteLocation) {
            this.props.clearSearchField();
        }
    }

    searchbarItems() {
        const { searches, searchField } = this.props;

        if (searches.length > 0 && searchField !== "") {
            return (
                searches.slice(0, 5).map((searchbarItem, key) => {
                    return ( 
                        <SearchbarItem searchbarItem={searchbarItem} key={key}/>
                    );
                })
            )
        } else {
            return (
                null
            );
        }
    }

    randomNum() {
        return Math.floor(Math.random() * 1000);
    }

    render() {
        const { searches, searchField } = this.props;
        const { clearSearchField } = this.props;
        
        if (searches.length > 0 && searchField !== "") {
            return (
                <div className='searchbar-items-modal'>
                    <p className='searchbar-search-results-p'>SEARCH RESULTS</p>
                    <p className='searchbar-search-songs-p'>SONGS</p>
                    <ul className='searchbar-items-list' onClick={clearSearchField}>
                        {this.searchbarItems()}
                    </ul>
                </div>
            );
        } else if (searches.length === 0 && searchField !== "") {
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
