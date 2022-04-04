import { DocumentNode, gql } from "@apollo/client";

export const FETCH_VOTE_GQL: DocumentNode = gql`
    query FETCH_VOTE($id: ID!) {
        vote(id: $id) {
            id
            voteableId
            voteableType
            voterId
        }
    }
`;
export const CREATE_VOTE_GQL: DocumentNode = gql`
    mutation CREATE_VOTE($voteableId: Integer!, $voteableType: String!, $voterId: Integer!) {
        createVote(input: {voteableId: $voteableId, voteableType: $voteableType, voterId: $voterId}) {
            vote {
                id
                voteableId
                voteableType
                voterId
            }
        }
    }
`;
export const DELETE_VOTE_GQL: DocumentNode = gql`
    mutation DELETE_VOTE($id: ID!) {
        deleteVote(input: {id: $id}) {
            vote {
                id
                voteableId
                voteableType
                voterId
            }
        }
    }
`;