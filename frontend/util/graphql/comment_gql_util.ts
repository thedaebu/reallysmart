import { DocumentNode, gql } from "@apollo/client";

export const FETCH_COMMENT: DocumentNode = gql`
    query FETCH_COMMENT($id: ID!) {
        comment(id: $id) {
            body
            commentableId
            commentableType
            commenterId
            commenterName
            id
            updatedAt
        }
    }
`;
export const CREATE_COMMENT: DocumentNode = gql`
    mutation CREATE_COMMENT($body: String!, $commentableId: Integer!, $commentableType: String!, $commenterId: Integer!, $commenterName: String!) {
        createComment(input: {body: $body, commentableId: $commentableId, commentableType: $commentableType, commenterId: $commenterId, commenterName: $commenterName) {
            comment {
                body
                commentableId
                commentableType
                commenterId
                commenterName
                id
                updatedAt
            }
        }
    }
`;
export const UPDATE_COMMENT: DocumentNode = gql`
    mutation UPDATE_COMMENT($body: String!, $commentableId: Integer!, $commentableType: String!, $commenterId: Integer!, $commenterName: String!, $id: ID!) {
        updateComment(input: {body: $body, commentableId: $commentableId, commentableType: $commentableType, commenterId: $commenterId, commenterName: $commenterName, id: $id}) {
            comment {
                body
                commentableId
                commentableType
                commenterId
                commenterName
                id
                updatedAt
            }
        }
    }
`;
export const DELETE_COMMENT: DocumentNode = gql`
    mutation DELETE_COMMENT($id: ID!) {
        deleteComment(input: {id: $id}) {
            comment {
                body
                commentableId
                commentableType
                commenterId
                commenterName
                id
                updatedAt
            }
        }
    }
`;