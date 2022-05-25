import { createStore } from "redux";
import entitiesReducer from "../../reducers/entities_reducer";
import errorsReducer from "../../reducers/errors_reducer";
import modalReducer from "../../reducers/modal_reducer";
import rootReducer from "../../reducers/root_reducer";
import sessionReducer from "../../reducers/session_reducer";

describe("root reducer", () => {
    let testStore: any;
    beforeAll(() => {
        testStore = createStore(rootReducer);
    })
    test("exports a function", () => {
        expect(typeof rootReducer).toEqual("function");
    });
    describe("entities reducer", () => {
        test("exports a function", () => {
            expect(typeof entitiesReducer).toEqual("function");
        });
        test("is included in the entities key", () => {
            expect(testStore.getState().entities).toBeDefined();
        });
    });
    describe("errors reducer", () => {
        test("exports a function", () => {
            expect(typeof errorsReducer).toEqual("function");
        });
        test("is included in the errors key", () => {
            expect(testStore.getState().errors).toBeDefined();
        });
    });
    describe("modal reducer", () => {
        test("exports a function", () => {
            expect(typeof modalReducer).toEqual("function");
        });
        test("is included in the modal key", () => {
            expect(testStore.getState().modal).toBeDefined();
        });
    });
    describe("session reducer", () => {
        test("exports a function", () => {
            expect(typeof sessionReducer).toEqual("function");
        });
        test("is included in the errors key", () => {
            expect(testStore.getState().session).toBeDefined();
        });
    });
});