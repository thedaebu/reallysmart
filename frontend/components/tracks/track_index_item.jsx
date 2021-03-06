import React from "react";
import {
    Route,
    Redirect,
    Switch,
    Link,
    HashRouter
} from "react-router-dom";

class TrackIndexItem extends React.Component {
    constructor(props) {
        super (props);
    }
    
    randomNum() {
        return Math.floor(Math.random() * 1000);
    }

    render() {      
        const { track } = this.props; 
      
        return ( 
            <Link className="track-index-item" to={`/tracks/${track.id}`}>        
                <p className="track-index-item-id">{track.id}</p>
                <div className="track-index-item-image" style={{ background: `url(${track.artwork_path}`, backgroundPosition: "center", backgroundSize: "cover" }}> </div>
                <div className="track-index-item-title-main">
                    <p className="track-index-item-title">{track.title}</p>
                    <p className="track-index-item-lyrics">LYRICS</p>
                </div>
                <p className="track-index-item-artist">{track.artist}</p>
                <div className="track-index-item-fire-main">
                    <img className="track-index-item-fire" src={window.fireIcon} />
                    <p className="track-index-item-fire-number">{this.randomNum()}</p>
                </div>
                <div className="track-index-item-eye-main">
                    <img className="track-index-item-eye" src={window.eyeIcon} />
                    <p className="track-index-item-eye-number">{this.randomNum() * 10}</p>
                </div>
            </Link>
        );
    }
};

export default TrackIndexItem;