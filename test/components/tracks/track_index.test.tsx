import React from "react";
import { fireEvent, render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import TrackIndex from "../../../frontend/components/tracks/track_index";
import { fetchTracks } from "../../../frontend/actions/track_actions";

test("button at bottom should change text when clicked on", () => {
    render(<TrackIndex fetchTracks={fetchTracks} tracks={[]} />)

    const extendListButton = screen.getByText("LOAD MORE");
    expect(extendListButton).toHaveTextContent("LOAD MORE");
    fireEvent.click(extendListButton);
    expect(extendListButton).toHaveTextContent("We Miss You DMX!");
})