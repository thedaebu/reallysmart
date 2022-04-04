import { DocumentNode, gql } from "@apollo/client";

export const FETCH_COMMENT_GQL: DocumentNode = gql`
    query FETCH_COMMENT($id: ID!) {
        comment(id: $id) {
            body
            commentableId
            commentableType
            commenterId
            commenterName
            id
        }
    }
`;
export const CREATE_COMMENT_GQL: DocumentNode = gql`
    mutation CREATE_COMMENT($body: String!, $commentableId: Integer!, $commentableType: String!, $commenterId: Integer!, $commenterName: String!) {
        createComment(input: {body: $body, commentableId: $commentableId, commentableType: $commentableType, commenterId: $commenterId, commenterName: $commenterName}) {
            comment {
                body
                commentableId
                commentableType
                commenterId
                commenterName
                id
            }
        }
    }
`;
export const UPDATE_COMMENT_GQL: DocumentNode = gql`
    mutation UPDATE_COMMENT($id: ID!, $body: String!, $commentableId: Integer!, $commentableType: String!, $commenterId: Integer!, $commenterName: String!) {
        updateComment(input: {id: $id, body: $body, commentableId: $commentableId, commentableType: $commentableType, commenterId: $commenterId, commenterName: $commenterName}) {
            comment {
                body
                commentableId
                commentableType
                commenterId
                commenterName
                id
            }
        }
    }
`;
export const DELETE_COMMENT_GQL: DocumentNode = gql`
    mutation DELETE_COMMENT($id: ID!) {
        deleteComment(input: {id: $id}) {
            comment {
                body
                commentableId
                commentableType
                commenterId
                commenterName
                id
            }
        }
    }
`;