import React, { MouseEvent, useState, useEffect, useContext } from "react";
import { useSelector } from "react-redux";
import { Annotation, State, Track, Window } from "../../my_types";
import { ThemeContext } from "../../contexts/theme_context";
import AnnotationShow from "../annotations/AnnotationShow";
import CommentShow from "../comments/CommentShow";

declare const window: Window;
type Highlighted = {
    anchorNode: HighlightedNode;
    anchorOffset: number;
    focusNode: HighlightedNode;
    focusOffset: number;
};
type HighlightedNode = {
    parentNode: {
        dataset: {
            add: string;
            name: string;
        };
    };
};

function Lyrics({ track }: { track: Track; }) {
    const { lyrics, title } = track;

    const annotations: { [key: number]: Annotation; } = useSelector((state: State) => state.entities.annotations);

    const [annotatedLyrics, setAnnotatedLyrics] = useState<Array<JSX.Element>>([]);
    const [createStatus, setCreateStatus] = useState<boolean>(false);
    const [endIndex, setEndIndex] = useState<number>(0);
    const [highlightStatus, setHighlightStatus] = useState<boolean>(false);
    const [openStatus, setOpenStatus] = useState<boolean>(false);
    const [selectedAnnotation, setSelectedAnnotation] = useState<Annotation>(null);
    const [startIndex, setStartIndex] = useState<number>(0);
    const [yCoord, setYCoord] = useState<number>(-367);

    const { theme } = useContext(ThemeContext);

    useEffect(() => {
        if (!highlightStatus) {
            annotateLyrics(Object.values(annotations));
        }
    }, [highlightStatus]);

    // used for editing annotations
    // without it, annotation will not update live and user would have to click out of annotation and click on annotation again
    useEffect(() => {
        if (selectedAnnotation) {
            const tempAnnotationId = selectedAnnotation.id;
            if (annotations[tempAnnotationId]){
                setSelectedAnnotation(annotations[tempAnnotationId]);
            } else {
                handleTextDeselect();
            }
        }
        annotateLyrics(Object.values(annotations));
    }, [annotations]);

    useEffect(() => {
        if (selectedAnnotation) {
            handleSelectedAnnotation(selectedAnnotation);
        }
    }, [selectedAnnotation])

    function annotateLyrics(annotations: Array<Annotation>) {
        if (annotations.length) {
            const sortedAnnotations: Array<Annotation> = annotations.sort((a: Annotation, b: Annotation) => (a.start_index - b.start_index));
            const currentAnnotatedLyrics: Array<JSX.Element> = [];
            let currentIndex: number = 0;
            sortedAnnotations.forEach((annotation: Annotation, idx: number) => {
                const addIndex: number = idx === 0 ?
                    0 :
                    sortedAnnotations[idx-1].end_index;
                const startIndex: number = annotation.start_index;
                const endIndex: number = annotation.end_index;
                if (currentIndex === startIndex) {
                    currentAnnotatedLyrics.push(
                        <span
                            className="lyrics-text__body--annotated"
                            key={`annotated-${annotation.id}`}
                            onClick={() => setSelectedAnnotation(annotation)}
                            data-name={`annotated-${annotation.id}`}
                            data-testid="lyrics-text__body--annotated"
                        >
                            {lyrics.slice(currentIndex, endIndex + 1)}
                        </span>
                    );
                } else {
                    currentAnnotatedLyrics.push(
                        <span
                            className="lyrics-text__body--not-annotated"
                            key={`not-annotated${idx}`}
                            data-add={addIndex}
                            data-name={`not-annotated${idx}`}
                            data-testid="lyrics-text__body--not-annotated"
                        >
                            {lyrics.slice(currentIndex, startIndex)}
                        </span>
                    );
                    currentAnnotatedLyrics.push(
                        <span
                            className="lyrics-text__body--annotated"
                            key={`annotated-${annotation.id}`}
                            onClick={() => setSelectedAnnotation(annotation)}
                            data-name={`annotated-${annotation.id}`}
                            data-testid="lyrics-text__body--annotated"
                        >
                            {lyrics.slice(startIndex, endIndex + 1)}
                        </span>
                    );
                }
                if (idx === sortedAnnotations.length - 1) {
                    currentAnnotatedLyrics.push(
                        <span
                            className="lyrics-text__body--not-annotated"
                            key={`not-annotated${idx + 1}`}
                            data-add={endIndex}
                            data-name={`not-annotated${idx + 1}`}
                            data-testid="lyrics-text__body--not-annotated"
                        >
                            {lyrics.slice(endIndex + 1, lyrics.length + 1)}
                        </span>
                    );
                }
                currentIndex = endIndex + 1;
            });

            setAnnotatedLyrics(currentAnnotatedLyrics);
        } else {
            setAnnotatedLyrics([
                <span
                    className="lyrics-text__body--not-annotated"
                    key="not-annotated0"
                    onMouseUp={handleTextSelect}
                    data-add="0"
                    data-name={"not-annotated0"}
                    data-testid="lyrics-text__body--not-annotated"
                >
                    {lyrics}
                </span>
            ]);
        }
    }

    function handleSelectedAnnotation(annotation: Annotation) {
        const name: string = `annotated-${annotation.id}`;
        let currentLyrics: JSX.Element;
        let currentIndex: number;
        for (let i = 0; i < annotatedLyrics.length; i++) {
            const lyricsPart: JSX.Element = annotatedLyrics[i];
            if (lyricsPart.key === name) {
                currentLyrics = lyricsPart.props['children'];
                currentIndex = i;
                break;
            }
        }
        const element: JSX.Element = <span
            className="lyrics-text__body--highlighted"
            key="highlighted_1"
            data-testid="lyrics-text__body--highlighted"
        >
            {currentLyrics}
        </span>;

        setAnnotatedLyrics((annotatedLyrics: Array<JSX.Element>) => [...annotatedLyrics.slice(0, currentIndex), element, ...annotatedLyrics.slice(currentIndex + 1)]);
    }

    function handleTextSelect(e: MouseEvent<HTMLElement>) {
        e.preventDefault();

        setHighlightStatus(true);
        setYCoord(e.pageY - (e.pageY % 30) - 367);
        const highlighted: Highlighted = window.getSelection();
        if (highlighted && highlighted.anchorOffset !== highlighted.focusOffset) {
            const { end, start }: { end: number; start: number; } = makeNewIndices(highlighted);
            setEndIndex(end);
            setStartIndex(start);
            if (startIndex < endIndex) {
                handleHighlight(start, end, highlighted);
                setOpenStatus(true);
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
            start = Math.min(currentStart, currentEnd) + 1;
            end = Math.max(currentStart, currentEnd);
        }

        return {end, start};
    }

    function handleHighlight(start: number, end: number, highlighted: Highlighted) {
        const { name }: { name: string; } = highlighted.anchorNode.parentNode.dataset;
        const add: number = parseInt(highlighted.anchorNode.parentNode.dataset.add);
        let currentSection: JSX.Element;
        let currentIndex: number;
        for (let i = 0; i < annotatedLyrics.length; i++) {
            const lyricsPart: JSX.Element = annotatedLyrics[i];
            if (lyricsPart.key === name) {
                currentSection = lyricsPart;
                currentIndex = i;
                break;
            }
        }

        const currentSectionWithHighlight: Array<JSX.Element> = [];
        const currentSectionLyrics: string = currentSection.props.children;
        currentSectionWithHighlight.push(
            <span
                className="lyrics-text__body--not-annotated"
                key="highlighted_0"
                data-testid="lyrics-text__body--unhighlighted"
            >
                {currentSectionLyrics.slice(0, start - add - 1)}
            </span>
        );
        currentSectionWithHighlight.push(
            <span
                className="lyrics-text__body--highlighted"
                key="highlighted_1"
                data-testid="lyrics-text__body--highlighted"
            >
                {currentSectionLyrics.slice(start - add - 1, end - add)}
            </span>
        );
        currentSectionWithHighlight.push(
            <span
                className="lyrics-text__body--not-annotated"
                key="highlighted_2"
                data-testid="lyrics-text__body--unhighlighted"
            >
                {currentSectionLyrics.slice(end - add)}
            </span>
        );

        setAnnotatedLyrics((annotatedLyrics: Array<JSX.Element>) => [...annotatedLyrics.slice(0, currentIndex), ...currentSectionWithHighlight, ...annotatedLyrics.slice(currentIndex + 1)]);
    }

    function removeHighlight() {
        setHighlightStatus(false);
    }

    function handleTextDeselect() {
        setCreateStatus(false);
        setHighlightStatus(false);
        setOpenStatus(false);
        setSelectedAnnotation(null);
    }

    function handleCreateStatus(){
        setCreateStatus((status: boolean) => !status);
    }

    return (
        <div className={theme === "light" ?
            "lyrics__shade" :
            "lyrics__shade--dark"
        }>
            <div className="lyrics__main" data-testid="lyrics__main">
                <section
                    className="lyrics-text"
                    onMouseDown={handleTextDeselect}
                    onMouseUp={handleTextSelect}
                >
                    {title && <p className="lyrics-text__top">{title.toUpperCase()} LYRICS</p>}
                    <pre className="lyrics-text__body" data-testid="lyrics-text__body">
                        {annotatedLyrics}
                    </pre>
                    <CommentShow commentableType="Track" parent={track} />
                </section>
                <div className="lyrics__right">
                    <AnnotationShow
                        annotation={selectedAnnotation}
                        createStatus={createStatus}
                        openStatus={openStatus}
                        endIndex={endIndex}
                        handleCreateStatus={handleCreateStatus}
                        handleTextDeselect={handleTextDeselect}
                        removeHighlight={removeHighlight}
                        startIndex={startIndex}
                        track={track}
                        yCoord={yCoord}
                    />
                </div>
            </div>
        </div>
    );
}

export default Lyrics;