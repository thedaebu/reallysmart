import React, { MouseEvent, useState, useEffect, useContext } from "react";
import { useSelector } from "react-redux";
import { ThemeContext } from "../../contexts/theme_context";
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
    parentNode: {
        dataset: {
            add: string, name: string
        }
    }
};

function LyricsShow({ track }: { track: Track }) {
    const { lyrics, title } = track;

    const annotations: {[key:number]: Annotation} = useSelector((state: State) => state.entities.annotations);

    const [annotationCreateStatus, setAnnotationCreateStatus] = useState<boolean>(false);
    const [annotationOpenStatus, setAnnotationOpenStatus] = useState<boolean>(false);
    const [endIndex, setEndIndex] = useState<number>(0);
    const [lyricsPartHighlightStatus, setLyricsPartHighlightStatus] = useState<boolean>(false);
    const [lyricsParts, setLyricsParts] = useState<Array<JSX.Element>>([]);
    const [selectedAnnotation, setSelectedAnnotation] = useState<Annotation | null>(null);
    const [startIndex, setStartIndex] = useState<number>(0);
    const [yCoord, setYCoord] = useState<number>(-367);

    const { theme } = useContext(ThemeContext);

    useEffect(() => {
        if (lyricsPartHighlightStatus === false) {
            annotateLyrics();
        }
    }, [lyricsPartHighlightStatus]);

    // used for editing annotations
    // without it, annotation will not update live and user would have to click out of annotation and click on annotation again
    useEffect(() => {
        if (selectedAnnotation) {
            const tempAnnotationId = selectedAnnotation.id;
            if (annotations[tempAnnotationId]){
                setSelectedAnnotation(annotations[tempAnnotationId]);
            }
        }
        annotateLyrics();
    }, [annotations]);

    function annotateLyrics() {
        const currentAnnotations: Array<Annotation> = Object.values(annotations);
        if (currentAnnotations.length > 0) {
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
                            key={`is-anno-${annotation.id}`}
                            onClick={() => selectAnnotation(annotation)}
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
                            key={`is-anno-${annotation.id}`}
                            onClick={() => selectAnnotation(annotation)}
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

    function selectAnnotation(annotation: Annotation) {
        setSelectedAnnotation(annotation);
    }

    function handleTextSelect(e: MouseEvent<HTMLElement>) {
        e.preventDefault();

        setLyricsPartHighlightStatus(true);
        setYCoord(e.pageY-(e.pageY % 30)-367);
        const highlighted: Highlighted = window.getSelection();
        if (highlighted && highlighted.anchorOffset !== highlighted.focusOffset) {
            const [start, end]: Array<number> = makeNewIndices(highlighted);
            setStartIndex(start);
            setEndIndex(end);
            if (startIndex < endIndex) {
                handleLyricsPartHighlight(start, end, highlighted);
                setAnnotationOpenStatus(true);
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
            const currentStart: number = highlighted.anchorOffset + add;
            const currentEnd: number = highlighted.focusOffset + add;
            start = Math.min(currentStart, currentEnd);
            end = Math.max(currentStart, currentEnd) + 1;
        }

        return [start + 1, end - 1];
    }

    function handleLyricsPartHighlight(start: number, end: number, highlighted: Highlighted) {
        const { name }: {name: string} = highlighted.anchorNode.parentNode.dataset;
        const add: number = parseInt(highlighted.anchorNode.parentNode.dataset.add);

        let currentLyricsPart: JSX.Element;
        let currentIndex: number;
        for (let i = 0; i < lyricsParts.length; i++) {
            const lyricsPart: JSX.Element = lyricsParts[i];
            if (lyricsPart.key === name) {
                currentLyricsPart = lyricsPart;
                currentIndex = i;
                break;
            }
        }

        const highlightedCurrentLyricsPart: Array<JSX.Element> = [];
        const currentLyricsPartLyrics: string = currentLyricsPart.props.children;
        highlightedCurrentLyricsPart.push(
            <span
                className="lyrics__not-annotation"
                key="highlighted_0"
                data-testid="lyrics__unhighlighted"
            >
                {currentLyricsPartLyrics.slice(0, start - add - 1)}
            </span>
        );
        highlightedCurrentLyricsPart.push(
            <span
                className="lyrics__highlighted"
                key="highlighted_1"
                data-testid="lyrics__highlighted"
            >
                {currentLyricsPartLyrics.slice(start - add - 1, end - add)}
            </span>
        );
        highlightedCurrentLyricsPart.push(
            <span
                className="lyrics__not-annotation"
                key="highlighted_2"
                data-testid="lyrics__unhighlighted"
            >
                {currentLyricsPartLyrics.slice(end - add)}
            </span>
        );

        let newLyricsParts: Array<JSX.Element> = [...lyricsParts.slice(0, currentIndex), ...highlightedCurrentLyricsPart, ...lyricsParts.slice(currentIndex + 1)];
        setLyricsParts(newLyricsParts);
    }

    function removeLyricsPartHighlight() {
        setLyricsPartHighlightStatus(false);
    };

    function handleTextDeselect() {
        setAnnotationOpenStatus(false);
        setSelectedAnnotation(null);
        setLyricsPartHighlightStatus(false);
        setAnnotationCreateStatus(false);
    }

    function handleAnnotationCreateStatus(){
        setAnnotationCreateStatus(!annotationCreateStatus);
    };

    return (
        <div className={theme === "light" ? "lyrics__shade" : "lyrics__shade--dark"}>
            <div className="lyrics__main" data-testid="lyrics__main">
                <div
                    className="lyrics__text"
                    onMouseDown={handleTextDeselect}
                    onMouseUp={handleTextSelect}
                >
                    {title && <p className="lyrics__top">{title.toUpperCase()} LYRICS</p>}
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
                        annotationOpenStatus={annotationOpenStatus}
                        endIndex={endIndex}
                        handleAnnotationCreateStatus={handleAnnotationCreateStatus}
                        handleTextDeselect={handleTextDeselect}
                        removeLyricsPartHighlight={removeLyricsPartHighlight}
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