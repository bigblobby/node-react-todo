import React from 'react';
import { register } from "../api";

export default class RegisterPage extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            username: '',
            email: '',
            password: ''
        };

        this.handleInput = this.handleInput.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleInput(e){
        this.setState({[e.target.name]: e.target.value})
    }

    handleSubmit(e){
        e.preventDefault();

        register({
            username: this.state.username,
            email: this.state.email,
            password: this.state.password
        }).then(result => {
            console.log(result);
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
                        <label htmlFor="register-email">Email: </label>
                        <input id="register-email" type="text" name="email" onChange={this.handleInput}/>
                    </div>
                    <div>
                        <label htmlFor="register-password">Password: </label>
                        <input id="register-password" type="password" name="password" onChange={this.handleInput}/>
                    </div>
                    <div>
                        <button type="submit">Register</button>
                    </div>
                </form>
            </div>
        )
    }
}
