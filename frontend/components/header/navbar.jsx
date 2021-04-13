import React from 'react';

class NavBar extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <div className='navbar-outside'>
                <div className='navbar-main'>
                    <a className='collective-sounds' href='https://soundcloud.com/thedaebu' target="_blank" rel="noopener noreferrer">COLLECTIVE SOUNDS</a>
                    <a className='genius-live' href=''>GENIUS LIVE</a>
                    <a className='featured' href=''>FEATURED</a>
                    <a className='charts' href=''>CHARTS</a>
                    <a className='videos' href='' >VIDEOS</a>
                    <a className='shop' href=''>SHOP</a>
                    <div className='navbar-image-main'>
                        <a href='https://github.com/thedaebu/reallysmart' target="_blank" rel="noopener noreferrer"><img className='navbar-image-item' src={window.github} /></a>
                        <a href='https://www.linkedin.com/in/edkim163/' target="_blank" rel="noopener noreferrer"><img className='navbar-image-item' src={window.linkedin} /></a>
                        <a href='https://angel.co/u/edwardkim163' target="_blank" rel="noopener noreferrer"><img className='navbar-image-item' src={window.angellist} /></a>
                        <a href='https://eddie-kim.com/' target="_blank" rel="noopener noreferrer"><img className='navbar-image-item' src={window.website} /></a>
                                  
                    </div>
                </div>
            </div>
        )
    }
}

export default NavBar;