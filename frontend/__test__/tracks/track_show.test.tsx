import React from "react";
import { cleanup, render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event"
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import * as reactRedux from "react-redux";
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import server from "../msw_server"
import TrackShow from "../../components/tracks/track_show";
import * as trackActions from "../../actions/track_actions";

describe("track show", () => {
    const middlewares = [thunk];
    const mockStore = configureMockStore(middlewares);
    const testStore = mockStore({ entities: {tracks:  }});

    const useFetchTracks = jest.spyOn(trackActions, 'fetchTracks');
    const useMockEffect = jest.spyOn(React, 'useEffect');
    const useMockDispatch = jest.spyOn(reactRedux, 'useDispatch');

    beforeAll(() => server.listen());
    beforeEach(() => {
        render(
            <BrowserRouter>
                <Provider store={testStore}>
                    <TrackShow history={undefined} location={undefined} match={undefined} />
                </Provider>
            </BrowserRouter>
        )
    });
    afterEach(() => {
        cleanup()
        server.resetHandlers()
    });
    afterAll(() => server.close());
})