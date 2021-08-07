import React from "react";
import { Link } from "react-router-dom";

class Header extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const { currentUser, logout } = this.props;
        
        if (currentUser !== undefined) {
            return (
                <div className="header-main">
                    <a className="logout" onClick={logout} >LOG OUT</a>
                </div>
            );
        } else {
            return (
                <div className="header-main">
                    <Link to="/signup" className="signup">SIGN UP</Link>
                    <Link to="/login" className="login" >LOG IN</Link>
                </div>
            );
        }
    }
};

export default Header;
