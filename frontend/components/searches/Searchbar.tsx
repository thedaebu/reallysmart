import React, { ChangeEvent, Dispatch, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import useDebounce from "../../hooks/debounce_hook";
import * as SearchActions from "../../actions/search_actions";
import SearchIndex from "./SearchIndex";
import { AiOutlineSearch } from "react-icons/ai";
import { AnyAction } from "@reduxjs/toolkit";

function Searchbar({ theme } : { theme : string; }) {
    const dispatch: Dispatch<AnyAction> = useDispatch();
    const fetchSearches: Function = (search: string) => dispatch(SearchActions.fetchSearches(search));

    const [searchField, setSearchField] = useState<string>("");

    const location: string = useLocation().pathname;

    useEffect(() => {
        clearSearchField();
    }, [location]);

    function handleSearchChange() {
        const debouncedSearchField = useDebounce(searchField);
        if (searchField) {
            fetchSearches(debouncedSearchField.toLowerCase());
        }

        return (e: ChangeEvent<HTMLInputElement>) => setSearchField(e.currentTarget.value);
    }

    function clearSearchField() {
        setSearchField("");
    }

    return (
        <>
            <div 
                className={theme === "light" ?
                    "searchbar" :
                    "searchbar--dark"
                }
            >
                <input
                    className="searchbar__input"
                    placeholder="Search lyrics & more"
                    type="text" 
                    value={searchField}
                    onChange={handleSearchChange()} 
                    data-testid="searchbar__input"
                />
                <AiOutlineSearch className="searchbar__glass" />
            </div>
            {searchField && <SearchIndex clearSearchField={clearSearchField} />}
        </>
    );
}

export default Searchbar;