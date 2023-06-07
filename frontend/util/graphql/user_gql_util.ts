import { DocumentNode, gql, useMutation } from "@apollo/client";

const CREATE_USER: DocumentNode = gql`
    mutation CREATE_USER($password: String!, $username: String!) {
        createUser(input: {password: $password, username: $username}) {
            user {
                id
                username
                voteIds
                annotationAlerts {
                    body
                    commenter_name
                    created_at
                    id
                    read
                    track {
                        artist
                        title
                    }
                    type
                }
                mentions {
                    body
                    created_at
                    id
                    mentioner_name
                    read
                    track {
                        artist
                        title
                    }
                    type
                }
            }
        }
    }
`;

export const createUser: Function = (password: String, username: String) => {
    return (
        useMutation(CREATE_USER, { variables: {
            password,
            username
        }})
    );
};