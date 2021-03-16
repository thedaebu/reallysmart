import React from 'react';

class SessionForm extends React.Component {
    constructor(props){
        super(props)
    }

    render() {
        const {errors, formType, formLink, action} = this.props;
        return (
            <div className='session-form'>
                <h1>{formType}</h1>
                <p>{formType} or {formLink}</p>
            </div>
            

        )
    }
};

export default SessionForm;
