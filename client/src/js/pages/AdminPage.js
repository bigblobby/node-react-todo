import React from 'react';
import { connect } from 'react-redux';
import { verifyToken } from "../actions/userActions";

class AdminPage extends React.Component {
    componentDidMount() {
        this.props.verify();
    }

    render() {
        if(this.props.isAuthenticated && this.props.isAdmin) {
            return (
                <div>This is the admin page</div>
            );
        } else {
            return <div>You do not have the right permissions to view this page.</div>;
        }
    }
}

const mapStateToProps = ({auth}) => {
    const { isAdmin, isAuthenticated, currentUser } = auth;
    return {
        isAdmin,
        isAuthenticated,
        currentUser
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        verify: () => dispatch(verifyToken())
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(AdminPage);
