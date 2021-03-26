import React from 'react';
import {
  Route,
  Redirect,
  Switch,
  Link,
  HashRouter
} from 'react-router-dom';
import LyricsShow from '../annotations/lyrics_show';
import TrackShowHeader from './track_show_header';
import LyricsShowContainer from '../annotations/lyrics_show_container';


class TrackShow extends React.Component {
    constructor(props) {
        super(props)
    }

    componentDidMount(){
        
        this.props.fetchTrack(this.props.match.params.trackId);
    }

    render(){
        const {track, annotations, fetchTrack} = this.props;
        if (Object.keys(annotations).length !== 0) {
        return (
            <div>
                <TrackShowHeader track={track} fetchTrack={fetchTrack} />
                <div className='track-show-bottom-main'>
                    <LyricsShowContainer track={track} />
                </div>
            </div>
        )} else { return (
            null
        )}
    }
};

export default TrackShow;