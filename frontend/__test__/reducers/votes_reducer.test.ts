import { createStore } from "redux";
import rootReducer from "../../reducers/root_reducer";
import votesReducer from "../../reducers/votes_reducer";
import { testVotesData } from "../test_store_data";
import { Vote } from "../../my_types";

describe("votes reducer", () => {
    const testVotes: { [key: number]: Vote } = testVotesData;
    Object.freeze(testVotes);
    const testVote: { [key: number]: Vote } = {
        3: {
            id: 3,
            voteable_id: 1,
            voteable_type: "Annotation",
            voter_id: 1
        }
    };
    const combinedVotes: { [key: number]: Vote } = Object.assign({}, testVotes, testVote);

    test("exports a function", () => {
        expect(typeof votesReducer).toEqual("function");
    });
    describe("vote actions", () => {
        test("initializes with an empty object as the default state", () => {
            expect(votesReducer(undefined, {})).toEqual({});
        });
        test("returns the previous state if an action is not matched", () => {
            const state: { [key: number]: Vote } = votesReducer(testVotes, { type: "NONVOTE_ACTION"});
            expect(state).toEqual(testVotes);
        });
        describe("RECEIVE_TRACKS action", () => {
            test("removes all vote data", () => {
                const state: { [key: number]: Vote } = votesReducer(testVotes, { type: "RECEIVE_TRACKS" });
                expect(state).toEqual({});
            });
            test("does not modify the previous state", () => {
                const state: { [key: number]: Vote } = votesReducer(testVotes, { type: "RECEIVE_TRACKS" });
                expect(testVotes).toEqual(testVotes);
            });
        });
        describe("RECEIVE_TRACK action", () => {
            test("returns vote data", () => {
                const state: { [key: number]: Vote } = votesReducer({}, { type: "RECEIVE_TRACK", votes: testVotes });
                expect(state).toEqual(testVotes);
            });
            test("does not modify the previous state", () => {
                const state: { [key: number]: Vote } = votesReducer(testVotes, { type: "RECEIVE_TRACK", votes: combinedVotes });
                expect(testVotes).toEqual(testVotes);
            });
        });
        describe("RECEIVE_ANNOTATION action", () => {
            test("returns vote data", () => {
                const state: { [key: number]: Vote } = votesReducer({}, { type: "RECEIVE_ANNOTATION", votes: testVotes });
                expect(state).toEqual(testVotes);
            });
            test("does not modify the previous state", () => {
                const state: { [key: number]: Vote } = votesReducer(testVotes, { type: "RECEIVE_ANNOTATION", votes: combinedVotes });
                expect(testVotes).toEqual(testVotes);
            });
        });
        describe("RECEIVE_COMMENT action", () => {
            test("returns vote data", () => {
                const state: { [key: number]: Vote } = votesReducer({}, { type: "RECEIVE_COMMENT", votes: testVotes });
                expect(state).toEqual(testVotes);
            });
            test("does not modify the previous state", () => {
                const state: { [key: number]: Vote } = votesReducer(testVotes, { type: "RECEIVE_COMMENT", votes: combinedVotes });
                expect(testVotes).toEqual(testVotes);
            });
        });
        describe("RECEIVE_VOTE action", () => {
            test("returns data with updated vote", () => {
                const state: { [key: number]: Vote } = votesReducer(testVotes, { type: "RECEIVE_VOTE", vote: testVote[3] });
                expect(state).toEqual(combinedVotes);
            });
            test("does not modify the previous state", () => {
                const state: { [key: number]: Vote } = votesReducer(testVotes, { type: "RECEIVE_VOTE", vote: testVote[3] });
                expect(testVotes).toEqual(testVotes);
            });
        });
        describe("REMOVE_VOTE action", () => {
            test("returns data without removed vote", () => {
                const state: { [key: number]: Vote } = votesReducer(combinedVotes, { type: "REMOVE_VOTE", voteId: 3 });
                expect(state).toEqual(testVotes);
            });
            test("does not modify the previous state", () => {
                const state: { [key: number]: Vote } = votesReducer(testVotes, { type: "REMOVE_VOTE", voteId: 3 });
                expect(testVotes).toEqual(testVotes);
            });
        });
    });
    describe("dispatch to store", () => {
        let testStore: any;
        beforeEach(() => {
            testStore = createStore(rootReducer);
        });
        test("contains the correct vote data for RECEIVE_TRACK action", () => {
            testStore.dispatch({ type: "RECEIVE_TRACK", votes: testVotes, track: { id: 1 } });
            expect(testStore.getState().entities.votes).toEqual(testVotes);
        });
        test("contains the correct data for RECEIVE_VOTE action", () => {
            testStore.dispatch({ type: "RECEIVE_TRACK", votes: testVotes, track: { id: 1 } });
            expect(testStore.getState().entities.votes).toEqual(testVotes);
            testStore.dispatch({ type: "RECEIVE_VOTE", vote: testVote[3] });
            expect(testStore.getState().entities.votes).toEqual(combinedVotes);
        });
        test("contains the correct data for REMOVE_VOTE action", () => {
            testStore.dispatch({ type: "RECEIVE_TRACK", votes: combinedVotes, track: { id: 1 } });
            expect(testStore.getState().entities.votes).toEqual(combinedVotes);
            testStore.dispatch({ type: "REMOVE_VOTE", voteId: 3 });
            expect(testStore.getState().entities.votes).toEqual(testVotes);
        });
    });
});