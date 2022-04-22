import configureMockStore from "redux-mock-store";
import thunk from "redux-thunk";
import * as AnnotationActions from "../../actions/annotation_actions";
import { CreatedAnnotation, UpdatedAnnotation } from "../../my_types";
import * as AnnotationAPIUtil from "../../util/api/annotation_api_util";
import { testTrackShowStore } from "../test_store_data";

const middlewares = [ thunk ];
const mockStore = configureMockStore(middlewares);

describe("annotation actions", () => {
    describe("action constants", () => {
        test("exports a RECEIVE_ANNOTATION constant", () => {
            expect(AnnotationActions.RECEIVE_ANNOTATION).toEqual("RECEIVE_ANNOTATION");
        });
        test("exports a RECEIVE_ANNOTATION_ERRORS constant", () => {
            expect(AnnotationActions.RECEIVE_ANNOTATION_ERRORS).toEqual("RECEIVE_ANNOTATION_ERRORS");
        });
        test("exports a REMOVE_ANNOTATION constat", () => {
            expect(AnnotationActions.REMOVE_ANNOTATION).toEqual("REMOVE_ANNOTATION");
        });
    });
    describe("functions", () => {
        let store: any;
        beforeEach(() => {
            store = mockStore({tracks: {}});
        });
        afterEach(() => {
            store.clearActions();
        });
        describe("fetchAnnotation", () => {
            test("is exported", () => {
                expect(typeof AnnotationActions.fetchAnnotation).toEqual("function");
            });
            test("dispatches RECEIVE_ANNOTATION when fetchAnnotation is called", () => {
                const data = { annotation: testTrackShowStore.entities.annotations[1] };
                AnnotationAPIUtil.fetchAnnotation = jest.fn(() => (
                    Promise.resolve(data)
                ));
                const actions = [{ type: "RECEIVE_ANNOTATION", annotation: data.annotation }];
                return store.dispatch(AnnotationActions.fetchAnnotation(1)).then(() => {
                    expect(store.getActions()).toEqual(actions);
                });
            });
        });
        describe("createAnnotation", () => {
            test("is exported", () => {
                expect(typeof AnnotationActions.createAnnotation).toEqual("function");
            });
            test("dispatches RECEIVE_ANNOTATION when createAnnotation is called", () => {
                const createdAnnotation: CreatedAnnotation = {
                        annotator_id: 1,
                        annotator_name: "reallysmart",
                        body: "annotation body",
                        end_index: 1,
                        start_index: 1,
                        track_id: 1
                };
                const data = {
                    annotation: {
                        annotator_id: 1,
                        annotator_name: "reallysmart",
                        body: "annotation body",
                        end_index: 1,
                        id: 1,
                        start_index: 1,
                        track_id: 1
                    }
                };
                AnnotationAPIUtil.createAnnotation = jest.fn(() => (
                    Promise.resolve(data)
                ));
                const actions = [{ type: "RECEIVE_ANNOTATION", annotation: data.annotation }];
                return store.dispatch(AnnotationActions.createAnnotation(createdAnnotation)).then(() => {
                    expect(store.getActions()).toEqual(actions);
                });
            });
        });
        describe("updateAnnotation", () => {
            test("is exported", () => {
                expect(typeof AnnotationActions.updateAnnotation).toEqual("function");
            });
            test("dispatches RECEIVE_ANNOTATION when updateAnnotation is called", () => {
                const updatedAnnotation: UpdatedAnnotation = {
                        annotator_id: 1,
                        annotator_name: "reallysmart",
                        body: "annotation body",
                        end_index: 1,
                        id: 1,
                        start_index: 1,
                        track_id: 1
                };
                const data = {
                    annotation: {
                        annotator_id: 1,
                        annotator_name: "reallysmart",
                        body: "annotation body",
                        end_index: 1,
                        id: 1,
                        start_index: 1,
                        track_id: 1
                    }
                };
                AnnotationAPIUtil.updateAnnotation = jest.fn(() => (
                    Promise.resolve(data)
                ));
                const actions = [{ type: "RECEIVE_ANNOTATION", annotation: data.annotation }];
                return store.dispatch(AnnotationActions.updateAnnotation(updatedAnnotation)).then(() => {
                    expect(store.getActions()).toEqual(actions);
                });
            });
        });
        describe("deleteAnnotation", () => {
            test("is exported", () => {
                expect(typeof AnnotationActions.deleteAnnotation).toEqual("function");
            });
            test("dispatched REMOVE_ANNOTATION when deleteAnnotation is called", () => {
                const data = { annotation: testTrackShowStore.entities.annotations[1] };
                AnnotationAPIUtil.deleteAnnotation = jest.fn((postId: number) => (
                    Promise.resolve(data)
                ));
                const actions = [{ type: "REMOVE_ANNOTATION", annotationId: 1 }];
                return store.dispatch(AnnotationActions.deleteAnnotation(1)).then(() => {
                    expect(store.getActions()).toEqual(actions);
                });
            });
        });
    });
});