import React, {Fragment} from 'react';
import { connect } from "react-redux";
import { logout, verifyToken } from "../actions/userActions";

class AccountPage extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount(){
        this.props.verify();
    }

    render(){
        return(
            <div>
                {
                    this.props.isAuthenticated ? (
                        <Fragment>
                            <div>
                                {
                                    this.props.currentUser && this.props.currentUser.id && (
                                        <p>ID: {this.props.currentUser.id}</p>
                                    )
                                }
                                {
                                    this.props.currentUser && this.props.currentUser.email && (
                                        <p>Email: {this.props.currentUser.email}</p>
                                    )
                                }
                                {
                                    this.props.currentUser && this.props.currentUser.username && (
                                        <p>Username: {this.props.currentUser.username}</p>
                                    )
                                }
                            </div>
                            <div>
                                <button onClick={this.props.logout}>Logout</button>
                            </div>
                        </Fragment>
                    ) : (
                        <div>Not authorised</div>
                    )
                }
            </div>
        );
    }
}

const mapStateToProps = ({auth}) => {
    const { isAuthenticated, isFailure, currentUser } = auth;
    return {
        isAuthenticated,
        isFailure,
        currentUser
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        verify: () => dispatch(verifyToken()),
        logout: () => dispatch(logout())
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(AccountPage);

