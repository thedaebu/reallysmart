import React from 'react';
import { Link } from 'react-router-dom';

class NavBar extends React.Component {
    constructor(props){
        super(props)
    }

    render(){
        const {currentUser, logout} = this.props
        if (currentUser) {
            return (
                <>
                    <p>Hello, {currentUser.username}</p>
                    <button onClick={logout} >Log Out</button>
                </>
            )
        } else {
            return (
                <>
                    <Link to='/signup' >Sign Up</Link>
                    <Link to='/login' >Log In</Link>
                </>
            )
        }
    }
};

export default NavBar;
