import React, { ChangeEvent, useState } from "react";
import { AiOutlineSearch } from "react-icons/ai";
import SearchbarItemsContainer from "./searchbar_items_container";

type Props = {
    fetchSearches: Function
}

function Searchbar(props: Props) {
    const [searchField, setSearchField] = useState<string>("");

    const { fetchSearches } = props;

    function handleSearchChange() {
        if (searchField !== "") {
            fetchSearches(searchField.toLowerCase());
        }
        return (e: ChangeEvent<HTMLInputElement>) => setSearchField(e.currentTarget.value);
    }

    function clearSearchField() {
        setSearchField("");
    }

    return (
        <div>
            <div className="search-bar-main">
                <input
                    onChange={handleSearchChange()} 
                    placeholder="Search lyrics & more"
                    type="text" 
                    value={searchField}
                />
                <AiOutlineSearch className="search-bar-glass" />
            </div>
            <SearchbarItemsContainer 
                clearSearchField={clearSearchField}
                searchField={searchField}
            />
        </div>
    );
}

export default Searchbar;