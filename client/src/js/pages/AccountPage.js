import React, {Fragment} from 'react';
import { connect } from "react-redux";
import { logout, updateUser, verifyToken } from "../actions/userActions";
import Api from "../api";

class AccountPage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            file: null
        }
    }

    componentDidMount(){
        this.props.verify();
    }

    handleUpload = (e) => {
        this.setState({
            file: e.target.files[0]
        });
    };

    handleSubmit = (e) => {
        e.preventDefault();

        const formData = new FormData();

        formData.append('avatar', this.state.file);
        formData.append('id', this.props.currentUser.id);

        Api.uploadAvatar(formData).then(result => {
            this.props.updateUser(result.data.user);
        })
    };

    render(){
        return(
            <div>
                {
                    this.props.isAuthenticated ? (
                        <Fragment>
                            {
                                this.props.currentUser && this.props.currentUser.avatar && (
                                    <img src={this.props.currentUser.avatar} alt="An avatar"/>
                                )
                            }
                            <form encType="multipart/form-data" onSubmit={this.handleSubmit}>
                                <label htmlFor="upload">Upload avatar</label>
                                <input type="file" accept="image/*" name="avatar" onChange={this.handleUpload}/>
                                <button type="submit">Upload</button>
                            </form>
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
        logout: () => dispatch(logout()),
        updateUser: (user) => dispatch(updateUser(user))
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(AccountPage);

