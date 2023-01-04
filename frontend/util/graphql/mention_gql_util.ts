import { DocumentNode, gql, useMutation } from "@apollo/client";

const UPDATE_MENTION: DocumentNode = gql`
    mutation UPDATE_MENTION($id: ID!) {
        updateMention(input: {id: $id}) {
            mention {
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
`;

export const updateMention: Function = (id: Number) => {
    return (
        useMutation(UPDATE_MENTION, { variables: {
            id
        }})
    );
};