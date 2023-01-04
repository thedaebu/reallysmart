import { DocumentNode, gql, useMutation, useQuery } from "@apollo/client";

const FETCH_COMMENT: DocumentNode = gql`
    query FETCH_COMMENT($id: ID!) {
        comment(id: $id) {
            body
            commentableId
            commentableType
            commenterName
            createdAt
            id
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
const CREATE_COMMENT: DocumentNode = gql`
    mutation CREATE_COMMENT($body: String!, $commentableId: Integer!, $commentableType: String!, $commenterId: Integer!) {
        createComment(input: {body: $body, commentableId: $commentableId, commentableType: $commentableType, commenterId: $commenterId) {
            comment {
                body
                commentableId
                commentableType
                commenterName
                createdAt
                id
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
const UPDATE_COMMENT: DocumentNode = gql`
    mutation UPDATE_COMMENT($body: String!, $commentableId: Integer!, $commentableType: String!, $commenterId: Integer!, $id: ID!) {
        updateComment(input: {body: $body, commentableId: $commentableId, commentableType: $commentableType, commenterId: $commenterId, id: $id}) {
            comment {
                body
                commentableId
                commentableType
                commenterName
                createdAt
                id
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
const DELETE_COMMENT: DocumentNode = gql`
    mutation DELETE_COMMENT($id: ID!) {
        deleteComment(input: {id: $id}) {
            comment {
                body
                commentableId
                commentableType
                commenterName
                createdAt
                id
                updatedAt
            }
        }
    }
`;

export const fetchComment: Function = (id: Number) => {
    return (
        useQuery(FETCH_COMMENT, { variables: { id } })
    );
};
export const createComment: Function = (body: String, commentableId: Number, commentableType: String, commenterId: Number) => {
    return (
        useMutation(CREATE_COMMENT, { variables: {
            body,
            commentableId,
            commentableType,
            commenterId
        }})
    );
};
export const updateComment: Function = (body: String, commentableId: Number, commentableType: String, commenterId: Number, id: Number) => {
    return (
        useMutation(UPDATE_COMMENT, { variables: {
            body,
            commentableId,
            commentableType,
            commenterId,
            id
        }})
    );
};
export const deleteComment: Function = (id: Number) => {
    return (
        useMutation(DELETE_COMMENT, { variables: { id } })
    );
};