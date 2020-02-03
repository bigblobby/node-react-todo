import React from 'react';
import { login } from "../api";
import queryString from 'query-string';

export default class LoginPage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            username: '',
            password: ''
        };

        this.handleInput = this.handleInput.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount(){
        // Check if user is already logged in, if so redirect to homepage
        let cookies = queryString.parse(document.cookie);
        if('token' in cookies){
            this.props.history.push("/");
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
            if(result.data.token){
                this.props.history.goBack();
            }
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
                    <div>
                        <button type="submit">Login</button>
                    </div>
                </form>
            </div>
        )
    }
}
