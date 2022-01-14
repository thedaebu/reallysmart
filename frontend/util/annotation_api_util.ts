import { CreatedAnnotation, UpdatedAnnotation } from "../my_types";

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
export const updateAnnotation = (updatedAnnotation: UpdatedAnnotation) => {
    return (
        $.ajax({
            method: "PUT",
            url: `api/annotations/${updatedAnnotation.id.toString()}`,
            data: {updatedAnnotation}
        })
    )
}
export const deleteAnnotation = (annotationId: number) => {
    return (
        $.ajax({
            method: "DELETE",
            url: `api/annotations/${annotationId.toString()}`
        })
    )
}