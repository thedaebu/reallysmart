import React from "react";
import CommentShowContainer from "../comments/comment_show_container";
import AnnotationShowContainer from "./annotation_show_container";

class LyricsShow extends React.Component {
    constructor(props) {
        super(props)

        const annotations = {};      
        if (props.annotations[0] !== undefined) {
            props.annotations.forEach((annotation) => {
                annotations[annotation.id] = annotation;
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
        };
        
        this.annotatedLyrics = this.annotatedLyrics.bind(this);
        this.annotateLyrics = this.annotateLyrics.bind(this);
        this.handleMouseUp = this.handleMouseUp.bind(this);
        this.handleMouseDown = this.handleMouseDown.bind(this);
        this.openAnnotation = this.openAnnotation.bind(this);
    }

    componentDidMount() {
        this.props.track.annotation_ids.forEach(id => {
            this.props.fetchAnnotation(id)
        });
        window.scrollTo(0, 0);
    }

    annotatedLyrics() {
        if (this.props.annotations[this.props.annotations.length - 1] !== undefined ) {
            return (
                this.annotateLyrics(this.props.track.lyrics)
            );  
        } else {
            return (
                <span 
                    className="not-an-anno" 
                    data-add="0"
                    data-name={`not-anno-0`}
                    onMouseUp={this.handleMouseUp} 
                >
                {this.props.track.lyrics}
                </span>
            ) ;
        }
    }

    annotateLyrics(lyrics) {
        const annotations = this.props.annotations;        
        const sortedAnnotations = annotations.sort((a,b) => (a.start_index > b.start_index ? 1 : -1));
        const lyricsParts = Array();
        let currentIndex = 0;
        if (!annotations.includes(undefined)) {            
            sortedAnnotations.forEach((annotation, idx) => {
                let addIndex = idx === 0 && annotation.startIndex !== 0
                ? 0
                : addIndex = sortedAnnotations[idx-1].end_index;
                let startIndex = annotation.start_index;
                let endIndex = annotation.end_index;
                if (currentIndex === startIndex) {                
                    lyricsParts.push(
                        <span 
                            className="is-an-anno" 
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
                            className="not-an-anno"                              
                            key={`not-anno-${idx}`}                            
                            id={`not-anno-${idx}`}
                            data-add={addIndex}
                            data-name={`not-anno-${idx}`}
                            >
                            {lyrics.slice(currentIndex, startIndex)}
                        </span>)
                    lyricsParts.push(
                        <span 
                            className="is-an-anno" 
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
                            className="not-an-anno"                             
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
        this.setState({annotationId: id});
    }

    handleMouseUp(e) {
        e.preventDefault();

        this.setState({yCoord: e.pageY}); 
        this.setState({annoId: e.target.dataset.id});
        
        const highlighted = window.getSelection();
        if (highlighted.anchorOffset !== highlighted.focusOffset) {
            const newIndices = this.makeNewIndices(highlighted);
            const min = Math.min(...newIndices) < 0
            ? 0
            : Math.min(...newIndices);
            const max = Math.max(...newIndices);

            this.setState({startIndex: min});
            this.setState({endIndex: max});  
            this.props.openAnnotationModal({hello: "hello"});
        }
    }

    makeNewIndices(highlighted) {
        const anchorName = highlighted.anchorNode.parentNode.dataset.name;
        const focusName = highlighted.focusNode.parentNode.dataset.name;
        const add = parseInt(highlighted.focusNode.parentNode.dataset.add);
        let beginning;
        let end;
        if (anchorName.includes(`not-anno`) && focusName.includes(`not-anno`) && anchorName === focusName) {
            beginning = highlighted.anchorOffset + add;
            end = highlighted.focusOffset + add;
        } 
        if (anchorName.includes(`not-anno-0`)) {
            end -= 1;
        } else {
            beginning += 1;
        }

        return [beginning, end];
    }

    handleMouseDown() {    
        this.setState({annotationId: null});
        this.setState({createStatus: false});
        this.props.closeAnnotationModal();
    }

    render() {
        const { track, currentUser } = this.props;

        return (
            <div className="lyrics-show-main">
                <div className="lyrics-show-shade">
                    <div className="lyrics-show-left" onMouseDown={this.handleMouseDown} >
                        <p className="lyrics-show-top">{track.title.toUpperCase()} LYRICS</p>
                        <pre className="lyrics-show-body" onMouseUp={this.handleMouseUp}>
                            {this.annotatedLyrics()}
                        </pre> 
                        <CommentShowContainer 
                            parent={track} 
                            currentUser={currentUser} 
                            commentableType="Track" 
                            commentableId={track.id} 
                        />               
                    </div>
                    <div className="lyrics-show-right">
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
        );
    }
};

export default LyricsShow;