import { DocumentNode, gql, useQuery } from "@apollo/client";

const FETCH_TRACKS: DocumentNode = gql`
    query FETCH_TRACKS {
        tracks {
            id
            artist
            artworkPath
            title
        }
    }
`;
const FETCH_TRACK: DocumentNode = gql`
    query FETCH_TRACKS($id: ID!) {
        track(id: $id) {
            id
            artist
            artworkPath
            lyrics
            spotifyPath
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

export const fetchTracksGQL: Function = () => {
    return (
        useQuery(FETCH_TRACKS)
    );
};
export const fetchTrackGQL: Function = (trackId: String) => {
    return (
        useQuery(FETCH_TRACK, {variables: {id: trackId}})
    );
};