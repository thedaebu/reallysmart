import React, { useState, useEffect } from "react";
import CommentShowContainer from "../comments/comment_show_container";
import AnnotationShowContainer from "../annotations/annotation_show_container";

function LyricsShow(props) {
    const [annotationId, setAnnotationId] = useState(null);
    const [annoId, setAnnoId] = useState(null);
    const [yCoord, setYCoord] = useState(null);
    const [startIndex, setStartIndex] = useState(null);
    const [endIndex, setEndIndex] = useState(null);
    const [createStatus, setCreateStatus] = useState(false);
    
    const { fetchAnnotation, annotations, track, openAnnotationModal, closeAnnotationModal, currentUser } = props;

    useEffect(() => {
        track.annotation_ids.forEach(id => {
            fetchAnnotation(id)
        });
        window.scrollTo(0, 0);
    }, [])

    function annotatedLyrics() {
        if (annotations[annotations.length - 1] !== undefined ) {
            return (
                annotateLyrics(track.lyrics)
            );
        } else {
            return (
                <span 
                    className="not-an-anno" 
                    data-add="0"
                    data-name={"not-anno-0"}
                    onMouseUp={handleMouseUp} 
                >
                    {track.lyrics}
                </span>
            );
        }
    }

    function annotateLyrics(lyrics) {
        const sortedAnnotations = annotations.sort((a,b) => (a.start_index > b.start_index
            ? 1
            : -1));
        const lyricsParts = Array();
        let currentIndex = 0;

        if (!annotations.includes(undefined)) {
            sortedAnnotations.forEach((annotation, idx) => {
                const addIndex = idx === 0 && annotation.startIndex !== 0
                    ? 0
                    : sortedAnnotations[idx-1].end_index;
                const startIndex = annotation.start_index;
                const endIndex = annotation.end_index;

                if (currentIndex === startIndex) {
                    lyricsParts.push(
                        <span
                            className="is-an-anno"
                            onClick={() => openAnnotation(annotation.id)}
                            key={`is-anno-${annotation.id}`}
                            id={`is-anno-${annotation.id}`}
                            data-name={`is-anno-${annotation.id}`}
                            data-id={`${annotation.id}`}
                            >
                            {lyrics.slice(currentIndex, endIndex + 1)}
                        </span>
                    )
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
                        </span>
                    )
                    lyricsParts.push(
                        <span
                            className="is-an-anno" 
                            onClick={() => openAnnotation(annotation.id)}
                            key={`is-anno-${annotation.id}`} 
                            id={`is-anno-${annotation.id}`}
                            data-name={`is-anno-${annotation.id}`} 
                            data-id={`${annotation.id}`}
                            >
                            {lyrics.slice(startIndex, endIndex+1)}
                        </span>
                    )
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
                        </span>
                    )
                }
                currentIndex = endIndex + 1;
            })
        }
        return lyricsParts;
    }

    function openAnnotation(id) {
        setAnnotationId(id);
    }

    function handleMouseUp(e) {
        e.preventDefault();

        setYCoord(e.pageY);
        setAnnoId(e.target.dataset.id);
        
        const highlighted = window.getSelection();
        
        if (highlighted.anchorOffset !== highlighted.focusOffset) {
            const newIndices = makeNewIndices(highlighted);
            const min = Math.min(...newIndices) < 0
                ? 0
                : Math.min(...newIndices);
            const max = Math.max(...newIndices);

            setStartIndex(min);
            setEndIndex(max);
            openAnnotationModal();
        }
    }

    function makeNewIndices(highlighted) {
        const anchorName = highlighted.anchorNode.parentNode.dataset.name;
        const focusName = highlighted.focusNode.parentNode.dataset.name;
        const add = parseInt(highlighted.focusNode.parentNode.dataset.add);
        let beginning;
        let end;

        if (anchorName.includes("not-anno") && anchorName === focusName) {
            beginning = highlighted.anchorOffset + add;
            end = highlighted.focusOffset + add;
        } 
        if (anchorName.includes("not-anno-0")) {
            end -= 1;
        } else {
            beginning += 1;
        }

        return [beginning, end];
    }

    function handleMouseDown() {
        setAnnotationId(null);
        setCreateStatus(false);
        closeAnnotationModal();
    }

    return (
        <div className="lyrics-show-main">
            <div className="lyrics-show-shade">
                <div className="lyrics-show-left" onMouseDown={handleMouseDown} >
                    <p className="lyrics-show-top">{track.title.toUpperCase()} LYRICS</p>
                    <pre className="lyrics-show-body" onMouseUp={handleMouseUp}>
                        {annotatedLyrics()}
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
                        yCoord={yCoord}
                        annotationId={annotationId}
                        startIndex={startIndex}
                        endIndex={endIndex}
                        createStatus={createStatus}
                        annoId={annoId}
                    />
                </div>
            </div>
        </div>
    );
}

export default LyricsShow;