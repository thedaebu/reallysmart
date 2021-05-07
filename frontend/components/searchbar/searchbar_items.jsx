import React from "react";
import SearchbarItem from "./searchbar_item";

class SearchbarItems extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        const { searches } = this.props;

        let searchbarItems;
        let searchbarModal;
        if (searches) {
            searchbarItems = searches.slice(0, 5).map(searchbarItem => {
                return <SearchbarItem searchbarItem={searchbarItem} key={searchbarItem.id} />;
            })
            searchbarModal = 
                <div className='searchbar-items-modal'>
                    <ul className='searchbar-items-list'>
                        {searchbarItems}
                    </ul>
                </div>
        } else {
            searchbarModal = null;
        }

        return (
            null
        )
    }
};

export default SearchbarItems;
