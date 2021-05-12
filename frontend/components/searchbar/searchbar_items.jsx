import React from "react";
import SearchbarItem from "./searchbar_item";

class SearchbarItems extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        const { searches, searchbarModal, closeSearchbarModal } = this.props;

        let searchbarItems;
        if (searches.length > 0 && this.props.searchField !== "" && searchbarModal) {
            searchbarItems = searches.slice(0, 5).map(searchbarItem => {
                return <SearchbarItem searchbarItem={searchbarItem} key={searchbarItem.id} onClick={closeSearchbarModal} />;
            })
            return (
                <div className='searchbar-items-modal'>
                    <p className='searchbar-search-results-p'>SEARCH RESULTS</p>
                    <p className='searchbar-search-songs-p'>SONGS</p>
                    <ul className='searchbar-items-list'>
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
