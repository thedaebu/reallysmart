import { DocumentNode, gql } from "@apollo/client";

export const CREATE_USER_GQL = gql`
    mutation CREATE_USER($username: String!, $password: String!) {
        createUser(input: {username: $username, password: $password}) {
            user {
                id
                username
            }
        }
    }
`;