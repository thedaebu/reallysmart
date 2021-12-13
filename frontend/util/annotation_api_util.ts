type NewAnnotation = {
    body: string,
    annotator_id: number,
    track_id: number,
    start_index: number,
    end_index: number
}

export const fetchAnnotation = (annotationId: number) => {
    return (
        $.ajax({
            method: "GET",
            url: `api/annotations/${annotationId.toString()}`
        })
    );
};

export const createAnnotation = (annotation: NewAnnotation) => {
    return (
        $.ajax({
            method: "POST",
            url: `api/annotations`,
            data: { annotation }
        })
    );
};