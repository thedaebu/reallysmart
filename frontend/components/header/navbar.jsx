import React from 'react';

class NavBar extends React.Component {
    constructor(props){
        super(props)
    }

    render(){
        return (
            <div className='navbar-main'>
                <a href=''>COLLECTIVE SOUNDS</a>
                <a href=''>GENIUS LIVE</a>
                <a href=''>FEATURED</a>
                <a href=''>CHARTS</a>
                <a href=''>VIDEOS</a>
                <a href=''>SHOP</a>
                <div className='navbar-img-main'>
                    <a href=''><img className='navbar-img-item' src={window.github} /></a>
                    <a href=''><img className='navbar-img-item' src={window.linkedin} /></a>
                    <a href=''><img className='navbar-img-item' src={window.instagram} /></a>
                    <a href=''><img className='navbar-img-item' src={window.youtube} /></a>
                    
                </div>
            </div>
        )
    }
}

export default NavBar;