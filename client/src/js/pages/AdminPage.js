// // TODO
//
// import React from 'react';
// import jwt_decode from 'jwt-decode';
//
// export default class AdminPage extends React.Component{
//     constructor(props) {
//         super(props);
//
//         this.state = {
//             allowAccess: false,
//             user: null
//         };
//     }
//
//     componentDidMount(){
//         const tokenExists = Auth.checkTokenExists();
//
//         if(tokenExists){
//             Auth.verifyTokenAndGetUser()
//                 .then(result => {
//                     const jwt = jwt_decode(Auth.getToken());
//                     const roles = JSON.parse(jwt.roles);
//
//                     // This feels like a security risk, may need to change
//                     if(roles.indexOf('ROLE_ADMIN') === -1){
//                         this.props.history.push("/account");
//                     } else {
//                         this.setState({
//                             user: result.data.user,
//                             allowAccess: true
//                         });
//                     }
//                 }).catch(err => {
//                     console.dir(err);
//                     this.props.history.push("/login");
//                 });
//         } else {
//             this.props.history.push("/login");
//         }
//     }
//
//     render(){
//         if(this.state.allowAccess){
//             return (
//                 <div>This is the admin page</div>
//             );
//         } else {
//             return <div>You do not have the right permissions to view this page.</div>;
//         }
//     }
// }
