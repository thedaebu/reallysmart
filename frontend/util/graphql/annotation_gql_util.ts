import { DocumentNode, gql, useMutation, useQuery } from "@apollo/client";

const FETCH_ANNOTATION: DocumentNode = gql`
    query FETCH_ANNOTATION($id: ID!) {
        annotation(id: $id) {
            body
            annotatorId
            annotatorName
            endIndex
            id
            startIndex
            trackId
        }
    }
`;
const CREATE_ANNOTATION: DocumentNode = gql`
    mutation CREATE_ANNOTATION($annotatorId: Integer!, $annotatorName: String!, $body: String!, $endIndex: Integer!, $startIndex: Integer!, $trackId: Integer!) {
        createAnnotation(input: {annotatorId: $annotatorId, annotatorName: $annotatorName, body: $body, endIndex: $endIndex, startIndex: $startIndex, trackId: $trackId}) {
            annotation {
                body
                annotatorId
                annotatorName
                endIndex
                id
                startIndex
                trackId
            }
        }
    }
`;
const UPDATE_ANNOTATION: DocumentNode = gql`
    mutation UPDATE_ANNOTATION($annotatorId: Integer!, $annotatorName: String!, $body: String!, $endIndex: Integer!, $id: ID!, $startIndex: Integer!, $trackId: Integer!) {
        updateAnnotation(input: {annotatorId: $annotatorId, annotatorName: $annotatorName, body: $body, endIndex: $endIndex, id: $id, startIndex: $startIndex, trackId: $trackId}) {
            annotation {
                body
                annotatorId
                annotatorName
                endIndex
                id
                startIndex
                trackId
            }
        }
    }
`;
const DELETE_ANNOTATION: DocumentNode = gql`
    mutation DELETE_ANNOTATION($id: ID!) {
        deleteAnnotation(input: {id: $id}) {
            annotation {
                id
                body
                annotatorId
                annotatorName
                endIndex
                startIndex
                trackId
            }
        }
    }
`;

export const fetchAnnotation: Function = (id: number) => {
    return (
        useQuery(FETCH_ANNOTATION, { variables: { id } })
    );
};
export const createAnnotation: Function = (annotatorId: Number, annotatorName: String, body: String, endIndex: Number, startIndex: Number, trackId: Number) => {
    return (
        useMutation(CREATE_ANNOTATION, { variables: {
            annotatorId,
            annotatorName,
            body,
            endIndex,
            startIndex,
            trackId
        }})
    );
};
export const updateAnnotation: Function = (annotatorId: Number, annotatorName: String, body: String, endIndex: Number, id: Number, startIndex: Number, trackId: Number) => {
    return (
        useMutation(UPDATE_ANNOTATION, { variables: {
            annotatorId,
            annotatorName,
            body,
            endIndex,
            id,
            startIndex,
            trackId
        }})
    );
};
export const deleteAnnotation: Function = (id: Number) => {
    return (
        useMutation(DELETE_ANNOTATION, { variables: {
            id
        }})
    );
};