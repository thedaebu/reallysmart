import React from 'react';

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
       
        return (
            <ul>
            {this.props.errors.map((error, idx) => {
                return <li className='error-message' key={idx}>{error}</li>
            })}    
            </ul>
        )
    }

    render() {
        const {errors, formType, formLink, action} = this.props;
        return (
            <div className='session-form-main'>
                <h1>{formType}</h1>
                {this.showErrors()}
                <form className="session-form-form" onSubmit={this.handleSubmit}>
                    <label htmlFor='username' >Username:
                    <input id='username' type='text' value={this.state.username} onChange={this.handleChange('username')}/>
                    </label>
                    <label htmlFor='password' >Password:
                    <input id='password' type='password' value={this.state.password} onChange={this.handleChange('password')}/>
                    </label>
                    <input id='form-submit' type="submit" value={formType} />
                    
                </form>
                <p>{formType} or {formLink}</p>
            </div>
            

        )
    }
};

export default SessionForm;
