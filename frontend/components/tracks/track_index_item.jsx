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

    

    render () {
      const {track, fetchTrack} = this.props;
      return (
        <li>{track.title}:{track.artist}<img src={window.elChapo} />
        </li>
      )
    }
}


export default TrackIndexItem;