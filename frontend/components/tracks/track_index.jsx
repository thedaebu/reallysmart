import React from 'react';

import {
  Route,
  Redirect,
  Switch,
  Link,
  HashRouter
} from 'react-router-dom';
import TrackIndexItem from './track_index_item';

class TrackIndex extends React.Component {
    constructor(props){
        super(props)
    }

    componentDidMount(){
        
        this.props.fetchTracks();
    }

    render(){
        const { tracks, fetchTracks, fetchTrack } = this.props;
        return (
            <ul>
                {tracks.map(track => {
                    return <TrackIndexItem track={track} fetchTrack={fetchTrack} key={track.id} />
                })}
            </ul>
        )
    }
}

export default TrackIndex;