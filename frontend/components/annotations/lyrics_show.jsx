import React from 'react';
import Annotation from './annotation';

class LyricsShow extends React.Component {
    constructor(props){
        super(props)
    }

    render () {
        const { track } = this.props;
        return (
            <div className='lyrics-show-main'>
                <div className='lyrics-show-shade'>
                    <div className='lyrics-show-left'>
                        <p className='lyrics-show-top'>{track.title.toUpperCase()} LYRICS</p>
                        <pre className='lyrics-show-body'>{track.lyrics}</pre>
                        
                    </div>
                    <div className='lyrics-show-right'>
                        <Annotation />
                    </div>
                </div>
            </div>
        )
    }
}

export default LyricsShow;