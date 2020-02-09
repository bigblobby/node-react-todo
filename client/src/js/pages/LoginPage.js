import React from 'react';
import { login } from "../api";
import Auth from "../utils/auth";

export default class LoginPage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            username: '',
            password: '',
            error: null,
        };

        this.handleInput = this.handleInput.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount(){
        // Check if user is already logged in, if so redirect to homepage
        const tokenExists = Auth.checkTokenExists();
        if(tokenExists){
            this.props.history.push("/account");
        }
    }

    handleInput(e){
        this.setState({[e.target.name]: e.target.value})
    }

    handleSubmit(e){
        e.preventDefault();

        login({
            username: this.state.username,
            password: this.state.password
        }).then(result => {
            // Redirect to previous page after successful login
            Auth.updateStorage();
            if(result.data.token){
                this.props.history.goBack();
            }
        }).catch(err => {
            this.setState({
                error: err.response.data.message
            })
        });
    }

    render(){
        return(
            <div>
                <form onSubmit={this.handleSubmit}>
                    <div>
                        <label htmlFor="register-username">Username: </label>
                        <input id="register-username" type="text" name="username" onChange={this.handleInput}/>
                    </div>
                    <div>
                        <label htmlFor="register-password">Password: </label>
                        <input id="register-password" type="password" name="password" onChange={this.handleInput}/>
                    </div>
                    {
                        this.state.error ? (
                            <p style={{color: 'red'}}>{this.state.error}</p>
                        ) : null
                    }
                    <div>
                        <button type="submit">Login</button>
                    </div>
                </form>
            </div>
        )
    }
}
