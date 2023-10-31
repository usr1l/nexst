// import React from 'react';
// import { connect } from 'react-redux';

// import { Route, Navigate, withRouter } from 'react-router-dom';

// // passed in from parent from component or from mapStateToProps
// const Auth = ({ component: Component, path, loggedIn, exact }) => {
//   return (
//     <Route path={path} exact={exact} render={(props) => (
//       !loggedIn ? (
//         <Component {...props} />
//       ) : (
//         // redirect to homepage if no user logged in, V6 uses navigate instead of redirect
//         <Navigate to="/" />
//       )
//     )} />
//   )
// };

// const Protected = ({ component: Component, loggedIn, ...rest })
