import $ from "jquery";
import { CreatedAnnotation, UpdatedAnnotation } from "../../my_types";

export const fetchAnnotation: Function = (annotationId: number) => (
    $.ajax({
        method: "GET",
        url: `api/annotations/${annotationId.toString()}`
    })
);
export const createAnnotation: Function = (annotation: CreatedAnnotation) => (
    $.ajax({
        data: {
            annotation,
            authenticity_token: $('[name="csrf-token"]').attr("content")
        },
        method: "POST",
        url: `api/annotations`
    })
);
export const updateAnnotation: Function = (annotation: UpdatedAnnotation) => (
    $.ajax({
        data: {
            annotation,
            authenticity_token: $('[name="csrf-token"]').attr("content")
        },
        method: "PUT",
        url: `api/annotations/${annotation.id.toString()}`
    })
);
export const deleteAnnotation: Function = (annotationId: number) => (
    $.ajax({
        data: {authenticity_token: $('[name="csrf-token"]').attr("content")},
        method: "DELETE",
        url: `api/annotations/${annotationId.toString()}`
    })
);