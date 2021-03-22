import React from 'react';
import AnnotationShowContainer from './annotation__show_container';

class LyricsShow extends React.Component {
    constructor(props){
        super(props)
        this.state = ({
            annotationId: null,
            yCoord: null,
        })

        this.annotatedLyrics = this.annotatedLyrics.bind(this);
        this.annotateLyrics = this.annotateLyrics.bind(this);
        this.mouseUp = this.mouseUp.bind(this);
        this.outsideMouseUp = this.outsideMouseUp.bind(this);
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
            lyrics = this.props.track.lyrics;
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
                lyricsParts.push(<span className='is-an-anno' onClick={() => this.openAnnotation(annotation.id)}>
                    {lyrics.slice(currentIndex, endIndex - startIndex)}
                </span>)     
            } else {
                lyricsParts.push(<span className='not-an-anno' onClick={() => this.closeAnnotation()}>
                    {lyrics.slice(currentIndex, startIndex)}
                </span>)
                lyricsParts.push(<span className='is-an-anno' onClick={() => this.openAnnotation(annotation.id)}>
                    {lyrics.slice(startIndex, endIndex)}
                </span>)
            }
            if (idx === sortedAnnotations.length - 1) {
                lyricsParts.push(<span className='not-an-anno' onClick={() => this.closeAnnotation()} >
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
        let highlight = window.getSelection();
        let startPos = highlight.anchorOffset;
        let endPos = highlight.focusOffset;
        console.log(highlight);
        console.log(startPos);
        console.log(endPos);
        console.log(e.pageY)
        this.setState({['yCoord']: e.pageY})
    }

    outsideMouseUp(e){
        this.setState({['annotationId']: null})
    }

    render () {
        const { track, annotations, fetchAnnotation} = this.props;
        
        return (
            <div className='lyrics-show-main'>
                <div className='lyrics-show-shade'>
                    <div className='lyrics-show-left' onMouseUp={this.outsideMouseUp}>
                        <p className='lyrics-show-top'>{track.title.toUpperCase()} LYRICS</p>
                        <pre onMouseUp={this.mouseUp} className='lyrics-show-body'>
                            {this.annotatedLyrics()}
                        </pre>                
                    </div>
                    <div className='lyrics-show-right'>
                        <AnnotationShowContainer fetchAnnotation={fetchAnnotation} annotationId={this.state.annotationId} yCoord={this.state.yCoord} />
                        {/* or create annotation modal or sign in to write an annotation modal */}
                    </div>
                </div>
            </div>
        )
    }
}

export default LyricsShow;