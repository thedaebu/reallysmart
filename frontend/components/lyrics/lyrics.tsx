import React, { MouseEvent, useState, useEffect, Dispatch, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as AnnotationModalActions from "../../actions/annotation_modal_actions";
import { Annotation, State, Track, Window } from "../../my_types";
import AnnotationShow from "../annotations/annotation_show";
import CommentShow from "../comments/comment_show";

declare const window: Window;
type Highlighted = {
    anchorNode: HighlightedNode,
    anchorOffset: number,
    focusNode: HighlightedNode,
    focusOffset: number
};
type HighlightedNode = {
    parentNode: ParentNode
};
type ParentNode = {
    dataset: Dataset
};
type Dataset = {
    add: string,
    name: string
};

function LyricsShow({ track }: { track: Track }) {
    const { lyrics, title } = track;

    const annotations: {[key:number]: Annotation} = useSelector((state: State) => state.entities.annotations);

    const dispatch: Dispatch<any> = useDispatch();
    const closeAnnotationModal: Function = () => dispatch(AnnotationModalActions.closeAnnotationModal());
    const openAnnotationModal: Function = () => dispatch(AnnotationModalActions.openAnnotationModal());

    const [annotationCreateStatus, setAnnotationCreateStatus] = useState<boolean>(false);
    const [endIndex, setEndIndex] = useState<number>(0);
    const [lyricsPartHighlightStatus, setLyricsPartHighlightStatus] = useState<boolean>(false);
    const [lyricsParts, setLyricsParts] = useState<Array<JSX.Element>>([]);
    const [selectedAnnotation, setSelectedAnnotation] = useState<Annotation | null>(null);
    const [startIndex, setStartIndex] = useState<number>(0);
    const [yCoord, setYCoord] = useState<number>(-367);

    useEffect(() => {
        window.scrollTo(0, 0);
        annotateLyrics();
    }, []);

    useEffect(() => {
        if (lyricsPartHighlightStatus === false) {
            annotateLyrics();
        }
    }, [lyricsPartHighlightStatus])

    const handleAnnotationCreateStatus = useCallback(() => {
        setAnnotationCreateStatus(!annotationCreateStatus);
    }, []);

    // used for editing annotations
    // without it, annotation will not update live and user would have to click out of annotation and click on annotation again
    useEffect(() => {
        if (selectedAnnotation) {
            const tempAnnotationId = selectedAnnotation.id;
            if (annotations[tempAnnotationId]){
                setSelectedAnnotation(annotations[tempAnnotationId]);
            }
        }
        annotateLyrics()
    }, [annotations])

    function annotateLyrics() {
        const currentAnnotations = Object.values(annotations);
        if (currentAnnotations.length > 0) {
            // return (
            //     annotateLyrics(lyrics, currentAnnotations)
            // );
            const sortedAnnotations: Array<Annotation> = currentAnnotations.sort((a: Annotation, b: Annotation) => (a.start_index - b.start_index));
            const currentLyricsParts: Array<JSX.Element> = [];
            let currentIndex: number = 0;

            sortedAnnotations.forEach((annotation: Annotation, idx: number) => {
                const addIndex: number = idx === 0
                    ? 0
                    : sortedAnnotations[idx-1].end_index;
                const startIndex: number = annotation.start_index;
                const endIndex: number = annotation.end_index;

                if (currentIndex === startIndex) {
                    currentLyricsParts.push(
                        <span
                            className="lyrics__is-annotation"
                            key={`anno-${annotation.id}`}
                            onClick={() => openAnnotation(annotation)}
                            data-name={`is-anno-${annotation.id}`}
                            data-testid="lyrics__is-annotation"
                        >
                            {lyrics.slice(currentIndex, endIndex + 1)}
                        </span>
                    );
                } else {
                    currentLyricsParts.push(
                        <span
                            className="lyrics__not-annotation"
                            key={`not-anno-${idx}`}
                            data-add={addIndex}
                            data-name={`not-anno-${idx}`}
                            data-testid="lyrics__not-annotation"
                        >
                            {lyrics.slice(currentIndex, startIndex)}
                        </span>
                    );
                    currentLyricsParts.push(
                        <span
                            className="lyrics__is-annotation"
                            key={`anno-${annotation.id}`}
                            onClick={() => openAnnotation(annotation)}
                            data-name={`is-anno-${annotation.id}`}
                            data-testid="lyrics__is-annotation"
                        >
                            {lyrics.slice(startIndex, endIndex + 1)}
                        </span>
                    );
                }
                if (idx === sortedAnnotations.length - 1) {
                    currentLyricsParts.push(
                        <span
                            className="lyrics__not-annotation"
                            key={`not-anno-${idx + 1}`}
                            data-add={endIndex}
                            data-name={`not-anno-${idx + 1}`}
                            data-testid="lyrics__not-annotation"
                        >
                            {lyrics.slice(endIndex + 1, lyrics.length + 1)}
                        </span>
                    );
                }
                currentIndex = endIndex + 1;
            });
            setLyricsParts(currentLyricsParts);
        } else {
            // return (
            //     <span
            //         className="lyrics__not-annotation"
            //         onMouseUp={handleTextSelect}
            //         data-add="0"
            //         data-name={"not-anno-0"}
            //         data-testid="lyrics__not-annotation"
            //     >
            //         {lyrics}
            //     </span>
            // );
            setLyricsParts([
                <span
                    className="lyrics__not-annotation"
                    onMouseUp={handleTextSelect}
                    data-add="0"
                    data-name={"not-anno-0"}
                    data-testid="lyrics__not-annotation"
                >
                    {lyrics}
                </span>
            ]);
        }
    }

    function openAnnotation(annotation: Annotation) {
        setSelectedAnnotation(annotation);
    }

    function handleTextSelect(e: MouseEvent<HTMLElement>) {
        e.preventDefault();

        setLyricsPartHighlightStatus(true);
        setYCoord(e.pageY-(e.pageY % 30)-367);
        const highlighted: Highlighted = window.getSelection();

        if (highlighted && highlighted.anchorOffset !== highlighted.focusOffset) {
            const newIndices: Array<number> = makeNewIndices(highlighted);
            const start: number = Math.min(...newIndices) + 1;
            const end: number = Math.max(...newIndices) - 1;
            console.log(start, end)

            setStartIndex(start);
            setEndIndex(end);
            if (startIndex < endIndex) {
                dispatch(openAnnotationModal());
                // handleLyricsPartHighlight(start, end, highlighted);
            }
        }
    }

    function makeNewIndices(highlighted: Highlighted) {
        const anchorName: string = highlighted.anchorNode.parentNode.dataset.name;
        const focusName: string = highlighted.focusNode.parentNode.dataset.name;
        const add: number = parseInt(highlighted.focusNode.parentNode.dataset.add);
        let start: number = 0;
        let end: number = 0;

        if (anchorName.includes("not-anno") && anchorName === focusName) {
            start = highlighted.anchorOffset + add;
            end = highlighted.focusOffset + add;
        }
        if (anchorName.includes("not-anno-0")) {
            end -= 1;
        } else {
            start += 1;
        }

        return [start, end];
    }

    function handleLyricsPartHighlight(start: number, end: number, highlighted: Highlighted) {
        const { add, name } = highlighted.anchorNode.parentNode.dataset

        let currentLyricsPart: any;
        let index: number;
        for (let i = 0; i < lyricsParts.length; i++) {
            const lyricsPart = lyricsParts[i];
            if (lyricsPart.key === name) {
                currentLyricsPart = lyricsPart;
                index = i;
                break;
            }
        }

        const highlightedCurrentLyricsPart = [];
        const currentLyricsPartLyrics = currentLyricsPart.props.children;
        highlightedCurrentLyricsPart.push(
            <span
                className="lyrics__not-annotation"
                key="highlighted_0"
            >
                {currentLyricsPartLyrics.slice(0, start - parseInt(add) - 1)}
            </span>
        )
        highlightedCurrentLyricsPart.push(
            <span
                className="lyrics__highlighted"
                key="highlighted_1"
            >
                {currentLyricsPartLyrics.slice(start - parseInt(add) - 1, end - parseInt(add))}
            </span>
        )
        highlightedCurrentLyricsPart.push(
            <span
                className="lyrics__not-annotation"
                key="highlighted_2"
            >
                {currentLyricsPartLyrics.slice(end - parseInt(add))}
            </span>
        )

        console.log(start, end)
        // console.log(highlightedCurrentLyricsPart[0].props.children, highlightedCurrentLyricsPart[1].props.children, highlightedCurrentLyricsPart[2].props.children)
        let newLyricsParts: any = [lyricsParts.slice(0,index), ...highlightedCurrentLyricsPart, lyricsParts.slice(index+1)];
        // setLyricsParts(newLyricsParts);
    }

    function handleTextDeselect() {
        setSelectedAnnotation(null);
        dispatch(closeAnnotationModal());
        setLyricsPartHighlightStatus(false);
        setAnnotationCreateStatus(false);
    }

    return (
        <div className="lyrics__shade">
            <div className="lyrics__main" data-testid="lyrics__main">
                <div className="lyrics__text" onMouseDown={handleTextDeselect} onMouseUp={handleTextSelect}>
                    <p className="lyrics__top">{title.toUpperCase()} LYRICS</p>
                    <pre className="lyrics__body" data-testid="lyrics__body">
                        {lyricsParts}
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