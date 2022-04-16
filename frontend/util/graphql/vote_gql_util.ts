import { DocumentNode, gql, useMutation } from "@apollo/client";

const CREATE_VOTE: DocumentNode = gql`
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
const DELETE_VOTE: DocumentNode = gql`
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

export const createVote: Function = (voteableId: Number, voteableType: String, voterId: Number) => {
    return (
        useMutation(CREATE_VOTE, { variables: {
            voteableId,
            voteableType,
            voterId
        }})
    );
};
export const deleteVote: Function = (id: Number) => {
    return (
        useMutation(DELETE_VOTE, { variables: { id } })
    );
};