import React from "react";
import TrackShowHeader from "./track_show_header";
import LyricsShowContainer from "../annotations/lyrics_show_container";
import NavBar from "../header/navbar";

class TrackShow extends React.Component {
    constructor(props) {
        super(props)
    }

    componentDidMount() {       
        this.props.fetchTrack(this.props.match.params.trackId);
    }

    render() {
        const { track, fetchTrack } = this.props;
        const { trackId } = this.props.match.params;
        if (track) {
            return (
                <div>
                    <NavBar />
                    <TrackShowHeader track={track} fetchTrack={fetchTrack} />
                    <div className='track-show-bottom-main'>
                        <LyricsShowContainer track={track} trackId={trackId} />
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