import { DocumentNode, gql } from "@apollo/client";

export const CREATE_VOTE: DocumentNode = gql`
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
export const DELETE_VOTE: DocumentNode = gql`
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