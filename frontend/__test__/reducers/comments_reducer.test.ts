import { createStore } from "redux";
import rootReducer from "../../reducers/root_reducer";
import commentsReducer from "../../reducers/comments_reducer";
import { testCommentsData } from "../test_store_data";
import { Comment } from "../../my_types";

describe("comments reducer", () => {
    const testComments: { [key: number]: Comment } = testCommentsData;
    Object.freeze(testComments);
    const testComment: { [key: number]: Comment } = {
        4: {
            body: "Comment",
            commentable_id: 1,
            commentable_type: "Track",
            commenter_id: 1,
            commenter_name: "Commenter",
            id: 4,
            updated_at: "01/01/2000"
        }
    };
    const combinedComments: { [key: number]: Comment } = Object.assign({}, testComments, testComment);

    test("exports a function", () => {
        expect(typeof commentsReducer).toEqual("function");
    });
    describe("comment actions", () => {
        test("initializes with an empty object as the default state", () => {
            expect(commentsReducer(undefined, {})).toEqual({});
        });
        test("returns the previous state if an action is not matched", () => {
            const state: { [key:number]: Comment } = commentsReducer(testComments, { type: "NONCOMMENT_ACTION"});
            expect(state).toEqual(testComments);
        });
        describe("RECEIVE_TRACKS action", () => {
            test("removes all comment data", () => {
                const state: { [key:number]: Comment } = commentsReducer(testComments, { type: "RECEIVE_TRACKS" });
                expect(state).toEqual({});
            });
            test("does not modify the previous state", () => {
                const state: { [key:number]: Comment } = commentsReducer(testComments, { type: "RECEIVE_TRACKS" });
                expect(testComments).toEqual(testComments);
            });
        });
        describe("RECEIVE_TRACK action", () => {
            test("returns comment data", () => {
                const state: { [key:number]: Comment } = commentsReducer({}, { type: "RECEIVE_TRACK", comments: testComments });
                expect(state).toEqual(testComments);
            });
            test("does not modify the previous state", () => {
                const state: { [key:number]: Comment } = commentsReducer(testComments, { type: "RECEIVE_TRACK", comments: combinedComments });
                expect(testComments).toEqual(testComments);
            });
        });
        describe("RECEIVE_COMMENT action", () => {
            test("returns data with updated comment", () => {
                const state: { [key:number]: Comment } = commentsReducer(testComments, { type: "RECEIVE_COMMENT", comment: testComment[4] });
                expect(state).toEqual(combinedComments);
            });
            test("does not modify the previous state", () => {
                const state: { [key:number]: Comment } = commentsReducer(testComments, { type: "RECEIVE_COMMENT", comment: testComment[4] });
                expect(testComments).toEqual(testComments);
            });
        });
        describe("REMOVE_COMMENT action", () => {
            test("returns data without removed comment", () => {
                const state: { [key:number]: Comment } = commentsReducer(combinedComments, { type: "REMOVE_COMMENT", commentId: 4 });
                expect(state).toEqual(testComments);
            });
            test("does not modify the previous state", () => {
                const state: { [key:number]: Comment } = commentsReducer(testComments, { type: "REMOVE_COMMENT", commentId: 4 });
                expect(testComments).toEqual(testComments);
            });
        });
    });
    describe("dispatch to store", () => {
        let testStore: any;
        beforeEach(() => {
            testStore = createStore(rootReducer);
        });
        test("contains the correct data for RECEIVE_TRACK action", () => {
            testStore.dispatch({ type: "RECEIVE_TRACK", comments: testComments, annotations: {}, track: {}, votes: {} });
            expect(testStore.getState().entities.comments).toEqual(testComments);
        });
        test("contains the correct data for RECEIVE_COMMENT action", () => {
            testStore.dispatch({ type: "RECEIVE_TRACK", comments: testComments, annotations: {}, track: {}, votes: {} });
            expect(testStore.getState().entities.comments).toEqual(testComments);
            testStore.dispatch({ type: "RECEIVE_COMMENT", comment: testComment[4] });
            expect(testStore.getState().entities.comments).toEqual(combinedComments);
        });
        test("contains the correct data for REMOVE_COMMENT action", () => {
            testStore.dispatch({ type: "RECEIVE_TRACK", comments: combinedComments, annotations: {}, track: {}, votes: {} });
            expect(testStore.getState().entities.comments).toEqual(combinedComments);
            testStore.dispatch({ type: "REMOVE_COMMENT", commentId: 4 });
            expect(testStore.getState().entities.comments).toEqual(testComments);
        });
    });
});