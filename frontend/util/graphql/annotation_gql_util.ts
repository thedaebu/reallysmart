import { DocumentNode, gql } from "@apollo/client";

export const FETCH_ANNOTATION_GQL: DocumentNode = gql`
    query FETCH_ANNOTATION($id: ID!) {
        query(id: $id) {
            annotatorId
            annotatorName
            body
            endIndex
            id
            startIndex
            trackId
        }
    }
`;