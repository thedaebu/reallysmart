import { DocumentNode, gql, useQuery } from "@apollo/client";

const FETCH_SEARCHES: DocumentNode = gql`
    query FETCH_SEARCHES($search: String!) {
        searches(search: $search) {
            id
            artist
            artworkPath
            title
        }
    }
`;
export const fetchSearches: Function = (search: String) => {
    return (
        useQuery(FETCH_SEARCHES, { variables: { search }})
    );
};