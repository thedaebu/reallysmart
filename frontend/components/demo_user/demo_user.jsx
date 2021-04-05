import React from 'react';

class DemoUser extends React.Component {
    constructor(props) {
        super(props)

        this.loginWithDemo = this.loginWithDemo.bind(this);
    }

    loginWithDemo(e) {
        const {login, info} = this.props;
        e.preventDefault();
        login(info);
    }

    render () {
        const { currentUser, info, login } = this.props;
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