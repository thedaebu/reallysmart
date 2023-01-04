import { DocumentNode, gql, useQuery } from "@apollo/client";

const FETCH_TRACKS: DocumentNode = gql`
    query FETCH_TRACKS {
        tracks {
            artist
            artworkPath
            id
            title
        }
    }
`;
const FETCH_TRACK: DocumentNode = gql`
    query FETCH_TRACKS($id: ID!) {
        track(id: $id) {
            artist
            artworkPath
            id
            lyrics
            spotifyPath
            title
            annotations {
                annotatorId
                annotatorName
                body
                createdAt
                endIndex
                id
                startIndex
                trackId
                updatedAt
            }
            comments {
                body
                commentableId
                commentableType
                commenterName
                id
                updatedAt
            }
            votes {
                id
                voteableId
                voteableType
                voterId
            }
        }
    }
`;

export const fetchTracks: Function = () => {
    return (
        useQuery(FETCH_TRACKS)
    );
};
export const fetchTrack: Function = (id: number) => {
    return (
        useQuery(FETCH_TRACK, { variables: {id: id}} )
    );
};