import React from 'react';

class LyricsShow extends React.Component {
    constructor(props){
        super(props)
    }

    render () {
        const { lyrics } = this.props;
        return (
            <p>{lyrics}</p>
        )
    }
}

export default LyricsShow;