import React from "react";

class TrackShowHeader extends React.Component {
    constructor(props) {
        super(props);
    }

    randomNum() {
      return Math.floor(Math.random() * 1000);
    }

    render() {
        const { track } = this.props;
        const art = this.props.track.artwork_path;

        return (
            <div className="track-show-header-main" style={{ backgroundImage: `linear-gradient( rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5) ), url(${art})`, backgroundPosition: "center", backgroundSize: "cover" }}>
                <div className="track-show-header-shade">
                    <div>
                        <div className="track-show-header-left">
                            <div className="track-show-header-image" style={{ backgroundImage: `url(${art}`, backgroundPosition: "center", backgroundSize: "cover" }} ></div>
                            <div className="track-show-header-center">
                                <p className="track-show-header-title" >{track.title}</p>
                                <p className="track-show-header-artist">{track.artist}</p>
                            </div>
                        </div>
                        <div className="track-show-header-right">
                            <div>
                                <img src={window.fireIcon} />
                                <p className="track-index-item-fire-number">{this.randomNum()}</p>
                            </div>
                            <div>
                                <img src={window.eyeIcon} />
                                <p className="track-index-item-eye-number">{this.randomNum() * 10}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
};

export default TrackShowHeader;