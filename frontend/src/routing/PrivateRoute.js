import React from "react";
import { connect } from "react-redux";
import { Navigate } from "react-router-dom";

const PrivateRoute = ({ children, auth: { isAuthenticated } }) => {
  return isAuthenticated ? children : <Navigate to="/login" />;
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps)(PrivateRoute);
