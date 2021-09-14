import React from "react";

class SessionForm extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            username: "",
            password: "",
            // avatar: window.defaultAvatar
        };
        
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount() {
        window.scrollTo(0, 0);
    }

    componentWillUnmount() {
        this.props.clearErrors();
    }

    handleSubmit(e) {
        e.preventDefault();

        const { action } = this.props
        const user = Object.assign({}, this.state);
        action(user);
    }

    handleChange(type) {
        return e => this.setState({[type]: e.target.value});
    }

    showErrors() {
        const { errors } = this.props;

       if (errors.length) {
            return (
                <div className="errors-main">
                    <h2>Ruh-roh!</h2>
                    <p>Something is wrong</p>
                    <ul>
                        {errors.map((error, idx) => {
                            return <li className="error-message" key={idx}>{error}</li>
                        })}    
                    </ul>
                </div>
            );
        } else {
            return (
                null
            );
        }
    }

    render() {
        const { formType, formTypeSub, formSubmit, formLink, formLast, formPassword, formTos } = this.props;

        return (        
            <div className="session-form-main">
                {formType}
                {formTypeSub}                   
                <form className="session-form-form" onSubmit={this.handleSubmit}>
                    {this.showErrors()}
                    <label htmlFor="session-form-username" >Really Smart Nickname
                        <input 
                            id="session-form-username" 
                            type="text" 
                            value={this.state.username} 
                            onChange={this.handleChange("username")}
                        />
                    </label>
                    <label htmlFor="session-form-password" >Really Smart Password 
                        <a 
                            className="session-form-forgot-password" 
                            href="" >{formPassword}
                        </a>
                        <input 
                            id="session-form-password" 
                            type="password" 
                            value={this.state.password} 
                            onChange={this.handleChange("password")}
                        />
                    </label>
                    {formTos}
                    <input 
                        id="session-form-submit" 
                        type="submit" 
                        value={formSubmit}
                    />                        
                </form>
                <p className="session-form-bottom" >{formLast} {formLink}</p>                  
            </div>            
        );
    }
};

export default SessionForm;