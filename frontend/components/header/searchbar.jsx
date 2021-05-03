import React from "react";
import { AiOutlineSearch } from "react-icons/ai";

class Searchbar extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            searchField: ''
        };
    }

    onChange(field) {
        return e => this.setState({[field]: e.target.value});
    }

    render() {
        return (
            <div className='search-bar-main'>
                <input className='search-bar-form' 
                    type='text' 
                    placeholder='Search lyrics & more'
                    value={this.state.searchField} 
                    onChange={this.onChange('searchField')} 
                />
                <AiOutlineSearch className='search-bar-glass' />
            </div>          
        )
    }
};

export default Searchbar;