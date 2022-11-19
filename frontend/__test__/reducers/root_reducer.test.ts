import { createStore } from "redux";
import { Store } from "../../store/store";
import entitiesReducer from "../../reducers/entities_reducer";
import rootReducer from "../../reducers/root_reducer";
import sessionReducer from "../../reducers/session_reducer";

describe("root reducer", () => {
    let testStore: Store;
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
    describe("session reducer", () => {
        test("exports a function", () => {
            expect(typeof sessionReducer).toEqual("function");
        });
        test("is included in the errors key", () => {
            expect(testStore.getState().session).toBeDefined();
        });
    });
});