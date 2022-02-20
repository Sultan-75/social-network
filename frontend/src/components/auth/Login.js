import React, { useState } from "react";
import { Link, Navigate } from "react-router-dom";
import { connect } from "react-redux";
import { login } from "../../actions/auth";

const INTIAL_STATE = {
	name: "",
	email: "",
	password: "",
	confirmPassword: "",
};

const Login = ({ login, isAuthenticated }) => {
	const [formData, setFormData] = useState(INTIAL_STATE);

	const { email, password } = formData;

	const formHandling = (e) => {
		setFormData({ ...formData, [e.target.name]: e.target.value });
		// console.log(formData);
	};

	const onSubmit = async (e) => {
		e.preventDefault();

		login(email, password);
	};

	if (isAuthenticated) {
		return <Navigate to="/dashboard" />;
	}

	return (
		<section className="container">
			<h1 className="large text-primary">Sign In</h1>
			<p className="lead">
				<i className="fas fa-user"></i> Sign into Your Account
			</p>
			<form className="form" onSubmit={(e) => onSubmit(e)}>
				<div className="form-group">
					<input
						type="email"
						placeholder="Email Address"
						name="email"
						value={email}
						onChange={(e) => formHandling(e)}
						required
					/>
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
				<input
					type="submit"
					className="btn btn-primary"
					value="Login"
				/>
			</form>
			<p className="my-1">
				Don't have an account? <Link to="/register">Sign Up</Link>
			</p>
		</section>
	);
};

const mapToState = (state) => ({
	isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapToState, { login })(Login);
