import React, { useState } from "react";
import { Link, Navigate } from "react-router-dom";
import { connect } from "react-redux";
import { setAlert } from "../../actions/alert";
import { register } from "../../actions/auth";

const INTIAL_STATE = {
  name: "",
  email: "",
  password: "",
  confirmPassword: "",
};

const Register = ({ setAlert, register, isAuthenticated }) => {
  const [formData, setFormData] = useState(INTIAL_STATE);

  const { name, email, password, confirmPassword } = formData;

  const formHandling = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    // console.log(formData);
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setAlert("Password doesn't match", "danger");
    } else {
      register({ name, email, password });
    }
  };

  if (isAuthenticated) {
    return <Navigate to="/dashboard" />;
  }

  return (
    <section className="container">
      <h1 className="large text-primary">Sign Up</h1>
      <p className="lead">
        <i className="fas fa-user"></i> Create Your Account
      </p>
      <form className="form" onSubmit={(e) => onSubmit(e)}>
        <div className="form-group">
          <input
            type="text"
            placeholder="Name"
            name="name"
            value={name}
            onChange={(e) => formHandling(e)}
          />
        </div>
        <div className="form-group">
          <input
            type="email"
            placeholder="Email Address"
            name="email"
            value={email}
            onChange={(e) => formHandling(e)}
          />
          <small className="form-text">
            This site uses Gravatar so if you want a profile image, use a
            Gravatar email
          </small>
        </div>
        <div className="form-group">
          <input
            type="password"
            placeholder="Password"
            name="password"
            value={password}
            onChange={(e) => formHandling(e)}
          />
        </div>
        <div className="form-group">
          <input
            type="password"
            placeholder="Confirm Password"
            name="confirmPassword"
            value={confirmPassword}
            onChange={(e) => formHandling(e)}
          />
        </div>
        <input type="submit" className="btn btn-primary" value="Register" />
      </form>
      <p className="my-1">
        Already have an account? <Link to="/login">Sign In</Link>
      </p>
    </section>
  );
};

const mapToState = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapToState, { setAlert, register })(Register);
