import { createStore } from "redux";
import rootReducer from "../../reducers/root_reducer";
import annotationModalReducer from "../../reducers/annotation_modal_reducer";

describe("annotation modal reducer", () => {
    test("exports a function", () => {
        expect(typeof annotationModalReducer).toEqual("function");
    });
    describe("annotation modal actions", () => {
        test("initializes with an empty object as the default state", () => {
            expect(annotationModalReducer({}, {})).toEqual(false);
        });
        test("returns the previous state if an action is not matched", () => {
            const state: boolean = annotationModalReducer(false, {type: "NONANNOTATION_MODAL_ACTION"});
            expect(state).toEqual(false);
        });
        describe("OPEN_ANNOTATION_MODAL action", () => {
            test("returns the id of the current user", () => {
                const state: boolean = annotationModalReducer(false, {type: "OPEN_ANNOTATION_MODAL"});
                expect(state).toEqual(true);
            });
        });
        describe("CLOSE_ANNOTATION_MODAL action", () => {
            test("returns the id of the current user", () => {
                const state: boolean = annotationModalReducer(true, {type: "CLOSE_ANNOTATION_MODAL"});
                expect(state).toEqual(false);
            });
        });
    });
    describe("dispatch to store", () => {
        let testStore: any;
        beforeEach(() => {
            testStore = createStore(rootReducer);
        });
        test("contains the correct data for OPEN_ANNOTATION_MODAL action", () => {
            testStore.dispatch({type: "OPEN_ANNOTATION_MODAL"});
            expect(testStore.getState().modal.annotationModal).toEqual(true);
        });
        test("contains the correct data for CLOSE_ANNOTATION_MODAL", () => {
            testStore.dispatch({type: "OPEN_ANNOTATION_MODAL"});
            expect(testStore.getState().modal.annotationModal).toEqual(true);
            testStore.dispatch({type: "CLOSE_ANNOTATION_MODAL"});
            expect(testStore.getState().modal.annotationModal).toEqual(false);
        });
    });
});