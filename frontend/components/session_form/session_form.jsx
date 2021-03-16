import React from 'react';

class SessionForm extends React.Component {
    constructor(props){
        super(props)
    }

    render() {
        const {errors, formType, formLink, action} = this.props;
        return (
            <h1>{formType}</h1>
        )
    }
};

export default SessionForm;
