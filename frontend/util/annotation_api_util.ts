import { CreatedAnnotation } from "../my_types";

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