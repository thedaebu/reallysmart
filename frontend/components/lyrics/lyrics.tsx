import React, { MouseEvent, useState, useEffect, Dispatch } from "react";
import { useDispatch, useSelector } from "react-redux";
import { closeAnnotationModal, openAnnotationModal } from "../../actions/annotation_modal_actions";
import { Annotation, State, Track, Window } from "../../my_types";
import AnnotationShow from "../annotations/annotation_show";
import CommentShow from "../comments/comment_show";

declare const window: Window;
type Props = {
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
    const { track } = props;

    const annotations: {[key:number]: Annotation} = useSelector((state: State) => state.entities.annotations)

    const dispatch: Dispatch<any> = useDispatch();

    const [annotationCreateStatus, setAnnotationCreateStatus] = useState<boolean>(false);
    const [endIndex, setEndIndex] = useState<number>(0);
    const [selectedAnnotation, setSelectedAnnotation] = useState<Annotation | null>(null);
    const [startIndex, setStartIndex] = useState<number>(0);
    const [yCoord, setYCoord] = useState<number>(-367);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [])

    // used for editing annotations
    // without it, annotation will not update live and user would have to click out of annotation and click on annotation again
    useEffect(() => {
        if (selectedAnnotation) {
            const tempAnnotationId = selectedAnnotation.id;
            if (annotations[tempAnnotationId]){
                setSelectedAnnotation(annotations[tempAnnotationId]);
            }
        }
    }, [annotations])

    function annotatedLyrics() {
        const currentAnnotations = Object.values(annotations);
        if (currentAnnotations.length > 0) {
            return (
                annotateLyrics(track.lyrics, currentAnnotations)
            );
        } else {
            return (
                <span
                    className="lyrics__not-annotation"
                    onMouseUp={handleTextSelect}
                    data-add="0"
                    data-name={"not-anno-0"}
                    data-testid="lyrics__not-annotation"
                >
                    {track.lyrics}
                </span>
            );
        }
    }

    function annotateLyrics(lyrics: string, currentAnnotations: Array<Annotation>) {
        const sortedAnnotations: Array<Annotation> = currentAnnotations.sort((a: Annotation, b: Annotation) => (a.start_index > b.start_index
            ? 1
            : -1));
        const lyricsParts: Array<JSX.Element> = [];
        let currentIndex: number = 0;

        sortedAnnotations.forEach((annotation: Annotation, idx: number) => {
            const addIndex: number = idx === 0
                ? 0
                : sortedAnnotations[idx-1].end_index;
            const startIndex: number = annotation.start_index;
            const endIndex: number = annotation.end_index;

            if (currentIndex === startIndex) {
                lyricsParts.push(
                    <span
                        className="lyrics__is-annotation"
                        key={`anno-${annotation.id}`}
                        onClick={() => openAnnotation(annotation)}
                        data-name={`is-anno-${annotation.id}`}
                        data-testid="lyrics__is-annotation"
                        >
                        {lyrics.slice(currentIndex, endIndex + 1)}
                    </span>
                )
            } else {
                lyricsParts.push(
                    <span
                        className="lyrics__not-annotation"
                        key={`not-anno-${idx}`}
                        data-add={addIndex}
                        data-name={`not-anno-${idx}`}
                        data-testid="lyrics__not-annotation"
                        >
                        {lyrics.slice(currentIndex, startIndex)}
                    </span>
                )
                lyricsParts.push(
                    <span
                        className="lyrics__is-annotation"
                        key={`anno-${annotation.id}`}
                        onClick={() => openAnnotation(annotation)}
                        data-name={`is-anno-${annotation.id}`}
                        data-testid="lyrics__is-annotation"
                        >
                        {lyrics.slice(startIndex, endIndex + 1)}
                    </span>
                )
            }
            if (idx === sortedAnnotations.length - 1) {
                lyricsParts.push(
                    <span
                        className="lyrics__not-annotation"
                        key={`not-anno-${idx + 1}`}
                        data-add={endIndex}
                        data-name={`not-anno-${idx + 1}`}
                        data-testid="lyrics__not-annotation"
                        >
                        {lyrics.slice(endIndex + 1, lyrics.length + 1)}
                    </span>
                )
            }
            currentIndex = endIndex + 1;
        })

        return lyricsParts;
    }

    function openAnnotation(annotation: Annotation) {
        setSelectedAnnotation(annotation);
    }

    function handleTextSelect(e: MouseEvent<HTMLElement>) {
        e.preventDefault();

        setYCoord(e.pageY-(e.pageY % 30)-367);
        const highlighted: Highlighted = window.getSelection();

        if (highlighted && highlighted.anchorOffset !== highlighted.focusOffset) {
            const newIndices: Array<number> = makeNewIndices(highlighted);
            const beginning: number = Math.min(...newIndices);
            const end: number = Math.max(...newIndices);

            setStartIndex(beginning);
            setEndIndex(end);
            dispatch(openAnnotationModal());
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
        setSelectedAnnotation(null);
        dispatch(closeAnnotationModal());
        setAnnotationCreateStatus(false);
    }

    function handleAnnotationCreateStatus() {
        if (annotationCreateStatus === false) {
            setAnnotationCreateStatus(true);
        } else {
            setAnnotationCreateStatus(false);
        }
    }

    return (
        <div className="lyrics__shade">
            <div className="lyrics__main" data-testid="lyrics__main">
                <div className="lyrics__text" onMouseDown={handleTextDeselect} onMouseUp={handleTextSelect}>
                    <p className="lyrics__top">{track.title.toUpperCase()} LYRICS</p>
                    <pre className="lyrics__body" data-testid="lyrics__body">
                        {annotatedLyrics()}
                    </pre> 
                    <CommentShow
                        commentableType="Track"
                        parent={track}
                    />
                </div>
                <div className="lyrics__right">
                    <AnnotationShow
                        annotation={selectedAnnotation}
                        annotationCreateStatus={annotationCreateStatus}
                        endIndex={endIndex}
                        handleAnnotationCreateStatus={handleAnnotationCreateStatus}
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