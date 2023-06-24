import React from "react";
import { Track, Window } from "../../my_types";

declare const window: Window;

function TrackHeader({ track }: { track: Track }) {
    const { artist, artwork_path, title } = track;

    function randomNum() {
        return Math.floor(Math.random() * 1000);
    }

    return (
        <div
            className="track-header__background" 
            style={{
                backgroundImage: `linear-gradient( rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5) ), url(${artwork_path})`
            }}
            data-testid="track-header"
        >
            <div className="track-header__shade">
                <div className="track-header__display">
                    <section className="track-header__left">
                        <div
                            className="track-header__image"
                            style={{
                                backgroundImage: `url(${artwork_path})`
                            }}
                        >
                        </div>
                        <div className="track-header__text">
                            <p className="track-header__title">{title}</p>
                            <p className="track-header__artist">{artist}</p>
                        </div>
                    </section>
                    <section className="track-header__right">
                        <div className="track-header__stat">
                            <img
                                src={window.fireIcon} alt="Fire"
                                className="track-header__image"
                            />
                            <p className="track-header__fire-number">{randomNum()}</p>
                        </div>
                        <div className="track-header__stat">
                            <img
                                src={window.eyeIcon}
                                alt="Eye"
                                className="track-header__image"
                            />
                            <p className="track-header__eye-number">{randomNum() * 10}</p>
                        </div>
                    </section>
                </div>
            </div>
        </div>
    );
}

export default TrackHeader;