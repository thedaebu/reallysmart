import $ from "jquery";
import { CreatedAnnotation, UpdatedAnnotation } from "../my_types";

export const fetchAnnotation = (annotationId: number) => {
    return (
        $.ajax({
            method: "GET",
            url: `api/annotations/${annotationId.toString()}`
        })
    );
};
export const createAnnotation = (annotation: CreatedAnnotation) => {
    return (
        $.ajax({
            method: "POST",
            url: `api/annotations`,
            data: {
                annotation,
                authenticity_token: $('[name="csrf-token"]').attr("content")
            }
        })
    );
};
export const updateAnnotation = (annotation: UpdatedAnnotation) => {
    return (
        $.ajax({
            data: {
                annotation,
                authenticity_token: $('[name="csrf-token"]').attr("content")
            },
            method: "PUT",
            url: `api/annotations/${annotation.id.toString()}`
        })
    );
}
export const deleteAnnotation = (annotationId: number) => {
    return (
        $.ajax({
            data: { authenticity_token: $('[name="csrf-token"]').attr("content") },
            method: "DELETE",
            url: `api/annotations/${annotationId.toString()}`
        })
    );
}