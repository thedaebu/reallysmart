import React from "react";
import SearchbarItem from "./searchbar_item";

class SearchbarItems extends React.Component {
    constructor(props) {
        super(props);

        this.searchbarResults = this.searchbarResults.bind(this);
        this.searchbarItems = this.searchbarItems.bind(this);
    }

    componentDidUpdate(prevProps) {
        if (this.props.siteLocation !== prevProps.siteLocation) {
            this.props.clearSearchField();
        }
    }

    searchbarResults() {
        const { searches, searchField } = this.props;
        const { clearSearchField } = this.props;
        
        if (searches.length > 0 && searchField !== "") {
            return (
                <div className="searchbar-items-modal">
                    <p className="searchbar-search-results">SEARCH RESULTS</p>
                    <p className="searchbar-search-songs">SONGS</p>
                    <ul onClick={clearSearchField}>
                        {this.searchbarItems()}
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

    searchbarItems() {
        const { searches } = this.props;

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

    randomNum() {
        return Math.floor(Math.random() * 1000);
    }

    render() {
        const { searchField } = this.props;
        
        if (searchField !== "") {
            return (
                <div>
                    {this.searchbarResults()}
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
