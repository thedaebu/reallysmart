import React from "react";
import {
    Route,
    Redirect,
    Switch,
    Link,
    HashRouter
} from "react-router-dom";

class SearchbarItem extends React.Component {
    constructor(props) {
        super(props)
    }

    randomNum() {
        return Math.floor(Math.random() * 1000);
    }

    render() {
        const { searchbarItem } = this.props;

        return (
            <Link className='searchbar-item-main' to={`/tracks/${searchbarItem.id}`} replace>
                <div className='searchbar-item-image' style={{ background: `url(${searchbarItem.artwork_path}`, backgroundPosition: 'center', backgroundSize: 'cover' }}> </div>
                <div className='searchbar-item-right'>
                    <div className='searchbar-item-right-top'>
                        <p className='searchbar-item-title'>{searchbarItem.title}</p>
                        <p className='searchbar-item-artist'>{searchbarItem.artist}</p>
                    </div>
                    <div className='searchbar-item-right-bottom'>
                        <img className='searchbar-item-eye' src={window.eyeIcon} />
                        <p className='searchbar-item-views'>{this.randomNum()}</p>
                    </div>
                </div>
            </Link>
        )
    }
};

export default SearchbarItem;