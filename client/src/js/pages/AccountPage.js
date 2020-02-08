import React, {Fragment} from 'react';
import queryString from "query-string";
import { verifyAndGetUser } from "../api";

export default class AccountPage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            user: null
        };

        this.logout = this.logout.bind(this);
    }


    componentDidMount(){
        let cookies = queryString.parse(document.cookie);
        if('token' in cookies){

            verifyAndGetUser({
               token: cookies.token
            }).then(result => {
                this.setState({
                    user: result.data.user
                });
            }).catch(err => {
                console.log(err);
            });
        } else {
            this.props.history.push("/login");
        }
    }

    logout(){
        document.cookie =  'token=; expires=Thu, 01 Jan 1970 00:00:01 GMT;';
        window.location = '/';
    }

    render(){
        return(
            <Fragment>
                <div>
                    {
                        this.state.user && this.state.user.id && (
                            <p>ID: {this.state.user.id}</p>
                        )
                    }
                    {
                        this.state.user && this.state.user.email && (
                            <p>Email: {this.state.user.email}</p>
                        )
                    }
                    {
                        this.state.user && this.state.user.username && (
                            <p>Username: {this.state.user.username}</p>
                        )
                    }
                </div>
                <div>
                    <button onClick={this.logout}>Logout</button>
                </div>
            </Fragment>
        );
    }
}
