import configureMockStore from "redux-mock-store";
import thunk from "redux-thunk";
import * as CommentActions from "../../actions/comment_actions";
import { CreatedComment, UpdatedComment } from "../../my_types";
import * as CommentAPIUtil from "../../util/api/comment_api_util";
import { testTrackShowStore } from "../test_store_data";

const middlewares = [ thunk ];
const mockStore = configureMockStore(middlewares);

describe("comment actions", () => {
    describe("constant exports", () => {
        test("exports a RECEIVE_COMMENT constant", () => {
            expect(CommentActions.RECEIVE_COMMENT).toEqual("RECEIVE_COMMENT");
        });
        test("exports a REMOVE_COMMENT constant", () => {
            expect(CommentActions.REMOVE_COMMENT).toEqual("REMOVE_COMMENT");
        });
    });
    describe("functions", () => {
        let store: any;
        beforeEach(() => {
            store = mockStore({comments: {}});
        });
        afterEach(() => {
            store.clearActions();
        });
        describe("fetchComment", () => {
            test("is exported", () => {
                expect(typeof CommentActions.fetchComment).toEqual("function");
            });
            test("dispatches RECEIVE_COMMENT when fetchComment is called", () => {
                const data = { comment: testTrackShowStore.entities.comments[1]};
                CommentAPIUtil.fetchComment = jest.fn(() => (
                    Promise.resolve(data)
                ));
                const actions = [{ type: "RECEIVE_COMMENT", comment: data.comment }];
                return store.dispatch(CommentActions.fetchComment(1)).then(() => {
                    expect(store.getActions()).toEqual(actions);
                });
            });
        });
        describe("createComment", () => {
            test("is exported", () => {
                expect(typeof CommentActions.createComment).toEqual("function");
            });
            test("dispatches RECEIVE_COMMENT when createComment is called", () => {
                const createdComment: CreatedComment = {
                    body: "This is one of my new favorite songs now.",
                    commentable_id: 1,
                    commentable_type: "Track",
                    commenter_id: 1,
                    commenter_name: "reallysmart"
                };
                const data = { comment: testTrackShowStore.entities.comments[1]};
                CommentAPIUtil.createComment = jest.fn(() => (
                    Promise.resolve(data)
                ));
                const actions = [{ type: "RECEIVE_COMMENT", comment: data.comment }];
                return store.dispatch(CommentActions.createComment(createdComment)).then(() => {
                    expect(store.getActions()).toEqual(actions);
                });
            });
        });
        describe("updateComment", () => {
            test("is exported", () => {
                expect(typeof CommentActions.updateComment).toEqual("function");
            });
            test("dispatches RECEIVE_COMMENT when updateComment is called", () => {
                const updatedComment: UpdatedComment = {
                    body: "This is one of my new favorite songs now.",
                    commentable_id: 1,
                    commentable_type: "Track",
                    commenter_id: 1,
                    commenter_name: "reallysmart",
                    id: 1
                };
                const data = { comment: testTrackShowStore.entities.comments[1]};
                CommentAPIUtil.updateComment = jest.fn(() => (
                    Promise.resolve(data)
                ));
                const actions = [{ type: "RECEIVE_COMMENT", comment: data.comment }];
                return store.dispatch(CommentActions.updateComment(updatedComment)).then(() => {
                    expect(store.getActions()).toEqual(actions);
                });
            });
        });
        describe("deleteComment", () => {
            test("is exported", () => {
                expect(typeof CommentActions.deleteComment).toEqual("function");
            });
            test("dispatches REMOVE_COMMENT when deleteComment is called", () => {
                const data = { comment: testTrackShowStore.entities.comments[1]};
                CommentAPIUtil.deleteComment = jest.fn((commentId: number) => (
                    Promise.resolve(data)
                ));
                const actions = [{ type: "REMOVE_COMMENT", commentId: data.comment.id }];
                return store.dispatch(CommentActions.deleteComment(data.comment.id)).then(() => {
                    expect(store.getActions()).toEqual(actions);
                });
            });
        });
    });
});