import React from "react";
import { AiOutlineSearch } from "react-icons/ai";
import SearchbarItemsContainer from "./searchbar_items_container";

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
                <SearchbarItemsContainer />
            </div>
        )
    }
};

export default Searchbar;