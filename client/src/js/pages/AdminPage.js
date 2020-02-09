// TODO

import React from 'react';
import queryString from "query-string";
import { verifyAndGetUser } from "../api";
import jwt_decode from 'jwt-decode';

export default class AdminPage extends React.Component{
    constructor(props) {
        super(props);

        this.state = {
            allowAccess: false,
            user: null
        };
    }

    componentDidMount(){
        let cookies = queryString.parse(document.cookie);
        if('token' in cookies){
            verifyAndGetUser({
                token: cookies.token
            }).then(result => {
                const jwt = jwt_decode(cookies.token);
                const roles = JSON.parse(jwt.roles);

                // This feels like a security risk, may need to change
                if(roles.indexOf('ROLE_ADMIN') === -1){
                    this.props.history.push("/login");
                } else {
                    this.setState({
                        user: result.data.user,
                        allowAccess: true
                    });
                }
            }).catch(err => {
                console.log(err);
                this.props.history.push("/login");
            });
        } else {
            this.props.history.push("/login");
        }
    }

    render(){
        if(this.state.allowAccess){
            return (
                <div>This is the admin page</div>
            );
        } else {
            return null;
        }
    }
}
