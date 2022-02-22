import React, { ChangeEvent, useState } from "react";
import { AiOutlineSearch } from "react-icons/ai";
import SearchIndexContainer from "../searches/search_index_container";

type Props = {
    fetchSearches: Function
}

function Searchbar(props: Props) {
    const { fetchSearches } = props;
    
    const [searchField, setSearchField] = useState<string>("");

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
        <>
            <div className="searchbar">
                <input
                    onChange={handleSearchChange()} 
                    placeholder="Search lyrics & more"
                    type="text" 
                    value={searchField}
                />
                <AiOutlineSearch className="searchbar__glass" />
            </div>
            <SearchIndexContainer
                clearSearchField={clearSearchField}
                searchField={searchField}
            />
        </>
    );
}

export default Searchbar;