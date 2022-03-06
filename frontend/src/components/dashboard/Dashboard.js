import React, { useEffect } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { getCurrentUserProfile } from "../../actions/profile";
import Spinner from "../layout/Spinner";
import DashboardActions from "./DashboardActions";
import Education from "./Education";
import Experience from "./Experience";

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
          <h1 className="large text-primary">Dashbboard</h1>
          <p className="lead">
            <i className="fas fa-user"></i>
            Welcome {user && user.name}
          </p>

          {profile !== null ? (
            <>
              <DashboardActions />
              <Experience experience={profile.experience} />
              <Education education={profile.education} />
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
