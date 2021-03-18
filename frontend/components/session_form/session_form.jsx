import React from 'react';
import DemoUserContainer from '../demo_user/demo_user_container';

class SessionForm extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            username: '',
            password: ''
        };

        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(e){
        e.preventDefault;
        const user = Object.assign({}, this.state);
        this.props.action(user);
    }

    handleChange(type) {
        return e => this.setState({[type]: e.target.value});
    }

    showErrors(){
       if (this.props.errors) {
        return (
            <div className='errors-main'>
                <h2 className='errors-header'>Ruh-roh!</h2>
                <p className='errors-message'>Something is wrong</p>
                <ul className='errors-item'>
                {this.props.errors.map((error, idx) => {
                    return <li className='error-message' key={idx}>{error}</li>
                })}    
                </ul>
            </div>
        )
        } else {
            return (
                <p></p>
            )
        }
    }

    render() {
        const {formType, formSubmit, formLink, formLast, formPassword, formTos} = this.props;
        return (
            <div className='session-form-main'>
                <h1 className='session-form-h1'>{formType}</h1>
                
                <form className="session-form-form" onSubmit={this.handleSubmit}>
                    {this.showErrors()}
                    <label htmlFor='session-form-username' >Really Smart Nickname
                        <input id='session-form-username' type='text' value={this.state.username} onChange={this.handleChange('username')}/>
                    </label>
                    <label htmlFor='session-form-password' >Really Smart Password <a className='session-form-forgot-password' href='' >{formPassword}</a>
                        <input id='session-form-password' type='password' value={this.state.password} onChange={this.handleChange('password')}/>
                    </label>
                    {formTos}
                    <input id='form-submit' type="submit" value={formSubmit} />
                    
                </form>
                <p className='session-form-last' >{formLast} {formLink}</p>
                
            </div>
            

        )
    }
};

export default SessionForm;
