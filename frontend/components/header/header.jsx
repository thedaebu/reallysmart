import React from 'react';
import { Link } from 'react-router-dom';

class Header extends React.Component {
    constructor(props){
        super(props)
    }

    render(){
        const {currentUser, logout} = this.props;
        if (currentUser) {
            return (
                <div className='header'>
                    <p>Hello, {currentUser.username}</p>
                    <button onClick={logout} >Log Out</button>
                </div>
            )
        } else {
            return (
                <div className='header'>
                    <Link to='/signup' className='signup'>Sign Up</Link>
                    <Link to='/login' className='login' >Log In</Link>
                </div>
            )
        }
    }
};

export default Header;
