import { DocumentNode, gql } from "@apollo/client";

export const FETCH_TRACKS: DocumentNode = gql`
    query FETCH_TRACKS {
        tracks {
            id
            artist
            artworkPath
            title
        }
    }
`;
export const FETCH_TRACK: DocumentNode = gql`
    query FETCH_TRACKS($id: ID!) {
        track(id: $id) {
            id
            artist
            artworkPath
            lyrics
            title
            totalAnnotations {
                id
                body
                annotatorId
                annotatorName
                endIndex
                startIndex
                trackId
            }
            totalComments {
                id
                body
                commentableType
                commentableId
                commenterId
                commenterName
                updatedAt
            }
            totalVotes {
                id
                voteableType
                voteableId
                voterId
            }
        }
    }
`;