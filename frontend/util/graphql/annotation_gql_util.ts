import { DocumentNode, gql } from "@apollo/client";

export const FETCH_ANNOTATION: DocumentNode = gql`
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
export const CREATE_ANNOTATION: DocumentNode = gql`
    mutation CREATE_ANNOTATION($annotatorId: Integer!, annotatorName: String!, $body: String!, $endIndex: Integer!, $startIndex: Integer!, $trackId: Integer!) {
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
export const UPDATE_ANNOTATION: DocumentNode = gql`
    mutation UPDATE_ANNOTATION($annotatorId: Integer!, annotatorName: String!, $body: String!, $endIndex: Integer!, $id: ID!, $startIndex: Integer!, $trackId: Integer!) {
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
export const DELETE_ANNOTATION: DocumentNode = gql`
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