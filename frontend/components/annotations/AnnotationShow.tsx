import React, { useContext } from "react";
import { ThemeContext } from "../../contexts/theme_context";
import AnnotationItem from "./AnnotationItem";
import AnnotationPrompt from "./AnnotationPrompt";
import { Annotation, Track } from "../../my_types";

type Props = {
    annotation: Annotation | null;
    createStatus: boolean;
    endIndex: number;
    handleCreateStatus: Function;
    handleTextDeselect: Function;
    openStatus: boolean;
    removeHighlight: Function;
    startIndex: number;
    track: Track;
    yCoord: number;
};

function AnnotationShow(props: Props) {
    const { annotation, createStatus, endIndex, handleCreateStatus, handleTextDeselect, openStatus, removeHighlight, startIndex, track, yCoord } = props;

    const { theme } = useContext(ThemeContext);

    function annotationDisplay(annotation: Annotation) {
        return (
            <div
                style={{
                    position: 'relative',
                    top: yCoord ? yCoord : -367
                }}
            >
                {annotation ? (
                    <AnnotationItem annotation={annotation} trackId={track.id} />
                ) : (
                    <AnnotationPrompt 
                        createStatus={createStatus}
                        endIndex={endIndex}
                        handleCreateStatus={handleCreateStatus}
                        handleTextDeselect={handleTextDeselect}
                        openStatus={openStatus}
                        removeHighlight={removeHighlight}
                        startIndex={startIndex}
                        track={track}
                    />
                )}
            </div>
        );
    }

    return (
        <div 
            className={theme === "light" ?
            "annotation-show" :
            "annotation-show--dark"
        } 
            data-testid="annotation-show"
        >
            {annotation || openStatus ? (
                annotationDisplay(annotation)
            ) : ( 
                <p className="annotation-show__about">Highlight part of the lyrics to add an annotation<br />Click on a highlighted section to show annotation</p>
            )}
        </div>
    );
}

export default AnnotationShow;