import { DocumentNode, gql, useMutation, useQuery } from "@apollo/client";

const FETCH_ANNOTATION: DocumentNode = gql`
    query FETCH_ANNOTATION($id: ID!) {
        annotation(id: $id) {
            annotatorId
            annotatorName
            body
            createdAt
            endIndex
            id
            startIndex
            trackId
            updatedAt
            votes {
                id
                voteableId
                voteableType
                voterId
            }
        }
    }
`;
const CREATE_ANNOTATION: DocumentNode = gql`
    mutation CREATE_ANNOTATION($annotatorId: Integer!, $body: String!, $endIndex: Integer!, $startIndex: Integer!, $trackId: Integer!) {
        createAnnotation(input: {annotatorId: $annotatorId, body: $body, endIndex: $endIndex, startIndex: $startIndex, trackId: $trackId}) {
            annotation {
                annotatorId
                annotatorName
                body
                createdAt
                endIndex
                id
                startIndex
                trackId
                updatedAt
                votes {
                    id
                    voteableId
                    voteableType
                    voterId
                }
            }
        }
    }
`;
const UPDATE_ANNOTATION: DocumentNode = gql`
    mutation UPDATE_ANNOTATION($annotatorId: Integer!, $body: String!, $endIndex: Integer!, $id: ID!, $startIndex: Integer!, $trackId: Integer!) {
        updateAnnotation(input: {annotatorId: $annotatorId, body: $body, endIndex: $endIndex, id: $id, startIndex: $startIndex, trackId: $trackId}) {
            annotation {
                annotatorId
                annotatorName
                body
                createdAt
                endIndex
                id
                startIndex
                trackId
                updatedAt
                votes {
                    id
                    voteableId
                    voteableType
                    voterId
                }
            }
        }
    }
`;
const DELETE_ANNOTATION: DocumentNode = gql`
    mutation DELETE_ANNOTATION($id: ID!) {
        deleteAnnotation(input: {id: $id}) {
            annotation {
                annotatorId
                annotatorName
                body
                createdAt
                endIndex
                id
                startIndex
                trackId
                updatedAt
            }
        }
    }
`;

export const fetchAnnotation: Function = (id: number) => {
    return (
        useQuery(FETCH_ANNOTATION, { variables: { id } })
    );
};
export const createAnnotation: Function = (annotatorId: Number, body: String, endIndex: Number, startIndex: Number, trackId: Number) => {
    return (
        useMutation(CREATE_ANNOTATION, { variables: {
            annotatorId,
            body,
            endIndex,
            startIndex,
            trackId
        }})
    );
};
export const updateAnnotation: Function = (annotatorId: Number, body: String, endIndex: Number, id: Number, startIndex: Number, trackId: Number) => {
    return (
        useMutation(UPDATE_ANNOTATION, { variables: {
            annotatorId,
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