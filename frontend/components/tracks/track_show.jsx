import React from "react";
import TrackShowHeader from "./track_show_header";
import LyricsShowContainer from "../annotations/lyrics_show_container";
import NavBar from "../header/navbar";

class TrackShow extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {       
        this.props.fetchTrack(this.props.match.params.trackId);
        window.scrollTo(0, 0);
    }

    componentDidUpdate(prevProps) {
        if (this.props.match.params.trackId !== prevProps.match.params.trackId) {
            this.props.fetchTrack(this.props.match.params.trackId);
        }        
        window.scrollTo(0, 0);
    }

    render() {
        const { track, fetchTrack } = this.props;
        
        if (track) {
            return (
                <div>
                    <NavBar />
                    <TrackShowHeader 
                        track={track} 
                        fetchTrack={fetchTrack} 
                    />
                    <div className='track-show-bottom-main'>
                        <LyricsShowContainer 
                            track={track} 
                        />
                    </div>
                </div>
            );
        } else { 
            return (
                null
            );
        }
    }
};

export default TrackShow;