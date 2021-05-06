import React from "react";
import {
    Route,
    Redirect,
    Switch,
    Link,
    HashRouter
} from "react-router-dom";
import { AiOutlineSearch } from "react-icons/ai";

class Searchbar extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            searchField: ""
        };

        this.onChange = this.onChange.bind(this);
    }

    randomNum() {
        return Math.floor(Math.random() * 1000);
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
        if (searches) {
            searchbarItems = searches.slice(0, 5).map(searchbarItem => {
                return (
                    <Link className='searchbar-item' to={`/tracks/${searchbarItem.id}`}>
                        <div className='searchbar-item-image' style={{ background: `url(${searchbarItem.artwork_path}`, backgroundPosition: 'center', backgroundSize: 'cover' }}> </div>
                        <div className='searchbar-item-right'>
                            <div className='searchbar-item-right-top'>
                                <p className='searchbar-item-title'>{searchbarItem.title}</p>
                                <p className='searchbar-item-artist'>{searchbarItem.artist}</p>
                            </div>
                            <div className='searchbar-item-right-bottom'>
                                <img className='track-index-item-eye' src={window.eyeIcon} />
                                <p className='searchbar-item-views'>{this.randomNum()}</p>
                            </div>
                        </div>
                    </Link>
                );
            })
        }

        let searchbarModal;
        if (searches) {
            searchbarModal = 
                <div className='searchbar-items-modal'>
                    <ul className='searchbar-items-list'>
                        {searchbarItems}
                    </ul>
                </div>
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