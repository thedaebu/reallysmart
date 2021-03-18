import React from 'react';
import {
  Route,
  Redirect,
  Switch,
  Link,
  HashRouter
} from 'react-router-dom';

class TrackShow extends React.Component {
    constructor(props) {
        super(props)
    }

    componentDidMount(){
        
        this.props.fetchTrack(this.props.match.params.trackId);
    }

    render(){
        const {track, fetchTrack} = this.props;
        return (
            <div className='track-show-main'>
                <p>{track.title}:{track.artist}</p>
            </div>
        )
    }
};

export default TrackShow;