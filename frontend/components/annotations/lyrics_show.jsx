import React from 'react';
import CommentShowContainer from '../comments/comment_show_container';
import AnnotationShowContainer from './annotation_show_container';

class LyricsShow extends React.Component {
    constructor(props) {
        super(props)

        let annotations = {}
        
        if (props.annotations[0]) {
            props.annotations.forEach((annotation) => {
                annotations[annotation.id] = annotation
            })
        }

        this.state = {
            annotationId: undefined,
            annoId: undefined,
            yCoord: undefined,
            startIndex: undefined,
            endIndex: undefined,
            createStatus: false,
            annotations: annotations
        }
        
        this.annotatedLyrics = this.annotatedLyrics.bind(this);
        this.annotateLyrics = this.annotateLyrics.bind(this);
        this.mouseUp = this.mouseUp.bind(this);
        this.mouseDown = this.mouseDown.bind(this);
        this.openAnnotation = this.openAnnotation.bind(this);
    }

    componentDidMount() {
        this.props.track.annotation_ids.forEach(id => {
            this.props.fetchAnnotation(id)
        })
    }

    annotatedLyrics() {
        let lyrics
        if (this.props.annotations[this.props.annotations.length - 1] !== undefined ) {
            lyrics = this.annotateLyrics(this.props.track.lyrics);
        } else {
            lyrics = <span 
                className='not-an-anno' 
                data-add="0"
                data-name={`not-anno-0`}
                onMouseUp={this.mouseUp} 
                >
                    {this.props.track.lyrics}
                </span>;
        }
        return lyrics; 
    }

    annotateLyrics(lyrics) {
        let annotations = this.props.annotations
        
        let sortedAnnotations = annotations.sort((a,b) => (a.start_index > b.start_index ? 1 : -1));
        //list.sort((a, b) => (a.color > b.color) ? 1 : -1)
       
        let lyricsParts = [];
        let currentIndex = 0;
        
        if (annotations[0] !== undefined) {
            sortedAnnotations.forEach((annotation, idx) => {
                
                let addIndex
                if (idx === 0 && annotation.startIndex !== 0) {
                    addIndex = 0
                } else {
                    addIndex = sortedAnnotations[idx-1].end_index
                }

                let startIndex = annotation.start_index;
                let endIndex = annotation.end_index;
               
                if (currentIndex === startIndex) {                
                    lyricsParts.push(
                        <span 
                            className='is-an-anno' 
                            onClick={() => this.openAnnotation(annotation.id)} 
                            
                            key={`is-anno-${annotation.id}`} 
                            
                            id={`is-anno-${annotation.id}`}

                            data-name={`is-anno-${annotation.id}`}
                            data-id={`${annotation.id}`}     
                            >
                            {lyrics.slice(currentIndex, endIndex + 1)}
                        </span>)     
                } else {
                    lyricsParts.push(
                        <span 
                            className='not-an-anno' 
                             
                            key={`not-anno-${idx}`}
                            
                            id={`not-anno-${idx}`}

                            data-add={addIndex}
                            data-name={`not-anno-${idx}`}
                            >

                            {lyrics.slice(currentIndex, startIndex)}
                        </span>)
                    lyricsParts.push(
                        <span 
                            className='is-an-anno' 
                            onClick={() => this.openAnnotation(annotation.id)} 
                             
                            key={`is-anno-${annotation.id}`} 

                            id={`is-anno-${annotation.id}`}
                            
                            data-name={`is-anno-${annotation.id}`} 
                            data-id={`${annotation.id}`}
                            >
                            {lyrics.slice(startIndex, endIndex+1)}
                        </span>)
                }
                if (idx === sortedAnnotations.length - 1) {
                    lyricsParts.push(
                        <span 
                            className='not-an-anno' 
                            
                            key={`not-anno-${idx + 1}`}
                            
                            id={`not-anno-${idx + 1}`}
                            
                            data-add={endIndex}
                            data-name={`not-anno-${idx + 1}`}
                            >
                            {lyrics.slice(endIndex +1, lyrics.length + 1)}
                        </span>)
                }
                
                currentIndex = endIndex + 1;
            })
        }
        return lyricsParts;
    }

    openAnnotation(id) {

        this.setState({annotationId: id})
    }

    mouseUp(e) {
        e.preventDefault();
        this.setState({['yCoord']: e.pageY}); 
        this.setState({['annoId']: e.target.dataset.id})
        
        const highlighted = window.getSelection();
        let newIndices
        let min
        let max
     
        if (highlighted.anchorOffset !== highlighted.focusOffset) {
            newIndices = this.makeNewIndices(highlighted);
            min = Math.min(...newIndices);
            max = Math.max(...newIndices);

            this.setState({['startIndex']: min});
            this.setState({['endIndex']: max});  
            this.props.openModal({hello: 'hello'})
        }
    }

    makeNewIndices(highlighted) {
        let a;
        let b;

        let anchorName = highlighted.anchorNode.parentNode.dataset.name;
        let focusName = highlighted.focusNode.parentNode.dataset.name;

        let add = parseInt(highlighted.focusNode.parentNode.dataset.add);

        if (anchorName.includes(`not-anno`) && focusName.includes(`not-anno`) && anchorName === focusName) {
            a = highlighted.anchorOffset + add
            b = highlighted.focusOffset + add
        } 
        
        // window.getSelection().anchorNode.parentNode.dataset.add
        // window.getSelection().anchorNode.parentNode.dataset.name

        // window.getSelection().focusNode.parentNode.dataset.add
        // window.getSelection().focusNode.parentNode.dataset.name
        
        // if name includes is-anno, return null for both
        // if name includes not-anno, add 'add' to value of number
       
        if (anchorName.includes(`not-anno-0`)) {
            b -= 1;
        } else {
            a += 1;
        }

        return [a, b];
    }

    mouseDown(e) {
        
        this.setState({['annotationId']: null})
        this.setState({['createStatus']: false})
        this.props.closeModal()
    }

    render () {
        const { track, annotations, currentUser, fetchAnnotation, openModal, closeModal} = this.props;
        return (
            <div className='lyrics-show-main'>
                <div className='lyrics-show-shade'>
                    <div className='lyrics-show-left' onMouseDown={this.mouseDown} >
                        <p className='lyrics-show-top'>{track.title.toUpperCase()} LYRICS</p>
                        <pre className='lyrics-show-body' onMouseUp={this.mouseUp}>
                            {this.annotatedLyrics()}
                        </pre> 
                        <CommentShowContainer parent={track} commentableType="Track" currentUser={currentUser} commentableId={track.id} />               
                    </div>
                    <div className='lyrics-show-right'>
                        <AnnotationShowContainer 
                            track={track}
                            currentUser={currentUser} 
                            yCoord={this.state.yCoord} 
                            annotationId={this.state.annotationId} 
                            startIndex={this.state.startIndex} 
                            endIndex={this.state.endIndex} 
                            createStatus={this.state.createStatus} 
                            annoId={this.state.annoId}     
                        />
                    </div>
                </div>
            </div>
        ) 
    }
}

export default LyricsShow;