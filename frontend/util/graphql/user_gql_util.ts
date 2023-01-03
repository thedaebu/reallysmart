import { DocumentNode, gql, useMutation, useQuery } from "@apollo/client";

const FETCH_USER: DocumentNode = gql`
    query FETCH_USER($id: ID!) {
        user(id: $id) {
            annotationAlerts
            id
            mentions
            username
            voteIds
        }
    }
`;
const CREATE_USER: DocumentNode = gql`
    mutation CREATE_USER($password: String!, $username: String!) {
        createUser(input: {password: $password, username: $username}) {
            user {
                annotationAlers
                id
                mentions
                username
                voteIds
            }
        }
    }
`;

export const fetchUser: Function = (id: number) => {
    return (
        useQuery(FETCH_USER, { variables: {id} })
    );
};
export const createUser: Function = (password: String, username: String) => {
    return (
        useMutation(CREATE_USER, { variables: {
            password,
            username
        }})
    );
};