import React, { useState } from "react";
import { AiOutlineSearch } from "react-icons/ai";
import SearchbarItemsContainer from "./searchbar_items_container";

function Searchbar(props) {
    const [searchField, setSearchField] = useState("");
    const { fetchSearches } = props;

    function handleSearchChange() {
        if (searchField !== "") {
            fetchSearches(searchField.toLowerCase());
        }
        return e => setSearchField(e.target.value);
    }

    function clearSearchField() {
        setSearchField("");
    }

    return (
        <div>
            <div className="search-bar-main">
                <input
                    type="text" 
                    placeholder="Search lyrics & more"
                    value={searchField} 
                    onChange={handleSearchChange()} 
                />
                <AiOutlineSearch className="search-bar-glass" />
            </div>   
            <SearchbarItemsContainer 
                searchField={searchField} 
                clearSearchField={clearSearchField} 
            />
        </div>
    );
}

export default Searchbar;