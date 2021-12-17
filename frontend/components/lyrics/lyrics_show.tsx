import React, { useState, useEffect, MouseEvent } from "react";
import CommentShowContainer from "../comments/comment_show_container";
import AnnotationShowContainer from "../annotations/annotation_show_container";

declare const window: any;

type Props = {
    annotations: Array<Annotation | undefined>,
    closeAnnotationModal: Function,
    currentUser: User,
    fetchAnnotation: Function,
    openAnnotationModal: Function,
    track: Track
}
interface Annotation {
    annotator: string,
    annotator_id: number,
    body: string,
    comment_ids: Array<number>,
    end_index: number,
    id: number,
    start_index: number,
    track_id: number,
    votes: number
}
interface User {
    id: number,
    username: string,
    vote_ids: Array<number>
}
interface Track {
    annotation_ids: Array<number>,
    artist: string,
    artwork_path: string,
    comment_ids: Array<number>,
    id: number,
    lyrics: string,
    title: string
}

interface MouseUpEvent {
    pageY: number,
    preventDefault: Function,
    target: MouseUpEventTarget
}
interface MouseUpEventTarget {
    dataset: MouseUpEventDataset
}
interface MouseUpEventDataset {
    id: string
}
type Highlighted = {
    anchorNode: HighlightedNode,
    anchorOffset: number,
    focusNode: HighlightedNode,
    focusOffset: number
}
interface HighlightedNode {
    parentNode: ParentNode
}
interface ParentNode {
    dataset: Dataset
}
interface Dataset {
    add: string,
    name: string
}

function LyricsShow(props: Props) {
    const [annotationId, setAnnotationId] = useState<number | null>(null);
    const [createStatus, setCreateStatus] = useState<boolean>(false);
    const [endIndex, setEndIndex] = useState<number | null>(null);
    const [startIndex, setStartIndex] = useState<number | null>(null);
    const [yCoord, setYCoord] = useState<number | null>(null);
    
    const { annotations, closeAnnotationModal, currentUser, fetchAnnotation, openAnnotationModal, track } = props;

    useEffect(() => {
        track.annotation_ids.forEach((id: number) => {
            fetchAnnotation(id)
        });
        window.scrollTo(0, 0);
    }, [])

    function annotatedLyrics() {
        // why do I need both of these conditions?
        if (annotations[annotations.length - 1] !== undefined && !annotations.includes(undefined)) {
            return (
                annotateLyrics(track.lyrics)
            );
        } else {
            return (
                <span 
                    className="not-an-anno" 
                    data-add="0"
                    data-name={"not-anno-0"}
                    onMouseUp={handleTextSelect} 
                >
                    {track.lyrics}
                </span>
            );
        }
    }

    function annotateLyrics(lyrics: string) {
        const sortedAnnotations = annotations.sort((a, b) => (a.start_index > b.start_index
            ? 1
            : -1));
        const lyricsParts = Array();
        let currentIndex = 0;

        sortedAnnotations.forEach((annotation: any, idx: number) => {
            const addIndex = idx === 0 && annotation.startIndex !== 0
                ? 0
                : sortedAnnotations[idx-1].end_index;
            const startIndex = annotation.start_index;
            const endIndex = annotation.end_index;

            if (currentIndex === startIndex) {
                lyricsParts.push(
                    <span
                        className="is-an-anno"
                        data-name={`is-anno-${annotation.id}`}
                        data-id={`${annotation.id}`}
                        id={`is-anno-${annotation.id}`}
                        key={`is-anno-${annotation.id}`}
                        onClick={() => openAnnotation(annotation.id)}
                        >
                        {lyrics.slice(currentIndex, endIndex + 1)}
                    </span>
                )
            } else {
                lyricsParts.push(
                    <span
                        className="not-an-anno"
                        data-add={addIndex}
                        data-name={`not-anno-${idx}`}
                        id={`not-anno-${idx}`}
                        key={`not-anno-${idx}`}
                        >
                        {lyrics.slice(currentIndex, startIndex)}
                    </span>
                )
                lyricsParts.push(
                    <span
                        className="is-an-anno" 
                        data-name={`is-anno-${annotation.id}`} 
                        data-id={`${annotation.id}`}
                        id={`is-anno-${annotation.id}`}
                        key={`is-anno-${annotation.id}`} 
                        onClick={() => openAnnotation(annotation.id)}
                        >
                        {lyrics.slice(startIndex, endIndex+1)}
                    </span>
                )
            }
            if (idx === sortedAnnotations.length - 1) {
                lyricsParts.push(
                    <span
                        className="not-an-anno"
                        data-add={endIndex}
                        data-name={`not-anno-${idx + 1}`}
                        id={`not-anno-${idx + 1}`}
                        key={`not-anno-${idx + 1}`}
                        >
                        {lyrics.slice(endIndex +1, lyrics.length + 1)}
                    </span>
                )
            }
            currentIndex = endIndex + 1;
        })

        return lyricsParts;
    }

    function openAnnotation(id: number) {
        setAnnotationId(id);
    }

    function handleTextSelect(e: MouseEvent<HTMLElement>) {
        e.preventDefault();

        setYCoord(e.pageY);

        const highlighted: Highlighted = window.getSelection()
        if (highlighted !== null) {
            if (highlighted.anchorOffset !== highlighted.focusOffset) {
                const newIndices = makeNewIndices(highlighted);
                const min = Math.min(...newIndices) < 0
                    ? 0
                    : Math.min(...newIndices);
                const max: number = Math.max(...newIndices);

                setStartIndex(min);
                setEndIndex(max);
                openAnnotationModal();
            }
        }
    }

    function makeNewIndices(highlighted: Highlighted) {
        const anchorName = highlighted.anchorNode.parentNode.dataset.name;
        const focusName = highlighted.focusNode.parentNode.dataset.name;
        const add = parseInt(highlighted.focusNode.parentNode.dataset.add);
        let beginning = 0;
        let end = 0;

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

    function handleTextDeselect() {
        setAnnotationId(null);
        setCreateStatus(false);
        closeAnnotationModal();
    }

    return (
        <div className="lyrics-show-main">
            <div className="lyrics-show-shade">
                <div className="lyrics-show-left" onMouseDown={handleTextDeselect} >
                    <p className="lyrics-show-top">{track.title.toUpperCase()} LYRICS</p>
                    <pre className="lyrics-show-body" onMouseUp={handleTextSelect}>
                        {annotatedLyrics()}
                    </pre> 
                    <CommentShowContainer
                        commentableType="Track"
                        currentUser={currentUser}
                        parent={track}
                    />
                </div>
                <div className="lyrics-show-right">
                    <AnnotationShowContainer
                        annotationId={annotationId}
                        createStatus={createStatus}
                        currentUser={currentUser}
                        endIndex={endIndex}
                        startIndex={startIndex}
                        track={track}
                        yCoord={yCoord}
                    />
                </div>
            </div>
        </div>
    );
}

export default LyricsShow;