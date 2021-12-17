type CreatedAnnotation = {
    annotator_id: number,
    body: string,
    end_index: number,
    start_index: number,
    track_id: number
}

export const fetchAnnotation = (annotationId: number) => {
    return (
        $.ajax({
            method: "GET",
            url: `api/annotations/${annotationId.toString()}`
        })
    );
};
export const createAnnotation = (createdAnnotation: CreatedAnnotation) => {
    return (
        $.ajax({
            method: "POST",
            url: `api/annotations`,
            data: { createdAnnotation }
        })
    );
};