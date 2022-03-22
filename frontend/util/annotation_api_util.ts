// const $ = require("jquery");
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
            data: { annotation }
        })
    );
};
export const updateAnnotation = (annotation: UpdatedAnnotation) => {
    return (
        $.ajax({
            method: "PUT",
            url: `api/annotations/${annotation.id.toString()}`,
            data: { annotation }
        })
    );
}
export const deleteAnnotation = (annotationId: number) => {
    return (
        $.ajax({
            method: "DELETE",
            url: `api/annotations/${annotationId.toString()}`
        })
    );
}