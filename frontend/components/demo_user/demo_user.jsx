import React from "react";

class DemoUser extends React.Component {
    constructor(props) {
        super(props)

        this.loginWithDemo = this.loginWithDemo.bind(this);
    }

    loginWithDemo(e) {
        e.preventDefault();
        
        const { login, info } = this.props;
        login(info);
    }

    render() {
        const { currentUser } = this.props;
        if (currentUser) {
            return (
                null
            )
        } else {
            return (
                <a className='demo' onClick={this.loginWithDemo}>DEMO</a>
            )
        }
    }
}

export default DemoUser;