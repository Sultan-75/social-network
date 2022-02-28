import React, { useEffect } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { getCurrentUserProfile } from "../../actions/profile";
import Spinner from "../layout/Spinner";
import DashboardActions from "./DashboardActions";

const Dashboard = ({
  getCurrentUserProfile,
  auth: { user },
  profile: { profile, loading },
}) => {
  useEffect(() => {
    getCurrentUserProfile();
  }, []);

  return (
    <section className="container">
      {loading && profile === null ? (
        <Spinner />
      ) : (
        <>
          <h1 className="large text-primary">Dashboard</h1>
          <p className="lead">
            <i className="fas fa-user"></i>
            Welcome {user && user.name}
          </p>
          {profile !== null ? (
            <>
              <DashboardActions />
              <h2 className="my-2">Experience Credentials</h2>
              <table className="table">
                <thead>
                  <tr>
                    <th>Company</th>
                    <th className="hide-sm">Title</th>
                    <th className="hide-sm">Years</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Tech Guy Web Solutions</td>
                    <td className="hide-sm">Senior Developer</td>
                    <td className="hide-sm">02-03-2009 - 01-02-2014</td>
                    <td>
                      <button className="btn btn-danger">Delete</button>
                    </td>
                  </tr>
                  <tr>
                    <td>Traversy Media</td>
                    <td className="hide-sm">Instructor & Developer</td>
                    <td className="hide-sm">02-03-2015 - Now</td>
                    <td>
                      <button className="btn btn-danger">Delete</button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </>
          ) : (
            <>
              <p>You have not yet setup a profile, please add some info</p>
              <Link to="/create-profile" className="btn btn-primary my-1">
                Create Profile
              </Link>
            </>
          )}
        </>
      )}
    </section>
  );
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  profile: state.profile,
});

export default connect(mapStateToProps, { getCurrentUserProfile })(Dashboard);
