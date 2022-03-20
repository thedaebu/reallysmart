import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { State, Track, Window } from "../../my_types";
import NavBar from "../navbar/navbar";
import TrackShowHeader from "./track_show_header";
import { fetchTrack } from "../../actions/track_actions";
import { RouteComponentProps } from "react-router";
import LyricsShow from "../lyrics/lyrics";

declare const window: Window;
type TrackId = {
    trackId: string
}

function TrackShow(props: RouteComponentProps<TrackId>) {
    const trackId = props.match.params.trackId;

    const track: Track = useSelector((state: State) => state.entities.tracks[parseInt(trackId)]);

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchTrack(trackId));
        window.scrollTo(0, 0);
    }, [trackId]);

    function trackShowPage() {
        if (track) {
            return (
                <>
                    <NavBar/>
                    <TrackShowHeader track={track} />
                    <LyricsShow track={track} />
                </>
            );
        } else {
            return (
                null
            );
        }
    }

    return(
        <>
            {trackShowPage()}
        </>
    );
}

export default TrackShow;