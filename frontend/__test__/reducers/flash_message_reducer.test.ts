import { createStore } from "redux";
import rootReducer from "../../reducers/root_reducer";
import flashMessageReducer from "../../reducers/flash_message_reducer";

describe("flash message reducer", () => {
    const testFlashMessage = "Test Flash Message.";
    test("exports a function", () => {
        expect(typeof flashMessageReducer).toEqual("function");
    });
    test("initializes with an empty string as the default state", () => {
        expect(flashMessageReducer(undefined, {})).toEqual("");
    });
    test("returns the previous state if an action is not matched", () => {
        const state: string = flashMessageReducer("", { type: "NONFLASHMESSAGE_ACTION", flashMessage: testFlashMessage });
        expect(state).toEqual("");
    });
    describe("actions", () => {
        describe("flash message actions", () => {
            test("CLEAR_FLASH_MESSAGE returns an empty string", () => {
                const state: string = flashMessageReducer(testFlashMessage, { type: "CLEAR_FLASH_MESSAGE" });
                    expect(state).toEqual("");
            });
        });
        describe("annotation actions", () => {
            test("RECEIVE_ANNOTATION returns specified flash message", () => {
                const state: string = flashMessageReducer(testFlashMessage, { type: "RECEIVE_ANNOTATION", flashMessage: testFlashMessage });
                    expect(state).toEqual(testFlashMessage);
            });
            test("REMOVE_ANNOTATION returns specified flash message", () => {
                const state: string = flashMessageReducer(testFlashMessage, { type: "REMOVE_ANNOTATION", flashMessage: testFlashMessage });
                    expect(state).toEqual(testFlashMessage);
            });
        });
        describe("comment actions", () => {
            test("RECEIVE_COMMENT returns specified flash message", () => {
                const state: string = flashMessageReducer(testFlashMessage, { type: "RECEIVE_COMMENT", flashMessage: testFlashMessage });
                    expect(state).toEqual(testFlashMessage);
            });
            test("REMOVE_COMMENT returns specified flash message", () => {
                const state: string = flashMessageReducer(testFlashMessage, { type: "REMOVE_COMMENT", flashMessage: testFlashMessage });
                    expect(state).toEqual(testFlashMessage);
            });
        });
        describe("session actions", () => {
            test("RECEIVE_CURRENT_USER returns specified flash message", () => {
                const state: string = flashMessageReducer(testFlashMessage, { type: "RECEIVE_CURRENT_USER", flashMessage: testFlashMessage });
                    expect(state).toEqual(testFlashMessage);
            });
            test("LOGOUT_CURRENT_USER returns specified flash message", () => {
                const state: string = flashMessageReducer(testFlashMessage, { type: "LOGOUT_CURRENT_USER", flashMessage: testFlashMessage });
                    expect(state).toEqual(testFlashMessage);
            });
        });
    });
    describe("dispatch to store", () => {
        let testStore: any;
        beforeEach(() => {
            testStore = createStore(rootReducer);
        });
        test("contains the correct data for RECEIVE_CURRENT_USER action", () => {
            testStore.dispatch({
                type: "RECEIVE_CURRENT_USER",
                flashMessage: testFlashMessage,
                user: {}
            });
            expect(testStore.getState().entities.flashMessage).toEqual(testFlashMessage);
        });
        test("contains the correct data for LOGOUT_CURRENT_USER action", () => {
            testStore.dispatch({
                type: "LOGOUT_CURRENT_USER",
                flashMessage: testFlashMessage
            });
            expect(testStore.getState().entities.flashMessage).toEqual(testFlashMessage);
        });
        test("contains the correct data for RECEIVE_ANNOTATION action", () => {
            testStore.dispatch({
                type: "RECEIVE_ANNOTATION",
                annotation: { 1: {} },
                flashMessage: testFlashMessage,
            });
            expect(testStore.getState().entities.flashMessage).toEqual(testFlashMessage);
        });
        test("contains the correct data for REMOVE_ANNOTATION action", () => {
            testStore.dispatch({
                type: "REMOVE_ANNOTATION",
                flashMessage: testFlashMessage
            });
            expect(testStore.getState().entities.flashMessage).toEqual(testFlashMessage);
        });
        test("contains the correct data for RECEIVE_COMMENT action", () => {
            testStore.dispatch({
                type: "RECEIVE_COMMENT",
                comment: { 1: {} },
                flashMessage: testFlashMessage
            });
            expect(testStore.getState().entities.flashMessage).toEqual(testFlashMessage);
        });
        test("contains the correct data for REMOVE_COMMENT action", () => {
            testStore.dispatch({
                type: "REMOVE_COMMENT",
                flashMessage: testFlashMessage
            });
            expect(testStore.getState().entities.flashMessage).toEqual(testFlashMessage);
        });
        test("contains the correct data for CLEAR_FLASH_MESSAGE action", () => {
            testStore.dispatch({
                type: "CLEAR_FLASH_MESSAGE"
            });
            expect(testStore.getState().entities.flashMessage).toEqual("");
        });
    });
});