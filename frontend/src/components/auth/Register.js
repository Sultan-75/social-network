import React, { useState } from "react";
import axios from "axios";

const INTIAL_STATE = {
  name: "",
  email: "",
  password: "",
  confirmPassword: "",
};

const Register = () => {
  const [formData, setFormData] = useState(INTIAL_STATE);
  const { name, email, password, confirmPassword } = formData;
  const formHandling = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    // console.log(formData);
  };
  const onSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      console.log("Password doesn't match");
    } else {
      // console.log(formData);
      const newUser = {
        name,
        email,
        password,
      };

      try {
        const config = {
          headers: {
            "Content-Type": "application/json",
          },
        };

        const body = JSON.stringify(newUser);

        const res = await axios.post("/api/users", body, config);

        console.log(res.data);

        // setFormData(INTIAL_STATE);
      } catch (err) {
        console.error(err.response.data);
      }
    }
  };

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
            required
          />
        </div>
        <div className="form-group">
          <input
            type="email"
            placeholder="Email Address"
            name="email"
            value={email}
            onChange={(e) => formHandling(e)}
            required
          />
          <br />
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
            minLength="6"
            value={password}
            onChange={(e) => formHandling(e)}
            required
          />
        </div>
        <div className="form-group">
          <input
            type="password"
            placeholder="Confirm Password"
            name="confirmPassword"
            minLength="6"
            value={confirmPassword}
            onChange={(e) => formHandling(e)}
            required
          />
        </div>
        <input type="submit" className="btn btn-primary" value="Register" />
      </form>
      <p className="my-1">
        Already have an account? <a href="login.html">Sign In</a>
      </p>
    </section>
  );
};

export default Register;
