import { gql } from "@apollo/client";

export const FETCH_TRACKS = gql`
    query FETCH_TRACKS {
        tracks {
            artist
            artworkPath
            id
            title
        }
    }
`;
export const FETCH_TRACK = gql`
    query FETCH_TRACK($id: ID!){
        track(id: $id) {
            artist
            artworkPath
            id
            lyrics
            title
            totalAnnotations {
                annotatorId
                annotatorName
                body
                endIndex
                id
                startIndex
                trackId
            }
            totalComments {
                body
                commentableId
                commentableType
                commenterId
                commenterName
                id
            }
            totalVotes {
                id
                voteableId
                voteableType
                voterId
            }
        }
    }
`;