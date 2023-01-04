import React, { ChangeEvent, Dispatch, useState } from "react";
import { AiOutlineSearch } from "react-icons/ai";
import { useDispatch } from "react-redux";
import * as SearchActions from "../../actions/search_actions";
import { AnyAction } from "@reduxjs/toolkit";
import useDebounce from "../../hooks/debounce_hook";
import SearchIndex from "../searches/search_index";

function Searchbar({ theme } : { theme : string }) {
    const dispatch: Dispatch<AnyAction> = useDispatch();
    const fetchSearches: Function = (search: string) => dispatch(SearchActions.fetchSearches(search));

    const [searchField, setSearchField] = useState<string>("");

    function handleSearchChange() {
        const debouncedSearchField = useDebounce(searchField);
        if (searchField !== "") {
            fetchSearches(debouncedSearchField.toLowerCase());
        }
        return (e: ChangeEvent<HTMLInputElement>) => setSearchField(e.currentTarget.value);
    }

    function clearSearchField() {
        setSearchField("");
    }

    return (
        <>
            <div className={theme === "light" ? "searchbar" : "searchbar--dark"}>
                <input
                    className="searchbar__input"
                    placeholder="Search lyrics & more"
                    type="text" 
                    value={searchField}
                    onChange={handleSearchChange()} 
                    data-testid="searchbar-field"
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