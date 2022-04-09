import { DocumentNode, gql } from "@apollo/client";

export const FETCH_ANNOTATION: DocumentNode = gql`
    query FETCH_ANNOTATION($id: ID!) {
        annotation(id: $id) {
            id
            body
            annotatorId
            annotatorName
            endIndex
            startIndex
            trackId
        }
    }
`;
export const CREATE_ANNOTATION: DocumentNode = gql`
    mutation CREATE_ANNOTATION($annotatorId: Integer!, annotatorName: String!, $body: String!, $endIndex: Integer!, $startIndex: Integer!, $trackId: Integer!) {
        createAnnotation(input: {annotatorId: $annotatorId, annotatorName: $annotatorName, body: $body, endIndex: $endIndex, startIndex: $startIndex, trackId: $trackId}) {
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
export const UPDATE_ANNOTATION: DocumentNode = gql`
    mutation UPDATE_ANNOTATION($id: ID!, $annotatorId: Integer!, annotatorName: String!, $body: String!, $endIndex: Integer!, $startIndex: Integer!, $trackId: Integer!) {
        updateAnnotation(input: {id: $id, annotatorId: $annotatorId, annotatorName: $annotatorName, body: $body, endIndex: $endIndex, startIndex: $startIndex, trackId: $trackId})
    }
`;
export const DELETE_ANNOTATION: DocumentNode = gql`
`;