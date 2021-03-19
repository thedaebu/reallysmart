import React from 'react';
import {
  Route,
  Redirect,
  Switch,
  Link,
  HashRouter
} from 'react-router-dom';

class TrackIndexItem extends React.Component {
    constructor(props) {
        super (props) 
    }
    // 
    // Look down
    // 
    render () {
      const { track } = this.props; 
      return (
        
          <Link className="track-index-item" to={`/tracks/${track.id}`}>
        
            <p className='track-index-item-id'>{track.id}</p>
            <img className='track-index-item-img' src={track.artwork_path} />
            
            <div className='track-index-item-title-div'>
              <p className='track-index-item-title'>{track.title}</p>
              <p className='track-index-item-lyrics'>LYRICS</p>
            </div>

            <p className='track-index-item-artist'>{track.artist}</p>
            <img className='track-index-item-fire' src={window.fireIcon} />
            <img className='track-index-item-eye' src={window.eyeIcon} />
          </Link>

      )
    }
}

//
// How to get images to show depending on song path
//
export default TrackIndexItem;