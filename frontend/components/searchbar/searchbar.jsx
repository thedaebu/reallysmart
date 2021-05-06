import React from "react";
import { AiOutlineSearch } from "react-icons/ai";
import SearchbarItem from "./searchbar_item";

class Searchbar extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            searchField: ""
        };

        this.onChange = this.onChange.bind(this);
    }

    onChange() {
        if (this.state.searchField !== "") {
            this.props.fetchSearches(this.state.searchField);
        }
        return e => this.setState({['searchField']: e.target.value});
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
            <div>
                <div className='search-bar-main'>
                    <input className='search-bar-form' 
                        type='text' 
                        placeholder='Search lyrics & more'
                        value={this.state.searchField} 
                        onChange={this.onChange()} 
                    />
                    <AiOutlineSearch className='search-bar-glass' />
                </div>   
                {searchbarModal}
            </div>
        )
    }
};

export default Searchbar;