import React, {Fragment} from 'react';
import Auth from '../utils/auth';

export default class AccountPage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            user: null
        };

        this.logout = this.logout.bind(this);
    }


    componentDidMount(){
        const tokenExists = Auth.checkTokenExists();

        if(tokenExists){
            Auth.verifyTokenAndGetUser()
                .then(result => {
                    this.setState({
                        user: result.data.user
                    });
                }).catch(err => {
                    console.dir(err);
                });
        } else {
            this.props.history.push("/login");
        }
    }

    logout(){
        Auth.clearToken();
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

