import React, { ChangeEvent, Dispatch, useState } from "react";
import { AiOutlineSearch } from "react-icons/ai";
import { useDispatch } from "react-redux";
import * as SearchActions from "../../actions/search_actions";
import SearchIndex from "../searches/search_index";

function Searchbar() {
    const dispatch: Dispatch<any> = useDispatch();
    const fetchSearches: Function = (search: string) => dispatch(SearchActions.fetchSearches(search));

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
            <SearchIndex
                clearSearchField={clearSearchField}
                searchField={searchField}
            />
        </>
    );
}

export default Searchbar;