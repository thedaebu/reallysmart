import { gql } from "@apollo/client";

export const fetchTracksGQL = gql`
    query {
        tracks {
            artist
            artworkPath
            id
            title
        }
    }
`;