import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { logout } from "../../actions/auth";

const Navbar = ({ auth: { isAuthenticated, loading }, logout }) => {
	const authLinks = (
		<ul>
			<li>
				<a href="/dashboard">Dashboard</a>
			</li>
			<li>
				<a onClick={logout} href="#!">
					<i className="fas fa-sign-out-alt"></i> Logout
				</a>
			</li>
		</ul>
	);

	const guestLinks = (
		<ul>
			<li>
				<a href="/profiles">Developers</a>
			</li>
			<li>
				<Link to="/register">Register</Link>
			</li>
			<li>
				<Link to="/login">Login</Link>
			</li>
		</ul>
	);

	return (
		<nav className="navbar bg-dark">
			<h1>
				<Link to="/">
					<i className="fas fa-code"></i> DevCommunity
				</Link>
			</h1>

			{!loading && <>{isAuthenticated ? authLinks : guestLinks}</>}
		</nav>
	);
};

const mapToState = (state) => ({
	auth: state.auth,
});

export default connect(mapToState, { logout })(Navbar);
