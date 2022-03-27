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
    query FETCH_TRACK($id: Integer!){
        track(id: $id) {
            artist
            artworkPath
            id
            lyrics
            title
            annotations {
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
                commentableType
                commentableId
                commenterId
                commenterName
                id
                commenter
                votes
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