import configureMockStore from "redux-mock-store";
import thunk from "redux-thunk";
import * as AnnotationModalActions from "../../actions/annotation_modal_actions";

const middlewares = [ thunk ];
const mockStore = configureMockStore(middlewares);

describe("annotation modal actions", () => {
    describe("constants", () => {
        test("exports an OPEN_ANNOTATION_MODAL constant", () => {
            expect(AnnotationModalActions.OPEN_ANNOTATION_MODAL).toEqual("OPEN_ANNOTATION_MODAL");
        });
        test("exports a CLOSE_ANNOTATION_MODAL constant", () => {
            expect(AnnotationModalActions.CLOSE_ANNOTATION_MODAL).toEqual("CLOSE_ANNOTATION_MODAL");
        });
    });
    describe("functions", () => {
        let store: any;
        beforeEach(() => {
            store = mockStore({ annotationModal: false });
        });
        afterEach(() => {
            store.clearActions();
        });
        describe("openAnnotationModal", () => {
            test("is exported", () => {
                expect(typeof AnnotationModalActions.openAnnotationModal).toEqual("function");
            });
            test("dispatches OPEN_ANNOTATION_MODAL when openAnnotationModal is called", () => {
                const actions = [{ type: "OPEN_ANNOTATION_MODAL" }];
                store.dispatch(AnnotationModalActions.openAnnotationModal());
                console.log(store.getActions())
                expect(store.getActions()).toEqual(actions);
            });
        });
        describe("closeAnnotationModal", () => {
            test("is exported", () => {
                expect(typeof AnnotationModalActions.closeAnnotationModal).toEqual("function");
            });
            test("dispatches CLOSE_ANNOTATION_MODAL when closeAnnotationModal is called", () => {
                const actions = [{ type: "CLOSE_ANNOTATION_MODAL" }];
                store.dispatch(AnnotationModalActions.closeAnnotationModal());
                expect(store.getActions()).toEqual(actions);
            });
        });
    });
});