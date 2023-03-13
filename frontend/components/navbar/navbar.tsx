import React from "react";
import { Window } from "../../my_types";

declare const window: Window;

function Navbar() {
    return (
        <div className="navbar-main">
            <div className="navbar">
                <a className="navbar-link" href="https://soundcloud.com/thedaebu" target="_blank" rel="noopener noreferrer">COLLECTIVE SOUNDS</a>
                <a className="navbar-link" href="">GENIUS LIVE</a>
                <a className="navbar-link" href="">FEATURED</a>
                <a className="navbar-link" href="">CHARTS</a>
                <a className="navbar-link" href="">VIDEOS</a>
                <a className="navbar-link" href="">SHOP</a>
                <section className="navbar-image-main">
                    <a href="https://github.com/thedaebu/reallysmart" target="_blank" rel="noopener noreferrer">
                        <img className="navbar-image" src={window.github} alt="Github" />
                    </a>
                    <a href="https://www.linkedin.com/in/edkim163/" target="_blank" rel="noopener noreferrer">
                        <img className="navbar-image" src={window.linkedin} alt="LinkedIn" />
                    </a>
                    <a href="https://eddie-kim.com/" target="_blank" rel="noopener noreferrer">
                        <img className="navbar-image" src={window.website} alt="Website" />
                    </a>
                </section>
            </div>
        </div>
    );
}

export default Navbar;