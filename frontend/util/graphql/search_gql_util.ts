import { DocumentNode, gql } from "@apollo/client";

export const FETCH_SEARCHES_GQL: DocumentNode = gql`
    query FETCH_SEARCHES($search: String!) {
        searches(search: $search) {
            artist
            artworkPath
            id
            title
        }
    }
`;