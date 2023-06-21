import * as AnnotationActions from "../../actions/annotation_actions";
import * as AnnotationAPIUtil from "../../util/api/annotation_api_util";
import * as CommentActions from "../../actions/comment_actions";
import * as CommentAPIUtil from "../../util/api/comment_api_util";
import * as FlashMessageActions from "../../actions/flash_message_actions";
import * as SessionActions from "../../actions/session_actions";
import * as SessionAPIUtil from "../../util/api/session_api_util";
import * as UserAPIUtil from "../../util/api/user_api_util";
import { mockStore } from "../test_store_data";
import { MockStoreEnhanced } from "redux-mock-store";

describe("flash message actions", () => {
    describe("constants", () => {
        test("exports CLEAR_FLASH_MESSAGE", () => {
            expect(FlashMessageActions.CLEAR_FLASH_MESSAGE).toEqual("CLEAR_FLASH_MESSAGE");
        });
    });
    describe("functions", () => {
        let store: MockStoreEnhanced;
        beforeEach(() => {
            store = mockStore({ flashMessage: "" });
        });
        afterEach(() => {
            store.clearActions();
        });
        describe("deleteFlashMessage", () => {
            test("is exported", () => {
                expect(typeof FlashMessageActions.deleteFlashMessage).toEqual("function");
            });
            test("dispatches CLEAR_FLASH_MESSAGE when deleteFlashMessage is called", () => {
                const actions = [{ type: "CLEAR_FLASH_MESSAGE" }];
                store.dispatch(FlashMessageActions.deleteFlashMessage());
                expect(store.getActions()).toEqual(actions);
            });
        });
    });
    describe("flash message display", () => {
        let store: MockStoreEnhanced;
        beforeEach(() => {
            store = mockStore({ flashMessage: "" });
        });
        afterEach(() => {
            store.clearActions();
        });
        describe("annotation actions", () => {
            test("dispatches 'Annotation Creation Successful.' when annotation creation is successful", () => {
                const data = { annotation: {} };
                AnnotationAPIUtil.createAnnotation = jest.fn(() => (
                    Promise.resolve(data)
                ));
                return store.dispatch(AnnotationActions.createAnnotation()).then(() => {
                    expect(store.getActions()[0].flashMessage).toEqual("Annotation Creation Successful.");
                });
            });
            test("dispatches 'Annotation Deletion Successful.' when annotation deletion is successful", () => {
                const data = { annotation: {} };
                AnnotationAPIUtil.deleteAnnotation = jest.fn(() => (
                    Promise.resolve()
                ));
                return store.dispatch(AnnotationActions.deleteAnnotation()).then(() => {
                    expect(store.getActions()[0].flashMessage).toEqual("Annotation Deletion Successful.");
                });
            });
            test("dispatches 'Annotation Update Successful.' when annotation update is successful", () => {
                const data = { annotation: {} };
                AnnotationAPIUtil.updateAnnotation = jest.fn(() => (
                    Promise.resolve(data)
                ));
                return store.dispatch(AnnotationActions.updateAnnotation()).then(() => {
                    expect(store.getActions()[0].flashMessage).toEqual("Annotation Update Successful.");
                });
            });
        });
        describe("comment actions", () => {
            test("dispatches 'Comment Creation Successful.' when comment creation is successful", () => {
                const data = { comment: {} };
                CommentAPIUtil.createComment = jest.fn(() => (
                    Promise.resolve(data)
                ));
                return store.dispatch(CommentActions.createComment()).then(() => {
                    expect(store.getActions()[0].flashMessage).toEqual("Comment Creation Successful.");
                });
            });
            test("dispatches 'Comment Deletion Successful.' when comment deletion is successful", () => {
                const data = { comment: {} };
                CommentAPIUtil.deleteComment = jest.fn(() => (
                    Promise.resolve()
                ));
                return store.dispatch(CommentActions.deleteComment()).then(() => {
                    expect(store.getActions()[0].flashMessage).toEqual("Comment Deletion Successful.");
                });
            });
            test("dispatches 'Comment Update Successful.' when comment update is successful", () => {
                const data = { Comment: {} };
                CommentAPIUtil.updateComment = jest.fn(() => (
                    Promise.resolve(data)
                ));
                return store.dispatch(CommentActions.updateComment()).then(() => {
                    expect(store.getActions()[0].flashMessage).toEqual("Comment Update Successful.");
                });
            });
        });
        describe("session actions", () => {
            test("dispatches 'Log In Successful.' when log in is successful", () => {
                const data = { user: {} };
                SessionAPIUtil.login = jest.fn(() => (
                    Promise.resolve(data)
                ));
                return store.dispatch(SessionActions.login()).then(() => {
                    expect(store.getActions()[0].flashMessage).toEqual("Log In Successful.");
                });
            });
            test("dispatches 'Log Out Successful.' when log out is successful", () => {
                SessionAPIUtil.logout = jest.fn(() => (
                    Promise.resolve()
                ));
                return store.dispatch(SessionActions.logout()).then(() => {
                    expect(store.getActions()[0].flashMessage).toEqual("Log Out Successful.");
                });
            });
            test("dispatches 'Sign Up Successful.' when sign up is successful", () => {
                const data = { user: {} };
                SessionAPIUtil.signup = jest.fn(() => (
                    Promise.resolve(data)
                ));
                return store.dispatch(SessionActions.signup()).then(() => {
                    expect(store.getActions()[0].flashMessage).toEqual("Sign Up Successful.");
                });
            });
            test("dispatches 'User Update Successful.' when user update is successful", () => {
                const data = { user: {} };
                UserAPIUtil.updateUser = jest.fn(() => (
                    Promise.resolve(data)
                ));
                return store.dispatch(SessionActions.updateUser()).then(() => {
                    expect(store.getActions()[0].flashMessage).toEqual("User Update Successful.");
                });
            });
        });
    });
});