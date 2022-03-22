import React, { Dispatch, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as TrackActions from "../../actions/track_actions";
import { RouteComponentProps } from "react-router";
import { State, Track, Window } from "../../my_types";
import LyricsShow from "../lyrics/lyrics";
import NavBar from "../navbar/navbar";
import TrackShowHeader from "./track_show_header";

declare const window: Window;
type TrackId = {
    trackId: string
}

function TrackShow(props: RouteComponentProps<TrackId>) {
    const trackId = props.match.params.trackId;

    const track: Track = useSelector((state: State) => state.entities.tracks[parseInt(trackId)]);

    const dispatch: Dispatch<any> = useDispatch();
    const fetchTrack: Function = (trackId: string) => dispatch(TrackActions.fetchTrack(trackId));

    useEffect(() => {
        fetchTrack(trackId);
        window.scrollTo(0, 0);
    }, [trackId]);

    function trackShowPage() {
        if (track) {
            return (
                <>
                    <NavBar />
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