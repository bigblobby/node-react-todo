// TODO refactor
import React from 'react';
import Api from "../api";
import queryString from "query-string";
import StorageService from "../StorageService";

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

    componentDidMount(){
        // Check if user is already logged in, if so redirect to homepage
        if(StorageService.getToken()){
            this.props.history.push("/account");
        }
    }

    handleInput(e){
        this.setState({[e.target.name]: e.target.value})
    }

    handleSubmit(e){
        e.preventDefault();

        Api.register({
            username: this.state.username,
            email: this.state.email,
            password: this.state.password
        }).then(result => {
            console.log(result);
            let cookies = queryString.parse(document.cookie);
            if('token' in cookies){
                this.props.history.push("/account");
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
