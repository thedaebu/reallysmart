import React from 'react';

class NavBar extends React.Component {
    constructor(props){
        super(props)
    }

    render(){
        return (
            <div className='navbar-outside'>
                <div className='navbar-main'>
                    <a className='navbar-item' href='https://soundcloud.com/thedaebu'>COLLECTIVE SOUNDS</a>
                    <a className='navbar-item' href=''>GENIUS LIVE</a>
                    <a className='navbar-item' href=''>FEATURED</a>
                    <a className='navbar-item' href=''>CHARTS</a>
                    <a className='navbar-item' href='' >VIDEOS</a>
                    <a className='navbar-item' href=''>SHOP</a>
                    <div className='navbar-image-main'>
                        <a href='https://github.com/thedaebu/reallysmart'><img className='navbar-image-item' src={window.github} /></a>
                        <a href='https://www.linkedin.com/in/edkim163/'><img className='navbar-image-item' src={window.linkedin} /></a>
                        <a href='https://www.instagram.com/thedaebu/'><img className='navbar-image-item' src={window.instagram} /></a>
                        <a href='https://www.youtube.com/user/thedaebu' ><img className='navbar-image-item' src={window.youtube} /></a>
                        
                    </div>
                </div>
            </div>
        )
    }
}

export default NavBar;