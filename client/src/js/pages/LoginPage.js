import React from 'react';
import StorageService from "../StorageService";
import { login } from "../actions/userActions";
import { connect } from "react-redux";

class LoginPage extends React.Component {
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
        if(StorageService.getToken()){
            this.props.history.push("/account");
        }
    }

    handleInput(e){
        this.setState({[e.target.name]: e.target.value})
    }

    handleSubmit(e){
        e.preventDefault();

        this.props.login({
            username: this.state.username,
            password: this.state.password
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
                        this.props.error ? (
                            <p style={{color: 'red'}}>{this.props.error}</p>
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

const mapStateToProps = ({ auth }) => {
    const { error } = auth;
    return {
        error: error
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        login: (params) => dispatch(login(params))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(LoginPage);
