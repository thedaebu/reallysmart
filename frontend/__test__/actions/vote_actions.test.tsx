import configureMockStore from "redux-mock-store";
import thunk from "redux-thunk";
import * as VoteActions from "../../actions/vote_actions";
import { CreatedVote } from "../../my_types";
import * as VoteAPIUtil from "../../util/api/vote_api_util";
import { testTrackShowStore } from "../test_store_data";

const middlewares = [ thunk ];
const mockStore = configureMockStore(middlewares);

describe("vote actions", () => {
    describe("constants", () => {
        test("exports a RECEIVE_VOTE constant", () => {
            expect(VoteActions.RECEIVE_VOTE).toEqual("RECEIVE_VOTE");
        });
        test("exports a REMOVE_VOTE constant", () => {
            expect(VoteActions.REMOVE_VOTE).toEqual("REMOVE_VOTE");
        });
    });
    describe("functions", () => {
        let store: any;
        beforeEach(() => {
            store = mockStore({ votes: {} });
        });
        afterEach(() => {
            store.clearActions();
        });
        describe("createVote", () => {
            test("is exported", () => {
                expect(typeof VoteActions.createVote).toEqual("function");
            });
            test("dispatched RECEIVE_VOTE when createVote is called", () => {
                const createdVote: CreatedVote = { 
                    voteable_id: 1,
                    voteable_type: "Annotation",
                    voter_id: 2,
                };
                const data = { vote: testTrackShowStore.entities.votes[1] };
                VoteAPIUtil.createVote = jest.fn(() => (
                    Promise.resolve(data)
                ));
                const actions = [{ type: "RECEIVE_VOTE", vote: data.vote }];
                return store.dispatch(VoteActions.createVote(createdVote)).then(() => {
                    expect(store.getActions()).toEqual(actions);
                });
            });
        });
        describe("deleteVote", () => {
            test("is exported", () => {
                expect(typeof VoteActions.deleteVote).toEqual("function");
            });
            test("dispatches REMOVE_VOTE when deleteVote is called", () => {
                const data = { vote: testTrackShowStore.entities.votes[1] };
                VoteAPIUtil.deleteVote = jest.fn((voteId: number) => (
                    Promise.resolve(data)
                ));
                const actions = [{ type: "REMOVE_VOTE", voteId: data.vote.id }];
                return store.dispatch(VoteActions.deleteVote(data.vote.id)).then(() => {
                    expect(store.getActions()).toEqual(actions);
                });
            });
        });
    });
});