import * as VoteActions from "../../actions/vote_actions";

describe("vote actions", () => {
    describe("functions", () => {
        describe("createVote", () => {
            test("is exported", () => {
                expect(typeof VoteActions.createVote).toEqual("function");
            });
        });
        describe("deleteVote", () => {
            test("is exported", () => {
                expect(typeof VoteActions.deleteVote).toEqual("function");
            });
        });
    });
});