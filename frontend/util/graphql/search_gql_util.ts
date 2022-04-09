import { DocumentNode, gql } from "@apollo/client";

export const FETCH_SEARCHES: DocumentNode = gql`
    query FETCH_SEARCHES($search: String!) {
        searches(search: $search) {
            id
            artist
            artworkPath
            title
        }
    }
`;