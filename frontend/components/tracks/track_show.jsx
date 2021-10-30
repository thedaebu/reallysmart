import React, { useEffect } from "react";
import TrackShowHeader from "./track_show_header";
import LyricsShowContainer from "../lyrics/lyrics_show_container";
import NavBar from "../navbar/navbar";

function TrackShow(props) {
    const { track, fetchTrack } = props;
    const { trackId } = props.match.params;

    useEffect(() => {
        fetchTrack(trackId);
        window.scrollTo(0, 0);
    }, [trackId]);

    if (track) {
        return (
            <div>
                <NavBar />
                <TrackShowHeader
                    track={track}
                    fetchTrack={fetchTrack}
                />
                <div className="track-show-bottom-main">
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

export default TrackShow;