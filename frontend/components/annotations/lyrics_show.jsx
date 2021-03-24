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
            createStatus: false,
        }

        this.annotatedLyrics = this.annotatedLyrics.bind(this);
        this.annotateLyrics = this.annotateLyrics.bind(this);
        this.mouseUp = this.mouseUp.bind(this);
        this.mouseDown = this.mouseDown.bind(this);
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

    annotateLyrics(lyrics){
        let annotations = this.props.annotations
        
        let sortedAnnotations = annotations.sort((a,b) => (a.start_index > b.start_index ? 1 : -1));
        //list.sort((a, b) => (a.color > b.color) ? 1 : -1)
   
        let lyricsParts = [];
        let currentIndex = 0;
        if (annotations) {
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
                            onMouseUp={this.mouseUp} 
                            key={`is-anno-${annotation.id}`} 
                            
                            id={`is-anno-${annotation.id}`}

                            data-name={`is-anno-${annotation.id}`}     
                            >
                            {lyrics.slice(currentIndex, endIndex + 1)}
                        </span>)     
                } else {
                    lyricsParts.push(
                        <span 
                            className='not-an-anno' 
                            onMouseUp={this.mouseUp} 
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
                            onMouseUp={this.mouseUp} 
                            key={`is-anno-${annotation.id}`} 

                            id={`is-anno-${annotation.id}`}
                            
                            data-name={`is-anno-${annotation.id}`} 
                            >
                            {lyrics.slice(startIndex, endIndex+1)}
                        </span>)
                }
                if (idx === sortedAnnotations.length - 1) {
                    lyricsParts.push(
                        <span 
                            className='not-an-anno' 
                            onMouseUp={this.mouseUp} 
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
        this.setState({['annotationId']: id})
    }

    mouseUp(e){
        e.preventDefault();
        this.setState({['yCoord']: e.pageY}); 
        const highlighted = window.getSelection();
        
        if (highlighted.baseOffset !== highlighted.extentOffset) {
            const newIndices = this.makeNewIndices(highlighted);
            const orderedIndices = newIndices.sort();
            this.setState({['startIndex']: orderedIndices[0]+1});
            this.setState({['endIndex']: orderedIndices[1]});  
            this.props.openModal({hello: 'hello'})
        }
    }

    makeNewIndices(highlighted) {
        let newIndices = null;

        let baseName = highlighted.baseNode.parentNode.dataset.name;
        let extentName = highlighted.extentNode.parentNode.dataset.name;

        let add = parseInt(highlighted.baseNode.parentNode.dataset.add);

        if (baseName.includes(`not-anno`) && extentName.includes(`not-anno`) && baseName === extentName) {
            let a = highlighted.baseOffset + add
            let b = highlighted.extentOffset + add
            
            newIndices = [a, b]
        } 
        
        // window.getSelection().anchorNode.parentNode.dataset.add
        // window.getSelection().anchorNode.parentNode.dataset.name

        // window.getSelection().focusNode.parentNode.dataset.add
        // window.getSelection().focusNode.parentNode.dataset.name
        
        // if name includes is-anno, return null for both
        // if name includes not-anno, add 'add' to value of number

        return newIndices;
    }

    mouseDown(e){
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
                        <pre className='lyrics-show-body'>
                            {this.annotatedLyrics()}
                        </pre>                
                    </div>
                    <div className='lyrics-show-right'>
                        <AnnotationContainer 
                            track={track}
                            currentUser={currentUser} 
                            yCoord={this.state.yCoord} 
                            annotationId={this.state.annotationId} 
                            startIndex={this.state.startIndex} 
                            endIndex={this.state.endIndex} 
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