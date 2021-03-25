import React from 'react';

import {
  Route,
  Redirect,
  Switch,
  Link,
  HashRouter
} from 'react-router-dom';
import NavBar from '../header/navbar';
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
            <>
                <NavBar />
                <div className='tracks-index-main'>
                    <h1 className='tracks-index-h1' >CHARTS</h1>
                    <h2 className='tracks-index-h2' >WHAT'S UP ON REALLY SMART</h2>
                    <ul className='tracks-index-list'>
                        {tracks.map(track => {
                            return <TrackIndexItem track={track} key={track.id} />
                        })}
                    </ul>
                </div>
                <p className='tracks-index-load-more'>LOAD MORE</p>
            </>
        )
    }
}

export default TrackIndex;