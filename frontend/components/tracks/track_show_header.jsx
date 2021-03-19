import React from 'react';

class TrackShowHeader extends React.Component {
    constructor(props) {
        super(props)
    }

    render () {
        const {track, fetchTrack} = this.props;
        const art = this.props.track.artwork_path;
        return (
            <div className="track-show-header-main" style={{ background: `linear-gradient( rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5) ), url(${art})`, backgroundPosition: 'center', backgroundSize: 'cover' }}>
                
                <div className='track-show-header-left'>
                    <img className='track-show-header-image' src={track.artwork_path} />
                    <div className='track-show-header-center'>
                        <p className='track-show-header-title' >{track.title}</p>
                        <p className='track-show-header-artist'>{track.artist}</p>
                    </div>
                </div>
                <div className='track-show-header-right'>
                    <img className='track-index-item-fire' src={window.fireIcon} />
                    <img className='track-index-item-eye' src={window.eyeIcon} />
                </div>
            </div>
        )
    }
};

export default TrackShowHeader;