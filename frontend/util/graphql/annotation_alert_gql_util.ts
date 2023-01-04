import { DocumentNode, gql, useMutation } from "@apollo/client";

const UPDATE_ANNOTATION_ALERT: DocumentNode = gql`
    mutation UPDATE_ANNOTATION_ALERT($id: ID!) {
        updateAnnotationAlert(input: {id: $id}) {
            annotationAlert {
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
        }
    }
`;

export const updateAnnotationAlert: Function = (id: Number) => {
    return (
        useMutation(UPDATE_ANNOTATION_ALERT, { variables: {
            id
        }})
    );
};