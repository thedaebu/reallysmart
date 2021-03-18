import React from 'react';

class NavBar extends React.Component {
    constructor(props){
        super(props)
    }

    render(){
        let url = 'youtube.com/thedaebu';
        return (
            <div className='navbar-main'>
                <a className='navbar-item' href=''>COLLECTIVE SOUNDS</a>
                <a className='navbar-item' href=''>GENIUS LIVE</a>
                <a className='navbar-item' href=''>FEATURED</a>
                <a className='navbar-item' href=''>CHARTS</a>
                <a className='navbar-item' href=''>VIDEOS</a>
                <a className='navbar-item' href=''>SHOP</a>
                <div className='navbar-image-main'>
                    <a href=''><img className='navbar-image-item' src={window.github} /></a>
                    <a href=''><img className='navbar-image-item' src={window.linkedin} /></a>
                    <a href=''><img className='navbar-image-item' src={window.instagram} /></a>
                    <a href={url} alt='youtube.com/thedaebu'><img className='navbar-image-item' src={window.youtube} /></a>
                    
                </div>
            </div>
        )
    }
}

export default NavBar;