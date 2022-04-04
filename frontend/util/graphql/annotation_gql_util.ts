import { DocumentNode, gql } from "@apollo/client";

export const FETCH_ANNOTATION_GQL: DocumentNode = gql`
    query FETCH_ANNOTATION($id: ID!) {
        annotation(id: $id) {
            annotatorId
            annotatorName
            body
            endIndex
            id
            startIndex
            trackId
        }
    }
`;
export const CREATE_ANNOTATION_GQL: DocumentNode = gql`
    mutation CREATE_ANNOTATION($annotatorId: Integer!, $annotatorName: String!, $body: String!, $endIndex: Integer!, $startIndex: Integer!, $trackId: Integer!) {
        createAnnotation(input: {annotatorId: $annotatorId, annotatorName: $annotatorName, body: $body, endIndex: $endIndex, startIndex: $startIndex, trackId: $trackId}) {
            annotation {
                annotatorId
                annotatorName
                body
                endIndex
                id
                startIndex
                trackId
            }
        }
    }
`;
export const UPDATE_ANNOTATION_GQL: DocumentNode = gql`
    mutation UPDATE_ANNOTATION($id: ID!, $annotatorId: Integer!, $annotatorName: String!, $body: String!, $endIndex: Integer!, $startIndex: Integer!, $trackId: Integer!) {
        updateAnnotation(input: {id: $id, annotatorId: $annotatorId, annotatorName: $annotatorName, body: $body, endIndex: $endIndex, startIndex: $startIndex, trackId: $trackId}) {
            annotation {
                annotatorId
                annotatorName
                body
                endIndex
                id
                startIndex
                trackId
            }
        }
    }
`;
export const DELETE_ANNOTATION_GQL: DocumentNode = gql`
    mutation DELETE_ANNOTATION($id: ID!) {
        deleteAnnotation(input: {id: $id}) {
            annotation {
                annotatorId
                annotatorName
                body
                endIndex
                id
                startIndex
                trackId
            }
        }
    }
`;