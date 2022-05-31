import { createStore } from "redux";
import rootReducer from "../../reducers/root_reducer";
import annotationsReducer from "../../reducers/annotations_reducer";
import { testAnnotationsData } from "../test_store_data";
import { Annotation } from "../../my_types";

describe("annotations reducer", () => {
    const testAnnotations: { [key: number]: Annotation } = testAnnotationsData;
    Object.freeze(testAnnotations);
    const testAnnotation: { [key: number]: Annotation } = { 
        3: {
            annotator_id: 1,
            annotator_name: "reallysmart",
            body: "Annotation",
            end_index: 100,
            id: 3,
            start_index: 200,
            track_id: 1
        }
    };
    const combinedAnnotations: { [key: number]: Annotation } = Object.assign({}, testAnnotations, testAnnotation);

    test("exports a function", () => {
        expect(typeof annotationsReducer).toEqual("function");
    });
    describe("annotation actions", () => {
        test("initializes with an empty object as the default state", () => {
            expect(annotationsReducer(undefined, {})).toEqual({});
        });
        test("returns the previous state if an action is not matched", () => {
            const state: { [key:number]: Annotation } = annotationsReducer(testAnnotations, { type: "NONANNOTATION_ACTION"});
            expect(state).toEqual(testAnnotations);
        });
        describe("RECEIVE_TRACKS action", () => {
            test("removes all annotation data", () => {
                const state: { [key:number]: Annotation } = annotationsReducer(testAnnotations, { type: "RECEIVE_TRACKS" });
                expect(state).toEqual({});
            });
            test("does not modify the previous state", () => {
                const state: { [key:number]: Annotation } = annotationsReducer(testAnnotations, { type: "RECEIVE_TRACKS" });
                expect(testAnnotations).toEqual(testAnnotations);
            });
        });
        describe("RECEIVE_TRACK action", () => {
            test("returns annotation data", () => {
                const state: { [key:number]: Annotation } = annotationsReducer({}, { type: "RECEIVE_TRACK", annotations: testAnnotations });
                expect(state).toEqual(testAnnotations);
            });
            test("does not modify the previous state", () => {
                const state: { [key:number]: Annotation } = annotationsReducer(testAnnotations, { type: "RECEIVE_TRACK", annotations: combinedAnnotations });
                expect(testAnnotations).toEqual(testAnnotations);
            });
        });
        describe("RECEIVE_ANNOTATION action", () => {
            test("returns data with updated annotation", () => {
                const state: { [key:number]: Annotation } = annotationsReducer(testAnnotations, { type: "RECEIVE_ANNOTATION", annotation: testAnnotation[3] });
                expect(state).toEqual(combinedAnnotations);
            });
            test("does not modify the previous state", () => {
                const state: { [key:number]: Annotation } = annotationsReducer(testAnnotations, { type: "RECEIVE_ANNOTATION", annotation: testAnnotation[3] });
                expect(testAnnotations).toEqual(testAnnotations);
            });
        });
        describe("REMOVE_ANNOTATION action", () => {
            test("returns data without removed annotation", () => {
                const state: { [key:number]: Annotation } = annotationsReducer(combinedAnnotations, { type: "REMOVE_ANNOTATION", annotationId: 3 });
                expect(state).toEqual(testAnnotations);
            });
            test("does not modify the previous state", () => {
                const state: { [key:number]: Annotation } = annotationsReducer(testAnnotations, { type: "REMOVE_ANNOTATION", annotationId: 1 });
                expect(testAnnotations).toEqual(testAnnotations);
            });
        });
    });
    describe("dispatch to store", () => {
        let testStore: any;
        beforeEach(() => {
            testStore = createStore(rootReducer);
        });
        test("contains the correct annotation data for RECEIVE_TRACK action", () => {
            testStore.dispatch({ type: "RECEIVE_TRACK", annotations: testAnnotations, track: { id: 1 } });
            expect(testStore.getState().entities.annotations).toEqual(testAnnotations);
        });
        test("contains the correct data for RECEIVE_ANNOTATION action", () => {
            testStore.dispatch({ type: "RECEIVE_TRACK", annotations: testAnnotations, track: { id: 1 } });
            expect(testStore.getState().entities.annotations).toEqual(testAnnotations);
            testStore.dispatch({ type: "RECEIVE_ANNOTATION", annotation: testAnnotation[3] });
            expect(testStore.getState().entities.annotations).toEqual(combinedAnnotations);
        });
        test("contains the correct data for REMOVE_ANNOTATION action", () => {
            testStore.dispatch({ type: "RECEIVE_TRACK", annotations: combinedAnnotations, track: { id: 1 } });
            expect(testStore.getState().entities.annotations).toEqual(combinedAnnotations);
            testStore.dispatch({ type: "REMOVE_ANNOTATION", annotationId: 3 });
            expect(testStore.getState().entities.annotations).toEqual(testAnnotations);
        });
    });
});