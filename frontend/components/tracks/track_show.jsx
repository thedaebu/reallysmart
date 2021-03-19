import React from 'react';
import {
  Route,
  Redirect,
  Switch,
  Link,
  HashRouter
} from 'react-router-dom';
import NavBar from '../header/navbar';
import LyricsShow from '../annotations/lyrics_show';
import TrackShowHeader from './track_show_header';


class TrackShow extends React.Component {
    constructor(props) {
        super(props)
    }

    componentDidMount(){
        
        this.props.fetchTrack(this.props.match.params.trackId);
    }

    render(){
        const {track, fetchTrack} = this.props;
        if (track) {
        return (
            <div>
                <NavBar />
                <TrackShowHeader track={track} fetchTrack={fetchTrack} />
                <div className='track-show-bottom-main'>
                    <LyricsShow track={track} />

                </div>
            </div>
        )} else { return (
            null
        )}
    }
};

export default TrackShow;