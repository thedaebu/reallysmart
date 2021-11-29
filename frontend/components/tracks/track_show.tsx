import React, { useEffect } from "react";
import TrackShowHeader from "./track_show_header";
import LyricsShowContainer from "../lyrics/lyrics_show_container";
import NavBar from "../navbar/navbar";
import { RouteComponentProps } from "react-router-dom";

type Props = RouteComponentProps<RouterProps> & {
    track: Track,
    fetchTrack: Function,
}
interface RouterProps {
    trackId: string
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