export const fetchAnnotation = (annotationId) => {
    return (
        $.ajax({
            method: "GET",
            url: `api/annotations/${annotationId}`
        })
    );
};

export const createAnnotation = (annotation) => {
    return (
        $.ajax({
            method: "POST",
            url: `api/annotations`,
            data: { annotation }
        })
    );
};