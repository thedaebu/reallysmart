import { DocumentNode, gql } from "@apollo/client";

export const FETCH_USER: DocumentNode = gql`
    query FETCH_USER($id: ID!) {
        user(id: $id) {
            id
            username
            voteIds
        }
    }
`;
export const CREATE_USER: DocumentNode = gql`
    mutation CREATE_USER($password: String!, $username: String!) {
        createUser(input: {password: $password, username: $username}) {
            user {
                id
                username
            }
        }
    }
`;