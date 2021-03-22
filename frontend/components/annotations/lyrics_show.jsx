import React from 'react';
import AnnotationContainer from './annotation_container';

class LyricsShow extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            annotationId: null,
            yCoord: null,
            startIndex: null,
            endIndex: null,
            annotationStatus: false,
            createStatus: false,
        }

        this.annotatedLyrics = this.annotatedLyrics.bind(this);
        this.annotateLyrics = this.annotateLyrics.bind(this);
        this.mouseUp = this.mouseUp.bind(this);
        this.mouseDown = this.mouseDown.bind(this);
    }

    componentDidMount(){
        this.props.track.annotation_ids.map((id) => {
            this.props.fetchAnnotation(id);         
        })
    }

    annotatedLyrics() {
        let lyrics
        if (this.props.annotations[this.props.annotations.length - 1] !== undefined ) {
            lyrics = this.annotateLyrics(this.props.track.lyrics);
        } else {
            lyrics = <span className='not-an-anno' onMouseUp={this.mouseUp} >{this.props.track.lyrics}</span>;
        }
        return lyrics; 
    }

    annotateLyrics(lyrics){
        let annotations = this.props.annotations
        
        let sortedAnnotations = annotations.sort((a,b) => (a.start_index > b.start_index ? 1 : -1));
        //list.sort((a, b) => (a.color > b.color) ? 1 : -1)
   
        let lyricsParts = [];
        let currentIndex = 0;
    
        sortedAnnotations.forEach((annotation, idx) => {
            let startIndex = annotation.start_index;
            let endIndex = annotation.end_index;

            if (currentIndex === startIndex) {
                lyricsParts.push(<span className='is-an-anno' onClick={() => this.openAnnotation(annotation.id)} onMouseUp={this.mouseUp} key={`is-anno-${annotation.id}`}>
                    {lyrics.slice(currentIndex, endIndex - startIndex)}
                </span>)     
            } else {
                lyricsParts.push(<span className='not-an-anno' onMouseUp={this.mouseUp} key={`is-not-anno-${annotation.id}`}>
                    {lyrics.slice(currentIndex, startIndex)}
                </span>)
                lyricsParts.push(<span className='is-an-anno' onClick={() => this.openAnnotation(annotation.id)} onMouseUp={this.mouseUp} key={`is-anno-${annotation.id}`}>
                    {lyrics.slice(startIndex, endIndex)}
                </span>)
            }
            if (idx === sortedAnnotations.length - 1) {
                lyricsParts.push(<span className='not-an-anno' onMouseUp={this.mouseUp} key={`is-not-anno-${annotation.id+1}`}>
                    {lyrics.slice(endIndex)}
                </span>)
            }
            currentIndex = endIndex + 1;
        })
        return lyricsParts;
    }

    openAnnotation(id) {
        this.setState({['annotationId']: id})
    }

    mouseUp(e){
        e.preventDefault();
        const highlight = window.getSelection();
        const start = highlight.baseOffset;
        const end = highlight.extentOffset;
        const arr = [start, end].sort()
        console.log(start);
        console.log(end);
        this.setState({['annotationStatus']: true})
        this.setState({['startIndex']: arr[0]});
        this.setState({['endIndex']: arr[1]});
        this.setState({['yCoord']: e.pageY});
        
    }

    mouseDown(e){
        
        this.setState({['annotationId']: null})
        this.setState({['annotationStatus']: false})
        this.setState({['createStatus']: false})
    }

    render () {
        const { track, annotations, currentUser, fetchAnnotation} = this.props;
        
        return (
            <div className='lyrics-show-main'>
                <div className='lyrics-show-shade'>
                    <div className='lyrics-show-left' onMouseDown={this.mouseDown} >
                        <p className='lyrics-show-top'>{track.title.toUpperCase()} LYRICS</p>
                        <pre className='lyrics-show-body'>
                            {this.annotatedLyrics()}
                        </pre>                
                    </div>
                    <div className='lyrics-show-right'>
                        <AnnotationContainer 
                            currentUser={currentUser} 
                            track={track}
                            fetchAnnotation={fetchAnnotation} 
                            yCoord={this.state.yCoord} 
                            annotationId={this.state.annotationId} 
                            startIndex={this.state.startIndex} 
                            endIndex={this.state.endIndex} 
                            annotationStatus={this.state.annotationStatus}
                            createStatus={this.state.createStatus}
                            key={this.state.annotationId}
                        />
                    </div>
                </div>
            </div>
        )
    }
}

export default LyricsShow;