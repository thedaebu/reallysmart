import React, { useEffect } from "react";
import TrackShowHeader from "./track_show_header";
import LyricsShowContainer from "../lyrics/lyrics_show_container";
import NavBar from "../navbar/navbar";

type Props = {
    track: Track,
    trackId: number,
    fetchTrack: Function
}
interface Track {
    annotation_ids: Array<number>,
    artist: string,
    artwork_path: string,
    comment_ids: Array<number>,
    id: number,
    lyrics: string,
    title: string
}

function TrackShow(props: Props) {
    const { track, trackId, fetchTrack } = props;

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