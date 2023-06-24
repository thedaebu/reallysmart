import * as CommentActions from "../../actions/comment_actions";
import * as CommentAPIUtil from "../../util/api/comment_api_util";
import { mockStore, testCommentsData } from "../test_store_data";
import { Comment, CreatedComment, UpdatedComment } from "../../my_types";

describe("comment actions", () => {
    describe("constants", () => {
        test("exports a RECEIVE_COMMENT constant", () => {
            expect(CommentActions.RECEIVE_COMMENT).toEqual("RECEIVE_COMMENT");
        });
        test("exports a REMOVE_COMMENT constant", () => {
            expect(CommentActions.REMOVE_COMMENT).toEqual("REMOVE_COMMENT");
        });
    });
    describe("functions", () => {
        const comment: Comment = testCommentsData[1];
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
                const data = { comment: comment };
                CommentAPIUtil.fetchComment = jest.fn((commentId: number) => (
                    Promise.resolve(data)
                ));
                const actions = [{ type: "RECEIVE_COMMENT", comment: comment, flashMessage: "" }];
                return store.dispatch(CommentActions.fetchComment(comment.id)).then(() => {
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
                    commenter_id: 1
                };
                const data = { comment: comment };
                CommentAPIUtil.createComment = jest.fn((createdComment: CreatedComment) => (
                    Promise.resolve(data)
                ));
                const actions = [{ type: "RECEIVE_COMMENT", comment: comment, flashMessage: "Comment Creation Successful." }];
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
                    id: 1
                };
                const data = { comment: comment };
                CommentAPIUtil.updateComment = jest.fn((updatedComment: UpdatedComment) => (
                    Promise.resolve(data)
                ));
                const actions = [{ type: "RECEIVE_COMMENT", comment: comment, flashMessage: "Comment Update Successful." }];
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
                const data = { comment: comment };
                CommentAPIUtil.deleteComment = jest.fn((commentId: number) => (
                    Promise.resolve(data)
                ));
                const actions = [{ type: "REMOVE_COMMENT", commentId: comment.id, flashMessage: "Comment Deletion Successful." }];
                return store.dispatch(CommentActions.deleteComment(comment.id)).then(() => {
                    expect(store.getActions()).toEqual(actions);
                });
            });
        });
    });
});