import React, { MouseEvent, useState, useEffect } from "react";
import { Annotation, Track, User } from "../../my_types";
import AnnotationShowContainer from "../annotations/annotation_show_container";
import CommentShowContainer from "../comments/comment_show_container";

declare const window: any;

type Props = {
    annotations: {[key:number]: Annotation},
    closeAnnotationModal: Function,
    currentUser: User,
    fetchAnnotation: Function,
    openAnnotationModal: Function,
    track: Track
}

type Highlighted = {
    anchorNode: HighlightedNode,
    anchorOffset: number,
    focusNode: HighlightedNode,
    focusOffset: number
}
type HighlightedNode = {
    parentNode: ParentNode
}
type ParentNode = {
    dataset: Dataset
}
type Dataset = {
    add: string,
    name: string
}

function LyricsShow(props: Props) {
    const [annotationId, setAnnotationId] = useState<number>(-1);
    const [createStatus, setCreateStatus] = useState<boolean>(false);
    const [endIndex, setEndIndex] = useState<number>(0);
    const [startIndex, setStartIndex] = useState<number>(0);
    const [yCoord, setYCoord] = useState<number>(0);
    
    const { annotations, closeAnnotationModal, currentUser, fetchAnnotation, openAnnotationModal, track } = props;

    useEffect(() => {
        track.annotation_ids.forEach((id: number) => {
            fetchAnnotation(id)
        });
        window.scrollTo(0, 0);
    }, [])

    function annotatedLyrics() {
        const currentAnnotations: Array<Annotation> = track.annotation_ids.map((id: number) => {
            return annotations[id];
        });
        if (currentAnnotations.length > 0) {
            currentAnnotations.sort((a, b) => (a.start_index > b.start_index
                ? 1
                : -1));
            return annotateLyrics(track.lyrics, currentAnnotations);
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

    function annotateLyrics(lyrics: string, currentAnnotations: Array<Annotation>) {
        const lyricsParts: Array<JSX.Element> = Array();
        let currentIndex: number = 0;

        currentAnnotations.forEach((annotation: Annotation, idx: number) => {
            debugger
            const addIndex: number = idx === 0 && annotation.start_index !== 0
                ? 0
                : currentAnnotations[idx-1].end_index;
            const startIndex: number = annotation.start_index;
            const endIndex: number = annotation.end_index;

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
            if (idx === currentAnnotations.length - 1) {
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
                const newIndices: Array<number> = makeNewIndices(highlighted);
                const min: number = Math.min(...newIndices) < 0
                    ? 0
                    : Math.min(...newIndices);
                const max: number = Math.max(...newIndices);

                openAnnotationModal();
                setEndIndex(max);
                setStartIndex(min);
            }
        }
    }

    function makeNewIndices(highlighted: Highlighted) {
        const anchorName: string = highlighted.anchorNode.parentNode.dataset.name;
        const focusName: string = highlighted.focusNode.parentNode.dataset.name;
        const add: number = parseInt(highlighted.focusNode.parentNode.dataset.add);
        let beginning: number = 0;
        let end: number = 0;

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
        closeAnnotationModal();
        setAnnotationId(-1);
        setCreateStatus(false);
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